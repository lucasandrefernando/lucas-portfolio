import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { motion, useAnimationControls } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  color: string;
}

const FALLBACK: Testimonial[] = [
  {
    name: 'Rafael Mendes', role: 'Gestor de TI', company: 'Eagle Telecom', color: 'blue',
    text: 'Lucas entregou nosso sistema de controle de estoque do zero em tempo recorde. Mais que código, ele trouxe visão de processo: identificou gargalos que nem sabíamos que existiam e automatizou etapas que economizam horas por semana.',
  },
  {
    name: 'Ana Carolina Ferreira', role: 'Coordenadora de TI', company: 'Hospital Madre Teresa', color: 'purple',
    text: 'O sistema de gestão hospitalar que o Lucas desenvolveu transformou nossa operação. Processos que levavam horas passaram a ser concluídos em minutos. Ele entendeu as particularidades do setor de saúde desde o início.',
  },
  {
    name: 'Rodrigo Alves', role: 'Tech Lead', company: 'Bernoulli Educação', color: 'pink',
    text: 'O dashboard de BI que o Lucas criou nos deu visibilidade em tempo real sobre métricas que antes demoravam dias para consolidar. Ele domina tanto o lado técnico quanto a comunicação com stakeholders.',
  },
  {
    name: 'Marcos Vieira', role: 'Engenheiro de Redes', company: 'Telemont', color: 'green',
    text: 'Trabalhar com o Lucas é diferente — ele veio de infraestrutura, então entende o ambiente onde o código vai rodar. O sistema de gestão de materiais que ele desenvolveu funciona de forma estável há anos, sem downtime.',
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  const initials = t.name.split(' ').slice(0, 2).map((n) => n[0]).join('');

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(37,99,235,0.15)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="w-80 shrink-0 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4 cursor-default select-none"
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-blue-100" />

      {/* Text */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1">
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
          <p className="text-gray-400 text-xs">{t.role} · {t.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/portfolio/testimonials')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setTestimonials(data); })
      .catch(() => {});
  }, []);

  // Start infinite marquee
  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'],
      transition: { duration: 28, ease: 'linear', repeat: Infinity },
    });
  }, [testimonials, controls]);

  const pause  = () => controls.stop();
  const resume = () => controls.start({
    x: ['0%', '-50%'],
    transition: { duration: 28, ease: 'linear', repeat: Infinity },
  });

  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="depoimentos" className="py-20 bg-gray-50 overflow-hidden">

      {/* Header */}
      <ScrollReveal>
        <div className="text-center space-y-4 mb-14 px-4">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            Depoimentos
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            O que dizem sobre{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              meu trabalho
            </span>
          </h2>
          <p className="text-gray-400 text-sm">Passe o mouse para pausar</p>
        </div>
      </ScrollReveal>

      {/* Marquee */}
      <ScrollReveal delay={0.1}>
        {/* Fade edges */}
        <div
          className="relative"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-gray-50 to-transparent" />

          <div ref={containerRef} className="overflow-hidden py-4">
            <motion.div
              animate={controls}
              className="flex gap-6"
              style={{ width: 'max-content' }}
            >
              {doubled.map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
