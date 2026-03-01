import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  highlights: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: 'Sistema de Gerenciamento de Estoque',
    description: 'Controle total do estoque com alertas, relatórios e múltiplos usuários',
    longDescription:
      'Plataforma PHP/MySQL para gestão completa de estoque. Controle de entradas e saídas, alertas automáticos de estoque crítico, relatórios gerenciais e suporte a múltiplos operadores com permissões distintas.',
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Alertas automáticos de estoque mínimo',
      'Relatórios exportáveis em tempo real',
    ],
  },
  {
    title: 'Landing Page de E-commerce',
    description: 'Página de alta conversão com design moderno e animações fluidas',
    longDescription:
      'Desenvolvida em React com Tailwind CSS e Framer Motion. Design responsivo, animações estratégicas para guiar o usuário e estrutura otimizada para conversão — do primeiro scroll ao CTA.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Framer Motion'],
    highlights: [
      'Estrutura de UX focada em conversão',
      'Animações que aumentam engajamento',
    ],
  },
  {
    title: 'Automação de Processos com IA',
    description: 'Elimina 70% do trabalho manual com inteligência artificial aplicada',
    longDescription:
      'Integração de ChatGPT e ferramentas de IA para automatizar processos operacionais repetitivos. Resultado documentado: 70% de redução no tempo operacional e eliminação de erros manuais recorrentes.',
    technologies: ['Python', 'ChatGPT API', 'Node.js', 'MySQL'],
    highlights: [
      '70% de redução no tempo operacional',
      'Zero retrabalho por erros manuais',
    ],
  },
  {
    title: 'Dashboard de Análise de Dados',
    description: 'Visualizações interativas que transformam dados em decisões',
    longDescription:
      'Dashboard em React com Recharts conectado a API backend em tempo real. Filtros avançados, gráficos interativos e exportação de dados — para gestores que precisam de clareza, não de planilhas.',
    technologies: ['React', 'Recharts', 'Node.js', 'MySQL'],
    highlights: [
      'Dados em tempo real sem refresh',
      'Filtros e exportação avançados',
    ],
  },
  {
    title: 'API RESTful Escalável',
    description: 'Backend robusto com autenticação segura e documentação completa',
    longDescription:
      'API Node.js/Express com autenticação JWT, validação de dados em múltiplas camadas, tratamento de erros padronizado e documentação Swagger. Construída para crescer sem refatoração.',
    technologies: ['Node.js', 'Express', 'MySQL', 'JWT', 'Swagger'],
    highlights: [
      'Autenticação JWT com refresh token',
      'Documentação completa no Swagger',
    ],
  },
  {
    title: 'Aplicação Web Progressiva (PWA)',
    description: 'Funciona offline, instala no celular e sincroniza quando conectar',
    longDescription:
      'PWA desenvolvida em React com Service Workers e IndexedDB. O usuário usa normalmente sem internet — os dados sincronizam automaticamente quando a conexão é restaurada. Experiência nativa sem app store.',
    technologies: ['React', 'Service Workers', 'IndexedDB', 'Tailwind CSS'],
    highlights: [
      'Operação completa sem internet',
      'Instalável como app nativo',
    ],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projetos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Portfólio
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Projetos que Resolvem Problemas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada projeto aqui existe porque havia um problema real para resolver. Tecnologia é o meio
            — resultado é o que importa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {project.longDescription}
                </p>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Resultados:
                  </p>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Tecnologias:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-200">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      <ExternalLink size={16} />
                      Ver
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium text-sm"
                    >
                      <Github size={16} />
                      Código
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
