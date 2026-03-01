import { useState, useEffect } from 'react';
import { Building2, BarChart3, Package, Globe, Wallet, Wrench, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
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

// Card slide + scale
const cardVariants = {
  enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:  (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0, scale: 0.96 }),
};

// Stagger container
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

// Each staggered child
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

// Icon spring
const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  show:   { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } },
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    fetch('/api/portfolio/projects')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) { setProjects(data); setCurrent(0); } })
      .catch(() => {});
  }, []);

  const go = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };
  const prev = () => go((current - 1 + projects.length) % projects.length);
  const next = () => go((current + 1) % projects.length);

  const p = projects[current];
  const gradient = CAT_GRADIENT[p.category] ?? CAT_GRADIENT['Saúde'];
  const accent   = CAT_ACCENT[p.category]   ?? CAT_ACCENT['Saúde'];
  const dotColor = CAT_DOT[p.category]      ?? CAT_DOT['Saúde'];

  return (
    <section id="projetos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Portfólio
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sistemas em Uso Real</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Projetos desenvolvidos para resolver problemas reais em empresas reais — do levantamento de requisitos ao deploy em produção.
          </p>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal delay={0.1}>
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden shadow-2xl min-h-[400px]">

                  {/* Left panel */}
                  <div className={`lg:col-span-2 bg-gradient-to-br ${gradient} p-8 flex flex-col justify-between relative overflow-hidden`}>
                    {/* Decorative circles */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
                    <div className="absolute -bottom-16 -left-8 w-56 h-56 rounded-full bg-black/10 pointer-events-none" />

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="relative z-10"
                    >
                      {/* Icon + status */}
                      <div className="flex items-center justify-between mb-6">
                        <motion.div variants={iconVariants} className="p-3 bg-white/20 rounded-xl backdrop-blur-sm text-white shadow-lg">
                          {ICON_MAP[p.icon] ?? <Briefcase className="w-6 h-6" />}
                        </motion.div>
                        <motion.span variants={itemVariants} className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-sm text-white">
                          {p.status}
                        </motion.span>
                      </div>

                      <motion.p variants={itemVariants} className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                        {p.category}
                      </motion.p>
                      <motion.h3 variants={itemVariants} className="text-white text-2xl font-bold leading-snug mb-3">
                        {p.title}
                      </motion.h3>
                      <motion.p variants={itemVariants} className="text-white/65 text-sm">
                        {p.client}
                      </motion.p>
                    </motion.div>

                    {/* Counter */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 }}
                      className="text-white/40 text-sm font-medium relative z-10 mt-6"
                    >
                      {current + 1} <span className="text-white/25">/</span> {projects.length}
                    </motion.p>
                  </div>

                  {/* Right panel */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="lg:col-span-3 bg-white p-8 flex flex-col justify-between"
                  >
                    <div>
                      <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed mb-6">
                        {p.description}
                      </motion.p>

                      <motion.p variants={itemVariants} className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Principais entregas
                      </motion.p>

                      <ul className="space-y-2 mb-6">
                        {p.outcomes.map((o, i) => (
                          <motion.li
                            key={i}
                            variants={itemVariants}
                            className="flex items-start gap-2.5 text-sm text-gray-700"
                          >
                            <span className="mt-0.5 shrink-0 text-blue-500 font-bold">✓</span>
                            <span>{o}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <motion.p variants={itemVariants} className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Tecnologias
                      </motion.p>
                      <motion.div variants={containerVariants} className="flex flex-wrap gap-2">
                        {p.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            variants={itemVariants}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className={`px-3 py-1 rounded-md text-xs font-semibold cursor-default ${accent}`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="p-3 rounded-full border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-colors shadow-sm"
                aria-label="Projeto anterior"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2 items-center">
                {projects.map((proj, i) => {
                  const dc = CAT_DOT[proj.category] ?? 'bg-gray-400';
                  return (
                    <motion.button
                      key={i}
                      onClick={() => go(i)}
                      animate={{ width: i === current ? 24 : 10, opacity: i === current ? 1 : 0.4 }}
                      transition={{ duration: 0.3 }}
                      aria-label={`Projeto ${i + 1}`}
                      className={`h-2.5 rounded-full ${i === current ? dc : 'bg-gray-300'}`}
                    />
                  );
                })}
              </div>

              <motion.button
                onClick={next}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="p-3 rounded-full border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-colors shadow-sm"
                aria-label="Próximo projeto"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
