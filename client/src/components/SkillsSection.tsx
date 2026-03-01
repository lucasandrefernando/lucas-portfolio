import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Globe, Layers, GitBranch, Brain, Server, Cpu, Terminal, Wind, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Skill {
  name: string;
  level: 'Sênior' | 'Pleno' | 'Júnior';
  proficiency: number;
  category: 'Backend' | 'Frontend' | 'Database' | 'Tools' | 'AI/Automation';
}

const FALLBACK: Skill[] = [
  { name: 'PHP',                    level: 'Sênior', proficiency: 95, category: 'Backend' },
  { name: 'JavaScript',             level: 'Pleno',  proficiency: 85, category: 'Backend' },
  { name: 'Node.js',                level: 'Pleno',  proficiency: 80, category: 'Backend' },
  { name: 'React',                  level: 'Pleno',  proficiency: 85, category: 'Frontend' },
  { name: 'HTML/CSS',               level: 'Sênior', proficiency: 90, category: 'Frontend' },
  { name: 'Tailwind CSS',           level: 'Pleno',  proficiency: 85, category: 'Frontend' },
  { name: 'MySQL',                  level: 'Sênior', proficiency: 90, category: 'Database' },
  { name: 'SQL',                    level: 'Sênior', proficiency: 92, category: 'Database' },
  { name: 'Git',                    level: 'Pleno',  proficiency: 85, category: 'Tools' },
  { name: 'Docker',                 level: 'Pleno',  proficiency: 75, category: 'Tools' },
  { name: 'Linux/Ubuntu',           level: 'Pleno',  proficiency: 85, category: 'Tools' },
  { name: 'ChatGPT/IA',             level: 'Pleno',  proficiency: 80, category: 'AI/Automation' },
  { name: 'Automação de Processos', level: 'Sênior', proficiency: 88, category: 'AI/Automation' },
];

const CATEGORIES = ['Backend', 'Frontend', 'Database', 'Tools', 'AI/Automation'] as const;

// [start, end] gradient colors for each category
const CAT_GRADIENT: Record<string, [string, string]> = {
  Backend:         ['#3b82f6', '#1d4ed8'],
  Frontend:        ['#a855f7', '#7c3aed'],
  Database:        ['#22c55e', '#15803d'],
  Tools:           ['#f97316', '#c2410c'],
  'AI/Automation': ['#ec4899', '#be185d'],
};

// Color of the SVG progress stroke
const CAT_STROKE: Record<string, string> = {
  Backend:         '#60a5fa',
  Frontend:        '#c084fc',
  Database:        '#4ade80',
  Tools:           '#fb923c',
  'AI/Automation': '#f472b6',
};

// Glow color rgba for hover effects
const CAT_GLOW: Record<string, string> = {
  Backend:         'rgba(96,165,250,0.30)',
  Frontend:        'rgba(192,132,252,0.30)',
  Database:        'rgba(74,222,128,0.30)',
  Tools:           'rgba(251,146,60,0.30)',
  'AI/Automation': 'rgba(244,114,182,0.30)',
};

const CAT_ICON: Record<string, React.ReactNode> = {
  Backend:         <Code2 className="w-5 h-5" />,
  Frontend:        <Layers className="w-5 h-5" />,
  Database:        <Database className="w-5 h-5" />,
  Tools:           <GitBranch className="w-5 h-5" />,
  'AI/Automation': <Brain className="w-5 h-5" />,
};

const SKILL_ICON: Record<string, React.ReactNode> = {
  'PHP':                    <Code2 className="w-5 h-5" />,
  'JavaScript':             <Zap className="w-5 h-5" />,
  'Node.js':                <Server className="w-5 h-5" />,
  'React':                  <Layers className="w-5 h-5" />,
  'HTML/CSS':               <Globe className="w-5 h-5" />,
  'Tailwind CSS':           <Wind className="w-5 h-5" />,
  'MySQL':                  <Database className="w-5 h-5" />,
  'SQL':                    <Database className="w-5 h-5" />,
  'Git':                    <GitBranch className="w-5 h-5" />,
  'Docker':                 <Cpu className="w-5 h-5" />,
  'Linux/Ubuntu':           <Terminal className="w-5 h-5" />,
  'ChatGPT/IA':             <Brain className="w-5 h-5" />,
  'Automação de Processos': <Zap className="w-5 h-5" />,
};

const LEVEL_GRADIENT: Record<string, string> = {
  'Sênior': 'from-yellow-500 to-orange-500',
  'Pleno':  'from-blue-500 to-cyan-500',
  'Júnior': 'from-green-500 to-emerald-500',
};

// ── Animated SVG circular progress ring ──────────────────────────────────────
function AnimatedRing({
  value, color, size = 92, delay = 0,
}: { value: number; color: string; size?: number; delay?: number }) {
  const r    = 36;
  const circ = 2 * Math.PI * r; // ≈ 226.2
  const targetOffset = circ * (1 - value / 100);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ transform: 'rotate(-90deg)' }}
    >
      {/* Track ring */}
      <circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="8"
      />
      {/* Soft glow duplicate (blurred) */}
      <circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeDasharray={`${circ * (value / 100)} ${circ}`}
        style={{ filter: 'blur(5px)', opacity: 0.25 }}
      />
      {/* Crisp animated progress */}
      <motion.circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: targetOffset }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96], delay }}
      />
    </svg>
  );
}

