import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
    >
      {/* Background orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300 rounded-full opacity-10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[520px]">

          {/* Left Content */}
          <div className="space-y-8">

            {/* Badge — pulsing green dot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-semibold text-gray-600">Disponível para novos projetos</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
              className="space-y-3"
            >
              <p className="text-base font-medium text-gray-400 tracking-widest uppercase">
                Olá, sou Lucas André —
              </p>
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05]">
                Full Stack{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Developer
                </span>
                <br />
                <span className="text-4xl lg:text-5xl font-bold text-gray-600">
                  que entrega resultado.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="text-lg text-gray-600 leading-relaxed max-w-lg"
            >
              10+ anos transformando problemas reais em sistemas que escalam. PHP Sênior,
              React, Node.js — e IA integrada ao fluxo quando faz sentido.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-200 hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                Iniciar Conversa <ArrowRight size={20} />
              </button>
              <button
                onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 font-semibold"
              >
                Ver Projetos
              </button>
            </motion.div>

            {/* Social + Location */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-5 pt-2"
            >
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/lucas-andre-fernando"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <Linkedin size={20} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                </a>
                <a
                  href="https://github.com/lucasandrefernando"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-800 hover:bg-gray-50 transition-all group"
                >
                  <Github size={20} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
                </a>
                <a
                  href="mailto:lucas@anacron.com.br"
                  className="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-red-400 hover:bg-red-50 transition-all group"
                >
                  <Mail size={20} className="text-gray-500 group-hover:text-red-500 transition-colors" />
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <MapPin size={14} />
                <span>Belo Horizonte, MG</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual — Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative flex flex-col items-center">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-3xl scale-125 pointer-events-none" />

              {/* Photo with gradient ring */}
              <div className="relative">
                {/* Gradient ring */}
                <div className="w-72 h-72 rounded-full p-[3px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                    <img
                      src="/foto.jpg"
                      alt="Lucas André - Full Stack Developer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating tech badges */}
                <div className="absolute -top-4 -right-8 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                  PHP Sênior
                </div>
                <div className="absolute top-1/4 -left-14 bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                  React
                </div>
                <div className="absolute top-3/4 -right-12 bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
                  Node.js
                </div>
                <div className="absolute -bottom-4 -left-10 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                  IA & Automação
                </div>
              </div>

              {/* Experience strip */}
              <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-4 flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-black text-gray-900">10<span className="text-blue-600">+</span></div>
                  <div className="text-xs text-gray-500 font-medium">Anos de exp.</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl font-black text-gray-900">50<span className="text-purple-600">+</span></div>
                  <div className="text-xs text-gray-500 font-medium">Projetos</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl font-black text-green-600">Full</div>
                  <div className="text-xs text-gray-500 font-medium">Stack</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-gray-200">
          <div className="text-center group cursor-default">
            <div className="text-4xl font-black text-gray-900 mb-1">
              10<span className="text-blue-600">+</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Anos de Experiência</p>
          </div>
          <div className="text-center group cursor-default">
            <div className="text-4xl font-black text-gray-900 mb-1">
              50<span className="text-purple-600">+</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Projetos Entregues</p>
          </div>
          <div className="text-center group cursor-default">
            <div className="text-4xl font-black text-gray-900 mb-1">
              <span className="text-pink-600">PHP</span>
              <span className="text-gray-400 text-2xl"> + </span>
              <span className="text-blue-500">React</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Stack Principal</p>
          </div>
        </div>

      </div>
    </section>
  );
}
