import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Download, Mail, Phone, MapPin, Link2 as Linkedin, Camera as Instagram,
  Palette, Sparkles, Layers, PenTool, Megaphone, Presentation, LayoutGrid, Globe,
  PenSquare as Figma, Code2, Cpu, Camera, Check, Send, Star, Briefcase, Award, Zap,
  ArrowRight, X, Quote,
} from "lucide-react";
import ldLogo from "@/assets/ld-logo.png.asset.json";
import ldHero from "@/assets/ld-hero.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DESIGNEDBYLD — Graphic Designer & Visual Storyteller" },
      { name: "description", content: "Premium portfolio of DESIGNEDBYLD — Graphic Designer in Vijayawada, India. Brand identity, social media design, and creative technology." },
      { property: "og:title", content: "DESIGNEDBYLD — Graphic Designer" },
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
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow">
            <span className="font-display text-sm font-bold text-white">LM</span>
          </div>
          <span className="hidden font-display text-sm font-semibold sm:block">DESIGNEDBYLD.</span>
        </a>
        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-2 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">{l}</a>
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
                <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm hover:bg-white/5">{l}</a>
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
      <div className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
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

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for freelance & full-time
        </motion.div>

        <h1 className="mt-8 max-w-5xl text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]">
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
          className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Graphic Designer · Visual Storyteller · Content Creator — crafting visual experiences that connect, inspire, and convert.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="#work" className="rounded-full gradient-primary px-7 py-3.5 text-sm font-medium text-white shadow-glow">
            View Projects <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#resume" className="glass rounded-full px-7 py-3.5 text-sm font-medium text-foreground">
            <Download className="h-4 w-4" /> Download Resume
          </MagneticButton>
          <MagneticButton href="#contact" className="rounded-full border border-accent/40 bg-accent/10 px-7 py-3.5 text-sm font-medium text-accent">
            Hire Me <Sparkles className="h-4 w-4" />
          </MagneticButton>
        </motion.div>

        {/* marquee tools */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-20 w-full">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">Tools of the craft</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground">
            {["Figma", "Photoshop", "Illustrator", "Canva", "CapCut", "React", "Framer", "AI Tools"].map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.05 }}
                className="font-display text-lg font-medium tracking-tight transition-colors hover:text-foreground">{t}</motion.span>
            ))}
          </div>
        </motion.div>
      </div>
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
              <div className="aspect-[4/5] w-full rounded-[1.4rem] gradient-primary p-10">
                <div className="flex h-full flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] opacity-80">Designer</span>
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-6xl font-bold leading-none">LM</div>
                    <div className="mt-4 text-2xl font-semibold">DESIGNEDBYLD</div>
                    <div className="mt-1 text-sm opacity-80">Vijayawada · India</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { l: "Based in", v: "Vijayawada, IN" },
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
              I'm <span className="font-semibold text-gradient">DESIGNEDBYLD</span> — a graphic designer and visual storyteller blending <span className="text-foreground">creative design</span>, <span className="text-foreground">technology</span>, and <span className="text-foreground">content creation</span> to build brands people actually remember.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              I craft brand identities, social media systems, marketing creatives, presentations and UI — turning ideas into visuals that move metrics and emotions. With a foundation in React, Python, and modern AI tools, I move fast from concept to a polished, production-ready outcome.
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
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
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
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 transition-all duration-500 group-hover:bg-white/15">
                <s.icon className="h-7 w-7 text-accent transition-colors group-hover:text-white" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold transition-colors group-hover:text-white">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground transition-colors group-hover:text-white/80">{s.d}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map(tg => (
                  <span key={tg} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground transition-colors group-hover:border-white/30 group-hover:text-white/90">{tg}</span>
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

type Project = {
  id: string; title: string; role: string; category: string; description: string;
  tools: string[]; gradient: string; emoji: string; size: "sm" | "md" | "lg";
};

const projects: Project[] = [
  { id: "p1", title: "Women Empowerment Campaign", role: "Lead Designer", category: "Campaigns",
    description: "Impactful visual creatives, infographics, and social media content supporting women empowerment initiatives across digital platforms.",
    tools: ["Canva", "Photoshop", "Figma"],
    gradient: "linear-gradient(135deg, #7C3AED, #06B6D4)", emoji: "✊", size: "lg" },
  { id: "p2", title: "InAmigos Foundation Campaign", role: "Content Designer", category: "Content Design",
    description: "Article visuals and campaign creatives focused on social causes and youth development for the InAmigos Foundation.",
    tools: ["Figma", "Photoshop"], gradient: "linear-gradient(135deg, #06B6D4, #2563EB)", emoji: "📰", size: "md" },
  { id: "p3", title: "Bunk Monitoring System UI", role: "UI Designer", category: "UI Design",
    description: "Intuitive dashboard interfaces and UX flows for a computer-vision attendance platform built for institutions.",
    tools: ["Figma"], gradient: "linear-gradient(135deg, #2563EB, #7C3AED)", emoji: "📊", size: "md" },
  { id: "p4", title: "Editorial Poster Series", role: "Graphic Designer", category: "Posters",
    description: "Bold typographic poster series exploring contemporary visual culture and editorial storytelling.",
    tools: ["Photoshop", "Illustrator"], gradient: "linear-gradient(135deg, #E11D48, #7C3AED)", emoji: "🎨", size: "sm" },
  { id: "p5", title: "Brand Identity — Café Studio", role: "Brand Designer", category: "Branding",
    description: "Complete identity system: logo, color, type, packaging concepts and a social rollout playbook.",
    tools: ["Figma", "Illustrator"], gradient: "linear-gradient(135deg, #F59E0B, #E11D48)", emoji: "☕", size: "md" },
  { id: "p6", title: "Instagram Campaign Series", role: "Social Media Designer", category: "Social Media",
    description: "Cohesive grid system + reel covers driving 3x engagement for a creator-led brand.",
    tools: ["Canva", "CapCut", "Figma"], gradient: "linear-gradient(135deg, #10B981, #06B6D4)", emoji: "📱", size: "sm" },
];

const categories = ["All", "Branding", "Social Media", "Posters", "UI Design", "Content Design", "Campaigns"];

function Portfolio_() {
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState<Project | null>(null);
  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

  return (
    <section id="work" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Selected Work" title={<>Recent <span className="text-gradient">projects</span>.</>}
          subtitle="A glimpse of brands, campaigns, and interfaces I've shaped." />

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm transition-all ${active === c ? "gradient-primary text-white shadow-glow" : "glass text-muted-foreground hover:text-foreground"}`}>
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid auto-rows-[200px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const span = p.size === "lg" ? "md:col-span-2 row-span-2" : p.size === "md" ? "row-span-2" : "row-span-1";
              return (
                <motion.button layout key={p.id}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(p)}
                  className={`group relative overflow-hidden rounded-3xl text-left ${span}`}>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ background: p.gradient }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute right-6 top-6 text-6xl opacity-50 transition-all duration-500 group-hover:scale-125 group-hover:opacity-80">{p.emoji}</div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">{p.category}</div>
                    <h3 className="font-display text-xl font-bold text-white md:text-2xl">{p.title}</h3>
                    <div className="mt-1 text-sm text-white/70">{p.role}</div>
                  </div>
                  <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl">
              <button onClick={() => setOpen(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/40 backdrop-blur transition-colors hover:bg-black/60">
                <X className="h-5 w-5" />
              </button>
              <div className="relative h-72 overflow-hidden" style={{ background: open.gradient }}>
                <div className="absolute right-8 top-8 text-8xl">{open.emoji}</div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <div className="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs">{open.category}</div>
                  <h3 className="font-display text-3xl font-bold text-white">{open.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Role</div>
                    <div className="mt-1 font-semibold">{open.role}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Tools</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {open.tools.map(tt => <span key={tt} className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{tt}</span>)}
                    </div>
                  </div>
                </div>
                <p className="mt-6 leading-relaxed text-muted-foreground">{open.description}</p>
              </div>
            </motion.div>
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
                      <li key={it} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">{it}</li>
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
  { n: "Priya Sharma", co: "Marketing Lead, InAmigos Foundation", r: "DESIGNEDBYLD's visual storytelling brought our campaigns to life. The engagement jumped overnight.", a: "PS", g: "linear-gradient(135deg,#7C3AED,#06B6D4)" },
  { n: "Rohit Verma", co: "Founder, Brewline Coffee", r: "He understood the brand instantly. The identity system he built feels like it's been there forever.", a: "RV", g: "linear-gradient(135deg,#06B6D4,#2563EB)" },
  { n: "Ananya Reddy", co: "Product Manager, EduTech", r: "Pixel-perfect UI work with sharp UX thinking. Easily one of the best designers I've collaborated with.", a: "AR", g: "linear-gradient(135deg,#F59E0B,#E11D48)" },
  { n: "Karthik Iyer", co: "Creative Director, Studio Nine", r: "Rare combo — design taste, technical depth, and content sense. DESIGNEDBYLD ships at agency quality.", a: "KI", g: "linear-gradient(135deg,#10B981,#06B6D4)" },
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
                <MagneticButton href="#contact" className="rounded-full gradient-primary px-6 py-3 text-sm font-medium text-white shadow-glow">
                  <Download className="h-4 w-4" /> Download Resume
                </MagneticButton>
                <MagneticButton href="mailto:marrileela17@gmail.com" className="glass rounded-full px-6 py-3 text-sm font-medium">
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
                    <div className="mt-1 font-display text-xl font-bold">DESIGNEDBYLD</div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary"><span className="text-sm font-bold text-white">PDF</span></div>
                </div>
                <div className="mt-6 space-y-2">
                  {[80, 60, 90, 50, 75, 65, 85, 55, 70].map((w, i) => (
                    <motion.div key={i} initial={{ width: 0 }} whileInView={{ width: `${w}%` }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }}
                      className="h-2 rounded-full bg-white/10" />
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {["Figma", "PS", "React"].map(t => (
                    <div key={t} className="rounded-lg bg-white/5 p-3 text-center text-xs font-medium">{t}</div>
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
  { n: "Instagram", h: "https://instagram.com", icon: Instagram, g: "linear-gradient(135deg,#E11D48,#7C3AED)" },
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
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 transition-colors group-hover:bg-white/20">
                  <s.icon className="h-5 w-5 transition-colors group-hover:text-white" />
                </div>
                <div>
                  <div className="font-semibold transition-colors group-hover:text-white">{s.n}</div>
                  <div className="text-xs text-muted-foreground transition-colors group-hover:text-white/80">@marrileeladhar</div>
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
  const [sent, setSent] = useState(false);
  const [errs, setErrs] = useState<Record<string,string>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "Brand Identity", budget: "$500 - $1k", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string,string> = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Valid email required";
    if (form.message.trim().length < 10) er.message = "Tell me a bit more (10+ chars)";
    setErrs(er);
    if (Object.keys(er).length) return;
    const subject = `New project inquiry from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nType: ${form.type}\nBudget: ${form.budget}\n\n${form.message}`;
    window.location.href = `mailto:marrileela17@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Contact" title={<>Let's build something <span className="text-gradient">memorable</span>.</>}
          subtitle="Have a brand, campaign or product? Tell me about it." />

        <div className="grid gap-8 lg:grid-cols-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-4 lg:col-span-4">
            {[
              { icon: Mail, l: "Email", v: "marrileela17@gmail.com", h: "mailto:marrileela17@gmail.com" },
              { icon: Phone, l: "Phone", v: "+91 7815982351", h: "tel:+917815982351" },
              { icon: MapPin, l: "Location", v: "Vijayawada, AP, India" },
              { icon: Linkedin, l: "LinkedIn", v: "marri-leeladhar", h: "https://linkedin.com/in/marri-leeladhar" },
            ].map((c) => {
              const Comp: any = c.h ? "a" : "div";
              return (
                <Comp key={c.l} href={c.h} target={c.h?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1">
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary shadow-glow">
                    <c.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.l}</div>
                    <div className="truncate font-medium">{c.v}</div>
                  </div>
                  {c.h && <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-foreground" />}
                </Comp>
              );
            })}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Currently accepting projects
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Avg. reply within 24 hours</div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            onSubmit={submit} className="glass space-y-5 rounded-3xl p-8 lg:col-span-8">
            <AnimatePresence>
              {sent && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm">
                  <div className="grid h-8 w-8 place-items-center rounded-full gradient-accent"><Check className="h-4 w-4 text-white" /></div>
                  Thanks! Your email client should open with your message.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" err={errs.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80}
                  className="input" placeholder="Your full name" />
              </Field>
              <Field label="Email" err={errs.email}>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={120}
                  className="input" placeholder="you@email.com" />
              </Field>
              <Field label="Phone (optional)">
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20}
                  className="input" placeholder="+91 0000000000" />
              </Field>
              <Field label="Project Type">
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input">
                  {["Brand Identity", "Social Media", "UI Design", "Marketing Creatives", "Presentation", "Other"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Budget">
                <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="input">
                  {["< $500", "$500 - $1k", "$1k - $3k", "$3k - $10k", "$10k+"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Timeline">
                <select className="input" defaultValue="Flexible">
                  {["ASAP", "2-4 weeks", "1-2 months", "Flexible"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Message" err={errs.message}>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={5}
                className="input resize-none" placeholder="Tell me about your project, goals, and vibe…" />
            </Field>

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">By submitting you agree to be contacted about your inquiry.</p>
              <MagneticButton onClick={() => submit({ preventDefault: () => {} } as any)} className="rounded-full gradient-primary px-7 py-3.5 text-sm font-medium text-white shadow-glow">
                Send Message <Send className="h-4 w-4" />
              </MagneticButton>
            </div>
          </motion.form>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.875rem; padding: 0.875rem 1rem; color: white; font-size: 0.9rem;
          outline: none; transition: all .2s;
        }
        .input:focus { border-color: oklch(0.74 0.13 210); box-shadow: 0 0 0 4px oklch(0.74 0.13 210 / 0.15); }
        .input::placeholder { color: oklch(0.6 0.03 255); }
        select.input option { background: #1E293B; }
      `}</style>
    </section>
  );
}

function Field({ label, children, err }: { label: string; children: ReactNode; err?: string }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        {err && <span className="text-destructive">{err}</span>}
      </div>
      {children}
    </label>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary shadow-glow">
                <span className="font-display text-sm font-bold text-white">LM</span>
              </div>
              <span className="font-display text-lg font-semibold">DESIGNEDBYLD</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Graphic Designer & Visual Storyteller crafting brands, campaigns and interfaces from Vijayawada, India.
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
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-accent" /> marrileela17@gmail.com</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-accent" /> +91 7815982351</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> Vijayawada, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} DESIGNEDBYLD. All rights reserved.</div>
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

function Portfolio() {
  return (
    <main className="relative">
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
