import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Download, Mail, Phone, MapPin, Link2 as Linkedin, Camera as Instagram,
  Palette, Sparkles, Layers, PenTool, Megaphone, Presentation, LayoutGrid, Globe,
  PenSquare as Figma, Code2, Cpu, Camera, Check, Send, Star, Briefcase, Award, Zap,
  ArrowRight, ArrowLeft, X, Quote, Image as ImageIcon, Square, Film, PlaySquare, Tag, Package, Megaphone as MegaphoneIcon, Wand2,
} from "lucide-react";
import ldLogo from "@/assets/ld-logo.png.asset.json";
import ldHero from "@/assets/ld-hero.png.asset.json";
import ldPortrait from "@/assets/ld-portrait.png.asset.json";
import resumePdf from "@/assets/Leeladhar_Designer.pdf.asset.json";
import udaanPdf from "@/assets/Udaan_Task5.pdf.asset.json";
import work1 from "@/assets/work-1.png.asset.json";
import work2 from "@/assets/work-2.png.asset.json";
import work3 from "@/assets/work-3.png.asset.json";
import workA from "@/assets/work-a.png.asset.json";
import workMaaza from "@/assets/work-maaza.png.asset.json";
import workPulse from "@/assets/work-pulse.png.asset.json";
import posterAdidas from "@/assets/poster-adidas.png.asset.json";
import posterDio from "@/assets/poster-dio.png.asset.json";
import posterMaaza from "@/assets/poster-maaza.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DesignedByLD — Graphic Designer & Visual Storyteller" },
      { name: "description", content: "Premium portfolio of DesignedByLD — Graphic Designer in India. Brand identity, social media design, and creative technology." },
      { property: "og:title", content: "DesignedByLD — Graphic Designer" },
      { property: "og:description", content: "Designing brands that people remember." },
    ],
  }),
  component: Portfolio,
});

/* ---------------- Reusable bits ---------------- */

