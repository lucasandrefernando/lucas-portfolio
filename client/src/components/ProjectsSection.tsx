import { useState, useEffect, useRef, useMemo } from 'react';
import { Building2, BarChart3, Package, Globe, Wallet, Wrench, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface Project {
  icon: string;
  category: string;
  title: string;
  client: string;
  description: string;
  outcomes: string[];
  technologies: string[];
  status: 'Em produção' | 'Concluído' | 'Pessoal';
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6" />,
  BarChart3:  <BarChart3 className="w-6 h-6" />,
  Package:    <Package className="w-6 h-6" />,
  Globe:      <Globe className="w-6 h-6" />,
  Wallet:     <Wallet className="w-6 h-6" />,
  Wrench:     <Wrench className="w-6 h-6" />,
};

const FALLBACK: Project[] = [
  {
    icon: 'Building2', category: 'Saúde',
    title: 'Plataforma de Gestão Operacional Hospitalar',
    client: 'Hospital Madre Teresa · via Eagle Telecom',
    description: 'Sistema centralizado para gestão de chamados internos de manutenção, hotelaria e nutrição hospitalar. Substituiu processos manuais por fluxos digitais rastreáveis com controle de SLA.',
    outcomes: [
      'Controle granular de permissões por setor e função',
      'Dashboards em tempo real com indicadores operacionais',
      'Rastreabilidade completa de chamados com histórico e métricas',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    status: 'Em produção',
  },
  {
    icon: 'BarChart3', category: 'Business Intelligence',
    title: 'Dashboard de BI para Contact Center',
    client: 'Bernoulli',
    description: 'Plataforma de consolidação e visualização de dados de contact center. Transforma volumes brutos de chamadas em relatórios estratégicos que orientam decisões de gestão.',
    outcomes: [
      'Relatórios FCR (First Call Resolution) e CSAT automatizados',
      'Dashboards estratégicos para liderança e gestores',
      'Consolidação de dados de múltiplas origens em visão única',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Chart.js'],
    status: 'Em produção',
  },
  {
    icon: 'Package', category: 'Logística',
    title: 'Sistema de Controle de Estoque Corporativo',
    client: 'Eagle Telecom',
    description: 'Solução completa de gestão de estoque para operações de telecomunicações. Controle de entradas, saídas e rastreabilidade de equipamentos e materiais com auditoria.',
    outcomes: [
      'Controle de entradas e saídas com rastreabilidade por responsável',
      'Alertas automáticos de estoque mínimo',
      'Relatórios gerenciais para tomada de decisão',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    status: 'Em produção',
  },
  {
    icon: 'Globe', category: 'Web Institucional',
    title: 'Site Institucional Corporativo',
    client: 'Eagle Telecom',
    description: 'Desenvolvimento completo do site institucional da empresa, do wireframe ao deploy. Foco em identidade visual, performance e clareza na comunicação dos serviços.',
    outcomes: [
      'Design responsivo e moderno alinhado à identidade da marca',
      'Otimizado para SEO e performance',
      'Desenvolvido do zero com autonomia total',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    status: 'Concluído',
  },
  {
    icon: 'Wrench', category: 'Operações',
    title: 'Sistema de Gestão de Materiais',
    client: 'Telemont',
    description: 'Ferramenta de controle de materiais para operações de infraestrutura de telecomunicações. Garante rastreabilidade e controle de custos em campo.',
    outcomes: [
      'Controle de movimentação de materiais em campo',
      'Redução de perdas por falta de rastreabilidade',
      'Relatórios de consumo por equipe e projeto',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript'],
    status: 'Concluído',
  },
  {
    icon: 'Wallet', category: 'Projeto Pessoal',
    title: 'App de Controle Financeiro Pessoal',
    client: 'Projeto próprio',
    description: 'Aplicação web para gestão de finanças pessoais com categorização de despesas, projeções e dashboards visuais. Desenvolvido para uso real no dia a dia.',
    outcomes: [
      'Categorização e visualização de receitas e despesas',
      'Projeções financeiras mensais e anuais',
      'Interface intuitiva focada em usabilidade',
    ],
    technologies: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
    status: 'Pessoal',
  },
];

const STATUS_STYLE: Record<string, string> = {
  'Em produção': 'bg-green-100 text-green-700',
  'Concluído':   'bg-blue-100 text-blue-700',
  'Pessoal':     'bg-purple-100 text-purple-700',
};

const CAT_GRADIENT: Record<string, string> = {
  'Saúde':                'from-blue-700 via-blue-500 to-cyan-400',
  'Business Intelligence':'from-purple-700 via-purple-500 to-pink-400',
  'Logística':            'from-orange-600 via-orange-500 to-yellow-400',
  'Web Institucional':    'from-cyan-700 via-cyan-500 to-teal-400',
  'Operações':            'from-green-700 via-green-500 to-emerald-400',
  'Projeto Pessoal':      'from-pink-700 via-pink-500 to-rose-400',
};

const CAT_ACCENT: Record<string, string> = {
  'Saúde':                'text-blue-600 bg-blue-50 border border-blue-100',
  'Business Intelligence':'text-purple-600 bg-purple-50 border border-purple-100',
  'Logística':            'text-orange-600 bg-orange-50 border border-orange-100',
  'Web Institucional':    'text-cyan-600 bg-cyan-50 border border-cyan-100',
  'Operações':            'text-green-600 bg-green-50 border border-green-100',
  'Projeto Pessoal':      'text-pink-600 bg-pink-50 border border-pink-100',
};

const CAT_DOT: Record<string, string> = {
  'Saúde':                'bg-blue-500',
  'Business Intelligence':'bg-purple-500',
  'Logística':            'bg-orange-500',
  'Web Institucional':    'bg-cyan-500',
  'Operações':            'bg-green-500',
  'Projeto Pessoal':      'bg-pink-500',
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK);
  const [featured, setFeatured] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch('/api/portfolio/projects')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setProjects(data); })
      .catch(() => {});
  }, []);

  const stopTimer  = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setFeatured((f) => (f + 1) % projects.length);
    }, 4500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [projects.length]);

  const handleFeature = (projectTitle: string) => {
    const idx = projects.findIndex((p) => p.title === projectTitle);
    if (idx !== -1) { setFeatured(idx); startTimer(); }
  };

  // Reorder: featured project always at index 0 for grid position
  const ordered = useMemo(() => {
    const arr = [...projects];
    const idx = featured % arr.length;
    const [feat] = arr.splice(idx, 1);
    return [feat, ...arr];
  }, [projects, featured]);

  return (
    <section id="projetos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Portfólio
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Sistemas em{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Uso Real
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Projetos desenvolvidos para resolver problemas reais em empresas reais — do levantamento de requisitos ao deploy em produção.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          {/*
            Bento grid — Desktop layout (lg):
            ┌──────────────────────┬──────────────┐
            │  featured  (2 × 2)   │  card [1]    │
            │                      ├──────────────┤
            │                      │  card [2]    │
            ├─────────┬────────────┴──────────────┤
            │ card[3] │  card [4]  │   card [5]   │
            └─────────┴────────────┴──────────────┘
            Each non-featured card is clickable → becomes featured.
          */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[260px_260px_260px] gap-4"
            onMouseEnter={stopTimer}
            onMouseLeave={startTimer}
          >
            {ordered.slice(0, 6).map((p, i) => {
              const isLarge  = i === 0;
              const gradient = CAT_GRADIENT[p.category] ?? CAT_GRADIENT['Saúde'];
              const accent   = CAT_ACCENT[p.category]   ?? CAT_ACCENT['Saúde'];
              const icon     = ICON_MAP[p.icon]          ?? <Briefcase className="w-6 h-6" />;

              return (
                <motion.div
                  key={p.title}
                  layout
                  transition={{ layout: { duration: 0.65, ease: [0.32, 0.72, 0, 1] } }}
                  onClick={() => { if (!isLarge) handleFeature(p.title); }}
                  className={[
                    'rounded-2xl overflow-hidden flex flex-col',
                    isLarge
                      ? 'lg:col-span-2 lg:row-span-2 shadow-xl cursor-default'
                      : 'shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 min-h-[170px]',
                  ].join(' ')}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isLarge ? (
                      /* ── LARGE card content ── */
                      <motion.div
                        key={`large-${p.title}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className={`flex-1 bg-gradient-to-br ${gradient} p-5 sm:p-8 flex flex-col relative overflow-hidden`}
                      >
                        {/* Decorative orbs */}
                        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
                        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-black/10 pointer-events-none" />

                        <div className="relative z-10 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-5">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm text-white shadow-lg">
                              {icon}
                            </div>
                            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/25 text-white">
                              {p.status}
                            </span>
                          </div>

                          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">{p.category}</p>
                          <h3 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-1">{p.title}</h3>
                          <p className="text-white/60 text-sm mb-4">{p.client}</p>
                          <p className="text-white/80 text-sm leading-relaxed mb-5">{p.description}</p>

                          <ul className="space-y-1.5 mb-auto">
                            {p.outcomes.map((o, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-white/85">
                                <span className="text-white font-bold mt-0.5 shrink-0">✓</span>
                                <span>{o}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2 mt-5">
                            {p.technologies.map((tech) => (
                              <motion.span
                                key={tech}
                                whileHover={{ scale: 1.08, y: -2 }}
                                className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-md backdrop-blur-sm cursor-default"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* ── SMALL card content ── */
                      <motion.div
                        key={`small-${p.title}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex-1 flex flex-col"
                      >
                        {/* Gradient accent bar */}
                        <div className={`h-1 shrink-0 bg-gradient-to-r ${gradient}`} />

                        <div className="flex-1 bg-white p-5 flex flex-col min-h-0">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 rounded-lg ${accent}`}>{icon}</div>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[p.status]}`}>
                              {p.status}
                            </span>
                          </div>

                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{p.category}</p>
                          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-0.5">{p.title}</h3>
                          <p className="text-xs text-gray-500 mb-auto line-clamp-2">{p.client}</p>

                          <div className="flex flex-wrap gap-1 mt-3">
                            {p.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className={`px-2 py-0.5 rounded text-xs font-medium ${accent}`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Dots indicator — shows which project is featured */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((proj, i) => {
              const dc = CAT_DOT[proj.category] ?? 'bg-gray-400';
              return (
                <motion.button
                  key={i}
                  onClick={() => { setFeatured(i); startTimer(); }}
                  animate={{ width: i === featured ? 24 : 10, opacity: i === featured ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                  aria-label={`Destacar projeto ${i + 1}`}
                  className={`h-2.5 rounded-full ${i === featured ? dc : 'bg-gray-300'}`}
                />
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
