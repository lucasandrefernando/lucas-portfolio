import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2, Database, Globe, Layers, GitBranch,
  Brain, Server, Cpu, Terminal, Wind, Zap,
} from 'lucide-react';
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

const CAT_CONFIG: Record<string, {
  color: string;
}> = {
  Backend:         { color: '#60a5fa' },
  Frontend:        { color: '#a78bfa' },
  Database:        { color: '#34d399' },
  Tools:           { color: '#fbbf24' },
  'AI/Automation': { color: '#f472b6' },
};

const CAT_ICON: Record<string, React.ReactNode> = {
  Backend:         <Code2    className="w-4 h-4" />,
  Frontend:        <Layers   className="w-4 h-4" />,
  Database:        <Database className="w-4 h-4" />,
  Tools:           <GitBranch className="w-4 h-4" />,
  'AI/Automation': <Brain    className="w-4 h-4" />,
};

const SKILL_ICON: Record<string, React.ReactNode> = {
  'PHP':                    <Code2    className="w-3.5 h-3.5" />,
  'JavaScript':             <Zap      className="w-3.5 h-3.5" />,
  'Node.js':                <Server   className="w-3.5 h-3.5" />,
  'React':                  <Layers   className="w-3.5 h-3.5" />,
  'HTML/CSS':               <Globe    className="w-3.5 h-3.5" />,
  'Tailwind CSS':           <Wind     className="w-3.5 h-3.5" />,
  'MySQL':                  <Database className="w-3.5 h-3.5" />,
  'SQL':                    <Database className="w-3.5 h-3.5" />,
  'Git':                    <GitBranch className="w-3.5 h-3.5" />,
  'Docker':                 <Cpu      className="w-3.5 h-3.5" />,
  'Linux/Ubuntu':           <Terminal className="w-3.5 h-3.5" />,
  'ChatGPT/IA':             <Brain    className="w-3.5 h-3.5" />,
  'Automação de Processos': <Zap      className="w-3.5 h-3.5" />,
};

// Level shown as filled dots ●●● = Sênior  ●●○ = Pleno  ●○○ = Júnior
const LEVEL_DOTS: Record<string, number> = { 'Sênior': 3, 'Pleno': 2, 'Júnior': 1 };

// ── Animated bar with pulsing endpoint dot ────────────────────────────────────
function SkillBar({
  value, color, delay = 0,
}: { value: number; color: string; delay?: number }) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="flex-1 h-[5px] bg-white/10 rounded-full overflow-visible relative">
      <motion.div
        className="h-full rounded-full relative"
        style={{ backgroundColor: color }}
        initial={{ width: '0%' }}
        animate={{ width: inView ? `${value}%` : '0%' }}
        transition={{ duration: 1.1, ease: [0.34, 1.05, 0.64, 1], delay }}
      >
        {/* Pulsing dot at end of bar */}
        <motion.span
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={inView ? { opacity: [1, 0.3, 1], scale: [1, 1.8, 1] } : {}}
          transition={{ duration: 2.2, repeat: Infinity, delay: delay + 1.1 }}
        />
      </motion.div>
    </div>
  );
}

