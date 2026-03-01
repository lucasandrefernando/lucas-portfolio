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
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-semibold text-gray-600">Disponível para novos projetos</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
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
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              10+ anos transformando problemas reais em sistemas que escalam. PHP Sênior,
              React, Node.js — e IA integrada ao fluxo quando faz sentido.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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
            </div>

            {/* Social + Location */}
            <div className="flex items-center gap-5 pt-2">
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
            </div>
          </div>

          {/* Right Visual — Terminal Card */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-15 blur-2xl scale-95 pointer-events-none" />

              {/* Terminal */}
              <div className="relative bg-gray-950 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-3 text-xs text-gray-500 font-mono">portfolio.js</span>
                </div>

                {/* Code body */}
                <div className="p-6 font-mono text-sm space-y-1.5">
                  <div className="flex gap-4">
                    <span className="text-gray-700 select-none w-4 text-right shrink-0">1</span>
                    <div>
                      <span className="text-purple-400">const </span>
                      <span className="text-blue-300">dev</span>
                      <span className="text-gray-400"> = </span>
                      <span className="text-yellow-400">{'{'}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-700 select-none w-4 text-right shrink-0">2</span>
                    <div className="ml-4">
                      <span className="text-blue-300">name</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-green-400">"Lucas André"</span>
                      <span className="text-gray-400">,</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-700 select-none w-4 text-right shrink-0">3</span>
                    <div className="ml-4">
                      <span className="text-blue-300">stack</span>
                      <span className="text-gray-400">: [</span>
                      <span className="text-green-400">"PHP"</span>
                      <span className="text-gray-400">, </span>
                      <span className="text-green-400">"React"</span>
                      <span className="text-gray-400">, </span>
                      <span className="text-green-400">"Node"</span>
                      <span className="text-gray-400">],</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-700 select-none w-4 text-right shrink-0">4</span>
                    <div className="ml-4">
                      <span className="text-blue-300">years</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-orange-400">10</span>
                      <span className="text-gray-500">, // experiência</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-700 select-none w-4 text-right shrink-0">5</span>
                    <div className="ml-4">
                      <span className="text-blue-300">ai</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-purple-400">true</span>
                      <span className="text-gray-400">,</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-700 select-none w-4 text-right shrink-0">6</span>
                    <div>
                      <span className="text-yellow-400">{'}'}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-700 select-none w-4 text-right shrink-0">7</span>
                    <div className="text-transparent select-none">.</div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-700 select-none w-4 text-right shrink-0">8</span>
                    <div>
                      <span className="text-blue-300">dev</span>
                      <span className="text-gray-400">.</span>
                      <span className="text-yellow-300">solve</span>
                      <span className="text-gray-400">(</span>
                      <span className="text-orange-300">yourProblem</span>
                      <span className="text-gray-400">)</span>
                    </div>
                  </div>

                  {/* Output */}
                  <div className="mt-4 pt-4 border-t border-gray-800 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-green-400 text-xs">Solução entregue em produção</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">›</span>
                      <span className="text-blue-400 text-xs">Sistema escalável · zero downtime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
