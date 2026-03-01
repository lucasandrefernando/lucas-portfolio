import { useState, useEffect } from 'react';
import { GraduationCap, Award } from 'lucide-react';
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
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Experiência Profissional
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Uma Década Construindo Expertise Real</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Da infraestrutura ao desenvolvimento full stack — cada etapa adicionou uma camada de profundidade técnica que poucos desenvolvedores têm.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 via-blue-300 to-gray-200" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="flex gap-6">
                  {/* Dot */}
                  <div className="relative shrink-0 mt-1">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      index === 0
                        ? 'bg-blue-500 border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.15)]'
                        : 'bg-white border-gray-300'
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    {/* Role + Period */}
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-0.5">
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-400 font-medium shrink-0">{exp.period}</span>
                    </div>

                    {/* Company */}
                    <p className="text-sm font-semibold text-blue-600 mb-3">{exp.company}</p>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{exp.description}</p>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-4">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-blue-500 mt-0.5 shrink-0">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Education */}
        <ScrollReveal delay={0.15} className="mt-16 pt-12 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Formação Acadêmica</h3>

          <div className="space-y-4">
            {degrees.map((d, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-blue-100 bg-blue-50">
                <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{d.title}</p>
                  {d.institution && <p className="text-sm text-gray-600">{d.institution}</p>}
                  {d.period && <p className="text-xs text-gray-400 mt-1">{d.period}</p>}
                </div>
              </div>
            ))}

            {certifications.length > 0 && (
              <div className="p-5 rounded-xl border border-purple-100 bg-purple-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="font-semibold text-gray-900">Certificações</p>
                </div>
                <ul className="space-y-2 pl-1">
                  {certifications.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-purple-400 shrink-0">•</span>
                      <span>{c.title}{c.institution ? <span className="text-gray-400"> — {c.institution}</span> : ''}</span>
                    </li>
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
