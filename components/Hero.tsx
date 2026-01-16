
import React from 'react';
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-40 pb-12 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mx-auto">
          <Zap className="w-3 h-3" />
          Serviço Premium de Transporte
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-outfit leading-tight tracking-tight text-white max-w-4xl mx-auto">
          Mudanças <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient">Fragata</span>: Rapidez Total
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Sua mudança segura, organizada e com preço justo. Tecnologia de ponta para calcular seu frete em instantes.
        </p>

        <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Cuidado Máximo
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Frota Moderna
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Atendimento VIP
          </div>
        </div>

        <div className="pt-6">
          <button 
            onClick={onCtaClick}
            className="group flex items-center justify-center gap-3 bg-white text-black px-12 py-5 rounded-2xl font-black text-2xl hover:bg-cyan-400 hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.5)] transition-all active:scale-95 mx-auto"
          >
            SIMULAR FRETE
            <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
