import React from 'react';
import { ChurchLogo } from './ChurchLogo';
import { NavTab } from './Navbar';
import { CHURCH_INFO } from '../data/churchData';
import { MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onOpenSchedule: () => void;
  onOpenLogoShowcase: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSchedule,
  onOpenLogoShowcase,
}) => {
  return (
    <footer className="bg-slate-950 text-stone-300 border-t border-slate-800 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Church Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ChurchLogo variant="mark" size="md" />
              <div>
                <span className="font-sacred font-bold text-white text-base tracking-wider block">
                  Assemblée de Dieu
                </span>
                <span className="text-[11px] text-amber-400 uppercase tracking-widest block font-medium">
                  Temple de la Résurrection · Adamavo 2, Lomé
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm">
              Église Évangélique des Assemblées de Dieu du Togo. Communauté sanctifiée à Adamavo 2 (Lomé), sous la direction du Pasteur AMOUZOU, proclamant l'Évangile intégral pour le salut et la résurrection spirituelle.
            </p>

            <div className="pt-1">
              <button
                onClick={onOpenLogoShowcase}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-950 border border-amber-800/60 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Voir la Signification du Sceau Officiel</span>
              </button>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Accueil & Vérités Fondamentales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-white transition-colors text-amber-300 font-medium"
                >
                  Histoire & Bureau National (Togo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portals')}
                  className="hover:text-white transition-colors text-stone-300"
                >
                  Espaces Rôles (Pasteur, Diacre, Admin, Membre)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sermons')}
                  className="hover:text-white transition-colors"
                >
                  Prédications & Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('prayer')}
                  className="hover:text-white transition-colors"
                >
                  Mur d'Intercession & Prière
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jad')}
                  className="hover:text-white transition-colors text-purple-300 font-semibold"
                >
                  ⚡ Groupe de la J.A.D. (Jeunesse)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ministries')}
                  className="hover:text-white transition-colors"
                >
                  Départements (Dorcas, Hommes, ECODIM...)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hymns')}
                  className="hover:text-white transition-colors"
                >
                  Recueil de Cantiques
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('giving')}
                  className="hover:text-white transition-colors"
                >
                  Dîmes & Soutien Missionnaire (FCFA)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Rassemblements */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Cultes & Horaires
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Dimanche Matin</span>
                  <span>07h00 & 09h00 (Deux cultes)</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Mercredi Soir</span>
                  <span>18h30 · Étude Biblique</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Vendredi Soir</span>
                  <span>18h30 · Veillée de Prière</span>
                </div>
              </div>
              <button
                onClick={onOpenSchedule}
                className="text-amber-400 hover:text-amber-300 font-semibold underline text-xs pt-1 block"
              >
                Tous les horaires & calendrier .ics
              </button>
            </div>
          </div>

          {/* Col 5: Coordonnées pastorales */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Contact & Écoute
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{CHURCH_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{CHURCH_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{CHURCH_INFO.email}</span>
              </div>
              <p className="text-[11px] text-amber-300/80 pt-1 font-serif italic">
                {CHURCH_INFO.headPastor}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Église Évangélique Assemblée de Dieu. Tous droits réservés.</p>
          <p className="font-sacred text-stone-400 tracking-wider">
            « Jésus-Christ est Seigneur » · Philippiens 2:11
          </p>
        </div>
      </div>
    </footer>
  );
};
