import React from 'react';
import { ChurchLogo } from './ChurchLogo';
import { NavTab } from './Navbar';
import { Calendar, PlayCircle, HeartHandshake, Compass, Clock, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: NavTab) => void;
  onOpenSchedule: () => void;
  onOpenLogoShowcase: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenSchedule,
  onOpenLogoShowcase,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white w-full max-w-full">
      {/* Background Photography with WCAG-compliant Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/church_sanctuary_interior_1793033378656.jpg"
          alt="Sanctuaire de l'Église Assemblée de Dieu"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-105"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient scrim for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl space-y-6">
          {/* Institutional Trust Kicker (Quiet unboxed text) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 font-medium tracking-wide">
            <span className="uppercase tracking-widest">Assemblée de Dieu du Togo</span>
            <span aria-hidden="true">·</span>
            <span>Temple de la Résurrection</span>
            <span aria-hidden="true">·</span>
            <span>Adamavo 2, Lomé</span>
          </div>

          {/* Display Headline with balance */}
          <h1 className="font-sacred text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] text-balance">
            Une Église Vivante pour Annoncer le Christ Ressuscité
          </h1>

          {/* Subheading Body */}
          <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed max-w-2xl font-light">
            Bienvenue à l'Église des Assemblées de Dieu — <strong>Temple de la Résurrection</strong> à Adamavo 2 (Lomé), sous la conduite spirituelle du <strong>Pasteur AMOUZOU</strong>. Une communauté sanctifiée où la Parole est annoncée avec puissance et où le Saint-Esprit guérit et libère.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('sermons')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:brightness-105 transition-all shadow-md active:scale-98 whitespace-nowrap"
            >
              <PlayCircle className="w-4 h-4 text-slate-950" />
              <span>Prédications du Pasteur AMOUZOU</span>
            </button>

            <button
              onClick={() => onNavigate('prayer')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/25 rounded-lg transition-colors backdrop-blur-xs active:scale-98 whitespace-nowrap"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>Mur de Prière & Intercession</span>
            </button>

            <button
              onClick={onOpenLogoShowcase}
              className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Découvrir notre Logo & Sceau</span>
            </button>
          </div>
        </div>

        {/* Operational Utility Ribbon below the hero text (Institutional Pattern A) */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 backdrop-blur-xs">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Cultes du Dimanche</p>
              <p className="text-slate-300">Dimanche 07h00 & 09h00</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 backdrop-blur-xs">
            <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Étude Biblique</p>
              <p className="text-slate-300">Mercredi à 18h30</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 backdrop-blur-xs">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="truncate">
              <p className="font-semibold text-white">Sanctuaire Adamavo 2</p>
              <p className="text-slate-300 truncate">Lomé — Togo</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 backdrop-blur-xs">
            <div>
              <p className="font-semibold text-white">Pasteur AMOUZOU</p>
              <p className="text-slate-300">Entrée libre & accueil fraternel</p>
            </div>
            <button
              onClick={onOpenSchedule}
              className="text-amber-400 hover:text-amber-300 font-semibold underline text-xs shrink-0 ml-2"
            >
              Horaires
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
