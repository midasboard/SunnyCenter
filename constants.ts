import { ComparisonItem, PieItem, VariationItem, ArrearsItem, InstallmentItem, Totals } from './types';

export const TOTALS: Totals = {
  consuntivo: 54440.42,
  preventivo: 46739.50,
  cassa: 38929.81
};

export const COMPARISON_DATA: ComparisonItem[] = [
  { categoria: 'Spese Generali', consuntivo: 26197.63, preventivo: 23343.97 },
  { categoria: 'Spese Acqua', consuntivo: 16596.10, preventivo: 16000.00 },
  { categoria: 'Spese Scale', consuntivo: 3360.00, preventivo: 5040.00 },
  { categoria: 'Spese Negozi', consuntivo: 960.00, preventivo: 1440.00 },
  { categoria: 'Spese Garages', consuntivo: 480.00, preventivo: 720.00 },
  { categoria: 'Altre voci', consuntivo: 6846.69, preventivo: 195.53 },
];

export const PIE_DATA: PieItem[] = [
  { name: 'Spese Generali', value: 23343.97, color: '#2F5496' },
  { name: 'Spese Acqua', value: 16000.00, color: '#5B9BD5' },
  { name: 'Spese Scale', value: 5040.00, color: '#70AD47' },
  { name: 'Spese Negozi', value: 1440.00, color: '#FFC000' },
  { name: 'Spese Garages', value: 720.00, color: '#ED7D31' },
  { name: 'Altre', value: 195.53, color: '#A5A5A5' },
];

export const VARIATIONS_DATA: VariationItem[] = [
  { voce: 'Straordinari 2024-25', valore: -9687.10, tipo: 'riduzione' },
  { voce: 'Voci solo consuntivo', valore: -6602.69, tipo: 'riduzione' },
  { voce: 'Spese acqua', valore: -596.10, tipo: 'riduzione' },
  { voce: 'Pulizie (+50%)', valore: 2400.00, tipo: 'aumento' },
  { voce: 'Budget legale', valore: 1687.70, tipo: 'aumento' },
  { voce: 'Manut. fognario', valore: 1000.00, tipo: 'aumento' },
  { voce: 'Verifica messa terra', valore: 732.00, tipo: 'aumento' },
  { voce: 'Assicurazione', valore: 422.34, tipo: 'aumento' },
];

export const ARREARS_DATA: ArrearsItem[] = [
  { nome: 'SCARDOCCI F.', importo: -552.37, tipo: 'ex Pr' },
  { nome: 'TURCHETTI M.', importo: -61.67, tipo: 'Pr' },
  { nome: 'NUCERA C.', importo: -54.77, tipo: 'ex Pr' },
  { nome: 'BANDINI V.', importo: -52.36, tipo: 'ex Pr' },
  { nome: 'TOTI M.', importo: -26.79, tipo: 'ex Pr' },
  { nome: 'NANNI A.', importo: -11.39, tipo: 'ex Pr' },
];

export const INSTALLMENTS_DATA: InstallmentItem[] = [
  { rata: 'Rata 1', scadenza: '10/07/2025', importo: 6800.65 },
  { rata: 'Rata 2', scadenza: '01/11/2025', importo: 9384.30 },
  { rata: 'Rata 3', scadenza: '01/02/2026', importo: 10202.07 },
  { rata: 'Rata 4', scadenza: '01/04/2026', importo: 10429.86 },
];