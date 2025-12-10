export interface ComparisonItem {
  categoria: string;
  consuntivo: number;
  preventivo: number;
}

export interface PieItem {
  name: string;
  value: number;
  color: string;
}

export interface VariationItem {
  voce: string;
  valore: number;
  tipo: 'riduzione' | 'aumento';
}

export interface ArrearsItem {
  nome: string;
  importo: number;
  tipo: 'Pr' | 'ex Pr';
}

export interface InstallmentItem {
  rata: string;
  scadenza: string;
  importo: number;
}

export interface Totals {
  consuntivo: number;
  preventivo: number;
  cassa: number;
}