"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  Bot,
  ArrowRight,
  CheckCircle2,
  Mic,
  Database,
  Building2,
  Factory,
  HardHat,
  Layers,
  Send,
  MessageCircle,
  Headphones,
  ChevronRight,
  Star,
  Zap,
  Shield,
  Clock,
  Menu,
  X,
  TrendingUp,
  PhoneCall,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  Play,
  Globe,
  Sparkles,
} from "lucide-react";
import dynamic from "next/dynamic";

const VoiceDemo = dynamic(() => import("@/components/voice-demo"), {
  ssr: false,
});

/* ─── Data ─────────────────────────────────────────── */

const heroImages = [
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
  "https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=1920&q=80",
  "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1920&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80",
];

const features = [
  {
    icon: Mic,
    title: "AI Voice Agent",
    description:
      "Customers call your number and an AI agent answers instantly. It checks inventory, provides pricing, and handles inquiries 24/7 — no hold times.",
    gradient: "from-rose-500 to-orange-500",
    tag: "Voice",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
  },
  {
    icon: MessageCircle,
    title: "Chat Widget Integration",
    description:
      "Embed a smart chat popup on your website. Visitors ask about steel grades, concrete mix availability, or delivery timelines and get instant AI answers.",
    gradient: "from-emerald-500 to-teal-500",
    tag: "Chat",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&q=80",
  },
  {
    icon: Send,
    title: "WhatsApp Messaging",
    description:
      "Your customers message you on WhatsApp to check stock, place orders, or ask questions. The AI responds in real-time with accurate inventory data.",
    gradient: "from-green-500 to-emerald-500",
    tag: "WhatsApp",
    image: "https://images.unsplash.com/photo-1616469829935-c2f33ebd89b8?w=600&q=80",
  },
  {
    icon: Phone,
    title: "Direct Phone Calls",
    description:
      "Real phone number, real conversations. The AI agent handles inbound calls, checks your live inventory database, and gives callers exactly what they need.",
    gradient: "from-blue-500 to-indigo-500",
    tag: "Phone",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Customer Reaches Out",
    description:
      "Via phone call, WhatsApp, website chat, or voice — any channel they prefer.",
    icon: Headphones,
  },
  {
    step: "02",
    title: "Epochs Intelligence Processes",
    description:
      "Our AI agent understands the request, whether it's checking rebar stock or concrete pricing.",
    icon: Bot,
  },
  {
    step: "03",
    title: "Connects to Your Data",
    description:
      "The AI queries your existing inventory system in real-time for accurate, live information.",
    icon: Database,
  },
  {
    step: "04",
    title: "Instant Response",
    description:
      "Customer gets an accurate answer in seconds. No waiting, no transfers, no callbacks.",
    icon: Zap,
  },
];

const industries = [
  { icon: Factory, label: "Metal Suppliers" },
  { icon: Building2, label: "Construction Companies" },
  { icon: HardHat, label: "Contractors" },
  { icon: Layers, label: "Building Materials" },
];

