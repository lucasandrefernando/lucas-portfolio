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
    description: 'Plataforma completa para controle de estoque com relatórios em tempo real',
    longDescription:
      'Sistema desenvolvido em PHP e MySQL para gerenciamento de estoque de pequenos negócios. Inclui controle de entrada e saída de produtos, geração de relatórios, alertas de estoque baixo e integração com múltiplos usuários.',
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Interface intuitiva e responsiva',
      'Relatórios em tempo real',
    ],
  },
  {
    title: 'Landing Page de E-commerce',
    description: 'Landing page moderna e otimizada para conversão com design responsivo',
    longDescription:
      'Desenvolvida em React com Tailwind CSS, apresenta design moderno, animações suaves e otimização para SEO. Inclui integração com carrinho de compras e sistema de pagamento.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Framer Motion'],
    highlights: [
      'Design responsivo e moderno',
      'Otimizado para conversão',
    ],
  },
  {
    title: 'Automação de Processos com IA',
    description: 'Sistema inteligente que automatiza processos operacionais usando IA',
    longDescription:
      'Solução que integra ChatGPT e outras ferramentas de IA para automatizar processos repetitivos. Reduz tempo operacional em até 70% e melhora a precisão dos dados.',
    technologies: ['Python', 'ChatGPT API', 'Node.js', 'MySQL'],
    highlights: [
      'Redução de 70% no tempo operacional',
      'Integração com IA avançada',
    ],
  },
  {
    title: 'Dashboard de Análise de Dados',
    description: 'Dashboard interativo com visualizações de dados em tempo real',
    longDescription:
      'Desenvolvido em React com Recharts, apresenta gráficos interativos, filtros avançados e exportação de dados. Conectado a API backend para dados em tempo real.',
    technologies: ['React', 'Recharts', 'Node.js', 'MySQL'],
    highlights: [
      'Gráficos interativos',
      'Dados em tempo real',
    ],
  },
  {
    title: 'API RESTful Escalável',
    description: 'API robusta e escalável para aplicações mobile e web',
    longDescription:
      'Desenvolvida em Node.js com Express, oferece autenticação JWT, validação de dados, tratamento de erros e documentação completa com Swagger.',
    technologies: ['Node.js', 'Express', 'MySQL', 'JWT'],
    highlights: [
      'Autenticação segura com JWT',
      'Validação de dados robusta',
    ],
  },
  {
    title: 'Aplicação Web Progressiva (PWA)',
    description: 'PWA com funcionalidades offline e instalação em home screen',
    longDescription:
      'Aplicação web que funciona offline, pode ser instalada no home screen e sincroniza dados quando conectada. Desenvolvida em React com Service Workers.',
    technologies: ['React', 'Service Workers', 'IndexedDB', 'Tailwind CSS'],
    highlights: [
      'Funciona offline',
      'Instalável no home screen',
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Alguns dos projetos mais relevantes que desenvolvi, demonstrando expertise técnica e capacidade de entrega.
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
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{project.longDescription}</p>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Destaques:</p>
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
                  <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Tecnologias:</p>
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
