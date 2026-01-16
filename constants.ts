
export const LOGISTICS_CONFIG = {
  MINIMUM_BASE_PRICE: 100.00, // Preço base reduzido para ser acessível em curtas distâncias
  BASE_RATE_PER_KM: 3.50, // Preço base por KM
  OPERATIONAL_FEE_MULTIPLIER: 1.50, // 50% de custo operacional (oculto)
  PROFIT_MARGIN_MULTIPLIER: 1.05, // 5% margem de lucro final (oculto)
  LONG_DISTANCE_THRESHOLD: 100, // Limite para taxas de longa distância
  LONG_DISTANCE_FIXED_FEE: 100.00, // Taxa fixa adicional acima de 100km
  EXTRA_KM_SURCHARGE: 10.00, // Valor extra por KM acima de 100km
  WHATSAPP_NUMBER: "5511999999999", // Exemplo de número brasileiro
  CURRENCY: "R$",
};

export interface FreightData {
  origin: string;
  destination: string;
  distance: number;
}
