import { Heart, Linkedin, Github, MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV = [
  { label: 'Sobre',       id: 'sobre'       },
  { label: 'Habilidades', id: 'habilidades' },
  { label: 'Experiência', id: 'experiencia' },
  { label: 'Depoimentos', id: 'depoimentos' },
  { label: 'Projetos',    id: 'projetos'    },
  { label: 'Contato',     id: 'contato'     },
];

const SOCIALS = [
  { icon: <Linkedin      className="w-4 h-4" />, href: 'https://linkedin.com/in/lucas-andre-fernando', label: 'LinkedIn'  },
  { icon: <Github        className="w-4 h-4" />, href: 'https://github.com/lucasandrefernando',        label: 'GitHub'    },
  { icon: <MessageCircle className="w-4 h-4" />, href: 'https://wa.me/5531995420887',                  label: 'WhatsApp'  },
  { icon: <Mail          className="w-4 h-4" />, href: 'mailto:lucas@anacron.com.br',                   label: 'Email'     },
];

const STACK = ['PHP', 'React', 'Node.js', 'MySQL', 'Docker', 'Linux'];

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTo  = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ background: '#060c18' }}>

      {/* ── Gradient separator from Contact section ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">

        {/* ── Top row: brand + back to top ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Lucas André
            </h3>
            <p className="text-white/35 text-sm mt-1">Full Stack Developer · Belo Horizonte, MG</p>

            {/* Tech stack chips */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {STACK.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-medium text-white/30 border border-white/[0.08]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.93 }}
            className="flex items-center gap-2 self-start px-4 py-2 rounded-lg border border-white/[0.10] text-white/35 hover:text-white/70 text-xs font-medium transition-colors shrink-0"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Voltar ao topo
          </motion.button>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-white/[0.06] mb-8" />

        {/* ── Nav + Socials ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
            {NAV.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-white/35 hover:text-white/75 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Social icon buttons */}
          <div className="flex items-center gap-2.5">
            {SOCIALS.map(({ icon, href, label }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-lg border border-white/[0.10] flex items-center justify-center text-white/35 hover:text-white/80 hover:border-white/20 transition-colors"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-white/[0.06] mb-6" />

        {/* ── Copyright ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/20">
          <p>© {year} Lucas André Fernando dos Santos. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5">
            Feito com <Heart size={11} className="text-red-400/60" /> usando React & TypeScript
          </p>
        </div>

      </div>
    </footer>
  );
}
