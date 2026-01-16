
import React, { useState } from 'react';
import { MapPin, Navigation, Send, Loader2, ArrowRight, Zap } from 'lucide-react';
import { LOGISTICS_CONFIG, FreightData } from '../constants';

const Calculator: React.FC = () => {
  const [formData, setFormData] = useState<FreightData>({
    origin: '',
    destination: '',
    distance: 0
  });
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const calculateFinalPrice = (distance: number) => {
    if (distance <= 0) return 0;

    // 1. Cálculo base de KM (incluindo custos operacionais e lucro solicitados anteriormente)
    const kmCalculation = distance * LOGISTICS_CONFIG.BASE_RATE_PER_KM * 
                         LOGISTICS_CONFIG.OPERATIONAL_FEE_MULTIPLIER * 
                         LOGISTICS_CONFIG.PROFIT_MARGIN_MULTIPLIER;

    // 2. Adição do Preço Base Mínimo (aplicado apenas uma vez)
    let finalPrice = LOGISTICS_CONFIG.MINIMUM_BASE_PRICE + kmCalculation;

    // 3. Regras de Longa Distância (Acima de 100km)
    if (distance > LOGISTICS_CONFIG.LONG_DISTANCE_THRESHOLD) {
      const extraKm = distance - LOGISTICS_CONFIG.LONG_DISTANCE_THRESHOLD;
      
      // Adiciona taxa fixa adicional (R$ 100)
      finalPrice += LOGISTICS_CONFIG.LONG_DISTANCE_FIXED_FEE;
      
      // Adiciona sobretaxa por KM extra (R$ 10 por km excedente)
      finalPrice += (extraKm * LOGISTICS_CONFIG.EXTRA_KM_SURCHARGE);
    }

    return finalPrice;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.origin || !formData.destination || formData.distance <= 0) return;
    
    setCalculating(true);
    setResult(null);

    setTimeout(() => {
      const finalPrice = calculateFinalPrice(formData.distance);
      setResult(finalPrice);
      setCalculating(false);
    }, 1200);
  };

  const generateWhatsAppLink = () => {
    if (!result) return '#';
    const message = `Olá equipe Fretes Mudança Fragata! 👋
Gostaria de solicitar um frete com base na simulação do site:

📍 *Origem:* ${formData.origin}
🏁 *Destino:* ${formData.destination}
🛣️ *Distância estimada:* ${formData.distance} km
💰 *Valor simulado:* ${LOGISTICS_CONFIG.CURRENCY} ${result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

Podemos confirmar a disponibilidade para este serviço?`;
    
    return `https://wa.me/${LOGISTICS_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3rem] overflow-hidden shadow-3xl">
        <div className="grid lg:grid-cols-5">
          {/* Formulário */}
          <div className="lg:col-span-3 p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="mb-10">
              <h3 className="text-3xl font-black text-white font-outfit mb-2 italic uppercase tracking-tight">Calculadora Fragata</h3>
              <p className="text-slate-500 text-sm">Preços equilibrados para trajetos locais e máxima eficiência em longas distâncias.</p>
            </div>

            <form onSubmit={handleCalculate} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Ponto de Origem</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="Cidade ou Bairro de saída"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all"
                      value={formData.origin}
                      onChange={e => setFormData({...formData, origin: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Ponto de Destino</label>
                  <div className="relative">
                    <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="Cidade ou Bairro de chegada"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                      value={formData.destination}
                      onChange={e => setFormData({...formData, destination: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Distância (KM)</label>
                <div className="relative">
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 font-bold uppercase text-xs">km</div>
                  <input 
                    type="number" 
                    required
                    min="1"
                    placeholder="Ex: 15"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-2xl font-bold text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
                    value={formData.distance || ''}
                    onChange={e => setFormData({...formData, distance: Number(e.target.value)})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={calculating}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-6 rounded-2xl font-black text-xl hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-cyan-900/20"
              >
                {calculating ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    Calcular Orçamento
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Resultado */}
          <div className="lg:col-span-2 bg-white/[0.02] p-8 md:p-12 flex flex-col justify-center items-center relative overflow-hidden">
            {!result && !calculating && (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto ring-1 ring-white/10 shadow-inner">
                  <Send className="w-10 h-10 text-slate-600" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Inicie sua Cotação</h4>
                  <p className="text-slate-500 text-sm max-w-[200px] mx-auto leading-relaxed">Preencha os campos ao lado para visualizar o valor instantaneamente.</p>
                </div>
              </div>
            )}

            {calculating && (
              <div className="text-center space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin mx-auto shadow-2xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-cyan-500 animate-pulse" />
                  </div>
                </div>
                <p className="text-cyan-400 font-black text-[10px] uppercase tracking-widest animate-pulse italic">Analisando Logística...</p>
              </div>
            )}

            {result && !calculating && (
              <div className="w-full text-center space-y-10 animate-in fade-in zoom-in duration-500">
                <div className="space-y-4">
                  <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-cyan-500/20">
                    Cotação Realizada
                  </span>
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-bold mb-1 uppercase text-xs tracking-widest">Valor Estimado</span>
                    <div className="text-7xl font-black text-white font-outfit tracking-tighter">
                      <span className="text-3xl font-medium mr-1 text-cyan-400">R$</span>
                      {result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5 w-full max-w-xs mx-auto">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                     <span className="text-slate-500">Serviço</span>
                     <span className="text-cyan-400">Mudança Fragata</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                     <span className="text-slate-500">Suporte</span>
                     <span className="text-white">VIP 24h</span>
                   </div>
                </div>

                <a 
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-4 w-full"
                >
                  <button className="w-full bg-[#25D366] text-white py-6 rounded-2xl font-black text-xl hover:bg-[#1eb954] hover:scale-[1.03] transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] active:scale-95">
                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    ENVIAR PARA WHATSAPP
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