const benefits = [
  {
    icon: DollarSign,
    title: "Increase Revenue",
    description:
      "Never miss a sales inquiry again. AI answers every call and message instantly — converting more leads into paying customers around the clock.",
    stat: "35%",
    statLabel: "avg. revenue increase",
  },
  {
    icon: PhoneCall,
    title: "Answer Every Call",
    description:
      "Handle hundreds of simultaneous calls without hiring extra staff. No busy signals, no voicemail, no lost customers.",
    stat: "100%",
    statLabel: "call answer rate",
  },
  {
    icon: TrendingUp,
    title: "Boost Productivity",
    description:
      "Free your team from repetitive inventory questions. Let them focus on high-value tasks while AI handles the routine inquiries.",
    stat: "60%",
    statLabel: "time saved on inquiries",
  },
  {
    icon: Users,
    title: "Scale Without Hiring",
    description:
      "Grow your customer base without growing your headcount. One AI agent replaces 5+ customer service reps for inventory queries.",
    stat: "5x",
    statLabel: "capacity multiplier",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description:
      "Know exactly what your customers are asking for. Get analytics on demand patterns, popular products, and peak inquiry times.",
    stat: "Real-time",
    statLabel: "demand analytics",
  },
  {
    icon: Settings,
    title: "Zero Downtime",
    description:
      "AI never calls in sick, never takes breaks, and never needs training. Consistent, accurate responses 24 hours a day, 365 days a year.",
    stat: "24/7",
    statLabel: "always available",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "100",
    priceLabel: "/month",
    description: "Perfect for small suppliers getting started with AI",
    features: [
      "AI Chat Widget",
      "Up to 500 conversations/mo",
      "Basic inventory integration",
      "Email support",
      "1 team member",
      "Standard response time",
    ],
    cta: "Get Started",
    popular: false,
    custom: false,
  },
  {
    name: "Professional",
    price: "190",
    priceLabel: "/month",
    description: "For growing companies that need full channel coverage",
    features: [
      "Everything in Starter",
      "Voice Agent + Phone Calls",
      "WhatsApp Integration",
      "Up to 2,000 conversations/mo",
      "Advanced analytics dashboard",
      "5 team members",
      "Priority support",
      "Custom AI training",
    ],
    cta: "Start Free Trial",
    popular: true,
    custom: false,
  },
  {
    name: "Enterprise",
    price: "250",
    priceLabel: "/month",
    description: "Full-scale deployment for large operations",
    features: [
      "Everything in Professional",
      "Unlimited conversations",
      "Multi-location support",
      "Dedicated account manager",
      "Custom integrations (ERP/SAP)",
      "Unlimited team members",
      "SLA guarantee (99.9%)",
      "On-premise deployment option",
      "White-label available",
    ],
    cta: "Contact Sales",
    popular: false,
    custom: false,
  },
  {
    name: "Custom",
    price: "",
    priceLabel: "",
    description: "Tailored solution built around your exact requirements",
    features: [
      "Fully custom AI model training",
      "Bespoke integration with any system",
      "Dedicated engineering team",
      "Custom SLA & compliance",
      "Multi-language support",
      "On-site deployment & training",
      "Volume-based pricing",
      "24/7 priority hotline",
    ],
    cta: "Talk to Us",
    popular: false,
    custom: true,
  },
];

const testimonials = [
  {
    quote:
      "We reduced phone wait times from 12 minutes to zero. Our customers just call and the AI tells them exactly what's in stock.",
    author: "Ahmad R.",
    role: "Operations Manager, Gulf Steel Co.",
    rating: 5,
  },
  {
    quote:
      "The WhatsApp integration alone saved us 3 full-time employees worth of inquiry handling. Game changer for our concrete business.",
    author: "Sarah M.",
    role: "Director, BuildRight Materials",
    rating: 5,
  },
  {
    quote:
      "Our contractors love it. They check rebar availability at 2 AM before a pour and get instant answers. No more morning rush calls.",
    author: "James K.",
    role: "CEO, Metro Construction Supply",
    rating: 5,
  },
];

const trustedLogos = [
  "Gulf Steel Co.",
  "BuildRight Materials",
  "Metro Construction",
  "Atlas Metals",
  "SteelForce Inc.",
  "ConcretePro",
  "Titan Building Supply",
  "IronWorks Global",
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

/* ─── Floating Particles ───────────────────────────── */

// Deterministic positions to avoid SSR/client hydration mismatch
const PARTICLE_DATA = Array.from({ length: 20 }).map((_, i) => ({
  left: ((i * 37 + 13) % 100),
  top: ((i * 53 + 7) % 100),
  duration: 3 + (i % 5) * 0.8,
  delay: (i % 7) * 0.4,
}));

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLE_DATA.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Counter ─────────────────────────────── */

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {value}
      </motion.div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}

/* ─── Component ────────────────────────────────────── */

