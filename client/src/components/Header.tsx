import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            LA
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          <button
            onClick={() => scrollToSection('sobre')}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Sobre
          </button>
          <button
            onClick={() => scrollToSection('habilidades')}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Habilidades
          </button>
          <button
            onClick={() => scrollToSection('experiencia')}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Experiência
          </button>
          <button
            onClick={() => scrollToSection('projetos')}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Projetos
          </button>
          <button
            onClick={() => scrollToSection('contato')}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
          >
            Contato
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4 space-y-3">
          <button
            onClick={() => scrollToSection('sobre')}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Sobre
          </button>
          <button
            onClick={() => scrollToSection('habilidades')}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Habilidades
          </button>
          <button
            onClick={() => scrollToSection('experiencia')}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Experiência
          </button>
          <button
            onClick={() => scrollToSection('projetos')}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Projetos
          </button>
          <button
            onClick={() => scrollToSection('contato')}
            className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
          >
            Contato
          </button>
        </div>
      )}
    </header>
  );
}