// ── Count-up animated number ──────────────────────────────────────────────────
function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    setDisplay(0);
    let raf: number;
    let start: number | null = null;
    const duration = 1300;
    const delayMs  = delay * 1000;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed  = ts - start - delayMs;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, delay]);

  return <>{display}%</>;
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const [skills, setSkills]             = useState<Skill[]>(FALLBACK);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/portfolio/skills')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setSkills(data); })
      .catch(() => {});
  }, []);

  const filtered = activeCategory
    ? skills.filter((s) => s.category === activeCategory)
    : skills;

  return (
    <section
      id="habilidades"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #070e1d 0%, #0b1628 60%, #070e1d 100%)' }}
    >
      {/* ── Dot grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600 blur-[120px] pointer-events-none -translate-y-1/2"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600 blur-[120px] pointer-events-none -translate-y-1/2"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white/10 text-blue-300 rounded-full text-sm font-semibold border border-white/10 mb-4">
            Stack Técnico
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            Expertise{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Técnica Consolidada
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Mais de 10 anos combinando desenvolvimento robusto com visão sistêmica de infraestrutura.
          </p>
        </ScrollReveal>

        {/* ── Stats row ── */}
        <ScrollReveal delay={0.08}>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { label: 'Skills',      value: skills.length },
              { label: 'Categorias',  value: CATEGORIES.length },
              { label: 'Sênior',      value: skills.filter(s => s.level === 'Sênior').length },
              { label: 'Em produção', value: '10+' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Category filter ── */}
        <ScrollReveal delay={0.12}>
          <div className="flex flex-wrap gap-3 justify-center mb-12">

            {/* "Todas" button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === null
                  ? 'bg-white text-gray-900 shadow-lg shadow-white/20'
                  : 'border border-white/20 text-white/55 hover:text-white hover:border-white/40'
              }`}
            >
              Todas
            </motion.button>

            {CATEGORIES.map((cat) => {
              const [c1, c2] = CAT_GRADIENT[cat];
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'border border-white/20 text-white/55 hover:text-white hover:border-white/40'
                  }`}
                  style={isActive ? {
                    background: `linear-gradient(135deg, ${c1}, ${c2})`,
                    boxShadow:  `0 0 22px ${CAT_GLOW[cat]}, 0 4px 14px rgba(0,0,0,0.4)`,
                  } : undefined}
                >
                  <span style={{ color: isActive ? 'rgba(255,255,255,0.85)' : CAT_STROKE[cat] }}>
                    {CAT_ICON[cat]}
                  </span>
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ── Skills grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory ?? 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {filtered.map((skill, i) => {
              const stroke = CAT_STROKE[skill.category]   ?? '#60a5fa';
              const glow   = CAT_GLOW[skill.category]     ?? 'rgba(96,165,250,0.30)';
              const [c1, c2] = CAT_GRADIENT[skill.category] ?? ['#3b82f6', '#1d4ed8'];
              const icon   = SKILL_ICON[skill.name]        ?? CAT_ICON[skill.category];
              const badge  = LEVEL_GRADIENT[skill.level]   ?? LEVEL_GRADIENT['Pleno'];
              const delay  = i * 0.06;

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 28, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative rounded-2xl p-5 border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] cursor-default flex flex-col items-center transition-colors duration-300"
                >
                  {/* Hover glow — inset + outer */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 28px ${glow}, 0 0 18px ${glow.replace('0.30', '0.12')}`,
                      border:    `1px solid ${stroke}40`,
                    }}
                  />

                  {/* Category icon chip */}
                  <div
                    className="relative z-10 p-2.5 rounded-xl mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${c1}25, ${c2}40)`,
                      border:     `1px solid ${c1}35`,
                      color:       stroke,
                    }}
                  >
                    {icon}
                  </div>

                  {/* Circular progress ring + percentage */}
                  <div className="relative z-10">
                    <AnimatedRing value={skill.proficiency} color={stroke} size={90} delay={delay + 0.2} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-white leading-none">
                        <AnimatedNumber value={skill.proficiency} delay={delay + 0.35} />
                      </span>
                    </div>
                  </div>

                  {/* Skill name */}
                  <h3 className="relative z-10 text-white/90 font-semibold text-sm text-center mt-3 leading-tight">
                    {skill.name}
                  </h3>

                  {/* Level badge */}
                  <span
                    className={`relative z-10 mt-2.5 px-3 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${badge}`}
                  >
                    {skill.level}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom tagline ── */}
        <ScrollReveal delay={0.15}>
          <p className="text-center text-white/25 text-xs mt-12 uppercase tracking-[0.2em]">
            Proficiência baseada em projetos reais em produção
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
