import { useState, useEffect } from 'react';
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
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="w-80 shrink-0 rounded-2xl p-6 flex flex-col gap-5 cursor-default select-none relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}
    >
      {/* Subtle inner glow top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Quote icon */}
      <Quote className="w-9 h-9 text-blue-400/60" />

      {/* Text */}
      <p className="text-white/80 text-sm leading-relaxed flex-1">
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        {/* Avatar with pulse ring */}
        <div className="relative shrink-0">
          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-blue-400/40"
          />
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white/20 z-10">
            {initials}
          </div>
        </div>

        <div>
          <p className="font-semibold text-white text-sm">{t.name}</p>
          <p className="text-white/50 text-xs">{t.role} · {t.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);
  const controls = useAnimationControls();

  useEffect(() => {
    fetch('/api/portfolio/testimonials')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setTestimonials(data); })
      .catch(() => {});
  }, []);

  const startMarquee = () =>
    controls.start({
      x: ['0%', '-50%'],
      transition: { duration: 30, ease: 'linear', repeat: Infinity },
    });

  useEffect(() => { startMarquee(); }, [testimonials]);

  const pause  = () => controls.stop();
  const resume = () => startMarquee();

  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      id="depoimentos"
      className="py-20 overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)' }}
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <ScrollReveal>
        <div className="text-center space-y-4 mb-14 px-4 relative z-10">
          <span className="inline-block px-4 py-2 bg-white/10 text-blue-300 rounded-full text-sm font-semibold border border-white/10">
            Depoimentos
          </span>
          <h2 className="text-4xl font-bold text-white">
            O que dizem sobre{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              meu trabalho
            </span>
          </h2>
          <p className="text-white/30 text-sm">Passe o mouse para pausar</p>
        </div>
      </ScrollReveal>

      {/* Marquee */}
      <ScrollReveal delay={0.1}>
        <div
          className="relative"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {/* Left fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10"
            style={{ background: 'linear-gradient(to right, #0f172a, transparent)' }}
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10"
            style={{ background: 'linear-gradient(to left, #0f172a, transparent)' }}
          />

          <div className="overflow-hidden py-6 px-4">
            <motion.div
              animate={controls}
              className="flex gap-5"
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
