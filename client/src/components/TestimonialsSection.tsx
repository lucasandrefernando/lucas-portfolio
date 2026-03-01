import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const INITIALS_GRADIENT: Record<string, string> = {
  blue:   'from-blue-400 to-blue-600',
  purple: 'from-purple-400 to-violet-600',
  pink:   'from-pink-400 to-rose-600',
  green:  'from-emerald-400 to-green-600',
};

function getCardProps(offset: number) {
  if (offset === 0) return {
    x: '0%', scale: 1, opacity: 1, zIndex: 20,
    isCenter: true,
  };
  if (offset === 1 || offset === -1) return {
    x: offset > 0 ? '68%' : '-68%',
    scale: 0.82, opacity: 0.55, zIndex: 10,
    isCenter: false,
  };
  return {
    x: offset > 0 ? '120%' : '-120%',
    scale: 0.7, opacity: 0, zIndex: 1,
    isCenter: false,
  };
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch('/api/portfolio/testimonials')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setTestimonials(data); })
      .catch(() => {});
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [testimonials.length]);

  const go = (i: number) => { setCurrent(i); startTimer(); };
  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);
  const next = () => go((current + 1) % testimonials.length);

  return (
    <section
      id="depoimentos"
      className="py-20 overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <ScrollReveal>
        <div className="text-center space-y-3 mb-16 px-4 relative z-10">
          <span className="inline-block px-4 py-2 bg-white/10 text-blue-300 rounded-full text-sm font-semibold border border-white/10">
            Depoimentos
          </span>
          <h2 className="text-4xl font-bold text-white">
            O que dizem sobre{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              meu trabalho
            </span>
          </h2>
        </div>
      </ScrollReveal>

      {/* Carousel */}
      <div className="relative max-w-5xl mx-auto px-16 sm:px-24">
        {/* Cards */}
        <div className="relative h-[420px] flex items-center justify-center">
          {testimonials.map((t, i) => {
            const len = testimonials.length;
            let offset = i - current;
            if (offset > len / 2)  offset -= len;
            if (offset < -len / 2) offset += len;

            const { x, scale, opacity, zIndex, isCenter } = getCardProps(offset);
            const initials = t.name.split(' ').slice(0, 2).map((n) => n[0]).join('');
            const gradient = INITIALS_GRADIENT[t.color] ?? INITIALS_GRADIENT.blue;

            return (
              <motion.div
                key={t.name}
                animate={{ x, scale, opacity }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                style={{ zIndex, position: 'absolute', width: '340px' }}
                onClick={() => !isCenter && go(i)}
                className={!isCenter ? 'cursor-pointer' : ''}
              >
                <div
                  className={`rounded-2xl overflow-hidden transition-shadow duration-500 ${
                    isCenter
                      ? 'bg-white shadow-2xl shadow-black/50'
                      : 'bg-white/10 border border-white/10'
                  }`}
                >
                  {/* Avatar area */}
                  <div className={`flex flex-col items-center pt-8 pb-5 px-6 ${isCenter ? '' : ''}`}>
                    {/* Pulse ring only on active */}
                    <div className="relative mb-4">
                      {isCenter && (
                        <motion.div
                          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2.2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-blue-400/40"
                        />
                      )}
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-2xl ring-4 ${isCenter ? 'ring-white shadow-lg' : 'ring-white/20'}`}>
                        {initials}
                      </div>
                    </div>

                    <p className={`font-bold text-base ${isCenter ? 'text-gray-900' : 'text-white'}`}>
                      {t.name}
                    </p>
                    <p className={`text-sm mt-0.5 ${isCenter ? 'text-gray-400' : 'text-white/50'}`}>
                      {t.role} · {t.company}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className={`mx-5 mb-6 rounded-xl px-5 py-4 ${isCenter ? 'bg-gray-50' : 'bg-white/5'}`}>
                    <p className={`text-sm leading-relaxed text-center ${isCenter ? 'text-gray-600' : 'text-white/60'}`}>
                      "{t.text}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Arrows */}
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-900/50 z-30"
        >
          <ChevronLeft size={20} className="text-white" />
        </motion.button>

        <motion.button
          onClick={next}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-900/50 z-30"
        >
          <ChevronRight size={20} className="text-white" />
        </motion.button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-6 h-2.5 bg-blue-400' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
