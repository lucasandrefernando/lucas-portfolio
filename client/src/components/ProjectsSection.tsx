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
  'Saúde':                'from-blue-600 to-blue-400',
  'Business Intelligence':'from-purple-600 to-purple-400',
  'Logística':            'from-orange-600 to-orange-400',
  'Web Institucional':    'from-cyan-600 to-cyan-400',
  'Operações':            'from-green-600 to-green-400',
  'Projeto Pessoal':      'from-pink-600 to-pink-400',
};

const CAT_ACCENT: Record<string, string> = {
  'Saúde':                'text-blue-600 bg-blue-50',
  'Business Intelligence':'text-purple-600 bg-purple-50',
  'Logística':            'text-orange-600 bg-orange-50',
  'Web Institucional':    'text-cyan-600 bg-cyan-50',
  'Operações':            'text-green-600 bg-green-50',
  'Projeto Pessoal':      'text-pink-600 bg-pink-50',
};

const variants = {
  enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
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
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden shadow-xl border border-gray-100 min-h-[380px]">

                  {/* Left panel — gradient */}
                  <div className={`lg:col-span-2 bg-gradient-to-br ${gradient} p-8 flex flex-col justify-between text-white`}>
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          {ICON_MAP[p.icon] ?? <Briefcase className="w-6 h-6" />}
                        </div>
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm`}>
                          {p.status}
                        </span>
                      </div>
                      <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">{p.category}</p>
                      <h3 className="text-2xl font-bold leading-snug mb-3">{p.title}</h3>
                      <p className="text-white/70 text-sm">{p.client}</p>
                    </div>

                    {/* Counter */}
                    <p className="text-white/50 text-sm font-medium mt-6">
                      {current + 1} / {projects.length}
                    </p>
                  </div>

                  {/* Right panel — details */}
                  <div className="lg:col-span-3 bg-white p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-gray-600 leading-relaxed mb-6">{p.description}</p>

                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Principais entregas</p>
                      <ul className="space-y-2 mb-6">
                        {p.outcomes.map((o, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <span className="mt-0.5 shrink-0 text-blue-500">✓</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tecnologias</p>
                      <div className="flex flex-wrap gap-2">
                        {p.technologies.map((tech) => (
                          <span key={tech} className={`px-3 py-1 rounded-md text-xs font-semibold ${accent}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prev}
                className="p-2.5 rounded-full border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm"
                aria-label="Projeto anterior"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>

              {/* Dots */}
              <div className="flex gap-2 items-center">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Projeto ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      i === current ? 'w-6 h-2.5 bg-blue-600' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2.5 rounded-full border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm"
                aria-label="Próximo projeto"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