// ── Category group card ───────────────────────────────────────────────────────
function CategoryGroup({
  category, skills, wide = false,
}: { category: string; skills: Skill[]; wide?: boolean }) {
  const cfg  = CAT_CONFIG[category];
  const avg  = Math.round(skills.reduce((a, s) => a + s.proficiency, 0) / skills.length);

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/[0.08] overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      {/* ─ Category header ─ */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ backgroundColor: `${cfg.color}18`, borderLeft: `4px solid ${cfg.color}` }}
      >
        {/* Icon chip */}
        <div
          className="p-2 rounded-lg shrink-0"
          style={{ backgroundColor: `${cfg.color}25`, color: cfg.color }}
        >
          {CAT_ICON[category]}
        </div>

        {/* Category name + skill count */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm" style={{ color: cfg.color }}>{category}</p>
          <p className="text-xs text-white/35">{skills.length} habilidades</p>
        </div>

        {/* Average proficiency */}
        <div className="flex flex-col items-center shrink-0">
          <span className="text-lg font-bold leading-none" style={{ color: cfg.color }}>
            {avg}%
          </span>
          <span className="text-[10px] text-white/35 mt-0.5">média</span>
        </div>
      </div>

      {/* ─ Skill rows ─ */}
      <div className={wide ? 'grid grid-cols-2' : ''}>
        {skills.map((skill, i) => {
          const dots = LEVEL_DOTS[skill.level] ?? 2;
          const icon = SKILL_ICON[skill.name] ?? CAT_ICON[category];

          return (
            <div
              key={skill.name}
              className="group flex items-center gap-3 px-5 py-3 border-t border-white/[0.06] hover:bg-white/[0.04] transition-colors duration-150"
            >
              {/* Skill icon */}
              <span className="text-white/25 group-hover:text-white/50 transition-colors shrink-0">
                {icon}
              </span>

              {/* Skill name */}
              <span className="text-sm font-medium text-white/80 shrink-0">
                {skill.name}
              </span>

              {/* Animated bar */}
              <SkillBar value={skill.proficiency} color={cfg.color} delay={0.15 + i * 0.09} />

              {/* Percentage */}
              <span className="text-xs font-bold text-white/40 w-8 text-right shrink-0">
                {skill.proficiency}%
              </span>

              {/* Level dots  ●●● / ●●○ / ●○○ */}
              <div className="flex items-center gap-[3px] shrink-0" title={skill.level}>
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="w-1.5 h-1.5 rounded-full transition-opacity"
                    style={{
                      backgroundColor: cfg.color,
                      opacity: n <= dots ? 1 : 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>(FALLBACK);

  useEffect(() => {
    fetch('/api/portfolio/skills')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setSkills(data); })
      .catch(() => {});
  }, []);

  const grouped = CATEGORIES.reduce<Record<string, Skill[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  // Senior count for the stats strip
  const seniorCount = skills.filter((s) => s.level === 'Sênior').length;

  return (
    <section id="habilidades" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0f172a' }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <ScrollReveal className="text-center mb-4">
          <span className="inline-block px-4 py-2 bg-white/10 text-blue-300 rounded-full text-sm font-semibold border border-white/10 mb-4">
            Stack Técnico
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            Expertise{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Consolidada
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Mais de 10 anos combinando desenvolvimento robusto com visão de infraestrutura.
          </p>
        </ScrollReveal>

        {/* ── Quick stats strip ── */}
        <ScrollReveal delay={0.05}>
          <div className="flex flex-wrap justify-center gap-8 mb-10 mt-6">
            {[
              { value: skills.length,    label: 'tecnologias' },
              { value: CATEGORIES.length, label: 'áreas'       },
              { value: seniorCount,       label: 'nível sênior' },
              { value: '10+',             label: 'anos de exp.' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-white/35 uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Category groups grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATEGORIES.map((cat, idx) => {
            const catSkills = grouped[cat] ?? [];
            // Last category (AI/Automation = 5th) spans 2 cols → wide layout
            const isLast = idx === CATEGORIES.length - 1;
            const spansTwo = isLast && CATEGORIES.length % 2 !== 0;

            return (
              <ScrollReveal
                key={cat}
                delay={idx * 0.07}
                className={spansTwo ? 'md:col-span-2' : ''}
              >
                <CategoryGroup category={cat} skills={catSkills} wide={spansTwo} />
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Legend ── */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-white/40">
            <span className="uppercase tracking-widest">Nível de proficiência:</span>
            {[
              { label: 'Sênior', dots: 3 },
              { label: 'Pleno',  dots: 2 },
              { label: 'Júnior', dots: 1 },
            ].map((l) => (
              <span key={l.label} className="flex items-center gap-1.5">
                <span className="flex gap-[3px]">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className="w-1.5 h-1.5 rounded-full bg-white/40"
                      style={{ opacity: n <= l.dots ? 1 : 0.2 }}
                    />
                  ))}
                </span>
                {l.label}
              </span>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
