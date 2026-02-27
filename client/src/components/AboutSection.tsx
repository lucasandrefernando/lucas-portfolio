import { CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    'Desenvolvimento Full Stack com visão sistêmica',
    'Especialista em arquitetura de banco de dados',
    'Integração estratégica de IA em processos',
    'Automação inteligente e otimização de fluxos',
    'Entrega de ponta a ponta (SDLC completo)',
    'Foco em escalabilidade e performance',
  ];

  return (
    <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Sobre Mim
              </span>
              <h2 className="text-4xl font-bold text-gray-900">
                Mais que um desenvolvedor, um <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">solucionador de problemas</span>
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              Com mais de 10 anos de trajetória na área de Tecnologia, comecei minha carreira em infraestrutura de TI e evolui para desenvolvimento de software de alto impacto. Essa jornada me deu uma visão sistêmica única: entendo não apenas como código funciona, mas como sistemas inteiros se conectam.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Atualmente, na <strong>Eagle Telecom</strong>, desenvolvo soluções complexas do zero até a produção. Meu diferencial é a integração estratégica de <strong>Inteligência Artificial</strong> nos processos de desenvolvimento, otimizando tempo de entrega e elevando a qualidade técnica.
            </p>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Timeline */}
          <div className="space-y-8">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {/* Item 1 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Infraestrutura & Suporte</h3>
                    <p className="text-gray-600 text-sm">Início da carreira com foco em redes, servidores e segurança da informação</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Análise de Dados & Gestão</h3>
                    <p className="text-gray-600 text-sm">Transição para análise de dados, Power BI e otimização de processos</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Desenvolvimento Full Stack</h3>
                    <p className="text-gray-600 text-sm">Especialização em PHP, JavaScript/React e arquitetura de sistemas</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">IA & Automação Inteligente</h3>
                    <p className="text-gray-600 text-sm">Integração de IA em desenvolvimento para soluções mais eficientes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
