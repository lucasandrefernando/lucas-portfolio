import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Code2, Database, Globe, Layers, GitBranch,
  Brain, Server, Cpu, Terminal, Wind, Zap, X,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Skill {
  name: string;
  level: 'Sênior' | 'Pleno' | 'Júnior';
  proficiency: number;
  category: 'Backend' | 'Frontend' | 'Database' | 'Tools' | 'AI/Automation';
  description?: string;
}

// Per-skill descriptions shown in the modal (also used as fallback when DB description is absent)
const SKILL_DESCRIPTIONS: Record<string, string> = {
  'PHP':
    'Desenvolvimento de sistemas completos: arquitetura MVC, APIs REST e integração com banco de dados. 7+ anos de uso real em sistemas críticos para hospitais e empresas de telecomunicações. Linguagem principal no meu dia a dia de trabalho.',
  'JavaScript':
    'Desenvolvimento frontend e backend com Node.js, manipulação do DOM, async/await e ES6+. Integração com APIs externas e lógicas de negócio robustas. Complementa todo o trabalho em PHP e React.',
  'Node.js':
    'APIs REST com Express, integração com MySQL, autenticação e gerenciamento de processos com PM2. O backend deste portfólio roda inteiramente em Node.js com TypeScript.',
  'React':
    'SPAs com hooks, Context API, React Router e Framer Motion. Este portfólio é 100% desenvolvido em React — cada animação e interação que você vê aqui foi construída com esta tecnologia.',
  'HTML/CSS':
    'HTML semântico, CSS avançado com Flexbox e Grid, animações e responsividade total. Base sólida que sustenta todo o trabalho frontend com qualidade e consistência.',
  'Tailwind CSS':
    'Utility-first CSS para desenvolvimento ágil e consistente. Design systems, dark mode e variantes responsivas. Escolha padrão para estilização em todos os projetos recentes.',
  'MySQL':
    'Modelagem relacional, queries otimizadas, JOINs complexos e stored procedures. Banco de dados de produção em todos os sistemas críticos desenvolvidos — hospitalar, logística e BI.',
  'SQL':
    'Queries analíticas com CTEs e window functions, otimização de performance e análise de dados. Base para todos os dashboards de BI e relatórios gerenciais desenvolvidos.',
  'Git':
    'Controle de versão com branching strategies, merge, rebase e resolução de conflitos. O pipeline deste portfólio usa GitHub Actions para build e deploy automático.',
  'Docker':
    'Containerização de aplicações com Docker e docker-compose para ambientes multi-serviço. Garante que o ambiente de desenvolvimento espelha exatamente o ambiente de produção.',
  'Linux/Ubuntu':
    'Administração de servidores, shell scripting, gerenciamento de processos e troubleshooting. Background de infraestrutura que informa minha abordagem como desenvolvedor full stack.',
  'ChatGPT/IA':
    'Uso estratégico de IA no desenvolvimento: geração de código, revisão, documentação e prompt engineering aplicado a fluxos reais. IA como ferramenta produtiva, não como palavra da moda.',
  'Automação de Processos':
    'Scripts e sistemas que eliminam tarefas manuais repetitivas. Projetos reais incluem automação de relatórios, alertas automáticos e integração entre sistemas distintos em produção.',
};

const LEVEL_MEANING: Record<string, string[]> = {
  'Sênior': [
    'Resolução autônoma de qualquer problema nesta tecnologia',
    'Decisões de arquitetura com segurança e confiança',
    'Capaz de revisar código e orientar outros desenvolvedores',
    'Profundidade técnica para debugar cenários críticos em produção',
  ],
  'Pleno': [
    'Desenvolvimento independente de features de média a alta complexidade',
    'Boas práticas consolidadas e código limpo consistente',
    'Resolve a maioria dos problemas sem apoio externo',
    'Base técnica sólida com evolução contínua',
  ],
  'Júnior': [
    'Desenvolvimento de tarefas bem definidas com autonomia crescente',
    'Fundamentos sólidos nesta tecnologia',
    'Em evolução ativa, absorvendo boas práticas do mercado',
    'Com orientação adequada, entrega valor rapidamente',
  ],
};

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

