import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
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

const AVATAR_GRADIENT: Record<string, string> = {
  blue:   'from-blue-400 to-blue-600',
  purple: 'from-purple-400 to-violet-600',
  pink:   'from-pink-400 to-rose-600',
  green:  'from-emerald-400 to-green-600',
};

const AVATAR_GLOW: Record<string, string> = {
  blue:   'rgba(59,130,246,0.60)',
  purple: 'rgba(139,92,246,0.60)',
  pink:   'rgba(236,72,153,0.60)',
  green:  'rgba(52,211,153,0.60)',
};

const QUOTE_COLOR: Record<string, string> = {
  blue:   'text-blue-300',
  purple: 'text-purple-300',
  pink:   'text-pink-300',
  green:  'text-emerald-300',
};

/** Characters before the "Ver mais" button appears on the center card */
const TEXT_LIMIT = 210;

function getCardProps(offset: number) {
  if (offset === 0) return { x: '0%', scale: 1, opacity: 1, zIndex: 30, isCenter: true };
  if (Math.abs(offset) === 1) return {
    x: offset > 0 ? '73%' : '-73%',
    scale: 0.87, opacity: 0.70, zIndex: 20, isCenter: false,
  };
  return { x: offset > 0 ? '138%' : '-138%', scale: 0.74, opacity: 0, zIndex: 1, isCenter: false };
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);
  const [current, setCurrent]   = useState(0);
  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch('/api/portfolio/testimonials')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setTestimonials(data); })
      .catch(() => {});
  }, []);

  const stopTimer  = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [testimonials.length]);

  const go   = (i: number) => { setCurrent(i); setExpanded(false); startTimer(); };
  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);
  const next = () => go((current + 1) % testimonials.length);

  return (
    <section
      id="depoimentos"
      className="py-24 overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #090e1d 0%, #0e1e3a 55%, #090e1d 100%)' }}
    >
      {/* ── Animated background orb ── */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full bg-blue-600 blur-[130px] pointer-events-none"
      />
      <div className="absolute top-1/3 left-1/4  w-[280px] h-[280px] rounded-full bg-purple-600/5 blur-[80px]  pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[220px] h-[220px] rounded-full bg-blue-400/5 blur-[70px]  pointer-events-none" />

      {/* ── Header ── */}
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
          <p className="text-lg text-white/50 max-w-2xl mx-auto">Clique em um card lateral para navegar entre os depoimentos</p>
        </div>
      </ScrollReveal>

      {/* ── Carousel ── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-20 lg:px-28">

        {/*
          h-[430px] is enough headroom for the expanded center card
          (compact ≈ 310px, expanded ≈ 380px). Absolute cards don't
          affect section height so overflow is visible inside the section.
        */}
        <motion.div
          className="relative min-h-[300px] sm:h-[430px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          onTouchStart={stopTimer}
          onPanStart={stopTimer}
          onPanEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 50) {
              info.offset.x > 0 ? prev() : next();
            } else {
              startTimer();
            }
          }}
        >
          {testimonials.map((t, i) => {
            const len = testimonials.length;
            let offset = i - current;
            if (offset >  len / 2) offset -= len;
            if (offset < -len / 2) offset += len;

            const { x, scale, opacity, zIndex, isCenter } = getCardProps(offset);
            const initials   = t.name.split(' ').slice(0, 2).map((n) => n[0]).join('');
            const gradient   = AVATAR_GRADIENT[t.color] ?? AVATAR_GRADIENT.blue;
            const glowColor  = AVATAR_GLOW[t.color]     ?? AVATAR_GLOW.blue;
            const quoteColor = QUOTE_COLOR[t.color]     ?? QUOTE_COLOR.blue;
            const isLong     = t.text.length > TEXT_LIMIT;
            const displayText =
              isCenter && isLong && !expanded
                ? t.text.slice(0, TEXT_LIMIT).trimEnd() + '…'
                : t.text;

            return (
              <motion.div
                key={t.name}
                animate={{ x, scale, opacity }}
                transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                style={{ zIndex, position: 'absolute', width: '360px' }}
                onClick={() => !isCenter && go(i)}
                className={!isCenter ? 'cursor-pointer' : ''}
              >
                <div
                  className={`rounded-2xl overflow-hidden transition-shadow duration-500 ${
                    isCenter
                      ? 'bg-white shadow-2xl shadow-black/70'
                      : 'bg-white/10 border border-white/[0.12]'
                  }`}
                >
                  {/* Stars + rating */}
                  <div className={`flex gap-1 items-center px-6 pt-5 pb-1 ${!isCenter ? 'opacity-45' : ''}`}>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                    {isCenter && (
                      <span className="ml-2 text-xs font-semibold text-amber-500">5.0</span>
                    )}
                  </div>

                  {/* Quote icon + text */}
                  <div className={`px-6 pt-2 pb-4 ${!isCenter ? 'opacity-50' : ''}`}>
                    <Quote
                      size={22}
                      className={`mb-2 ${isCenter ? quoteColor : 'text-white/20'}`}
                    />
                    {/* Side cards always line-clamp-4 for uniform height */}
                    <p className={`text-sm leading-relaxed ${
                      isCenter ? 'text-gray-600' : 'text-white/60 line-clamp-4'
                    }`}>
                      {isCenter ? displayText : t.text}
                    </p>

                    {/* Expand / collapse — center card only */}
                    {isCenter && isLong && (
                      <motion.button
                        onClick={() => setExpanded((e) => !e)}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1 mt-2 text-xs font-semibold text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        {expanded
                          ? <><ChevronUp size={12} /> Ver menos</>
                          : <><ChevronDown size={12} /> Ver mais</>
                        }
                      </motion.button>
                    )}
                  </div>

                  {/* Divider */}
                  <div className={`mx-6 border-t ${isCenter ? 'border-gray-100' : 'border-white/10'}`} />

                  {/* Author row */}
                  <div className={`flex items-center gap-3 px-6 py-4 ${!isCenter ? 'opacity-50' : ''}`}>

                    {/* Avatar with glow + float animation on center */}
                    <div className="relative shrink-0">
                      {isCenter && (
                        <>
                          {/* Radial glow halo */}
                          <motion.div
                            animate={{ scale: [0.8, 1.85, 0.8], opacity: [0, 0.55, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient}`}
                            style={{ filter: 'blur(10px)', zIndex: -1 }}
                          />
                          {/* Outer pulse ring */}
                          <motion.div
                            animate={{ scale: [1, 1.7, 1], opacity: [0.55, 0, 0.55] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-35`}
                          />
                        </>
                      )}

                      <motion.div
                        animate={isCenter ? { y: [0, -4, 0] } : {}}
                        transition={isCenter ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } : {}}
                        className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm ${
                          isCenter ? 'ring-2 ring-white shadow-lg' : 'ring-1 ring-white/20'
                        }`}
                        style={isCenter
                          ? { boxShadow: `0 0 24px ${glowColor}, 0 4px 14px rgba(0,0,0,0.35)` }
                          : undefined
                        }
                      >
                        {initials}
                      </motion.div>
                    </div>

                    <div className="min-w-0">
                      <p className={`font-bold text-sm truncate ${isCenter ? 'text-gray-900' : 'text-white/85'}`}>
                        {t.name}
                      </p>
                      <p className={`text-xs mt-0.5 truncate ${isCenter ? 'text-gray-400' : 'text-white/40'}`}>
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Navigation arrows */}
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 items-center justify-center shadow-lg shadow-blue-900/60 z-40 transition-colors"
        >
          <ChevronLeft size={22} className="text-white" />
        </motion.button>

        <motion.button
          onClick={next}
          whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 items-center justify-center shadow-lg shadow-blue-900/60 z-40 transition-colors"
        >
          <ChevronRight size={22} className="text-white" />
        </motion.button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-7 h-2.5 bg-blue-400' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/38'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
