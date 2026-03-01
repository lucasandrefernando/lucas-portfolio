import { CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    'Arquitetura de sistemas do banco de dados à interface',
    'Performance e escalabilidade como requisitos, não afterthoughts',
    'Integração estratégica de IA em fluxos reais de trabalho',
    'Automação que elimina retrabalho e reduz custo operacional',
    'Entrega completa — da concepção ao deploy em produção',
    'Comunicação clara com times técnicos e não técnicos',
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
                Mais que um desenvolvedor, um{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  arquiteto de soluções
                </span>
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              Comecei em infraestrutura de TI — redes, servidores, segurança. Essa base me deu algo
              raro no desenvolvimento: visão sistêmica completa. Hoje escrevo código sabendo exatamente
              onde ele vai rodar, como vai falhar e como evitar isso desde o início.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Na <strong>Eagle Telecom</strong>, desenvolvo sistemas críticos do zero à produção.
              Meu diferencial real: uso <strong>Inteligência Artificial</strong> como ferramenta de
              trabalho — não como buzz word — para entregar mais rápido, com mais qualidade e menos
              retrabalho.
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

          {/* Right Content - Photo + Timeline */}
          <div className="space-y-8">
            {/* Profile photo */}
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                    <img
                      src="/foto.jpg"
                      alt="Lucas André"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white" />
                </span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">Lucas André</p>
                <p className="text-gray-500 text-sm">Full Stack Developer · Eagle Telecom</p>
                <p className="text-green-600 text-xs font-medium mt-0.5">Disponível para projetos</p>
              </div>
            </div>

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
                    <p className="text-gray-600 text-sm">
                      A fundação: redes, servidores e segurança que me deram visão sistêmica única
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Análise de Dados & Gestão</h3>
                    <p className="text-gray-600 text-sm">
                      Power BI, SQL e processos: aprendi a transformar dados em decisões
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Desenvolvimento Full Stack</h3>
                    <p className="text-gray-600 text-sm">
                      PHP, JavaScript, React e arquitetura de sistemas escaláveis em produção
                    </p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">IA & Automação Inteligente</h3>
                    <p className="text-gray-600 text-sm">
                      Integrando IA como vantagem competitiva real — menos retrabalho, mais entrega
                    </p>
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
