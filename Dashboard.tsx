import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  COMPARISON_DATA, PIE_DATA, VARIATIONS_DATA, 
  ARREARS_DATA, INSTALLMENTS_DATA, TOTALS 
} from '../constants';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

type TabType = 'overview' | 'confronto' | 'variazioni' | 'morosita' | 'rate';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const variazione = TOTALS.preventivo - TOTALS.consuntivo;
  const variazionePerc = ((variazione / TOTALS.consuntivo) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">CONDOMINIO SUNNY CENTER</h1>
            <p className="text-blue-100 mt-2 text-lg">Dashboard Bilanci 2024-2025 / 2025-2026</p>
            <p className="text-sm text-blue-200 mt-1 opacity-80">Via Etruria 70/72 - Santa Marinella (RM)</p>
          </div>
          <div className="mt-4 md:mt-0 text-right hidden md:block">
            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-xs text-blue-100 uppercase tracking-wider">Data Report</p>
              <p className="font-semibold">06/12/2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Consuntivo 2024-25</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(TOTALS.consuntivo)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-500">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Preventivo 2025-26</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(TOTALS.preventivo)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border-l-4 border-emerald-500">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Variazione</p>
          <div className="flex items-baseline space-x-2 mt-1">
             <p className="text-2xl font-bold text-emerald-600">{formatCurrency(variazione)}</p>
             <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{variazionePerc}%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border-l-4 border-amber-500">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Saldo Cassa</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(TOTALS.cassa)}</p>
          <p className="text-xs text-gray-400 mt-1">al 30/06/2025</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 overflow-x-auto p-1 bg-gray-200/50 rounded-xl">
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'confronto', label: '📈 Confronto' },
          { id: 'variazioni', label: '📉 Variazioni' },
          { id: 'morosita', label: '⚠️ Morosità' },
          { id: 'rate', label: '📅 Rate' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-blue-700 shadow-md transform scale-[1.02]'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-500 ease-in-out">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Distribuzione Preventivo 2025-26</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PIE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">Risultato Principale</h3>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-emerald-200 p-2 rounded-full">
                        <svg className="w-6 h-6 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                    <p className="text-emerald-900 font-bold text-xl">
                        -14,1% sul Preventivo
                    </p>
                  </div>
                  <p className="text-emerald-700 ml-1">
                    Risparmio complessivo di <strong>{formatCurrency(Math.abs(variazione))}</strong> rispetto all'esercizio precedente.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">Posizioni totali</span>
                  <span className="font-bold text-gray-800">~120 unità</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">Posizioni in regola</span>
                  <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">113 (94,2%)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">Posizioni morosi</span>
                  <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">7 (5,8%)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-red-400">
                  <span className="text-gray-600 font-medium">Totale da recuperare</span>
                  <span className="font-bold text-red-700">{formatCurrency(759.35)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'confronto' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Confronto Consuntivo vs Preventivo</h3>
            <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={COMPARISON_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                    <XAxis type="number" tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} stroke="#9ca3af" />
                    <YAxis type="category" dataKey="categoria" width={140} stroke="#4b5563" fontWeight={500} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="consuntivo" name="Consuntivo 2024-25" fill="#5B9BD5" radius={[0, 4, 4, 0]} barSize={20} />
                    <Bar dataKey="preventivo" name="Preventivo 2025-26" fill="#70AD47" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p className="text-blue-800 text-sm leading-relaxed">
                <strong>Nota Bene:</strong> La categoria "Altre voci" nel consuntivo include spese individuali, civici 70/72 e appartamenti che non sono previste nel preventivo, influenzando il totale.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'variazioni' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Analisi Variazioni di Bilancio</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Riduzioni */}
              <div className="bg-green-50/50 rounded-xl p-4 border border-green-100">
                <h4 className="font-bold text-green-800 mb-4 flex items-center text-lg">
                  <span className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center mr-2 text-green-800">↓</span> 
                  Riduzioni
                  <span className="ml-auto text-sm bg-green-200 text-green-800 px-2 py-1 rounded-md">{formatCurrency(16885.89)}</span>
                </h4>
                <div className="space-y-3">
                  {VARIATIONS_DATA.filter(v => v.tipo === 'riduzione').map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-white shadow-sm rounded-lg border border-green-100 hover:shadow-md transition-shadow">
                      <span className="text-gray-700 font-medium">{item.voce}</span>
                      <span className="font-bold text-green-600">{formatCurrency(item.valore)}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Aumenti */}
              <div className="bg-red-50/50 rounded-xl p-4 border border-red-100">
                <h4 className="font-bold text-red-800 mb-4 flex items-center text-lg">
                  <span className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center mr-2 text-red-800">↑</span> 
                  Aumenti
                  <span className="ml-auto text-sm bg-red-200 text-red-800 px-2 py-1 rounded-md">{formatCurrency(6242.04)}</span>
                </h4>
                <div className="space-y-3">
                  {VARIATIONS_DATA.filter(v => v.tipo === 'aumento').map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-white shadow-sm rounded-lg border border-red-100 hover:shadow-md transition-shadow">
                      <span className="text-gray-700 font-medium">{item.voce}</span>
                      <span className="font-bold text-red-600">+{formatCurrency(item.valore)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 relative overflow-hidden bg-emerald-600 rounded-xl p-6 text-white shadow-lg">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <p className="text-emerald-100 uppercase tracking-wider text-sm font-semibold">Saldo Netto Variazioni</p>
                        <p className="text-3xl font-bold mt-1">{formatCurrency(variazione)}</p>
                    </div>
                    <div className="text-right">
                         <span className="text-5xl opacity-20 font-bold">-{variazionePerc}%</span>
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'morosita' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Situazione Morosità</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-6 text-center shadow-sm">
                <p className="text-red-600 font-bold text-4xl mb-1">7</p>
                <p className="text-gray-500 text-sm uppercase tracking-wide">Posizioni in debito</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-6 text-center shadow-sm">
                <p className="text-red-600 font-bold text-3xl mb-1 flex justify-center items-center h-[40px]">{formatCurrency(759.35)}</p>
                <p className="text-gray-500 text-sm uppercase tracking-wide">Totale da recuperare</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-xl p-6 text-center shadow-sm">
                <p className="text-amber-600 font-bold text-4xl mb-1">6<span className="text-xl text-amber-400">/7</span></p>
                <p className="text-gray-500 text-sm uppercase tracking-wide">Sono EX proprietari</p>
              </div>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-xl">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-600 text-sm uppercase">Nominativo</th>
                    <th className="text-right p-4 font-semibold text-gray-600 text-sm uppercase">Importo</th>
                    <th className="text-center p-4 font-semibold text-gray-600 text-sm uppercase">Tipo</th>
                    <th className="text-left p-4 font-semibold text-gray-600 text-sm uppercase">Azione Consigliata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ARREARS_DATA.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-medium text-gray-800">{item.nome}</td>
                      <td className="p-4 text-right font-bold text-red-600">{formatCurrency(item.importo)}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.tipo === 'ex Pr' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.tipo}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {item.tipo === 'ex Pr' ? (
                            <span className="flex items-center text-amber-700">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                Verifica trasferimento
                            </span>
                        ) : 'Sollecito bonario'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
               <svg className="w-6 h-6 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               <div>
                  <h4 className="font-bold text-amber-900">Nota Legale Importante</h4>
                  <p className="text-amber-800 text-sm mt-1">
                    La maggior parte dei morosi (6 su 7) sono ex proprietari. È fondamentale verificare gli atti di trasferimento di proprietà per accertare il passaggio del debito ai nuovi proprietari secondo l'art. 63 disp. att. c.c.
                  </p>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'rate' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Piano Rateale 2025-2026</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {INSTALLMENTS_DATA.map((rata, idx) => (
                <div key={idx} className="relative overflow-hidden group bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 group-hover:bg-blue-100"></div>
                  <p className="text-blue-600 font-bold text-sm uppercase mb-2 relative z-10">{rata.rata}</p>
                  <p className="text-2xl font-bold text-gray-800 mb-1 relative z-10">{rata.scadenza}</p>
                  <p className="text-gray-500 font-medium relative z-10">{formatCurrency(rata.importo)}</p>
                </div>
              ))}
            </div>
            
            <div className="h-[300px] w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={INSTALLMENTS_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="scadenza" stroke="#9ca3af" tick={{fill: '#4b5563'}} />
                    <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} stroke="#9ca3af" />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} cursor={{fill: '#eff6ff'}} />
                    <Bar dataKey="importo" name="Importo Rata" fill="#2563EB" radius={[8, 8, 0, 0]} barSize={50} />
                </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform origin-bottom-left"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h4 className="text-lg font-bold mb-2 text-blue-200">Coordinate Bancarie</h4>
                        <p className="text-slate-300 mb-1">Intestato a: <strong className="text-white">CONDOMINIO VIA ETRURIA 70/72</strong></p>
                        <p className="text-slate-300">Banca: <strong className="text-white">BANCO POSTA</strong></p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg border border-white/20 backdrop-blur-sm">
                        <p className="text-xs text-blue-200 uppercase tracking-wider mb-1">IBAN</p>
                        <p className="font-mono text-xl md:text-2xl font-bold tracking-wider select-all">IT70 C 07601 03200 000031375009</p>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-center items-center gap-2">
        <p>Amministratore: <strong>Angela Romano</strong></p>
        <span className="hidden md:inline">•</span>
        <p>Documento generato il 06/12/2025</p>
      </div>
    </div>
  );
}