import { useState, useEffect } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

interface EducationItem {
  type: 'degree' | 'certification';
  title: string;
  institution: string | null;
  period: string | null;
}

const FALLBACK_EXPERIENCES: Experience[] = [
  {
    company: 'Eagle Telecom',
    position: 'Desenvolvedor Full Stack',
    period: 'Set 2025 — Presente',
    description: 'Desenvolvimento end-to-end de sistemas internos e soluções para clientes externos. Da arquitetura à interface — com responsabilidade técnica total sobre qualidade, performance e prazo.',
    highlights: [
      'Sistemas web complexos e responsivos construídos do zero',
      'Automações inteligentes que eliminaram gargalos operacionais críticos',
      'IA integrada ao fluxo de desenvolvimento para acelerar entregas',
      'Liderança técnica em projetos PHP de alta complexidade',
    ],
    technologies: ['PHP', 'JavaScript', 'React', 'MySQL', 'Node.js', 'IA'],
  },
  {
    company: 'Eagle Telecom',
    position: 'Técnico de Suporte II',
    period: 'Jan 2023 — Set 2025',
    description: 'Suporte técnico avançado com foco em resolução de problemas complexos e estabilidade de sistemas críticos. Período de transição ativa para desenvolvimento, com contribuições técnicas crescentes.',
    highlights: [
      'Diagnóstico e resolução de falhas críticas em ambiente de produção',
      'Otimização de sistemas legados com impacto direto na performance',
      'Documentação técnica que reduziu tempo de onboarding da equipe',
      'Suporte ao desenvolvimento de novas features e integrações',
    ],
    technologies: ['Linux', 'Windows Server', 'Networking', 'SQL', 'Troubleshooting'],
  },
  {
    company: 'Telemont',
    position: 'Gestor de Informação',
    period: 'Jun 2021 — Dez 2022',
    description: 'Gestão estratégica de dados e processos operacionais. Transformei dados brutos em dashboards acionáveis, apoiando decisões de negócio com análise estruturada.',
    highlights: [
      'Dashboards analíticos que passaram a guiar decisões executivas',
      'Otimização de processos com redução mensurável de retrabalho',
      'Gestão de dados críticos com foco em integridade e disponibilidade',
      'Implementação de melhorias que aumentaram eficiência operacional',
    ],
    technologies: ['Power BI', 'Excel Avançado', 'SQL', 'Data Analysis'],
  },
  {
    company: 'Decminas Distribuição e Logística',
    position: 'Analista de Infraestrutura de TI',
    period: 'Mar 2020 — Mai 2021',
    description: 'Gestão completa da infraestrutura de TI: redes, servidores, segurança e monitoramento. Base técnica que até hoje informa minha abordagem como desenvolvedor.',
    highlights: [
      'Gerenciamento de redes e servidores em ambiente distribuído',
      'Implementação de políticas de segurança e controle de acesso',
      'Monitoramento proativo de performance com KPIs definidos',
      'Planejamento e execução de melhorias de infraestrutura',
    ],
    technologies: ['Linux', 'Windows Server', 'Networking', 'Segurança da Informação'],
  },
];

const FALLBACK_EDUCATION: EducationItem[] = [
  { type: 'degree',        title: 'Sistemas de Informação',                   institution: 'Anhanguera Educacional', period: 'Fev 2012 — Ago 2016' },
  { type: 'certification', title: 'Masterizando o ChatGPT',                   institution: 'Adapta',                period: null },
  { type: 'certification', title: 'Sistemas Computacionais e Segurança',       institution: 'Una',                   period: null },
  { type: 'certification', title: 'Modelagem de Software',                     institution: 'Una',                   period: null },
  { type: 'certification', title: 'Programação de Soluções Computacionais',    institution: 'Una',                   period: null },
];

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>(FALLBACK_EXPERIENCES);
  const [education, setEducation] = useState<EducationItem[]>(FALLBACK_EDUCATION);

  useEffect(() => {
    fetch('/api/portfolio/experiences')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setExperiences(data); })
      .catch(() => {});

    fetch('/api/portfolio/education')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setEducation(data); })
      .catch(() => {});
  }, []);

  const degrees = education.filter((e) => e.type === 'degree');
  const certifications = education.filter((e) => e.type === 'certification');

  return (
    <section id="experiencia" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Experiência Profissional
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Uma Década Construindo Expertise Real</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Da infraestrutura ao desenvolvimento full stack — cada etapa adicionou uma camada de profundidade técnica que poucos desenvolvedores têm.
          </p>
        </ScrollReveal>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-blue-600 hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Principais Entregas</p>
                      <ul className="space-y-2">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Tecnologias</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Education */}
        <ScrollReveal className="mt-16 pt-16 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Formação Acadêmica</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {degrees.map((d, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{d.title}</h4>
                {d.institution && <p className="text-gray-600 font-semibold mb-2">{d.institution}</p>}
                {d.period && <p className="text-gray-600">{d.period}</p>}
              </div>
            ))}

            {certifications.length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Certificações</h4>
                <ul className="space-y-2 text-gray-600">
                  {certifications.map((c, i) => (
                    <li key={i}>• {c.title}{c.institution ? ` — ${c.institution}` : ''}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
