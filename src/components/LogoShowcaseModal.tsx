import React, { useState } from 'react';
import { ChurchLogo } from './ChurchLogo';
import { X, Download, Copy, Check, Sparkles, BookOpen, Flame, Shield } from 'lucide-react';

interface LogoShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoShowcaseModal: React.FC<LogoShowcaseModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySvg = () => {
    // Generate clean SVG markup for user
    const svgCode = `<!-- Logo Officiel Unique - Assemblée de Dieu -->
<svg width="240" height="240" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="adGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="35%" stop-color="#D97706" />
      <stop offset="70%" stop-color="#B45309" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>
    <linearGradient id="adRoyalBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A" />
      <stop offset="50%" stop-color="#172554" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="adFlameGrad" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="40%" stop-color="#EA580C" />
      <stop offset="100%" stop-color="#DC2626" />
    </linearGradient>
    <linearGradient id="adBibleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
    <radialGradient id="adCenterGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#1E3A8A" stop-opacity="0" />
    </radialGradient>
  </defs>
  <circle cx="80" cy="80" r="76" fill="url(#adRoyalBlueGrad)" stroke="url(#adGoldGrad)" stroke-width="3.5" />
  <circle cx="80" cy="80" r="71" stroke="#93C5FD" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="3 3" />
  <circle cx="80" cy="72" r="54" fill="url(#adCenterGlow)" />
  <path d="M80 16 C76 28 69 34 69 44 C69 53 74 58 80 58 C86 58 91 53 91 44 C91 34 84 28 80 16 Z" fill="url(#adFlameGrad)" />
  <path d="M80 34 C76 38 68 40 64 38 C68 42 73 45 77 46 C75 48 72 50 70 54 C74 52 78 50 80 48 C82 50 86 52 90 54 C88 50 85 48 83 46 C87 45 92 42 96 38 C92 40 84 38 80 34 Z" fill="#FFFFFF" />
  <rect x="74.5" y="38" width="11" height="64" rx="2" fill="url(#adGoldGrad)" stroke="#FEF3C7" stroke-width="0.8" />
  <rect x="52" y="52" width="56" height="10.5" rx="2" fill="url(#adGoldGrad)" stroke="#FEF3C7" stroke-width="0.8" />
  <path d="M40 102 C54 98 68 100 80 105 L80 125 C68 120 54 118 40 122 Z" fill="url(#adBibleGrad)" stroke="#CBD5E1" stroke-width="0.8" />
  <path d="M80 105 C92 100 106 98 120 102 L120 122 C106 118 92 120 80 125 Z" fill="url(#adBibleGrad)" stroke="#CBD5E1" stroke-width="0.8" />
</svg>`;

    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadSvg = () => {
    const svgCode = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="adGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="35%" stop-color="#D97706" />
      <stop offset="70%" stop-color="#B45309" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>
    <linearGradient id="adRoyalBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A" />
      <stop offset="50%" stop-color="#172554" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="adFlameGrad" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="40%" stop-color="#EA580C" />
      <stop offset="100%" stop-color="#DC2626" />
    </linearGradient>
    <linearGradient id="adBibleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
    <radialGradient id="adCenterGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#1E3A8A" stop-opacity="0" />
    </radialGradient>
  </defs>
  <circle cx="80" cy="80" r="76" fill="url(#adRoyalBlueGrad)" stroke="url(#adGoldGrad)" stroke-width="3.5" />
  <circle cx="80" cy="80" r="71" stroke="#93C5FD" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="3 3" />
  <circle cx="80" cy="72" r="54" fill="url(#adCenterGlow)" />
  <path d="M80 16 C76 28 69 34 69 44 C69 53 74 58 80 58 C86 58 91 53 91 44 C91 34 84 28 80 16 Z" fill="url(#adFlameGrad)" />
  <path d="M80 34 C76 38 68 40 64 38 C68 42 73 45 77 46 C75 48 72 50 70 54 C74 52 78 50 80 48 C82 50 86 52 90 54 C88 50 85 48 83 46 C87 45 92 42 96 38 C92 40 84 38 80 34 Z" fill="#FFFFFF" />
  <rect x="74.5" y="38" width="11" height="64" rx="2" fill="url(#adGoldGrad)" stroke="#FEF3C7" stroke-width="0.8" />
  <rect x="52" y="52" width="56" height="10.5" rx="2" fill="url(#adGoldGrad)" stroke="#FEF3C7" stroke-width="0.8" />
  <path d="M40 102 C54 98 68 100 80 105 L80 125 C68 120 54 118 40 122 Z" fill="url(#adBibleGrad)" stroke="#CBD5E1" stroke-width="0.8" />
  <path d="M80 105 C92 100 106 98 120 102 L120 122 C106 118 92 120 80 125 Z" fill="url(#adBibleGrad)" stroke="#CBD5E1" stroke-width="0.8" />
</svg>`;

    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'logo_assemblee_de_dieu_officiel.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="font-sacred text-lg font-bold text-slate-900 tracking-wide">
              Identité Visuelle & Logo Unique
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-slate-800 rounded-lg hover:bg-stone-200/60 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Visual Showcase Box */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-inner">
            <div className="shrink-0 flex items-center justify-center p-3 bg-white/5 rounded-2xl border border-amber-400/20">
              <ChurchLogo variant="mark" size="xl" withGlow={true} />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold">
                Sceau Vectoriel Officiel · Lomé (Togo)
              </span>
              <h3 className="font-sacred text-2xl font-bold tracking-wide text-white">
                Assemblée de Dieu — Temple de la Résurrection
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ce logo exclusif a été créé sur-mesure pour la paroisse <strong>Temple de la Résurrection</strong> à Adamavo 2 (Lomé), sous la conduite du Pasteur AMOUZOU. Il incarne la victoire de la résurrection, l'autorité de la Parole, et le feu du Saint-Esprit.
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                <button
                  onClick={handleDownloadSvg}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:brightness-105 transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Télécharger SVG Haute Définition
                </button>
                <button
                  onClick={handleCopySvg}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Code SVG Copié !' : 'Copier Code SVG'}
                </button>
              </div>
            </div>
          </div>

          {/* Theological & Heraldic Meaning */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-500">
              Signification Théologique des Symboles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span>La Croix d'Or de Golgotha</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Symbole du salut par grâce et de la rédemption parfaite opérée par Jésus-Christ pour toute l'humanité.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm">
                  <Flame className="w-4 h-4 text-orange-600" />
                  <span>La Flamme & la Colombe</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  L'effusion du Saint-Esprit à la Pentecôte (Actes 2) et la paix divine accordée aux cœurs régénérés.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>La Sainte Bible Ouverte</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  La Parole inspirée, inerrante et vivante de Dieu, fondement unique et autorité souveraine de notre foi.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Les 4 Étoiles Célestes</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Représentent les 4 Vérités Fondamentales : Christ Sauveur, Guérisseur, Baptiseur du Saint-Esprit et Roi qui revient.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-stone-200/70 hover:bg-stone-200 rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
