import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  color: string;
}

const COLOR_GRADIENT: Record<string, string> = {
  blue:   'from-blue-500 to-blue-700',
  purple: 'from-purple-500 to-violet-700',
  pink:   'from-pink-500 to-rose-700',
  green:  'from-emerald-500 to-green-700',
};

const COLOR_INITIALS_TEXT: Record<string, string> = {
  blue:   'text-blue-600',
  purple: 'text-purple-600',
  pink:   'text-pink-600',
  green:  'text-emerald-600',
};

const FALLBACK: Testimonial[] = [
  {
    name: 'Rafael Mendes', role: 'Gestor de TI', company: 'Eagle Telecom', color: 'blue',
    text: 'Lucas entregou nosso sistema de controle de estoque do zero em tempo recorde. Mais que código, ele trouxe visão de processo: identificou gargalos que nem sabíamos que existiam e automatizou etapas que economizam horas por semana. É raro encontrar um dev que entende tanto de negócio quanto de técnica.',
  },
  {
    name: 'Ana Carolina Ferreira', role: 'Coordenadora de TI', company: 'Hospital Madre Teresa', color: 'purple',
    text: 'O sistema de gestão hospitalar que o Lucas desenvolveu transformou nossa operação. Processos que levavam horas passaram a ser concluídos em minutos. Ele entendeu as particularidades do setor de saúde desde o início e entregou uma solução robusta e fácil de usar para toda a equipe.',
  },
  {
    name: 'Rodrigo Alves', role: 'Tech Lead', company: 'Bernoulli Educação', color: 'pink',
    text: 'O dashboard de BI que o Lucas criou para nosso Contact Center nos deu visibilidade em tempo real sobre métricas que antes demoravam dias para consolidar. Ele domina tanto o lado técnico quanto a comunicação com stakeholders — isso faz toda a diferença em projetos de dados.',
  },
  {
    name: 'Marcos Vieira', role: 'Engenheiro de Redes', company: 'Telemont', color: 'green',
    text: 'Trabalhar com o Lucas é diferente — ele veio de infraestrutura, então entende o ambiente onde o código vai rodar. O sistema de gestão de materiais que ele desenvolveu funciona de forma estável há anos, sem downtime. Ele pensa em escalabilidade desde o início.',
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);

  useEffect(() => {
    fetch('/api/portfolio/testimonials')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setTestimonials(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="depoimentos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Depoimentos
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              O que dizem sobre{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                meu trabalho
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-14">
          {testimonials.map((t, index) => {
            const gradient    = COLOR_GRADIENT[t.color]      ?? COLOR_GRADIENT.blue;
            const initialsClr = COLOR_INITIALS_TEXT[t.color] ?? COLOR_INITIALS_TEXT.blue;
            const initials    = t.name.split(' ').slice(0, 2).map((n) => n[0]).join('');

            return (
              <ScrollReveal key={t.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  className="relative pt-8"
                >
                  {/* Avatar overlapping top */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 z-10">
                    <div className="w-16 h-16 rounded-full bg-white shadow-xl p-1.5 ring-2 ring-white">
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg tracking-wide">{initials}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`bg-gradient-to-br ${gradient} rounded-2xl pt-12 pb-7 px-6 text-center shadow-lg relative overflow-hidden`}>
                    {/* Decorative quote */}
                    <Quote className="absolute top-4 right-5 w-10 h-10 text-white/15 pointer-events-none" />
                    {/* Decorative circle */}
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-black/10 pointer-events-none" />

                    <p className="font-bold text-white uppercase tracking-widest text-sm mb-0.5">
                      {t.name}
                    </p>
                    <p className="text-white/60 text-xs mb-5">
                      {t.role} · {t.company}
                    </p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      "{t.text}"
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