const CAT_CONFIG: Record<string, { color: string }> = {
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

const LEVEL_DOTS: Record<string, number> = { 'Sênior': 3, 'Pleno': 2, 'Júnior': 1 };

// ── Animated skill bar ────────────────────────────────────────────────────────
function SkillBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
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

// ── Skill detail modal ────────────────────────────────────────────────────────
function SkillModal({
  skill, onClose,
}: { skill: Skill; onClose: () => void }) {
  const cfg      = CAT_CONFIG[skill.category];
  const dots     = LEVEL_DOTS[skill.level] ?? 2;
  const icon     = SKILL_ICON[skill.name] ?? CAT_ICON[skill.category];
  const meanings = LEVEL_MEANING[skill.level] ?? [];
  const description = skill.description || SKILL_DESCRIPTIONS[skill.name] || '';

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 14 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm rounded-2xl border border-white/[0.10] overflow-hidden"
          style={{ background: '#1a2332' }}
        >
          {/* Category color top accent */}
          <div className="h-[3px]" style={{ background: `linear-gradient(to right, ${cfg.color}, ${cfg.color}55)` }} />

          <div className="p-6">
            {/* Header: icon + name + level dots + close */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-xl shrink-0"
                  style={{ backgroundColor: `${cfg.color}20`, color: cfg.color }}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{skill.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: cfg.color, opacity: n <= dots ? 1 : 0.15 }}
                      />
                    ))}
                    <span className="text-xs font-semibold ml-0.5" style={{ color: cfg.color }}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.07] transition-colors shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Proficiency bar */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-white/35 uppercase tracking-widest">Proficiência</span>
                <span className="text-sm font-bold" style={{ color: cfg.color }}>{skill.proficiency}%</span>
              </div>
              <div className="h-[5px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 0.85, ease: [0.34, 1.05, 0.64, 1], delay: 0.15 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: cfg.color }}
                />
              </div>
            </div>

            <div className="h-px bg-white/[0.07] mb-4" />

            {/* Description */}
            {description && (
              <>
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-white/35 uppercase tracking-widest mb-2">
                    Sobre esta habilidade
                  </p>
                  <p className="text-sm text-white/60 leading-relaxed">{description}</p>
                </div>
                <div className="h-px bg-white/[0.07] mb-4" />
              </>
            )}

            {/* Level meaning */}
            <div>
              <p className="text-[10px] font-bold text-white/35 uppercase tracking-widest mb-3">
                O que significa {skill.level}?
              </p>
              <ul className="space-y-2.5">
                {meanings.map((m, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.2 }}
                    className="flex items-start gap-2.5"
                  >
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${cfg.color}25`, color: cfg.color }}
                    >
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none" aria-hidden>
                        <path d="M1 3.5l2 2L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/60 leading-snug">{m}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

// ── Category group card ───────────────────────────────────────────────────────
function CategoryGroup({
  category, skills, wide = false,
  onSelectSkill,
}: {
  category: string; skills: Skill[]; wide?: boolean;
  onSelectSkill: (s: Skill) => void;
}) {
  const cfg = CAT_CONFIG[category];
  const avg = Math.round(skills.reduce((a, s) => a + s.proficiency, 0) / skills.length);

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/[0.08] overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      {/* Category header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ backgroundColor: `${cfg.color}18`, borderLeft: `4px solid ${cfg.color}` }}
      >
        <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: `${cfg.color}25`, color: cfg.color }}>
          {CAT_ICON[category]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm" style={{ color: cfg.color }}>{category}</p>
          <p className="text-xs text-white/35">{skills.length} habilidades</p>
        </div>
        <div className="flex flex-col items-center shrink-0">
          <span className="text-lg font-bold leading-none" style={{ color: cfg.color }}>{avg}%</span>
          <span className="text-[10px] text-white/35 mt-0.5">média</span>
        </div>
      </div>

      {/* Skill rows */}
      <div className={wide ? 'grid grid-cols-2' : ''}>
        {skills.map((skill, i) => {
          const dots = LEVEL_DOTS[skill.level] ?? 2;
          const icon = SKILL_ICON[skill.name] ?? CAT_ICON[category];

          return (
            <div
              key={skill.name}
              onClick={() => onSelectSkill(skill)}
              className="group flex items-center gap-3 px-5 py-3 border-t border-white/[0.06] hover:bg-white/[0.06] cursor-pointer transition-colors duration-150"
            >
              <span className="text-white/25 group-hover:text-white/50 transition-colors shrink-0">
                {icon}
              </span>
              <span className="text-sm font-medium text-white/80 shrink-0">
                {skill.name}
              </span>
              <SkillBar value={skill.proficiency} color={cfg.color} delay={0.15 + i * 0.09} />
              <span className="text-xs font-bold text-white/40 w-8 text-right shrink-0">
                {skill.proficiency}%
              </span>
              <div className="flex items-center gap-[3px] shrink-0" title={skill.level}>
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="w-1.5 h-1.5 rounded-full transition-opacity"
                    style={{ backgroundColor: cfg.color, opacity: n <= dots ? 1 : 0.15 }}
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
  const [skills, setSkills]           = useState<Skill[]>(FALLBACK);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

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

  const seniorCount = skills.filter((s) => s.level === 'Sênior').length;

  return (
    <section id="habilidades" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0f172a' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollReveal className="text-center mb-4">
          <span className="inline-block px-4 py-2 bg-white/10 text-blue-300 rounded-full text-sm font-semibold border border-white/10 mb-4">
            Stack Técnico
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Expertise{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Consolidada
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Mais de 10 anos combinando desenvolvimento robusto com visão de infraestrutura.
          </p>
        </ScrollReveal>

        {/* Stats strip */}
        <ScrollReveal delay={0.05}>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 mt-6">
            {[
              { value: skills.length,     label: 'tecnologias'  },
              { value: CATEGORIES.length, label: 'áreas'        },
              { value: seniorCount,       label: 'nível sênior' },
              { value: '10+',             label: 'anos de exp.' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-white/35 uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-white/25 -mt-4 mb-6">
            Clique em uma habilidade para ver detalhes
          </p>
        </ScrollReveal>

        {/* Category groups grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATEGORIES.map((cat, idx) => {
            const catSkills = grouped[cat] ?? [];
            const isLast   = idx === CATEGORIES.length - 1;
            const spansTwo = isLast && CATEGORIES.length % 2 !== 0;

            return (
              <ScrollReveal
                key={cat}
                delay={idx * 0.07}
                className={spansTwo ? 'md:col-span-2' : ''}
              >
                <CategoryGroup
                  category={cat}
                  skills={catSkills}
                  wide={spansTwo}
                  onSelectSkill={setSelectedSkill}
                />
              </ScrollReveal>
            );
          })}
        </div>

        {/* Legend */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 text-xs text-white/40">
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

      {/* Skill detail modal */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
