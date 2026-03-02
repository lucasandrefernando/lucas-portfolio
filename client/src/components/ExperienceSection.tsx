import { useState, useEffect } from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    company: 'Decminas',
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

// Checkmark SVG
const Check = () => (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
    <path d="M1 4l2.5 2.5L9 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>(FALLBACK_EXPERIENCES);
  const [education, setEducation] = useState<EducationItem[]>(FALLBACK_EDUCATION);
  const [active, setActive] = useState(0);

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

  const exp = experiences[active] ?? experiences[0];
  const degrees        = education.filter((e) => e.type === 'degree');
  const certifications = education.filter((e) => e.type === 'certification');

  return (
    <section id="experiencia" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <ScrollReveal className="text-center mb-14">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Experiência Profissional
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Uma Década Construindo{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expertise Real
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Da infraestrutura ao desenvolvimento full stack — cada etapa adicionou uma camada de profundidade técnica que poucos desenvolvedores têm.
          </p>
        </ScrollReveal>

        {/* ── Interactive tab panel ── */}
        <ScrollReveal>
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="flex flex-col lg:flex-row">

              {/* ── Left: company tab list ── */}
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible lg:w-60 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50">
                {experiences.map((e, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`relative flex flex-col items-start px-5 py-4 text-left transition-colors shrink-0 lg:w-full ${
                      active === i ? 'bg-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Animated active indicator (desktop: left bar) */}
                    {active === i && (
                      <motion.div
                        layoutId="expIndicatorV"
                        className="absolute left-0 top-0 bottom-0 w-[3px] hidden lg:block rounded-r-full"
                        style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                      />
                    )}
                    {/* Animated active indicator (mobile: bottom bar) */}
                    {active === i && (
                      <motion.div
                        layoutId="expIndicatorH"
                        className="absolute bottom-0 left-0 right-0 h-[2px] lg:hidden"
                        style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                      />
                    )}

                    <span className={`font-bold text-sm leading-tight ${active === i ? 'text-blue-700' : 'text-gray-700'}`}>
                      {e.company}
                    </span>
                    <span className={`text-xs mt-0.5 line-clamp-1 max-w-[190px] ${active === i ? 'text-blue-500/80' : 'text-gray-400'}`}>
                      {e.position}
                    </span>
                    {i === 0 && (
                      <span className="mt-1.5 px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded leading-none">
                        Atual
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* ── Right: detail panel ── */}
              <div className="flex-1 p-4 sm:p-7 lg:p-8 min-h-[240px] lg:min-h-[340px] bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    {/* Role + meta */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm font-semibold text-blue-600">{exp.company}</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-sm text-gray-400">{exp.period}</span>
                        </div>
                      </div>
                      {active === 0 && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Em andamento
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{exp.description}</p>

                    {/* Highlights grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="w-[18px] h-[18px] rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check />
                          </span>
                          <span className="text-sm text-gray-700 leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* ── Education ── */}
        <ScrollReveal delay={0.15} className="mt-12">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Formação & Certificações</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <span>
                        {c.title}
                        {c.institution && <span className="text-gray-400"> — {c.institution}</span>}
                      </span>
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
