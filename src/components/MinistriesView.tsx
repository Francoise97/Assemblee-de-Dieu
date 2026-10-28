import React, { useState } from 'react';
import { MINISTRIES, Ministry } from '../data/churchData';
import { Users, Clock, Compass, Check, ArrowRight, X, HeartHandshake, Flame } from 'lucide-react';

interface MinistriesViewProps {
  onNavigateToJad?: () => void;
}

export const MinistriesView: React.FC<MinistriesViewProps> = ({ onNavigateToJad }) => {
  const [selectedMinistryForSignup, setSelectedMinistryForSignup] = useState<Ministry | null>(null);
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerContact, setVolunteerContact] = useState('');
  const [volunteerMotivation, setVolunteerMotivation] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupSuccess(true);
    setTimeout(() => {
      setSignupSuccess(false);
      setSelectedMinistryForSignup(null);
      setVolunteerName('');
      setVolunteerContact('');
      setVolunteerMotivation('');
    }, 2000);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner with Congregation Photo */}
        <div className="relative rounded-3xl overflow-hidden shadow-sm border border-stone-200">
          <img
            src="/src/assets/images/community_worship_gathering_1793033379333.jpg"
            alt="Communauté de l'Assemblée de Dieu rassemblée dans la louange"
            className="w-full h-64 sm:h-80 object-cover filter brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute bottom-8 left-6 sm:left-10 right-6 text-white max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Corps du Christ en Action
            </span>
            <h1 className="font-sacred text-2xl sm:text-4xl font-bold tracking-tight">
              Ministères & Départements de l'Assemblée de Dieu
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
              Chaque croyant a reçu des talents et des dons spirituels pour l'édification commune. Découvrez les départements adaptés à chaque âge et chaque appel divin.
            </p>
          </div>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-5"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                    {m.acronym}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                    <Users className="w-3.5 h-3.5 text-blue-900" />
                    <span className="truncate max-w-[140px]">{m.target}</span>
                  </div>
                </div>

                {/* Title & Mission */}
                <div className="space-y-1.5">
                  <h3 className="font-sacred text-lg font-bold text-slate-900">
                    {m.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {m.mission}
                  </p>
                </div>

                {/* Schedule & Leader */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="font-semibold text-slate-800">{m.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                    <Compass className="w-3.5 h-3.5 text-blue-800 shrink-0" />
                    <span>Responsable : {m.leader}</span>
                  </div>
                </div>

                {/* Activities list */}
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400">
                    Activités & Actions Clés :
                  </span>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {m.activities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 text-sm leading-none">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Motto and Action */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <blockquote className="text-[11px] font-serif italic text-stone-500">
                  {m.motto}
                </blockquote>
                {m.id === 'jad' && onNavigateToJad && (
                  <button
                    onClick={onNavigateToJad}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-900 to-indigo-950 hover:brightness-110 rounded-xl transition-all shadow-xs"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>Ouvrir l'Espace Groupe J.A.D.</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedMinistryForSignup(m)}
                  className={`w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
                    m.id === 'jad'
                      ? 'text-stone-700 bg-stone-100 hover:bg-stone-200'
                      : 'text-blue-900 bg-blue-50 hover:bg-blue-900 hover:text-white'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>S'engager / Servir</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Volunteer Signup Modal */}
        {selectedMinistryForSignup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
                <h3 className="font-sacred text-base font-bold text-slate-900">
                  Rejoindre le département {selectedMinistryForSignup.acronym}
                </h3>
                <button
                  onClick={() => setSelectedMinistryForSignup(null)}
                  className="p-1 text-stone-400 hover:text-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {signupSuccess ? (
                  <div className="text-center py-6 space-y-2 text-emerald-900">
                    <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-base">Engagement Reçu avec Joie !</h4>
                    <p className="text-xs text-emerald-700">
                      Le responsable du département vous contactera très prochainement pour votre accueil et votre intégration.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                    <p className="text-xs text-stone-600">
                      Vous souhaitez mettre vos dons spirituels et vos compétences au service de l'Église au sein de : <strong>{selectedMinistryForSignup.name}</strong>.
                    </p>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Nom & Prénom *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: David Kouadio"
                        value={volunteerName}
                        onChange={(e) => setVolunteerName(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Téléphone ou Email *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: +33 6 12 34 56 78 ou email@domaine.com"
                        value={volunteerContact}
                        onChange={(e) => setVolunteerContact(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Vos dons, disponibilités ou motivations</label>
                      <textarea
                        rows={3}
                        placeholder="Précisez brièvement vos talents (chant, enseignement, logistique, écoute...)"
                        value={volunteerMotivation}
                        onChange={(e) => setVolunteerMotivation(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 resize-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMinistryForSignup(null)}
                        className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow-xs"
                      >
                        Valider mon Inscription
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
