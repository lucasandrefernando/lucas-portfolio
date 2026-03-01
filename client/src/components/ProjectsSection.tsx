import { useState, useEffect } from 'react';
import { Building2, BarChart3, Package, Globe, Wallet, Wrench, Briefcase } from 'lucide-react';
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
  Building2: <Building2 className="w-5 h-5" />,
  BarChart3:  <BarChart3 className="w-5 h-5" />,
  Package:    <Package className="w-5 h-5" />,
  Globe:      <Globe className="w-5 h-5" />,
  Wallet:     <Wallet className="w-5 h-5" />,
  Wrench:     <Wrench className="w-5 h-5" />,
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

const CAT_BORDER: Record<string, string> = {
  'Saúde':                'border-l-blue-500',
  'Business Intelligence':'border-l-purple-500',
  'Logística':            'border-l-orange-500',
  'Web Institucional':    'border-l-cyan-500',
  'Operações':            'border-l-green-500',
  'Projeto Pessoal':      'border-l-pink-500',
};

const CAT_ICON_BG: Record<string, string> = {
  'Saúde':                'bg-blue-100 text-blue-600',
  'Business Intelligence':'bg-purple-100 text-purple-600',
  'Logística':            'bg-orange-100 text-orange-600',
  'Web Institucional':    'bg-cyan-100 text-cyan-600',
  'Operações':            'bg-green-100 text-green-600',
  'Projeto Pessoal':      'bg-pink-100 text-pink-600',
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK);

  useEffect(() => {
    fetch('/api/portfolio/projects')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setProjects(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="projetos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">

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

        {/* List */}
        <div className="space-y-4">
          {projects.map((project, index) => {
            const borderClass = CAT_BORDER[project.category] ?? 'border-l-gray-400';
            const iconClass   = CAT_ICON_BG[project.category] ?? 'bg-gray-100 text-gray-600';

            return (
              <ScrollReveal key={project.title} delay={Math.min(index * 0.07, 0.3)}>
                <div className={`bg-white rounded-xl border-l-4 ${borderClass} border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6`}>

                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-lg shrink-0 ${iconClass}`}>
                        {ICON_MAP[project.icon] ?? <Briefcase className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 leading-snug">{project.title}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[project.status]}`}>
                        {project.status}
                      </span>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{project.category}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{project.description}</p>

                  {/* Outcomes */}
                  <ul className="space-y-1 mb-4">
                    {project.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-500 mt-0.5 shrink-0">✓</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-50">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
