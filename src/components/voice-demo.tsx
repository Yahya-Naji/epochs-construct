"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from "lucide-react";

type Status = "idle" | "connecting" | "connected" | "error";

export default function VoiceDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [errorMsg, setErrorMsg] = useState("");

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const cleanup = useCallback(() => {
    if (dcRef.current) {
      dcRef.current.close();
      dcRef.current = null;
    }
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startCall = useCallback(async () => {
    setStatus("connecting");
    setTranscript([]);
    setErrorMsg("");

    try {
      // Get ephemeral token
      const tokenRes = await fetch("/api/realtime-session", { method: "POST" });
      const tokenData = await tokenRes.json();

      if (!tokenRes.ok) {
        throw new Error(tokenData.error || "Failed to get session token");
      }

      const ephemeralKey = tokenData.client_secret?.value;
      if (!ephemeralKey) {
        throw new Error("No ephemeral key returned");
      }

      // Create peer connection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Set up audio output
      const audio = document.createElement("audio");
      audio.autoplay = true;
      audioRef.current = audio;

      pc.ontrack = (e) => {
        audio.srcObject = e.streams[0];
      };

      // Get microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      // Create data channel for events
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data);

          if (
            event.type === "conversation.item.input_audio_transcription.completed"
          ) {
            if (event.transcript?.trim()) {
              setTranscript((prev) => [
                ...prev,
                { role: "user", text: event.transcript.trim() },
              ]);
            }
          }

          if (event.type === "response.audio_transcript.done") {
            if (event.transcript?.trim()) {
              setTranscript((prev) => [
                ...prev,
                { role: "assistant", text: event.transcript.trim() },
              ]);
            }
          }
        } catch {
          // ignore parse errors
        }
      };

      dc.onopen = () => {
        setStatus("connected");
      };

      // Create and set local SDP
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send to OpenAI Realtime
      const sdpRes = await fetch(
        "https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ephemeralKey}`,
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        }
      );

      if (!sdpRes.ok) {
        throw new Error("Failed to connect to OpenAI Realtime");
      }

      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Connection failed");
      setStatus("error");
      cleanup();
    }
  }, [cleanup]);

  const endCall = useCallback(() => {
    cleanup();
    setStatus("idle");
  }, [cleanup]);

  const toggleMute = useCallback(() => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500">
          <Phone className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Live Voice Demo</h3>
          <p className="text-xs text-slate-400">
            Talk to Sarah — our AI inventory assistant
          </p>
        </div>
      </div>

      {/* Status indicator */}
      <div className="mb-5 flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full ${
            status === "connected"
              ? "bg-emerald-500 animate-pulse"
              : status === "connecting"
              ? "bg-amber-500 animate-pulse"
              : "bg-slate-300"
          }`}
        />
        <span className="text-xs text-slate-500">
          {status === "idle" && "Ready to connect"}
          {status === "connecting" && "Connecting..."}
          {status === "connected" && "Connected — speak now"}
          {status === "error" && "Connection failed"}
        </span>
      </div>

      {/* Transcript area */}
      <div className="mb-5 h-48 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-4">
        {transcript.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Volume2 className="mb-2 h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-400">
              {status === "connected"
                ? 'Say "Hi" to start talking to Sarah!'
                : "Click the call button to start a demo conversation"}
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Try: &quot;What rebar do you have in stock?&quot;
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transcript.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-rose-500 text-white"
                      : "bg-white border border-slate-200 text-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-xs text-red-600"
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {status === "idle" || status === "error" ? (
          <button
            onClick={startCall}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-rose-500/20 transition hover:from-rose-600 hover:to-orange-600"
          >
            <Phone className="h-4 w-4" />
            Start Demo Call
          </button>
        ) : status === "connecting" ? (
          <button
            disabled
            className="flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3 text-sm font-medium text-white opacity-80"
          >
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Connecting...
          </button>
        ) : (
          <>
            <button
              onClick={toggleMute}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                isMuted
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {isMuted ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={endCall}
              className="flex items-center gap-2 rounded-full bg-red-500 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
            >
              <PhoneOff className="h-4 w-4" />
              End Call
            </button>
          </>
        )}
      </div>
    </div>
  );
}
