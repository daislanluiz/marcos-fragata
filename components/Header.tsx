
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onCtaClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCtaClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-xl py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Mudanças</a>
          <a href="#" className="hover:text-white transition-colors">Fretes</a>
          <button 
            onClick={onCtaClick}
            className="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-cyan-400 transition-all active:scale-95 shadow-lg"
          >
            Simular Preço
          </button>
        </nav>

        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <a href="#" className="text-lg py-2 font-medium">Mudanças Residenciais</a>
          <a href="#" className="text-lg py-2 font-medium">Fretes Comerciais</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onCtaClick(); }}
            className="bg-cyan-500 text-white py-4 rounded-xl font-bold"
          >
            Calcular Agora
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
