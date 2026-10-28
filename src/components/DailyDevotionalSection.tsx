import React, { useState } from 'react';
import { DAILY_DEVOTIONAL } from '../data/churchData';
import { BookMarked, Share2, Check, Sparkles, Heart, Volume2, VolumeX } from 'lucide-react';

export const DailyDevotionalSection: React.FC = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopy = () => {
    const textToCopy = `« ${DAILY_DEVOTIONAL.title} »\n${DAILY_DEVOTIONAL.scriptureRef} : ${DAILY_DEVOTIONAL.scriptureText}\n\nMéditation : ${DAILY_DEVOTIONAL.reflection}\n\nPrière : ${DAILY_DEVOTIONAL.prayer}\n\n— Pain Quotidien Assemblée de Dieu`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Atmospheric Bible Study Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-sm border border-stone-200 min-h-[320px] lg:min-h-full">
            <img
              src="/src/assets/images/pastor_bible_study_1793033379451.jpg"
              alt="La Sainte Bible ouverte pour l'étude quotidienne"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">
                Pain Vivant du Jour
              </span>
              <h3 className="font-sacred text-xl font-bold">{DAILY_DEVOTIONAL.date}</h3>
              <p className="text-xs text-slate-200 font-light">
                « Ta parole est une lampe à mes pieds, et une lumière sur mon sentier. » — Psaume 119:105
              </p>
            </div>
          </div>

          {/* Right Column: Devotional Content & Reflection */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Header with utility actions */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-900">
                    Méditation Biblique Quotidienne
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="p-1.5 text-stone-600 hover:text-blue-900 bg-white border border-stone-200 rounded-lg text-xs flex items-center gap-1 transition-colors"
                    title={isPlayingAudio ? 'Arrêter la lecture' : 'Écouter la méditation'}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                        <span className="text-[11px] text-rose-600 font-medium">Lecture active...</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-stone-600" />
                        <span className="text-[11px] hidden sm:inline">Écouter</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleToggleSave}
                    className={`p-1.5 rounded-lg border text-xs transition-colors ${
                      isSaved
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-white text-stone-600 hover:text-stone-900 border-stone-200'
                    }`}
                    title={isSaved ? 'Enregistré dans vos favoris' : 'Enregistrer'}
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleCopy}
                    className="p-1.5 bg-white text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg text-xs flex items-center gap-1 transition-colors"
                    title="Partager ou copier"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    {copied && <span className="text-[11px] text-emerald-700">Copié</span>}
                  </button>
                </div>
              </div>

              {/* Title & Scripture */}
              <div>
                <h3 className="font-sacred text-2xl font-bold text-slate-900">
                  {DAILY_DEVOTIONAL.title}
                </h3>
                <span className="text-xs font-semibold text-blue-900 tracking-wide mt-1 block">
                  {DAILY_DEVOTIONAL.scriptureRef}
                </span>
              </div>

              {/* Biblical Verse */}
              <blockquote className="p-4 bg-white rounded-xl border border-stone-200 text-sm font-serif italic text-stone-800 leading-relaxed">
                {DAILY_DEVOTIONAL.scriptureText}
              </blockquote>

              {/* Reflection */}
              <div className="space-y-1.5">
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-500">
                  Commentaire Pastorale
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {DAILY_DEVOTIONAL.reflection}
                </p>
              </div>

              {/* Prayer */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Heart className="w-3.5 h-3.5 text-amber-700" />
                  <span>Prière d'Appropriation</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed italic">
                  {DAILY_DEVOTIONAL.prayer}
                </p>
              </div>
            </div>

            {/* Daily Declaration */}
            <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-600">
              <span className="font-medium text-blue-900 font-sans">
                Déclaration de foi :
              </span>
              <span className="font-semibold text-slate-900 text-right">
                {DAILY_DEVOTIONAL.declaration}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
