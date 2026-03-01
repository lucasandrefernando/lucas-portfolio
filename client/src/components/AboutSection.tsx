import { CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

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
            <ScrollReveal direction="right">
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
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-lg text-gray-600 leading-relaxed">
                Comecei em infraestrutura de TI — redes, servidores, segurança. Essa base me deu algo
                raro no desenvolvimento: visão sistêmica completa. Hoje escrevo código sabendo exatamente
                onde ele vai rodar, como vai falhar e como evitar isso desde o início.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-lg text-gray-600 leading-relaxed">
                Na <strong>Eagle Telecom</strong>, desenvolvo sistemas críticos do zero à produção.
                Meu diferencial real: uso <strong>Inteligência Artificial</strong> como ferramenta de
                trabalho — não como buzz word — para entregar mais rápido, com mais qualidade e menos
                retrabalho.
              </p>
            </ScrollReveal>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <ScrollReveal key={index} delay={Math.min(index * 0.07, 0.3)}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Content - Photo + Timeline */}
          <div className="space-y-8">
            {/* Profile photo */}
            <ScrollReveal direction="left">
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
            </ScrollReveal>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {[
                  { num: '1', color: 'bg-blue-600', title: 'Infraestrutura & Suporte', desc: 'A fundação: redes, servidores e segurança que me deram visão sistêmica única' },
                  { num: '2', color: 'bg-purple-600', title: 'Análise de Dados & Gestão', desc: 'Power BI, SQL e processos: aprendi a transformar dados em decisões' },
                  { num: '3', color: 'bg-pink-600', title: 'Desenvolvimento Full Stack', desc: 'PHP, JavaScript, React e arquitetura de sistemas escaláveis em produção' },
                  { num: '4', color: 'bg-green-600', title: 'IA & Automação Inteligente', desc: 'Integrando IA como vantagem competitiva real — menos retrabalho, mais entrega' },
                ].map((item, index) => (
                  <ScrollReveal key={item.num} delay={index * 0.1}>
                    <div className="relative pl-20">
                      <div className={`absolute left-0 w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white font-bold`}>
                        {item.num}
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
