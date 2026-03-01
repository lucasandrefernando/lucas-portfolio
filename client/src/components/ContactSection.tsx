import { useState } from 'react';
import { Mail, Linkedin, Github, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import ScrollReveal from './ScrollReveal';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Preencha todos os campos.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro desconhecido');
      setSent(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      toast.error(err.message ?? 'Erro ao enviar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-4">
            Contato
          </span>
          <h2 className="text-4xl font-bold mb-4">Tem um Problema para Resolver?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Seja um sistema do zero, uma automação ou integração com IA — estou disponível para
            discutir como posso ajudar.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: <Mail className="w-5 h-5 text-blue-400" />, label: 'Email', value: 'lucas@anacron.com.br', href: 'mailto:lucas@anacron.com.br' },
              { icon: <Linkedin className="w-5 h-5 text-blue-400" />, label: 'LinkedIn', value: 'lucas-andre-fernando', href: 'https://linkedin.com/in/lucas-andre-fernando' },
              { icon: <Github className="w-5 h-5 text-blue-400" />, label: 'GitHub', value: 'lucasandrefernando', href: 'https://github.com/lucasandrefernando' },
              { icon: <MessageCircle className="w-5 h-5 text-blue-400" />, label: 'WhatsApp', value: '+55 (31) 99542-0887', href: 'https://wa.me/5531995420887' },
            ].map(({ icon, label, value, href }, index) => (
              <ScrollReveal key={label} direction="right" delay={index * 0.1}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg shrink-0">{icon}</div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-white hover:text-blue-300 transition-colors font-medium">
                    {value}
                  </a>
                </div>
              </div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.4} className="pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Tempo de resposta médio</p>
              <p className="text-white font-semibold">Até 24 horas úteis</p>
            </ScrollReveal>
          </div>

          {/* Form */}
          {sent ? (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-10 flex flex-col items-center justify-center text-center gap-4">
              <CheckCircle className="w-16 h-16 text-green-400" />
              <h3 className="text-xl font-bold">Mensagem enviada!</h3>
              <p className="text-gray-400">
                Você receberá uma confirmação no seu email. Responderei em até 24 horas úteis.
              </p>
              <button onClick={() => setSent(false)}
                className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors underline">
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <ScrollReveal direction="left" delay={0.1}>
            <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">Seu Nome</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                  placeholder="João Silva" required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Seu Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="joao@empresa.com.br" required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  WhatsApp <span className="text-gray-500 font-normal">(opcional)</span>
                </label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="+55 (31) 99999-9999"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">Como posso ajudar?</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                  placeholder="Descreva seu projeto ou necessidade. Quanto mais detalhes, melhor..." rows={5} required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
              </div>
              <button type="submit" disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100">
                {isLoading ? 'Enviando...' : (<>Enviar Mensagem <Send size={18} /></>)}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Você receberá uma confirmação automática no seu email.
              </p>
            </form>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
