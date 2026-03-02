import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { label: 'Sobre',       id: 'sobre'       },
  { label: 'Habilidades', id: 'habilidades' },
  { label: 'Experiência', id: 'experiencia' },
  { label: 'Projetos',    id: 'projetos'    },
  { label: 'Depoimentos', id: 'depoimentos' },
];

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [active,      setActive]      = useState('');
  const [isMenuOpen,  setIsMenuOpen]  = useState(false);

  // Glass effect on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy — highlight active section
  useEffect(() => {
    const ids = ['sobre', 'habilidades', 'experiencia', 'depoimentos', 'projetos', 'contato'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-38% 0px -57% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 group"
        >
          <span className="text-xl font-black tracking-tight text-gray-900 group-hover:opacity-80 transition-opacity">
            LA<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">.</span>
          </span>
        </button>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                active === id
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {/* Animated active pill */}
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                />
              )}
              {label}
            </button>
          ))}

          {/* CTA */}
          <motion.button
            onClick={() => scrollTo('contato')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="ml-4 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-blue-500/25 transition-shadow"
          >
            Contato
          </motion.button>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isMenuOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3"
          >
            <div className="space-y-1">
              {NAV.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    active === id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contato')}
                className="block w-full text-center mt-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold"
              >
                Contato
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
