import React, { useState } from 'react';
import {
  HISTORY_ERAS,
  CURRENT_NATIONAL_BUREAU,
  FORMER_LEADERS,
  CHURCH_INFO,
} from '../data/churchData';
import { ChurchLogo } from './ChurchLogo';
import { NavTab } from './Navbar';
import {
  History,
  Users,
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Flame,
  ArrowRight,
  Landmark,
  BookOpen,
} from 'lucide-react';

interface HistorySectionProps {
  onNavigate?: (tab: NavTab) => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ onNavigate }) => {
  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'bureau' | 'former' | 'local'>('timeline');
  const [selectedEraIndex, setSelectedEraIndex] = useState(0);

  const selectedEra = HISTORY_ERAS[selectedEraIndex];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20 w-full max-w-full overflow-x-hidden">
      {/* Header Banner */}
      <div className="w-full bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white border-b border-amber-500/20 pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Mémoire & Héritage Pentecôtiste
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-stone-300 bg-white/10 px-2.5 py-1 rounded-full">
              <Calendar className="w-3 h-3 text-amber-300" />
              1914 – Aujourd’hui (Plus d’un siècle de grâce)
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-sacred text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Histoire & Gouvernance des <span className="text-amber-400">Assemblées de Dieu</span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              De l’effusion spirituelle mondiale de 1914 à l’implantation pionnière de 1936 au Togo, découvrez la trajectoire providentielle de notre mouvement, ses bâtisseurs d’hier et le Bureau Exécutif National actuellement en charge.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <span className="block text-2xl font-bold text-amber-300 font-sacred">1914</span>
              <span className="text-xs text-stone-300">Fondation mondiale (Hot Springs)</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <span className="block text-2xl font-bold text-amber-300 font-sacred">1936</span>
              <span className="text-xs text-stone-300">Arrivée au Togo</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <span className="block text-2xl font-bold text-amber-300 font-sacred">37 Ans</span>
              <span className="text-xs text-stone-300">Présidence Rév. Djakouti (1987-2024)</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <span className="block text-2xl font-bold text-amber-300 font-sacred">2024–2029</span>
              <span className="text-xs text-stone-300">Bureau Élu (Prés. Rév. Dr. ADADÉ)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-2 grid grid-cols-2 lg:grid-cols-4 gap-2 sticky top-24 z-30">
          <button
            onClick={() => setActiveSubTab('timeline')}
            className={`w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeSubTab === 'timeline'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <History className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Grandes Étapes</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bureau')}
            className={`w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeSubTab === 'bureau'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Landmark className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Bureau National</span>
          </button>

          <button
            onClick={() => setActiveSubTab('former')}
            className={`w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeSubTab === 'former'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Anciens Dirigeants</span>
          </button>

          <button
            onClick={() => setActiveSubTab('local')}
            className={`w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeSubTab === 'local'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Sanctuaire Local</span>
          </button>
        </div>

        {/* SUBTAB 1: TIMELINE */}
        {activeSubTab === 'timeline' && (
          <div className="mt-8 space-y-8">
            {/* Era Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {HISTORY_ERAS.map((era, idx) => {
                const isSelected = selectedEraIndex === idx;
                return (
                  <button
                    key={era.period}
                    onClick={() => setSelectedEraIndex(idx)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <span className={`text-xs font-bold block ${isSelected ? 'text-amber-300' : 'text-blue-900'}`}>
                      {era.period}
                    </span>
                    <span className={`text-xs font-semibold line-clamp-1 mt-1 ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                      {era.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Era Spotlight Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-200 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold rounded-lg text-sm font-sacred">
                      {selectedEra.period}
                    </span>
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                      Étape N° {selectedEraIndex + 1} sur {HISTORY_ERAS.length}
                    </span>
                  </div>
                  <h2 className="font-sacred text-2xl sm:text-3xl font-bold text-slate-900">
                    {selectedEra.title}
                  </h2>
                  <p className="text-sm font-medium text-amber-800">
                    {selectedEra.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    disabled={selectedEraIndex === 0}
                    onClick={() => setSelectedEraIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-stone-200 disabled:opacity-40 hover:bg-stone-50"
                  >
                    Précédent
                  </button>
                  <button
                    disabled={selectedEraIndex === HISTORY_ERAS.length - 1}
                    onClick={() => setSelectedEraIndex((prev) => Math.min(HISTORY_ERAS.length - 1, prev + 1))}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-900 text-white disabled:opacity-40 hover:bg-blue-950"
                  >
                    Suivant
                  </button>
                </div>
              </div>

              {/* Description Body */}
              <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed text-sm sm:text-base">
                <p>{selectedEra.description}</p>
              </div>

              {/* Key Events & Historical Milestones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                <div className="space-y-3 bg-stone-50 rounded-xl p-5 border border-stone-200">
                  <h3 className="font-sacred text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Faits Marquants & Réalisations</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {selectedEra.keyEvents.map((evt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-900 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{evt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 bg-amber-50/50 rounded-xl p-5 border border-amber-200/60">
                  <h3 className="font-sacred text-sm font-bold text-amber-950 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-700" />
                    <span>Figures Emblématiques & Ouvriers de cette Ère</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {selectedEra.figures.map((fig, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-amber-900 font-medium">
                        <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{fig}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3 border-t border-amber-200/50 text-[11px] text-amber-800 italic">
                    « Souvenez-vous de vos conducteurs qui vous ont annoncé la parole de Dieu ; considérez quelle a été la fin de leur vie, et imitez leur foi. » — Hébreux 13:7
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Horizontal Timeline Scroll */}
            <div className="space-y-4">
              <h3 className="font-sacred text-lg font-bold text-slate-900">
                Vue d’Ensemble Chronologique Complète
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {HISTORY_ERAS.map((era, idx) => (
                  <div
                    key={era.period}
                    onClick={() => setSelectedEraIndex(idx)}
                    className="cursor-pointer bg-white rounded-xl border border-stone-200 p-4 hover:border-blue-900 hover:shadow-xs transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sacred font-bold text-base text-blue-900 group-hover:text-amber-600 transition-colors">
                        {era.period}
                      </span>
                      <span className="text-[10px] text-stone-400 font-bold uppercase">
                        Phase {idx + 1}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                      {era.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-3">
                      {era.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: CURRENT NATIONAL BUREAU */}
        {activeSubTab === 'bureau' && (
          <div className="mt-8 space-y-8">
            {/* Intro Context Banner */}
            <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 border border-amber-400/30 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Conseil Général Électif d’Atakpamé (16–18 Juillet 2024)
                    </span>
                  </div>
                  <h2 className="font-sacred text-2xl sm:text-3xl font-bold">
                    Bureau Exécutif National des Assemblées de Dieu du Togo
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                    Mandat quinquennal officiel (2024 – 2029). Cette équipe dirigeante de 7 serviteurs de Dieu a été régulièrement consacrée et élue pour présider aux destinées spirituelles, administratives et missionnaires de notre Église sur l’ensemble du territoire togolais.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 text-center shrink-0">
                  <span className="block text-xl font-bold text-amber-300 font-sacred">7 Membres</span>
                  <span className="text-[11px] text-stone-300">Bureau Exécutif Élu</span>
                </div>
              </div>
            </div>

            {/* President Spotlight Card */}
            {CURRENT_NATIONAL_BUREAU.length > 0 && (
              <div className="bg-white rounded-2xl border-2 border-amber-400/80 p-6 sm:p-8 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-slate-950 font-bold text-[11px] px-4 py-1 rounded-bl-xl tracking-wider uppercase">
                  Président National Élu
                </div>

                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="p-4 bg-blue-950 text-amber-400 rounded-2xl shrink-0 border border-amber-400/40">
                    <ChurchLogo variant="mark" size="lg" />
                  </div>

                  <div className="space-y-3 flex-1">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-900 rounded-md text-xs font-bold">
                          {CURRENT_NATIONAL_BUREAU[0].role}
                        </span>
                        <span className="text-xs font-semibold text-stone-500">
                          Mandat : {CURRENT_NATIONAL_BUREAU[0].mandate}
                        </span>
                      </div>
                      <h3 className="font-sacred text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                        {CURRENT_NATIONAL_BUREAU[0].name}
                      </h3>
                      <p className="text-xs font-semibold text-amber-800">
                        {CURRENT_NATIONAL_BUREAU[0].title}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {CURRENT_NATIONAL_BUREAU[0].description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-600">
                      <span className="flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Élu au Conseil Général d’Atakpamé
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Landmark className="w-3.5 h-3.5 text-blue-900" />
                        Représentant légal de l'Église au Togo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* The 6 Other National Executive Bureau Members Grid */}
            <div className="space-y-4">
              <h3 className="font-sacred text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-900" />
                <span>Les Autres Membres du Bureau Exécutif National (2024 – 2029)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CURRENT_NATIONAL_BUREAU.slice(1).map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 hover:border-blue-400"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-blue-900 border border-stone-200">
                          {member.role}
                        </span>
                        <span className="text-[10px] text-stone-500 font-semibold">
                          {member.mandate}
                        </span>
                      </div>

                      <h4 className="font-sacred text-base font-bold text-slate-900">
                        {member.name}
                      </h4>
                      <p className="text-xs text-amber-800 font-medium">
                        {member.title}
                      </p>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {member.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                      <span>Prise de fonction : {member.since}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Communique / Resolution Box */}
            <div className="bg-stone-100 rounded-xl p-6 border border-stone-200 text-xs text-stone-700 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-900" />
                <span>Extrait des Résolutions du Conseil Général d’Atakpamé 2024</span>
              </div>
              <p className="leading-relaxed">
                Le Conseil Général des Assemblées de Dieu du Togo invite solennellement l’ensemble des pasteurs, des diacres, des comités paroissiaux et de tous les fidèles à porter le nouveau Bureau Exécutif National en prière quotidienne, afin que la grâce, la sagesse divine et l’onction du Saint-Esprit reposent sur la présidence du Révérend Dr. ADADÉ Ayi et l’ensemble de ses collaborateurs.
              </p>
            </div>
          </div>
        )}

        {/* SUBTAB 3: FORMER LEADERS */}
        {activeSubTab === 'former' && (
          <div className="mt-8 space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                Gratitude & Hommage aux Pères
              </span>
              <h2 className="font-sacred text-2xl sm:text-3xl font-bold text-slate-900">
                Les Anciens Dirigeants & Bâtisseurs Historiques
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                Ceux qui ont semé dans les larmes et la consécration pour que l’Église des Assemblées de Dieu du Togo devienne un sanctuaire de lumière pour des millions d’âmes.
              </p>
            </div>

            {/* Focus: Reverend Pasteur Djakouti Mitre (37 years) */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-100 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-md text-xs font-bold font-sacred">
                      Présidence Historique : 1987 – Juillet 2024 (37 ans)
                    </span>
                  </div>
                  <h3 className="font-sacred text-2xl sm:text-3xl font-bold text-slate-900">
                    Révérend Pasteur Djakouti Mitré
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-amber-800">
                    Président National Émérite des Assemblées de Dieu du Togo
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 shrink-0">
                  <Award className="w-8 h-8 text-amber-700" />
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p>
                  Pendant 37 années ininterrompues (1987 à 2024), le <strong>Révérend Pasteur Djakouti Mitré</strong> a incarné la direction visionnaire et paternelle des Assemblées de Dieu au Togo. Sous son mandat, l’Église a connu sa plus vaste expansion territoriale : de Lomé jusqu’à Cinkassé, des milliers de paroisses ont été fondées, des centres d’apprentissage biblique créés, et des œuvres sociales majeures (écoles, cliniques, forages et orphelinats) implantées dans les zones rurales les plus reculées.
                </p>
                <p>
                  Son sens élevé de la conciliation, son respect scrupuleux des Saintes Écritures et son autorité morale lui ont valu une reconnaissance unanime tant auprès des autorités togolaises que des instances chrétiennes internationales (Alliance Évangélique, Fraternité Mondiale des Assemblées de Dieu).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <span className="text-xs font-bold text-blue-900 block">Expansion Nationale</span>
                  <span className="text-[11px] text-stone-600 mt-1 block">
                    Structuration des 5 régions ecclésiastiques et implantation de milliers de sanctuaires.
                  </span>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <span className="text-xs font-bold text-blue-900 block">Formation Pastorale</span>
                  <span className="text-[11px] text-stone-600 mt-1 block">
                    Consolidation de l'Institut Théologique de Sada et de la faculté ESTAO à Lomé.
                  </span>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <span className="text-xs font-bold text-blue-900 block">Transmission Pacifique</span>
                  <span className="text-[11px] text-stone-600 mt-1 block">
                    Passage de témoin fraternel au Conseil Général d’Atakpamé en juillet 2024.
                  </span>
                </div>
              </div>
            </div>

            {/* Other Pioneer Figures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FORMER_LEADERS.slice(1).map((leader, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 px-2.5 py-0.5 rounded bg-blue-50">
                      {leader.period}
                    </span>
                    <span className="text-xs text-stone-500 font-semibold">{leader.role}</span>
                  </div>
                  <h4 className="font-sacred text-lg font-bold text-slate-900">
                    {leader.name}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {leader.impact}
                  </p>
                </div>
              ))}

              <div className="bg-amber-50/60 rounded-xl border border-amber-200/80 p-6 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Devise et Fidélité Doctrinale</span>
                </div>
                <p className="text-xs text-amber-950 font-sacred text-base italic leading-relaxed">
                  « La Parole de Dieu n’est point liée. Ce que nous avons reçu de nos devanciers, nous le transmettons intact à la nouvelle génération. »
                </p>
                <p className="text-[11px] text-amber-800">
                  Fidélité au baptême dans le Saint-Esprit, à la sainteté pratique et à l’attente bienheureuse du retour de Jésus-Christ.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: LOCAL PARISH ANCHOR */}
        {activeSubTab === 'local' && (
          <div className="mt-8 space-y-8">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-stone-100 pb-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-900 font-bold rounded-lg text-xs font-sacred">
                    Paroisse Locale · Quartier Adamavo 2, Lomé
                  </span>
                  <h2 className="font-sacred text-2xl sm:text-3xl font-bold text-slate-900">
                    {CHURCH_INFO.tagline}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Affiliée à l’Église Évangélique des Assemblées de Dieu du Togo
                  </p>
                </div>

                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 shrink-0">
                  <ChurchLogo variant="mark" size="md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-sacred text-base font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-900" />
                    <span>Direction Pastorale Locale</span>
                  </h3>
                  <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-2">
                    <span className="text-xs text-amber-800 font-bold block uppercase tracking-wider">
                      Pasteur Principal
                    </span>
                    <h4 className="font-sacred text-xl font-bold text-slate-900">
                      {CHURCH_INFO.headPastor}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Sous la grâce de Dieu et en communion fraternelle avec le Bureau National présidé par le Rév. Dr. ADADÉ Ayi, le Pasteur AMOUZOU conduit la communauté d’Adamavo 2 dans l’adoration véritable, l’intercession, l’édification des familles et l’impact spirituel de la zone portuaire de Lomé.
                    </p>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-2">
                    <span className="text-xs text-stone-500 font-semibold block">
                      Corps Diaconal & Anciens
                    </span>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      Un collège d’anciens et de diacres consacrés veille au bon ordre du culte, à l’assistance aux membres vulnérables, à l’évangélisation et à la gestion transparente des ressources locales.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-sacred text-base font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-900" />
                    <span>Cultes & Rendez-vous Spirituels</span>
                  </h3>
                  <div className="space-y-2.5">
                    {CHURCH_INFO.services.map((srv, idx) => (
                      <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-blue-900 block">{srv.day} : {srv.name}</span>
                          <span className="text-[11px] text-stone-600 block mt-0.5">{srv.desc}</span>
                        </div>
                        <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-1 rounded-md shrink-0 border border-amber-200">
                          {srv.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  {onNavigate && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => onNavigate('portals')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors"
                      >
                        <span>Espaces Diacre / Pasteur</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onNavigate('sermons')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
                      >
                        <span>Écouter les Prédications</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
