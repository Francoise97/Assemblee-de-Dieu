import React, { useState } from 'react';
import { DOCTRINES, Doctrine } from '../data/churchData';
import { Cross, Flame, Heart, Crown, ChevronRight, BookOpen, Check } from 'lucide-react';

export const DoctrinesSection: React.FC = () => {
  const [selectedDoctrine, setSelectedDoctrine] = useState<Doctrine>(DOCTRINES[0]);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const getIcon = (symbol: Doctrine['symbol']) => {
    switch (symbol) {
      case 'cross':
        return <Cross className="w-5 h-5 text-amber-700" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-orange-600" />;
      case 'dove':
        return <Heart className="w-5 h-5 text-rose-600" />;
      case 'crown':
        return <Crown className="w-5 h-5 text-amber-600" />;
    }
  };

  const handleCopyPassage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(id);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F8F6F0] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-800">
            <span>Confession de Foi Historique</span>
            <span aria-hidden="true">·</span>
            <span>Doctrine Biblique</span>
          </div>
          <h2 className="font-sacred text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Les 4 Vérités Fondamentales des Assemblées de Dieu
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Dès ses origines en 1914, le mouvement mondial des Assemblées de Dieu s'est articulé autour de quatre piliers bibliques immuables, centrés sur la personne et l'œuvre souveraine de notre Seigneur Jésus-Christ.
          </p>
        </div>

        {/* 2-Column Responsive Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Doctrines Selector */}
          <div className="lg:col-span-5 space-y-3">
            {DOCTRINES.map((doc, idx) => {
              const isSelected = selectedDoctrine.id === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctrine(doc)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-left flex items-start gap-4 ${
                    isSelected
                      ? 'bg-white border-blue-900 shadow-md ring-1 ring-blue-900/10'
                      : 'bg-white/70 hover:bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${
                      isSelected ? 'bg-amber-50 border border-amber-200/80' : 'bg-stone-100'
                    }`}
                  >
                    {getIcon(doc.symbol)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Vérité 0{idx + 1}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-blue-900 translate-x-1' : 'text-stone-300'
                        }`}
                      />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mt-0.5">{doc.title}</h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-1">{doc.scriptureRef}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Curatorial Detail Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                  {selectedDoctrine.subtitle}
                </span>
                <h3 className="font-sacred text-2xl font-bold text-slate-900">
                  {selectedDoctrine.title}
                </h3>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 shrink-0">
                {getIcon(selectedDoctrine.symbol)}
              </div>
            </div>

            {/* Scripture Highlight Box */}
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Passage Biblique Fondateur ({selectedDoctrine.scriptureRef})</span>
                </div>
                <button
                  onClick={() =>
                    handleCopyPassage(
                      `${selectedDoctrine.scriptureText} — ${selectedDoctrine.scriptureRef}`,
                      selectedDoctrine.id
                    )
                  }
                  className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-blue-900 font-medium transition-colors"
                  title="Copier le verset"
                >
                  {copiedRef === selectedDoctrine.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copié</span>
                    </>
                  ) : (
                    <span>Copier le texte</span>
                  )}
                </button>
              </div>
              <blockquote className="text-sm sm:text-base font-serif italic text-stone-800 leading-relaxed border-l-2 border-amber-500 pl-4">
                {selectedDoctrine.scriptureText}
              </blockquote>
            </div>

            {/* Doctrinal Exposition */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-500">
                Explication Théologique
              </h4>
              <p className="text-sm text-stone-700 leading-relaxed">
                {selectedDoctrine.description}
              </p>
            </div>

            {/* Affirmation Badge */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="text-[11px] text-stone-500">
                Assemblée de Dieu · Fondement de Foi Inaltérable
              </span>
              <span className="text-amber-800 font-medium font-serif italic">
                Sola Scriptura · Sola Fide · Sola Gratia
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
