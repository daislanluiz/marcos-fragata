
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 border-t border-white/5 mt-auto bg-black/40">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
        <div className="space-y-4">
          <Logo />
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
            Sua mudança na velocidade Fragata. Eficiência, segurança e tecnologia para levar seus bens onde você quiser.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 text-xs text-slate-600 font-medium">
          <p>© 2024 Fretes Mudança Fragata. Todos os direitos reservados.</p>
          <div className="flex gap-6 uppercase tracking-widest text-[10px]">
            <a href="#" className="hover:text-cyan-400 transition-colors">Segurança</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Termos</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
