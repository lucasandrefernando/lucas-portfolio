import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  Desenvolvedor Full Stack · Disponível para Projetos
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Código que{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  escala
                </span>
                . Soluções que{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  transformam
                </span>
                .
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                10+ anos construindo sistemas robustos do zero ao deploy. Sênior em PHP, pleno em
                React — e integro IA onde outros ainda usam planilhas.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const element = document.getElementById('contato');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold flex items-center justify-center gap-2"
              >
                Iniciar Conversa <ArrowRight size={20} />
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('projetos');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-lg transition-all font-semibold"
              >
                Ver Projetos
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-4">
              <a
                href="https://linkedin.com/in/lucas-andre-fernando"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
              >
                <Linkedin size={24} className="text-gray-700 hover:text-blue-600" />
              </a>
              <a
                href="https://github.com/lucasandrefernando"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all"
              >
                <Github size={24} className="text-gray-700" />
              </a>
              <a
                href="mailto:lucas@anacron.com.br"
                className="p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-red-600 hover:bg-red-50 transition-all"
              >
                <Mail size={24} className="text-gray-700 hover:text-red-600" />
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full h-96">
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl opacity-20 blur-3xl animate-pulse" />

              {/* Code Card */}
              <div className="relative bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-green-400">
                    <span className="text-gray-500">{'>'} </span>
                    <span>const developer = </span>
                    <span className="text-yellow-400">'Lucas André'</span>
                  </div>
                  <div className="text-blue-400">
                    <span className="text-gray-500">{'>'} </span>
                    <span>developer.expertise = </span>
                    <span className="text-yellow-400">[</span>
                  </div>
                  <div className="text-purple-400 ml-4">
                    <span className="text-yellow-400">'PHP Senior'</span>
                    <span>, </span>
                    <span className="text-yellow-400">'React'</span>
                    <span>, </span>
                    <span className="text-yellow-400">'Node.js'</span>
                  </div>
                  <div className="text-purple-400 ml-4">
                    <span className="text-yellow-400">'MySQL'</span>
                    <span>, </span>
                    <span className="text-yellow-400">'IA & Automação'</span>
                  </div>
                  <div className="text-blue-400">
                    <span className="text-yellow-400">]</span>
                  </div>
                  <div className="text-green-400 pt-4">
                    <span className="text-gray-500">{'>'} </span>
                    <span>developer.solve(</span>
                    <span className="text-yellow-400">yourProblem</span>
                    <span>)</span>
                  </div>
                  <div className="text-gray-500 text-xs pt-2">
                    ✓ Retorna solução escalável em produção
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
            <p className="text-gray-600 font-medium">Anos de Experiência</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
            <p className="text-gray-600 font-medium">Projetos Entregues</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-600 mb-2">Full</div>
            <p className="text-gray-600 font-medium">Stack — Do Back ao Front</p>
          </div>
        </div>
      </div>
    </section>
  );
}
