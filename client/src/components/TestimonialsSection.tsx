import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
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
  purple: 'from-purple-500 to-purple-700',
  pink:   'from-pink-500 to-pink-700',
  green:  'from-green-500 to-green-700',
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

const variants = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    fetch('/api/portfolio/testimonials')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
          setCurrent(0);
        }
      })
      .catch(() => {});
  }, []);

  const go = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };
  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);
  const next = () => go((current + 1) % testimonials.length);

  const t = testimonials[current];
  const gradient = COLOR_GRADIENT[t.color] ?? COLOR_GRADIENT.blue;
  const initials = t.name.split(' ').slice(0, 2).map((n) => n[0]).join('');

  return (
    <section id="depoimentos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-4 mb-14">
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

        {/* Carousel */}
        <ScrollReveal delay={0.15}>
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-8 sm:px-12 py-12 overflow-hidden relative min-h-[280px]">
              <Quote className="absolute top-8 right-8 w-14 h-14 text-gray-100 pointer-events-none" />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="flex flex-col gap-8"
                >
                  <p className="text-lg text-gray-700 leading-relaxed relative z-10">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {initials}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-500">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prev} className="p-2.5 rounded-full border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm" aria-label="Depoimento anterior">
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Depoimento ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${i === current ? 'w-6 h-2.5 bg-blue-600' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
              <button onClick={next} className="p-2.5 rounded-full border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm" aria-label="Próximo depoimento">
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
