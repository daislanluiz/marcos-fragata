
import React from 'react';
import { ShieldCheck, Cpu, Globe, Infinity } from 'lucide-react';

const FEATURE_LIST = [
  {
    icon: <Cpu className="w-8 h-8 text-cyan-400" />,
    title: "Eficiência Algorítmica",
    description: "Lógica de roteamento proprietária que reduz tempos de espera em 40% através de análise multi-ponto."
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-500" />,
    title: "Alcance Sem Fronteiras",
    description: "Integração fluida entre hubs logísticos continentais para operações verdadeiramente globais."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
    title: "Segurança Imutável",
    description: "Rastreamento de ponta a ponta com verificação criptografada para cada quilômetro percorrido."
  },
  {
    icon: <Infinity className="w-8 h-8 text-pink-500" />,
    title: "Escalabilidade Adaptativa",
    description: "Seja um micro-pacote ou frete de frota, escalamos nossa capacidade em tempo real."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white">Dominância Tecnológica</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Muito além do transporte – fornecemos a infraestrutura para o comércio de alta velocidade.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURE_LIST.map((feature, idx) => (
            <div key={idx} className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300">
              <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