function MagneticButton({ children, className = "", onClick, href }: { children: ReactNode; className?: string; onClick?: () => void; href?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const reset = () => { x.set(0); y.set(0); };

  const Inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 ${className}`}
    >
      {children}
    </motion.div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{Inner}</a> : Inner;
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: ReactNode; subtitle?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="mx-auto mb-16 max-w-3xl text-center">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent"
      >
        <span className="h-1.5 w-1.5 rounded-full gradient-accent" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="mt-5 text-4xl font-bold leading-tight text-foreground md:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-5 text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1800;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.round(start + (value - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------------- Nav ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    ["About", "#about"], ["Work", "#work"], ["Services", "#services"],
    ["Experience", "#experience"], ["Contact", "#contact"],
  ] as const;
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all ${scrolled ? "" : ""}`}>
        <a href="#top" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-black shadow-glow ring-1 ring-accent/40">
            <img src={ldLogo.url} alt="DesignedByLD logo" className="h-full w-full object-cover" />
          </div>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">DesignedByLD</span>
        </a>
        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-2 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground">{l}</a>
          ))}
        </nav>
        <MagneticButton href="#contact" className="hidden rounded-full gradient-primary px-5 py-2.5 text-sm font-medium text-white shadow-glow md:inline-flex">
          Hire Me <ArrowUpRight className="h-4 w-4" />
        </MagneticButton>
        <button onClick={() => setOpen(!open)} className="glass grid h-10 w-10 place-items-center rounded-full md:hidden">
          {open ? <X className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mx-6 mt-3 md:hidden">
            <div className="glass flex flex-col gap-1 rounded-2xl p-3">
              {links.map(([l, h]) => (
                <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm hover:bg-black/5">{l}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-1 rounded-xl gradient-primary px-4 py-3 text-center text-sm font-medium">Hire Me</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 20 });
  const py = useSpring(my, { stiffness: 50, damping: 20 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 40);
      my.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden pt-32">
      {/* gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 gradient-hero" />
      {/* grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "linear-gradient(to right, #0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }} />
      {/* floating shapes */}
      <motion.div style={{ x: px, y: py }} className="pointer-events-none absolute left-[8%] top-[20%] h-64 w-64 rounded-full bg-primary/30 blur-3xl animate-float-slow" />
      <motion.div style={{ x: px, y: py }} className="pointer-events-none absolute right-[5%] top-[15%] h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-float-slow" />
      <motion.div style={{ x: px, y: py }} className="pointer-events-none absolute bottom-[10%] left-[40%] h-80 w-80 rounded-full bg-secondary/30 blur-3xl animate-float-slow" />

      {/* 3D shapes */}
      <motion.div style={{ x: px, y: py }} className="absolute right-[10%] top-[30%] hidden lg:block">
        <div className="animate-float">
          <div className="relative h-32 w-32 rotate-12 rounded-3xl gradient-primary shadow-glow" />
        </div>
      </motion.div>
      <motion.div style={{ x: px, y: py }} className="absolute bottom-[20%] left-[8%] hidden lg:block">
        <div className="animate-float" style={{ animationDelay: "1.5s" }}>
          <div className="h-20 w-20 -rotate-12 rounded-full gradient-accent shadow-glow-accent" />
        </div>
      </motion.div>
      <motion.div style={{ x: px, y: py }} className="absolute right-[20%] bottom-[15%] hidden lg:block">
        <div className="animate-float" style={{ animationDelay: "0.8s" }}>
          <div className="h-16 w-16 rotate-45 border-2 border-accent/60" />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for freelance & full-time
          </motion.div>

          <h1 className="mt-8 max-w-2xl text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-[4.5rem]">
            {"Designing Brands".split(" ").map((w, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }} className="mr-4 inline-block">{w}</motion.span>
            ))}
            <br />
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="inline-block">That People </motion.span>
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="inline-block text-gradient">Remember</motion.span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
            Graphic Designer · Visual Storyteller · Content Creator — crafting visual experiences that connect, inspire, and convert.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <MagneticButton href="#work" className="rounded-full gradient-primary px-7 py-3.5 text-sm font-medium text-white shadow-glow">
              View Projects <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <a href={resumePdf.url} target="_blank" rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-foreground">
              <Download className="h-4 w-4" /> View Resume
            </a>
            <MagneticButton href="#contact" className="rounded-full border border-accent/40 bg-accent/10 px-7 py-3.5 text-sm font-medium text-accent">
              Hire Me <Sparkles className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ x: px, y: py }}
          className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/30 blur-3xl" />
          <div className="absolute -inset-2 -z-10 rounded-[2rem] gradient-primary opacity-40 blur-2xl" />
          <div className="glass relative overflow-hidden rounded-[2rem] p-1.5 shadow-glow">
            <img src={ldPortrait.url} alt="DesignedByLD portrait" className="aspect-[16/10] w-full rounded-[1.6rem] object-cover" />
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
            className="glass absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl p-4 shadow-glow sm:flex">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Now</div>
              <div className="text-sm font-semibold">Open to work</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* marquee tools */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-center">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">Tools of the craft</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground">
          {["Figma", "Photoshop", "Illustrator", "Canva", "CapCut", "React", "Framer", "AI Tools"].map((t, i) => (
            <motion.span key={t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.05 }}
              className="font-display text-lg font-medium tracking-tight transition-colors hover:text-foreground">{t}</motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}



/* ---------------- About ---------------- */

function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="About"
          title={<>A designer who <span className="text-gradient">codes</span>, a coder who <span className="text-gradient-primary">designs</span>.</>}
        />
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-5">
            <div className="glass relative overflow-hidden rounded-3xl p-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.4rem]">
                <img src={ldHero.url} alt="DesignedByLD at work" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                  <div>
                    <div className="font-display text-3xl font-bold leading-none">DesignedByLD</div>
                    <div className="mt-1 text-sm text-accent">Designer · Storyteller</div>
                  </div>
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { l: "Based in", v: "India" },
                { l: "Focus", v: "Brand · Social · UI" },
                { l: "Experience", v: "2+ Years" },
                { l: "Availability", v: "Open to work" },
              ].map((i) => (
                <div key={i.l} className="glass rounded-2xl p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{i.l}</div>
                  <div className="mt-1 text-sm font-semibold">{i.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-7">
            <p className="text-xl leading-relaxed text-foreground/90">
              Hi, I'm <span className="font-semibold text-gradient">Leeladhar</span>, the designer behind <span className="font-semibold text-foreground">DesignedByLD</span>. I specialize in creating high-impact social media posts, brand visuals, and presentation designs that grab attention and drive results. With <span className="text-foreground">2+ years of experience</span> and <span className="text-foreground">50+ projects delivered</span> across branding, campaigns, and digital design, I've helped brands and causes turn simple ideas into powerful visual stories that boost engagement and visibility.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              From scroll-stopping posters and carousels to clean brand identities and pitch decks, I focus on creating content that doesn't just look good — it performs.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Palette, t: "Design Craft", d: "Branding, typography, layout, color systems." },
                { icon: Camera, t: "Visual Storytelling", d: "Narrative-driven campaigns & content." },
                { icon: Cpu, t: "Creative Tech", d: "React, Python, AI-augmented workflows." },
                { icon: Megaphone, t: "Brand Strategy", d: "Positioning that scales across surfaces." },
              ].map((f) => (
                <motion.div key={t(f.t)} whileHover={{ y: -4 }} className="glass group rounded-2xl p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary shadow-glow">
                    <f.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="mt-4 font-semibold">{f.t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{f.d}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function t(s: string) { return s; }

/* ---------------- Skills ---------------- */

const skillGroups = [
  { title: "Design Tools", icon: Figma, items: [
    { name: "Figma", level: 95 }, { name: "Photoshop", level: 90 },
    { name: "Canva", level: 95 }, { name: "CapCut", level: 85 },
  ]},
  { title: "Creative Skills", icon: PenTool, items: [
    { name: "Branding", level: 92 }, { name: "Social Media Design", level: 94 },
    { name: "Typography", level: 88 }, { name: "Visual Storytelling", level: 90 },
    { name: "Poster & Packaging", level: 85 }, { name: "Presentation Design", level: 90 },
  ]},
  { title: "Technical Skills", icon: Code2, items: [
    { name: "React", level: 80 }, { name: "HTML / CSS", level: 92 },
    { name: "JavaScript", level: 78 }, { name: "Python · Django", level: 75 },
    { name: "SQL · Power BI", level: 78 },
  ]},
];

function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Skills" title={<>Built across <span className="text-gradient">design</span> & <span className="text-gradient-primary">code</span>.</>} />
        <div className="grid gap-6 lg:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <motion.div key={g.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="glass relative overflow-hidden rounded-3xl p-7">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary shadow-glow">
                  <g.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{g.title}</h3>
                <div className="mt-6 space-y-4">
                  {g.items.map((it, i) => (
                    <div key={it.name}>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span className="text-foreground/90">{it.name}</span>
                        <span className="text-muted-foreground">{it.level}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-black/5">
                        <motion.div
                          initial={{ width: 0 }} whileInView={{ width: `${it.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                          className="h-full gradient-accent" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */

const services = [
  { icon: Palette, t: "Brand Identity Design", d: "Logo design, brand guidelines, and complete visual systems that stand out.", tags: ["Logo", "Guidelines", "Systems"] },
  { icon: Instagram, t: "Social Media Design", d: "Instagram posts, stories, reels, and campaign creatives that perform.", tags: ["Posts", "Stories", "Reels"] },
  { icon: Megaphone, t: "Marketing Creatives", d: "Ads, banners, and promotional graphics that convert at scale.", tags: ["Ads", "Banners", "Promos"] },
  { icon: Presentation, t: "Presentation Design", d: "Investor decks and business presentations engineered to land.", tags: ["Pitch", "Decks", "Reports"] },
  { icon: LayoutGrid, t: "Content Design", d: "Infographics and visual storytelling that simplify complex ideas.", tags: ["Infographics", "Articles"] },
  { icon: Globe, t: "UI Design", d: "Landing pages and web interfaces designed for delight and clarity.", tags: ["Web", "Landing", "UX"] },
];

function Services() {
  return (
    <section id="services" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Services" title={<>What I <span className="text-gradient">design</span> for you.</>}
          subtitle="From founders to foundations — full-stack visual systems that scale." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div key={s.t}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -8 }}
              className="glass group relative overflow-hidden rounded-3xl p-7">
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 gradient-primary" />
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.74 0.13 210 / 0.2), transparent 60%)" }} />
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-black/5 transition-all duration-500 group-hover:bg-black/10">
                <s.icon className="h-7 w-7 text-accent transition-colors group-hover:text-white" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold transition-colors group-hover:text-white">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground transition-colors group-hover:text-white/80">{s.d}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map(tg => (
                  <span key={tg} className="rounded-full border border-black/10 px-3 py-1 text-xs text-muted-foreground transition-colors group-hover:border-black/30 group-hover:text-white/90">{tg}</span>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-white">
                Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Portfolio ---------------- */

type CategoryName =
  | "Poster Design" | "Social Media Posts" | "Carousel Design" | "YT Thumbnails"
  | "Logos" | "Packaging Designs" | "Digital Advertisements" | "AI Creatives";

type Project = {
  id: string; title: string; role: string; categories: CategoryName[]; description: string;
  tools: string[]; gradient: string; emoji: string; size: "sm" | "md" | "lg";
  image?: string; link?: string;
};

const projects: Project[] = [
  { id: "p_poster_adidas", title: "Adidas — Rule Your Race", role: "Poster Designer",
    categories: ["Poster Design", "Digital Advertisements"],
    description: "Hero poster for the Adidas Adizero Adios Pro Evo 3 — bold display type, motion-driven composition and editorial product staging.",
    tools: ["Photoshop", "Illustrator"],
    gradient: "linear-gradient(135deg,#0a0a0a,#5ba300)", emoji: "👟", size: "lg",
    image: posterAdidas.url },
  { id: "p_poster_dio", title: "Honda Dio 110 — Position Lamp", role: "Poster Designer",
    categories: ["Poster Design", "Digital Advertisements"],
    description: "Product spotlight poster for Honda Dio 110 — kinetic typography, hotspot callout and saturated red palette built for retail visibility.",
    tools: ["Photoshop"], gradient: "linear-gradient(135deg,#E11D48,#F59E0B)", emoji: "🛵", size: "md",
    image: posterDio.url },
  { id: "p_poster_maaza", title: "Maaza — Lift Your Mood", role: "Poster Designer",
    categories: ["Poster Design", "Packaging Designs", "AI Creatives"],
    description: "AI-assisted concept poster for Maaza — surreal scale play, golden-hour mango palette and retail-ready brand staging.",
    tools: ["Photoshop", "AI"], gradient: "linear-gradient(135deg,#F59E0B,#E11D48)", emoji: "🥭", size: "md",
    image: posterMaaza.url },
  { id: "p_inamigos", title: "InAmigos Foundation — Project Udaan", role: "Content & Visual Designer",
    categories: ["Digital Advertisements", "Social Media Posts", "Carousel Design"],
    description: "Visual creatives, article layouts and social campaign design for InAmigos Foundation's Project Udaan — a women empowerment & youth-development initiative.",
    tools: ["Photoshop", "Figma", "Canva"],
    gradient: "linear-gradient(135deg, #7C3AED, #06B6D4)", emoji: "✊", size: "lg",
    image: workA.url, link: udaanPdf.url },
  { id: "p_adidas1", title: "Adidas — Heritage x Performance", role: "Brand Visual Designer",
    categories: ["Poster Design", "Digital Advertisements"],
    description: "Concept campaign for Adidas blending heritage style with performance technology. Bold sneaker storytelling with brand-true type system.",
    tools: ["Photoshop", "Illustrator"],
    gradient: "linear-gradient(135deg, #0a0a0a, #5ba300)", emoji: "👟", size: "lg",
    image: work1.url },
  { id: "p_adidas2", title: "Adidas — Run Performance", role: "Graphic Designer",
    categories: ["Digital Advertisements", "Social Media Posts"],
    description: "Social and out-of-home creative for Adidas running line — built around motion, grit and the 3-stripe identity.",
    tools: ["Photoshop"], gradient: "linear-gradient(135deg, #E11D48, #0a0a0a)", emoji: "🏃", size: "md",
    image: work2.url },
  { id: "p_adidas3", title: "Adidas — Court & Casual", role: "Graphic Designer",
    categories: ["Digital Advertisements", "Poster Design"],
    description: "Lifestyle product visual for Adidas casual & court range — sustainable materials messaging, premium product composite.",
    tools: ["Photoshop", "Illustrator"], gradient: "linear-gradient(135deg, #2563EB, #0a0a0a)", emoji: "🎾", size: "md",
    image: work3.url },
  { id: "p_maaza", title: "Maaza — Mango Refresh", role: "Brand & Packaging Designer",
    categories: ["Packaging Designs", "Poster Design"],
    description: "Bold beverage poster for Maaza — saturated mango palette, sticker-style typography and high-energy product staging.",
    tools: ["Photoshop", "Illustrator"],
    gradient: "linear-gradient(135deg, #F59E0B, #E11D48)", emoji: "🥭", size: "md",
    image: workMaaza.url },
  { id: "p_pulse", title: "Pulse — Candy Pop", role: "Brand Designer",
    categories: ["Packaging Designs", "Social Media Posts"],
    description: "Pulse candy creative — playful product hero, kinetic type and high-contrast color blocking that owns the feed.",
    tools: ["Photoshop"], gradient: "linear-gradient(135deg, #F472B6, #F59E0B)", emoji: "🍬", size: "sm",
    image: workPulse.url },
  { id: "p_carousel", title: "Carousel Storytelling", role: "Visual Storyteller",
    categories: ["Carousel Design", "Social Media Posts"],
    description: "10-slide Instagram carousels turning complex ideas into bite-sized, swipeable narratives for @designedby.ld.",
    tools: ["Figma", "Canva"], gradient: "linear-gradient(135deg, #89e900, #06B6D4)", emoji: "📖", size: "sm" },
  { id: "p_type", title: "Typographic Quote Series", role: "Graphic Designer",
    categories: ["Social Media Posts"],
    description: "A weekly typographic series for Instagram — bold type, lime accents, consistent brand voice.",
    tools: ["Illustrator", "Figma"], gradient: "linear-gradient(135deg, #0a0a0a, #5ba300)", emoji: "✒️", size: "sm" },
  { id: "p_yt_tech", title: "Tech Review Thumbnails", role: "Thumbnail Designer",
    categories: ["YT Thumbnails"],
    description: "High-CTR YouTube thumbnails for tech & lifestyle creators — bold faces, contrast type and scroll-stop framing.",
    tools: ["Photoshop"], gradient: "linear-gradient(135deg,#E11D48,#7C3AED)", emoji: "▶️", size: "md" },
  { id: "p_yt_vlog", title: "Vlog Series Thumbnails", role: "Thumbnail Designer",
    categories: ["YT Thumbnails"],
    description: "Cohesive thumbnail system for a long-form vlog channel — consistent typography lockup and color identity.",
    tools: ["Photoshop", "Figma"], gradient: "linear-gradient(135deg,#06B6D4,#7C3AED)", emoji: "🎬", size: "sm" },
  { id: "p_logo_ld", title: "designedby.ld Personal Mark", role: "Logo Designer",
    categories: ["Logos"],
    description: "Personal monogram and wordmark — geometric LD lockup with lime accent, scaled across socials and merch.",
    tools: ["Illustrator"], gradient: "linear-gradient(135deg,#0a0a0a,#5ba300)", emoji: "✦", size: "md" },
  { id: "p_logo_studio", title: "Studio & Startup Marks", role: "Logo Designer",
    categories: ["Logos"],
    description: "Identity exploration set — wordmarks, monograms and emblem systems for early-stage brands.",
    tools: ["Illustrator", "Figma"], gradient: "linear-gradient(135deg,#7C3AED,#06B6D4)", emoji: "◎", size: "sm" },
  { id: "p_ai_surreal", title: "Surreal Product Scenes", role: "AI Creative Director",
    categories: ["AI Creatives", "Poster Design"],
    description: "AI-assisted hero visuals — surreal scale, hyper-real lighting and brand-aligned product fantasy.",
    tools: ["Midjourney", "Photoshop"], gradient: "linear-gradient(135deg,#F472B6,#7C3AED)", emoji: "🪄", size: "md" },
  { id: "p_ai_portrait", title: "AI Brand Portraits", role: "AI Creative",
    categories: ["AI Creatives", "Social Media Posts"],
    description: "Stylized AI portrait series for brand storytelling — directed prompts, finished in Photoshop.",
    tools: ["Midjourney", "Photoshop"], gradient: "linear-gradient(135deg,#06B6D4,#89e900)", emoji: "🧠", size: "sm" },
  { id: "p_ad_banner", title: "Performance Ad Banners", role: "Ad Designer",
    categories: ["Digital Advertisements", "Social Media Posts"],
    description: "Conversion-focused ad creatives across Meta and Google — modular templates with strong CTAs.",
    tools: ["Figma", "Photoshop"], gradient: "linear-gradient(135deg,#2563EB,#06B6D4)", emoji: "📣", size: "sm" },
  { id: "p_carousel_edu", title: "Edu Carousels", role: "Visual Storyteller",
    categories: ["Carousel Design"],
    description: "Educational carousel sets — strong info hierarchy, bold pull-quotes and a swipe-through narrative arc.",
    tools: ["Figma"], gradient: "linear-gradient(135deg,#5ba300,#06B6D4)", emoji: "📚", size: "sm" },
];

type Category = { name: CategoryName; icon: typeof ImageIcon; gradient: string; cover: string };
const CATEGORIES: Category[] = [
  { name: "Poster Design", icon: ImageIcon, gradient: "linear-gradient(135deg,#0a0a0a,#5ba300)", cover: posterAdidas.url },
  { name: "Social Media Posts", icon: Square, gradient: "linear-gradient(135deg,#E11D48,#7C3AED)", cover: work2.url },
  { name: "Carousel Design", icon: Film, gradient: "linear-gradient(135deg,#7C3AED,#06B6D4)", cover: workA.url },
  { name: "YT Thumbnails", icon: PlaySquare, gradient: "linear-gradient(135deg,#E11D48,#F59E0B)", cover: work3.url },
  { name: "Logos", icon: Tag, gradient: "linear-gradient(135deg,#0a0a0a,#7C3AED)", cover: work1.url },
  { name: "Packaging Designs", icon: Package, gradient: "linear-gradient(135deg,#F59E0B,#E11D48)", cover: workMaaza.url },
  { name: "Digital Advertisements", icon: MegaphoneIcon, gradient: "linear-gradient(135deg,#2563EB,#06B6D4)", cover: posterDio.url },
  { name: "AI Creatives", icon: Wand2, gradient: "linear-gradient(135deg,#F472B6,#7C3AED)", cover: posterMaaza.url },
];

function Portfolio_() {
  const [activeCat, setActiveCat] = useState<CategoryName | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const galleryImages = activeCat
    ? projects
        .filter(p => p.categories.includes(activeCat) && p.image)
        .map(p => p.image as string)
    : [];

  const openLightbox = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx(i => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
  const next = () => setLightboxIdx(i => (i === null ? null : (i + 1) % galleryImages.length));

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIdx, galleryImages.length]);

  const handleBack = () => { setLightboxIdx(null); setActiveCat(null); };

  return (
    <section id="work" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        {!activeCat && (
          <SectionHeader eyebrow="Selected Work"
            title={<>Browse by <span className="text-gradient">category</span>.</>}
            subtitle="Pick a category to explore the work — posters, socials, carousels, thumbnails, logos, packaging, ads and AI creatives." />
        )}

        <AnimatePresence mode="wait">
          {!activeCat ? (
            <motion.div key="cats"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.button key={c.name}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setActiveCat(c.name)}
                    className="group relative aspect-[4/5] overflow-hidden rounded-3xl text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
                    <img src={c.cover} alt={c.name} loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-all duration-500 group-hover:from-black/95 group-hover:via-black/60" />
                    <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-2xl backdrop-blur"
                      style={{ background: c.gradient }}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/20 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display text-2xl font-bold text-white md:text-3xl">{c.name}</h3>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div key="gallery"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}>
              <div className="mb-8 flex justify-start">
                <button onClick={handleBack}
                  className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-glow">
                  <ArrowLeft className="h-4 w-4" /> Back to Categories
                </button>
              </div>

              {galleryImages.length > 0 ? (
                <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
                  {galleryImages.map((src, i) => (
                    <motion.button key={src + i}
                      initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => openLightbox(i)}
                      className="group relative mb-5 block w-full overflow-hidden rounded-2xl break-inside-avoid">
                      <img src={src} alt="" loading="lazy"
                        className="block w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-muted-foreground">
                  More work coming soon in this category.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && galleryImages[lightboxIdx] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
            <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-110">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-110">
              <ArrowRight className="h-5 w-5" />
            </button>
            <motion.img key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              src={galleryImages[lightboxIdx]} alt=""
              className="max-h-[90vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white backdrop-blur">
              {lightboxIdx + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


/* ---------------- Experience ---------------- */

const experience = [
  { co: "InAmigos Foundation", role: "Article & Content Writer", year: "2026",
    items: ["Article Writing", "Visual Creatives", "Social Media Content", "Campaign Support"] },
  { co: "Apex Advanced Geospatial", role: "Data Engineer Intern", year: "2024",
    items: ["Data Analysis", "SQL", "Team Collaboration", "Data Management"] },
];

function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Experience" title={<>A <span className="text-gradient">journey</span> across design & data.</>} />
        <div className="relative">
          <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2" />
          {experience.map((e, i) => (
            <motion.div key={e.co}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative mb-10 md:flex md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className="absolute left-4 -translate-x-1/2 md:left-1/2">
                <div className="grid h-8 w-8 place-items-center rounded-full gradient-primary shadow-glow">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="glass rounded-2xl p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{e.year}</div>
                  <h3 className="mt-2 font-display text-xl font-bold">{e.role}</h3>
                  <div className="mt-1 text-sm text-muted-foreground">{e.co}</div>
                  <ul className={`mt-4 flex flex-wrap gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    {e.items.map(it => (
                      <li key={it} className="rounded-full bg-black/5 px-3 py-1 text-xs text-muted-foreground">{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Achievements ---------------- */

const stats = [
  { v: 50, suf: "+", l: "Design Projects", icon: Layers },
  { v: 20, suf: "+", l: "Brand Creatives", icon: Palette },
  { v: 100, suf: "+", l: "Social Posts", icon: Instagram },
  { v: 2, suf: "+", l: "Years Experience", icon: Award },
];

function Achievements() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="glass relative overflow-hidden rounded-[2rem] p-10 md:p-14">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={s.l}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl gradient-primary shadow-glow">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <div className="mt-4 font-display text-5xl font-bold md:text-6xl">
                  <span className="text-gradient"><AnimatedCounter value={s.v} suffix={s.suf} /></span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

const testimonials = [
  { n: "Priya Sharma", co: "Marketing Lead, InAmigos Foundation", r: "designedby.ld's visual storytelling brought our campaigns to life. The engagement jumped overnight.", a: "PS", g: "linear-gradient(135deg,#7C3AED,#06B6D4)" },
  { n: "Rohit Verma", co: "Founder, Brewline Coffee", r: "He understood the brand instantly. The identity system he built feels like it's been there forever.", a: "RV", g: "linear-gradient(135deg,#06B6D4,#2563EB)" },
  { n: "Ananya Reddy", co: "Product Manager, EduTech", r: "Pixel-perfect UI work with sharp UX thinking. Easily one of the best designers I've collaborated with.", a: "AR", g: "linear-gradient(135deg,#F59E0B,#E11D48)" },
  { n: "Karthik Iyer", co: "Creative Director, Studio Nine", r: "Rare combo — design taste, technical depth, and content sense. designedby.ld ships at agency quality.", a: "KI", g: "linear-gradient(135deg,#10B981,#06B6D4)" },
];

function Testimonials() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Testimonials" title={<>Kind words from <span className="text-gradient">collaborators</span>.</>} />
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div key={t.n}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass relative overflow-hidden rounded-3xl p-8">
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/30" />
              <div className="flex gap-1 text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">"{t.r}"</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full font-bold text-white" style={{ background: t.g }}>{t.a}</div>
                <div>
                  <div className="font-semibold">{t.n}</div>
                  <div className="text-sm text-muted-foreground">{t.co}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Resume + Socials ---------------- */

function Resume() {
  return (
    <section id="resume" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="glass relative overflow-hidden rounded-[2rem] p-10 md:p-14">
          <div className="absolute inset-0 -z-10 gradient-hero opacity-60" />
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="glass inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-accent">Resume</span>
              <h2 className="mt-5 font-display text-4xl font-bold md:text-5xl">Grab the full <span className="text-gradient">CV</span>.</h2>
              <p className="mt-4 text-muted-foreground">A concise one-page resume with experience, education, tools and project highlights — ready to share with your team.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={resumePdf.url} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-medium text-white shadow-glow">
                  <Download className="h-4 w-4" /> View Resume
                </a>
                <MagneticButton href="mailto:designedbyld25@gmail.com" className="glass rounded-full px-6 py-3 text-sm font-medium">
                  <Mail className="h-4 w-4" /> Email Me
                </MagneticButton>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative mx-auto w-full max-w-sm">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }}
                className="glass relative aspect-[1/1.3] rounded-2xl p-6 shadow-glow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Resume</div>
                    <div className="mt-1 font-display text-xl font-bold">DesignedByLD</div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary"><span className="text-sm font-bold text-white">PDF</span></div>
                </div>
                <div className="mt-6 space-y-2">
                  {[80, 60, 90, 50, 75, 65, 85, 55, 70].map((w, i) => (
                    <motion.div key={i} initial={{ width: 0 }} whileInView={{ width: `${w}%` }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }}
                      className="h-2 rounded-full bg-black/5" />
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {["Figma", "PS", "React"].map(t => (
                    <div key={t} className="rounded-lg bg-black/5 p-3 text-center text-xs font-medium">{t}</div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const socials = [
  { n: "LinkedIn", h: "https://linkedin.com/in/marri-leeladhar", icon: Linkedin, g: "linear-gradient(135deg,#0A66C2,#2563EB)" },
  { n: "Instagram", h: "https://www.instagram.com/designedby.ld", icon: Instagram, g: "linear-gradient(135deg,#E11D48,#7C3AED)" },
  { n: "Behance", h: "https://behance.net", icon: Layers, g: "linear-gradient(135deg,#2563EB,#06B6D4)" },
  { n: "Dribbble", h: "https://dribbble.com", icon: Sparkles, g: "linear-gradient(135deg,#EC4899,#F59E0B)" },
];

function Socials() {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Follow Along" title={<>Find me <span className="text-gradient">online</span>.</>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s, i) => (
            <motion.a key={s.n} href={s.h} target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }} whileHover={{ y: -6, scale: 1.02 }}
              className="group glass relative flex items-center justify-between overflow-hidden rounded-2xl p-6">
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: s.g }} />
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-black/5 transition-colors group-hover:bg-black/10">
                  <s.icon className="h-5 w-5 transition-colors group-hover:text-white" />
                </div>
                <div>
                  <div className="font-semibold transition-colors group-hover:text-white">{s.n}</div>
                  <div className="text-xs text-muted-foreground transition-colors group-hover:text-white/80">@designedby.ld</div>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact() {
  const cards = [
    {
      name: "Instagram",
      label: "Message me on Instagram",
      handle: "@designedby.ld",
      href: "https://instagram.com/designedby.ld",
      icon: Instagram,
      gradient: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
      glow: "rgba(221,42,123,0.45)",
    },
    {
      name: "Gmail",
      label: "Email me on Gmail",
      handle: "designedbyld25@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=designedbyld25@gmail.com",
      icon: Mail,
      gradient: "linear-gradient(135deg,#EA4335,#FBBC05,#34A853,#4285F4)",
      glow: "rgba(66,133,244,0.45)",
    },
    {
      name: "LinkedIn",
      label: "Connect on LinkedIn",
      handle: "marri-leeladhar",
      href: "https://linkedin.com/in/marri-leeladhar",
      icon: Linkedin,
      gradient: "linear-gradient(135deg,#0A66C2,#06B6D4,#7C3AED)",
      glow: "rgba(10,102,194,0.45)",
    },
  ];

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Contact" title={<>Let's build something <span className="text-gradient">memorable</span>.</>}
          subtitle="Reach out directly on the platform you prefer — I usually reply within 24 hours." />

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.a key={c.name}
              href={c.href} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative block overflow-hidden rounded-3xl p-[1.5px]"
              style={{ background: c.gradient }}>
              <div className="glass relative flex h-full flex-col items-start gap-6 rounded-[calc(1.5rem-1.5px)] p-8 transition-all duration-500"
                style={{ ["--glow" as any]: c.glow }}>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: c.gradient, mixBlendMode: "overlay" }} />
                <div className="pointer-events-none absolute -inset-10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: c.gradient }} />

                <div className="relative grid h-16 w-16 place-items-center rounded-2xl shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: c.gradient }}>
                  <c.icon className="h-7 w-7 text-white" />
                </div>

                <div className="relative">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{c.name}</div>
                  <div className="mt-2 font-display text-2xl font-bold leading-tight text-foreground">{c.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{c.handle}</div>
                </div>

                <div className="relative mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground transition-all group-hover:gap-3">
                  Open
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="glass inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Currently accepting projects · Avg. reply within 24 hours
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="relative border-t border-black/10 px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-black ring-1 ring-accent/40 shadow-glow">
                <img src={ldLogo.url} alt="DesignedByLD" className="h-full w-full object-cover" />
              </div>
              <span className="font-display text-lg font-semibold">DesignedByLD</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Graphic Designer & Visual Storyteller crafting brands, campaigns and interfaces from India.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(s => (
                <a key={s.n} href={s.h} target="_blank" rel="noreferrer"
                  className="glass grid h-10 w-10 place-items-center rounded-full transition-transform hover:scale-110">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick Links</div>
            <ul className="space-y-2 text-sm">
              {[["About","#about"],["Work","#work"],["Services","#services"],["Contact","#contact"]].map(([l,h]) => (
                <li key={h}><a href={h} className="text-foreground/80 transition-colors hover:text-accent">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact</div>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-accent" /> designedbyld25@gmail.com</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-accent" /> +91 7815982351</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> India</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-black/10 pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} DesignedByLD. All rights reserved.</div>
          <div className="flex items-center gap-1.5">Designed & coded with <Zap className="h-3.5 w-3.5 text-accent" /> in India</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Scroll progress + page ---------------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <motion.div style={{ width: w }} className="fixed left-0 top-0 z-[60] h-0.5 gradient-accent" />;
}

function GlobalShapes() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 top-[10%] h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-3xl animate-float-slow" />
      <div className="absolute right-[-10%] top-[35%] h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute left-[20%] top-[65%] h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-3xl animate-float-slow" style={{ animationDelay: "4s" }} />
      <div className="absolute right-[15%] bottom-[5%] h-[24rem] w-[24rem] rounded-full bg-accent/25 blur-3xl animate-float-slow" style={{ animationDelay: "1s" }} />
      <div className="absolute left-[50%] top-[90%] h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
    </div>
  );
}

function Portfolio() {
  return (
    <main className="relative">
      <GlobalShapes />
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Portfolio_ />
      <Experience />
      <Achievements />
      <Testimonials />
      <Resume />
      <Socials />
      <Contact />
      <Footer />
    </main>
  );
}