export default function EpochsLandingPage() {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* ── Navigation ─── scroll-aware ──── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm"
            : ""
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute h-6 w-6 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 opacity-90" />
              <div className="absolute h-6 w-6 translate-x-[3px] -translate-y-[3px] rounded-lg bg-gradient-to-br from-purple-500 to-rose-500 opacity-60" />
              <div className="absolute h-6 w-6 translate-x-[6px] -translate-y-[6px] rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 opacity-35" />
            </div>
            <span
              className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-slate-800" : "text-white"
              }`}
            >
              epochs<span className={scrolled ? "text-rose-500" : "text-rose-300"}>.</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {["Features", "How It Works", "Demo", "Pricing", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className={`text-[13px] transition ${
                    scrolled
                      ? "text-slate-500 hover:text-slate-800"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:block">
              <button
                className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
                  scrolled
                    ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/20"
                    : "bg-white/15 text-white backdrop-blur-md border border-white/20 hover:bg-white/25"
                }`}
              >
                Book a Demo
              </button>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden transition ${
                scrolled ? "text-slate-600" : "text-white/80"
              }`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`px-5 py-4 md:hidden ${
              scrolled
                ? "border-t border-slate-100 bg-white"
                : "border-t border-white/10 bg-black/60 backdrop-blur-xl"
            }`}
          >
            {["Features", "How It Works", "Demo", "Pricing", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm transition ${
                    scrolled ? "text-slate-600 hover:text-slate-900" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              )
            )}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white"
            >
              Book a Demo
            </a>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {/* ── Hero with full-screen background slider ── */}
        <section ref={heroRef} className="relative h-screen min-h-[750px] overflow-hidden">
          {/* Rotating background images with parallax */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{ y: heroY }}
            >
              <motion.img
                src={heroImages[current]}
                alt="Construction and metal industry"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "linear" }}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/25 to-orange-900/10" />

          {/* Floating particles */}
          <FloatingParticles />

          {/* Hero content */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md"
              >
                <Sparkles className="h-3.5 w-3.5 text-rose-300" />
                AI-Powered Inventory Communication
              </motion.div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Your customers ask.
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 bg-clip-text text-transparent"
                >
                  AI answers instantly.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
              >
                Voice agents, chat, WhatsApp, and phone calls — all powered by
                AI that connects directly to your inventory. Built for metal
                suppliers, construction companies, and building material
                providers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <a href="#contact">
                  <button className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-rose-500/30 transition-all hover:shadow-xl hover:shadow-rose-500/40 hover:from-rose-600 hover:to-orange-600">
                    Book a Demo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </a>
                <a href="#demo">
                  <button className="group flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20">
                    <Play className="h-4 w-4" />
                    Try Live Demo
                  </button>
                </a>
              </motion.div>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-16 grid w-full max-w-2xl grid-cols-4 divide-x divide-white/15 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-lg"
            >
              {[
                { value: "< 3s", label: "Response Time" },
                { value: "24/7", label: "Availability" },
                { value: "95%", label: "Resolution" },
                { value: "AI", label: "Powered" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Slider dots */}
            <div className="mt-8 flex gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/30 p-1">
                <motion.div
                  className="h-1.5 w-1.5 rounded-full bg-white/80"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Trusted By Marquee ────────────────────── */}
        <section className="overflow-hidden border-t border-slate-100 bg-white py-6">
          <div className="flex items-center gap-8">
            <motion.div
              className="flex shrink-0 items-center gap-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[...trustedLogos, ...trustedLogos].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-300"
                >
                  <Globe className="h-4 w-4" />
                  {name}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Flow Diagram: User → AI → Data ── */}
        <section className="border-t border-slate-100 bg-slate-50 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div {...fadeInUp} transition={{ duration: 0.5 }} className="mb-14 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-rose-500">
                Architecture
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Simple integration. Powerful results.
              </h2>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 md:flex-row md:gap-0">
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="flex w-full flex-1 flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 border border-blue-100">
                    <Headphones className="h-7 w-7 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Customer</h3>
                  <p className="mt-1 text-center text-xs text-slate-400">
                    Calls, chats, or messages
                  </p>
                </motion.div>

                <div className="flex items-center px-2 md:px-0">
                  <motion.div
                    className="h-8 w-px md:h-px md:w-16"
                    style={{
                      background: "linear-gradient(90deg, transparent, #fb7185, transparent)",
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <ChevronRight className="hidden h-4 w-4 text-rose-400 md:block" />
                  <ChevronRight className="block h-4 w-4 rotate-90 text-rose-400 md:hidden" />
                </div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="flex w-full flex-1 flex-col items-center rounded-2xl border border-rose-200 bg-gradient-to-b from-rose-50 to-orange-50 p-6 shadow-sm shadow-rose-100 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500">
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Epochs Intelligence</h3>
                  <p className="mt-1 text-center text-xs text-slate-400">
                    Understands &amp; processes
                  </p>
                </motion.div>

                <div className="flex items-center px-2 md:px-0">
                  <motion.div
                    className="h-8 w-px md:h-px md:w-16"
                    style={{
                      background: "linear-gradient(90deg, transparent, #fb7185, transparent)",
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <ChevronRight className="hidden h-4 w-4 text-rose-400 md:block" />
                  <ChevronRight className="block h-4 w-4 rotate-90 text-rose-400 md:hidden" />
                </div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="flex w-full flex-1 flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                    <Database className="h-7 w-7 text-emerald-500" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Your Data</h3>
                  <p className="mt-1 text-center text-xs text-slate-400">
                    Live inventory system
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {industries.map((ind, i) => (
                <motion.div
                  key={ind.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm cursor-default"
                >
                  <ind.icon className="h-4 w-4 text-slate-400" />
                  {ind.label}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Section with images ──────────── */}
        <section id="features" className="border-t border-slate-100 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div {...fadeInUp} transition={{ duration: 0.5 }} className="mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-rose-500">
                Channels
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Every way your customers reach you.
                <br />
                <span className="text-slate-300">Covered by AI.</span>
              </h2>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white transition-all hover:shadow-xl hover:shadow-slate-200/50"
                >
                  {/* Image strip */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full border border-white/30 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur-md">
                        {feature.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 pt-2">
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient}`}
                      >
                        <feature.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits Section ──────────────────────── */}
        <section className="border-t border-slate-100 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div {...fadeInUp} transition={{ duration: 0.5 }} className="mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-rose-500">
                Why Epochs
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                The impact on your business
              </h2>
              <p className="mt-3 text-slate-400">
                Real results that transform how you operate.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, index) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 border border-rose-100"
                    >
                      <b.icon className="h-5 w-5 text-rose-500" />
                    </motion.div>
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-xl font-bold text-transparent">
                        {b.stat}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">
                        {b.statLabel}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {b.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works with connectors ──────────── */}
        <section id="how-it-works" className="border-t border-slate-100 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div {...fadeInUp} transition={{ duration: 0.5 }} className="mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-rose-500">
                Process
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                How it works
              </h2>
              <p className="mt-3 text-slate-400">
                From inquiry to answer in seconds — not minutes.
              </p>
            </motion.div>

            <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Connector line (desktop) */}
              <div className="absolute top-8 left-[12.5%] right-[12.5%] hidden h-px bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 lg:block" />

              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="relative text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <step.icon className="h-7 w-7 text-rose-500" />
                  </motion.div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-300">
                    Step {step.step}
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats with animated counters ──────────── */}
        <section className="border-t border-slate-100 bg-gradient-to-r from-slate-50 to-rose-50/30 py-16">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <AnimatedCounter value="< 3s" label="Avg. Response Time" />
              <AnimatedCounter value="24/7" label="Availability" />
              <AnimatedCounter value="95%" label="Query Resolution" />
              <AnimatedCounter value="40%" label="Cost Reduction" />
            </div>
          </div>
        </section>

        {/* ── Voice Demo Section ─────────────────────── */}
        <section id="demo" className="border-t border-slate-100 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-rose-500">
                  Try It Now
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Experience it yourself
                </h2>
                <p className="mt-4 leading-relaxed text-slate-500">
                  Talk to Sarah, our AI inventory assistant, right now. She has
                  access to a demo inventory of steel, concrete, aggregates, and
                  building materials. Ask her anything — check stock, get pricing,
                  or place a mock order.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    '"What rebar sizes do you have in stock?"',
                    '"How much is a ton of 16mm steel rebar?"',
                    '"I need 500 bags of Portland cement — do you have that?"',
                    '"What are your delivery options?"',
                  ].map((q) => (
                    <motion.div
                      key={q}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-sm text-slate-500"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 text-rose-400" />
                      <span className="italic">{q}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Mini preview image */}
                <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80"
                    alt="Construction site communication"
                    className="h-48 w-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <VoiceDemo />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────── */}
        <section className="border-t border-slate-100 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div {...fadeInUp} transition={{ duration: 0.5 }} className="mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-rose-500">
                Testimonials
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Trusted by industry leaders
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-orange-400 text-xs font-bold text-white">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800">
                        {t.author}
                      </div>
                      <div className="text-xs text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing Section ──────────────────────── */}
        <section id="pricing" className="border-t border-slate-100 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div {...fadeInUp} transition={{ duration: 0.5 }} className="mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-rose-500">
                Pricing
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-3 text-slate-400">
                Start small and scale as your business grows.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`relative flex flex-col rounded-2xl border p-7 transition-shadow ${
                    plan.popular
                      ? "border-rose-200 bg-gradient-to-b from-rose-50 to-orange-50 shadow-xl shadow-rose-100/50"
                      : plan.custom
                      ? "border-dashed border-slate-300 bg-gradient-to-b from-slate-50 to-white hover:shadow-md"
                      : "border-slate-200 bg-white hover:shadow-md"
                  }`}
                >
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-1 text-xs font-semibold text-white"
                    >
                      Most Popular
                    </motion.div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {plan.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-baseline gap-1">
                    {plan.custom ? (
                      <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                        Let&apos;s Talk
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-slate-900">
                          ${plan.price}
                        </span>
                        <span className="text-sm text-slate-400">{plan.priceLabel}</span>
                      </>
                    )}
                  </div>
                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="mt-8 block">
                    <button
                      className={`w-full rounded-lg py-2.5 text-sm font-medium transition ${
                        plan.popular
                          ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/20 hover:from-rose-600 hover:to-orange-600"
                          : plan.custom
                          ? "border-2 border-dashed border-rose-300 bg-rose-50 text-rose-600 hover:bg-rose-100"
                          : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────── */}
        <section className="border-t border-slate-100">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 to-orange-500 px-8 py-14 text-center shadow-2xl shadow-rose-500/20 md:px-16"
            >
              <FloatingParticles />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  Ready to transform your customer experience?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  Join dozens of construction and metal companies already using
                  epochs to handle customer inquiries automatically.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a href="#contact">
                    <button className="group flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-rose-600 shadow-lg transition hover:bg-rose-50">
                      Get Started Today
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </a>
                  <a href="#demo">
                    <button className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20">
                      <Play className="h-4 w-4" />
                      Try the Demo
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Contact / Book a Demo ────────────────── */}
        <section id="contact" className="border-t border-slate-100 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid gap-12 md:grid-cols-2">
              <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-rose-500">
                  Get Started
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Book a demo
                </h2>
                <p className="mt-4 leading-relaxed text-slate-500">
                  See how epochs AI can transform the way your customers interact
                  with your inventory. We&apos;ll set up a personalized demo
                  tailored to your industry.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    { icon: Clock, text: "15-minute personalized demo" },
                    { icon: Shield, text: "No commitment required" },
                    { icon: Zap, text: "Get set up in under 48 hours" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <item.icon className="h-4 w-4 text-rose-500" />
                      {item.text}
                    </div>
                  ))}
                </div>

                {/* Trust indicators */}
                <div className="mt-8 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex -space-x-2">
                    {["A", "S", "J", "M"].map((letter, i) => (
                      <div
                        key={letter}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-rose-400 to-orange-400 text-xs font-bold text-white"
                        style={{ zIndex: 4 - i }}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">
                      Trusted by 50+ companies
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-12 text-center"
                  >
                    <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-500" />
                    <h3 className="text-xl font-semibold text-slate-800">
                      Thank you!
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      We&apos;ll be in touch within 24 hours to schedule your
                      demo.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-500">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none transition focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-500">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none transition focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-500">
                          Company
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none transition focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-500">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none transition focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-500">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none transition focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                        placeholder="Tell us about your business and what you're looking for..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 py-3 text-sm font-medium text-white shadow-lg shadow-rose-500/20 transition hover:from-rose-600 hover:to-orange-600"
                    >
                      Book a Demo
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-7 w-7 items-center justify-center">
                <div className="absolute h-5 w-5 rounded-md bg-gradient-to-br from-rose-500 to-orange-500 opacity-90" />
                <div className="absolute h-5 w-5 translate-x-[2px] -translate-y-[2px] rounded-md bg-gradient-to-br from-purple-500 to-rose-500 opacity-60" />
                <div className="absolute h-5 w-5 translate-x-[4px] -translate-y-[4px] rounded-md bg-gradient-to-br from-violet-500 to-purple-500 opacity-35" />
              </div>
              <span className="text-sm font-semibold text-slate-600">
                epochs<span className="text-rose-500">.</span>
              </span>
              <span className="text-xs text-slate-300">— AI Consultancy</span>
            </div>

            <div className="flex gap-8">
              {["Features", "Pricing", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs text-slate-400 transition hover:text-slate-600"
                >
                  {item}
                </a>
              ))}
            </div>

            <p className="text-xs text-slate-300">
              &copy; {new Date().getFullYear()} epochs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
