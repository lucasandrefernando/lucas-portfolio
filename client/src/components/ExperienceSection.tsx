import { Briefcase, Calendar } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    company: 'Eagle Telecom',
    position: 'Desenvolvedor Full Stack',
    period: 'Set 2025 - Presente',
    description:
      'Responsável pelo desenvolvimento end-to-end de sistemas internos e soluções para clientes externos. Atuo desde a concepção da arquitetura até a interface final, garantindo qualidade e performance.',
    highlights: [
      'Desenvolvimento de landing pages complexas e responsivas',
      'Criação de automações inteligentes que otimizam fluxos críticos',
      'Implementação de ferramentas de IA no fluxo de desenvolvimento',
      'Liderança técnica em projetos PHP',
    ],
    technologies: ['PHP', 'JavaScript', 'React', 'MySQL', 'IA'],
  },
  {
    company: 'Eagle Telecom',
    position: 'Técnico de Suporte II',
    period: 'Jan 2023 - Set 2025',
    description:
      'Responsável pelo suporte técnico avançado, resolução de problemas complexos e manutenção de sistemas críticos da empresa.',
    highlights: [
      'Resolução de problemas técnicos complexos',
      'Manutenção e otimização de sistemas',
      'Documentação de processos e soluções',
      'Suporte ao desenvolvimento de novas features',
    ],
    technologies: ['Linux', 'Windows Server', 'Networking', 'Troubleshooting'],
  },
  {
    company: 'Telemont',
    position: 'Gestor de Informação',
    period: 'Jun 2021 - Dez 2022',
    description:
      'Gestão de dados, informações e processos operacionais. Responsável pela otimização de fluxos e análise de dados para tomada de decisão.',
    highlights: [
      'Análise e otimização de processos operacionais',
      'Gestão de dados e informações críticas',
      'Criação de dashboards e relatórios',
      'Implementação de melhorias nos fluxos',
    ],
    technologies: ['Power BI', 'Excel', 'SQL', 'Data Analysis'],
  },
  {
    company: 'Decminas Distribuição e Logística',
    position: 'Analista de Infraestrutura de TI',
    period: 'Mar 2020 - Mai 2021',
    description:
      'Gestão de infraestrutura de TI, redes, servidores e segurança da informação. Planejamento e monitoramento de KPIs operacionais.',
    highlights: [
      'Gerenciamento de redes e servidores',
      'Implementação de políticas de segurança',
      'Monitoramento de performance de sistemas',
      'Planejamento de infraestrutura',
    ],
    technologies: ['Linux', 'Windows Server', 'Networking', 'Security'],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experiencia" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Experiência Profissional
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trajetória de Crescimento e Aprendizado
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mais de 10 anos de experiência em diferentes áreas da tecnologia, evoluindo de infraestrutura para desenvolvimento full stack.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 border-l-4 border-blue-600 hover:shadow-lg transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left - Company & Position */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-lg text-gray-600 font-semibold">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Calendar size={18} />
                    <span className="font-medium">{exp.period}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{exp.description}</p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600 uppercase">Destaques:</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right - Technologies */}
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase mb-4">Tecnologias</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Formação Acadêmica</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Sistemas de Informação</h4>
              <p className="text-gray-600 font-semibold mb-2">Anhanguera Educacional</p>
              <p className="text-gray-600">Fev 2012 - Ago 2016</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Certificações</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Masterizando o ChatGPT (Adapta)</li>
                <li>• Sistemas Computacionais e Segurança (Una)</li>
                <li>• Modelagem de Software (Una)</li>
                <li>• Programação de Soluções Computacionais (Una)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
