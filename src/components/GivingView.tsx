import React, { useState } from 'react';
import { CHURCH_INFO } from '../data/churchData';
import { ChurchLogo } from './ChurchLogo';
import {
  CreditCard,
  Smartphone,
  Building,
  Heart,
  CheckCircle,
  FileCheck,
  Download,
  ShieldCheck,
  Sparkles,
  Calculator,
} from 'lucide-react';

export const GivingView: React.FC = () => {
  const [titheAmount, setTitheAmount] = useState<number>(10000);
  const [offeringAmount, setOfferingAmount] = useState<number>(5000);
  const [missionsAmount, setMissionsAmount] = useState<number>(2000);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | 'bank'>('momo');
  const [momoOperator, setMomoOperator] = useState<'tmoney' | 'flooz' | 'wave'>('tmoney');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    receiptNo: string;
    date: string;
    donor: string;
    total: number;
    breakdown: { tithe: number; offering: number; missions: number };
  } | null>(null);

  const totalAmount = (Number(titheAmount) || 0) + (Number(offeringAmount) || 0) + (Number(missionsAmount) || 0);

  const handleProcessGiving = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generated = {
        receiptNo: `AD-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        donor: donorName.trim() || 'Fidèle Donateur Anonyme',
        total: totalAmount,
        breakdown: {
          tithe: Number(titheAmount) || 0,
          offering: Number(offeringAmount) || 0,
          missions: Number(missionsAmount) || 0,
        },
      };
      setReceiptData(generated);
    }, 1200);
  };

  const handleDownloadReceipt = () => {
    if (!receiptData) return;
    const content = `=====================================================
ÉGLISE ÉVANGÉLIQUE ASSEMBLÉE DE DIEU DU TOGO
Temple de la Résurrection · Adamavo 2, Lomé
Pasteur Responsable : Pasteur AMOUZOU
Attestation de Don & Reçu d'Offrande Numérique
=====================================================
N° de Reçu : ${receiptData.receiptNo}
Date : ${receiptData.date}
Donateur : ${receiptData.donor}

VENTILATION DE L'OFFRANDE :
-----------------------------------------------------
- Dîme Consacrée : ${receiptData.breakdown.tithe.toLocaleString()} FCFA
- Offrande d'Adoration : ${receiptData.breakdown.offering.toLocaleString()} FCFA
- Soutien aux Missions : ${receiptData.breakdown.missions.toLocaleString()} FCFA
-----------------------------------------------------
MONTANT TOTAL : ${receiptData.total.toLocaleString()} FCFA

« Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte ; car Dieu aime celui qui donne avec joie. » (2 Corinthiens 9:7)

Certifié conforme par la Trésorerie du Temple de la Résurrection (Adamavo 2, Lomé).`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `recu_${receiptData.receiptNo}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-800">
            <span>Libéralité & Gérance Fidèle</span>
            <span aria-hidden="true">·</span>
            <span>Malachie 3:10</span>
          </div>
          <h1 className="font-sacred text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Dîmes, Offrandes & Soutien Missionnaire
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            « Apportez à la maison du trésor toutes les dîmes, afin qu'il y ait de la nourriture dans ma maison. » Votre générosité permet d'étendre le Royaume de Dieu et de soutenir les pasteurs et missionnaires.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Simulator */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-slate-900 pb-3 border-b border-stone-100">
              <Calculator className="w-5 h-5 text-amber-700" />
              <h2 className="font-sacred text-lg font-bold">
                Simulateur & Répartition du Don
              </h2>
            </div>

            <form onSubmit={handleProcessGiving} className="space-y-6">
              {/* Amounts input */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <label className="font-semibold text-slate-700">
                      1. La Dîme Consacrée (10% de bénédiction)
                    </label>
                    <span className="font-mono text-blue-900 font-bold tabular-nums">
                      {(titheAmount || 0).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    {[2000, 5000, 10000, 25000, 50000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTitheAmount(preset)}
                        className={`text-[10px] px-2 py-1 rounded-md border font-semibold transition-colors ${
                          titheAmount === preset
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {preset.toLocaleString('fr-FR')} F
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={titheAmount || ''}
                      onChange={(e) => setTitheAmount(Number(e.target.value))}
                      placeholder="Montant en FCFA"
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 pr-14"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                      FCFA
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <label className="font-semibold text-slate-700">
                      2. Offrande d'Adoration & Culte
                    </label>
                    <span className="font-mono text-blue-900 font-bold tabular-nums">
                      {(offeringAmount || 0).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    {[1000, 2000, 5000, 10000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setOfferingAmount(preset)}
                        className={`text-[10px] px-2 py-1 rounded-md border font-semibold transition-colors ${
                          offeringAmount === preset
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {preset.toLocaleString('fr-FR')} F
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={offeringAmount || ''}
                      onChange={(e) => setOfferingAmount(Number(e.target.value))}
                      placeholder="Montant en FCFA"
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 pr-14"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                      FCFA
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <label className="font-semibold text-slate-700">
                      3. Soutien aux Missions & Évangélisation
                    </label>
                    <span className="font-mono text-blue-900 font-bold tabular-nums">
                      {(missionsAmount || 0).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    {[1000, 2000, 5000, 10000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setMissionsAmount(preset)}
                        className={`text-[10px] px-2 py-1 rounded-md border font-semibold transition-colors ${
                          missionsAmount === preset
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {preset.toLocaleString('fr-FR')} F
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={missionsAmount || ''}
                      onChange={(e) => setMissionsAmount(Number(e.target.value))}
                      placeholder="Montant en FCFA"
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 pr-14"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                      FCFA
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-900 block">
                    Montant Total en Franc CFA
                  </span>
                  <span className="text-xs text-amber-800">
                    Ventilé selon vos instructions
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-sacred text-amber-900 tabular-nums">
                  {totalAmount.toLocaleString('fr-FR')} FCFA
                </div>
              </div>

              {/* Donor Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Nom & Prénom</label>
                  <input
                    type="text"
                    placeholder="Ex: Frère Thomas"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email pour le Reçu</label>
                  <input
                    type="email"
                    placeholder="Ex: contact@famille.fr"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Mode de Règlement Sécurisé
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'momo'
                        ? 'border-blue-900 bg-blue-50/70 text-blue-950 ring-1 ring-blue-900'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-amber-700" />
                    <span className="text-xs font-semibold">Mobile Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-blue-900 bg-blue-50/70 text-blue-950 ring-1 ring-blue-900'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-900" />
                    <span className="text-xs font-semibold">Carte Bancaire</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'bank'
                        ? 'border-blue-900 bg-blue-50/70 text-blue-950 ring-1 ring-blue-900'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <Building className="w-5 h-5 text-stone-600" />
                    <span className="text-xs font-semibold">Virement RIB</span>
                  </button>
                </div>

                {/* Sub-selector for Mobile Money */}
                {paymentMethod === 'momo' && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-around gap-2 text-xs">
                    {[
                      { id: 'tmoney', label: 'T-Money (Togocel)' },
                      { id: 'flooz', label: 'Flooz (Moov Togo)' },
                      { id: 'wave', label: 'Wave' },
                    ].map((op) => (
                      <button
                        key={op.id}
                        type="button"
                        onClick={() => setMomoOperator(op.id as 'tmoney' | 'flooz' | 'wave')}
                        className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] transition-colors ${
                          momoOperator === op.id
                            ? 'bg-blue-900 text-white shadow-xs'
                            : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900'
                        }`}
                      >
                        {op.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || totalAmount <= 0}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:brightness-105 transition-all shadow-md active:scale-98 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Génération du Reçu en cours...</span>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-current text-slate-950" />
                    <span>Confirmer & Émettre mon Offrande ({totalAmount.toLocaleString('fr-FR')} FCFA)</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Instant Receipt or Trust Policy */}
          <div className="lg:col-span-5 space-y-6">
            {receiptData ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-amber-300 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-6 h-6 text-emerald-600" />
                    <div>
                      <h3 className="font-sacred font-bold text-slate-900 text-sm">
                        Reçu d'Offrande Numérique
                      </h3>
                      <span className="text-[11px] text-stone-500 font-mono">
                        Réf : {receiptData.receiptNo}
                      </span>
                    </div>
                  </div>
                  <ChurchLogo variant="mark" size="sm" />
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Date & Heure :</span>
                    <span className="font-semibold text-slate-800">{receiptData.date}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Donateur :</span>
                    <span className="font-semibold text-slate-800">{receiptData.donor}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Dîme Consacrée :</span>
                    <span className="font-mono font-medium">{receiptData.breakdown.tithe.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Offrande d'Adoration :</span>
                    <span className="font-mono font-medium">{receiptData.breakdown.offering.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Missions & Évangélisation :</span>
                    <span className="font-mono font-medium">{receiptData.breakdown.missions.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between pt-2 text-sm font-bold text-blue-900">
                    <span>Total Réglé :</span>
                    <span className="font-mono text-base">{receiptData.total.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 font-serif italic text-center">
                  « Que le Seigneur ouvre les écluses des cieux et répande sa bénédiction en abondance sur votre maison ! »
                </div>

                <button
                  onClick={handleDownloadReceipt}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-xl transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Télécharger le Reçu Officiel (.txt)</span>
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 text-slate-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-sacred text-base font-bold">
                    Transparence & Utilisation des Fonds
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
                  <p>
                    Au sein de l'Assemblée de Dieu, la gestion des offrandes et des dîmes obéit à une stricte éthique biblique de transparence et de redevabilité devant Dieu et devant les membres.
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-stone-100">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Soutien Pastoral & Culte :</strong> Entretien du sanctuaire, charges pastorales et matériel d'adoration.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Missions & Implantation :</strong> Envoi d'évangélistes et ouverture de nouvelles églises locales.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Compassion & Social (Dorcas) :</strong> Soutien alimentaire et vestimentaire pour les nécessiteux.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                  <div className="font-semibold text-slate-800">
                    Coordonnées Bancaires de l'Assemblée :
                  </div>
                  <div className="font-mono text-stone-600 text-[11px] select-all">
                    Banque : Ecobank Togo / Banque Atlantique Lomé<br />
                    RIB / Compte : TG05 TG02 4012 3456 7890 12<br />
                    Titulaire : Assemblée de Dieu — Temple de la Résurrection (Adamavo 2)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
