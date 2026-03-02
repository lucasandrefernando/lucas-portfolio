import { useState } from 'react';
import { Mail, Linkedin, Github, MessageCircle, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import ScrollReveal from './ScrollReveal';

const SOCIAL = [
  { icon: <Mail    className="w-4 h-4" />, label: 'lucas@anacron.com.br',            href: 'mailto:lucas@anacron.com.br',                       color: 'text-blue-400'   },
  { icon: <Linkedin className="w-4 h-4" />, label: 'linkedin/lucas-andre-fernando',   href: 'https://linkedin.com/in/lucas-andre-fernando',       color: 'text-sky-400'    },
  { icon: <Github  className="w-4 h-4" />, label: 'github/lucasandrefernando',        href: 'https://github.com/lucasandrefernando',              color: 'text-purple-400' },
];

// ── Floating-label field ──────────────────────────────────────────────────────
function Field({
  id, label, type = 'text', optional = false, rows,
  value, onChange,
}: {
  id: string; label: string; type?: string; optional?: boolean; rows?: number;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  const base = 'w-full bg-transparent text-white outline-none transition-colors placeholder-transparent';

  return (
    <div className="relative pt-5">
      {rows ? (
        <textarea
          id={id} name={id} value={value} rows={rows} required={!optional}
          onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={label}
          className={`${base} border-b pb-2 resize-none ${focused ? 'border-blue-400' : 'border-white/[0.15]'}`}
        />
      ) : (
        <input
          id={id} name={id} type={type} value={value} required={!optional}
          onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={label}
          className={`${base} border-b pb-2 ${focused ? 'border-blue-400' : 'border-white/[0.15]'}`}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-0 pointer-events-none transition-all duration-200 ${
          lifted
            ? 'top-0 text-[10px] font-bold uppercase tracking-widest text-blue-400'
            : 'top-[1.35rem] text-sm text-white/35'
        }`}
      >
        {label}
        {optional && <span className="ml-1 font-normal opacity-50">(opcional)</span>}
      </label>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
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
    <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0f172a' }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <ScrollReveal className="text-center mb-14">
          <span className="inline-block px-4 py-2 bg-white/10 text-blue-300 rounded-full text-sm font-semibold border border-white/10 mb-4">
            Contato
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            Tem um Problema para{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Resolver?
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Seja um sistema do zero, uma automação ou integração com IA — estou disponível para discutir como posso ajudar.
          </p>
        </ScrollReveal>

        {/* ── Main grid: 2:3 asymmetric ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 items-start">

          {/* ── LEFT: Contact hub card ── */}
          <ScrollReveal direction="right">
            <div
              className="rounded-2xl p-8 border border-white/[0.08] relative overflow-hidden flex flex-col h-full"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {/* Decorative glows */}
              <div className="absolute -top-14 -left-14 w-48 h-48 rounded-full bg-blue-600/20 blur-[70px] pointer-events-none" />
              <div className="absolute -bottom-14 -right-14 w-48 h-48 rounded-full bg-purple-600/20 blur-[70px] pointer-events-none" />

              {/* Availability */}
              <div className="flex items-center gap-2 mb-8">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-green-400 text-sm font-semibold">Disponível para projetos</span>
              </div>

              {/* Name + role */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Lucas André</h3>
                <p className="text-white/40 text-sm mt-1">Full Stack Developer · BH, MG</p>
              </div>

              {/* Primary CTA: WhatsApp */}
              <motion.a
                href="https://wa.me/5531995420887"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-sm text-white shadow-lg shadow-green-900/30 mb-6 relative z-10"
                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
              >
                <MessageCircle className="w-5 h-5" />
                Chamar no WhatsApp
              </motion.a>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-white/[0.08]" />
                <span className="text-white/25 text-xs shrink-0">ou entre em contato por</span>
                <div className="flex-1 h-px bg-white/[0.08]" />
              </div>

              {/* Other contacts */}
              <div className="space-y-4 flex-1 relative z-10">
                {SOCIAL.map(({ icon, label, href, color }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <span className={`${color} opacity-60 group-hover:opacity-100 transition-opacity shrink-0`}>
                      {icon}
                    </span>
                    <span className="text-white/40 group-hover:text-white/80 text-sm transition-colors truncate">
                      {label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-yellow-400/60 shrink-0" />
                <span className="text-white/30 text-xs">Resposta em até 24h úteis</span>
              </div>
            </div>
          </ScrollReveal>

          {/* ── RIGHT: Form ── */}
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-5 border border-white/[0.08] min-h-[420px]"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, delay: 0.1 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Mensagem enviada!</h3>
                  <p className="text-white/50 text-sm max-w-xs mx-auto">
                    Você receberá uma confirmação no seu email. Responderei em até 24 horas úteis.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors underline mt-2"
                >
                  Enviar outra mensagem
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ScrollReveal direction="left" delay={0.1}>
                  <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl px-8 py-10 border border-white/[0.08] space-y-8"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    {/* Name + Email side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <Field id="name"  label="Seu nome"   value={formData.name}  onChange={handleChange} />
                      <Field id="email" label="Seu email"  type="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <Field id="phone" label="WhatsApp" optional value={formData.phone} onChange={handleChange} />

                    <Field id="message" label="Como posso ajudar?" rows={4} value={formData.message} onChange={handleChange} />

                    <div className="flex items-center justify-between pt-2">
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-blue-900/40 transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          'Enviando...'
                        ) : (
                          <>
                            Enviar mensagem
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>

                      <p className="text-xs text-white/25 hidden sm:block">
                        Confirmação automática por email
                      </p>
                    </div>
                  </form>
                </ScrollReveal>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
