import { useState } from 'react';
import { Mail, Linkedin, Github, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-4">
            Vamos Trabalhar Juntos
          </span>
          <h2 className="text-4xl font-bold mb-4">
            Pronto para o Próximo Desafio?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Tenho interesse em desafios que exigem visão sistêmica, escalabilidade e inovação constante. Entre em contato!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-blue-500/20 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Email</h3>
                  <p className="text-gray-300">lucas.andre@example.com</p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-blue-500/20 rounded-lg">
                  <Linkedin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">LinkedIn</h3>
                  <a
                    href="https://linkedin.com/in/lucas-andre-fernando"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    linkedin.com/in/lucas-andre-fernando
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-blue-500/20 rounded-lg">
                  <Github className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">GitHub</h3>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    github.com/lucas-andre
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-blue-500/20 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/5531999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    +55 (31) 99999-9999
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-4">Conecte-se comigo nas redes sociais:</p>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/in/lucas-andre-fernando"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-blue-400" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                >
                  <Github className="w-6 h-6 text-blue-400" />
                </a>
                <a
                  href="mailto:lucas@example.com"
                  className="p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                >
                  <Mail className="w-6 h-6 text-blue-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Seu Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="João Silva"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Seu Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Sua Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-me sobre seu projeto..."
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
