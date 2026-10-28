import React, { useState } from 'react';
import { ChurchLogo } from './ChurchLogo';
import {
  Flame,
  Users,
  Calendar,
  Sparkles,
  HeartHandshake,
  Music,
  Send,
  HelpCircle,
  CheckCircle,
  Coins,
  Shield,
  BookOpen,
  Award,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Share2,
} from 'lucide-react';

interface JadMemberSignup {
  fullName: string;
  phone: string;
  age: string;
  status: string;
  commission: string;
}

interface JadQuestion {
  id: string;
  date: string;
  question: string;
  category: string;
  answered: boolean;
}

interface JadTestimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
}

export const JadView: React.FC = () => {
  // Active sub-tab in JAD View
  const [activeSubTab, setActiveSubTab] = useState<'presentation' | 'bureau' | 'adhesion' | 'cotisations' | 'questions'>('presentation');

  // Adhesion form state
  const [signupData, setSignupData] = useState<JadMemberSignup>({
    fullName: '',
    phone: '',
    age: '',
    status: 'Étudiant(e)',
    commission: 'Chorale & Louange JAD',
  });
  const [signupDone, setSignupDone] = useState(false);

  // Cotisation state (in pure FCFA)
  const [cotisationAmount, setCotisationAmount] = useState<number>(1000);
  const [cotisationType, setCotisationType] = useState<'mensuelle' | 'camp' | 'instrument' | 'social'>('mensuelle');
  const [cotisationPhone, setCotisationPhone] = useState('');
  const [cotisationName, setCotisationName] = useState('');
  const [cotisationOperator, setCotisationOperator] = useState<'tmoney' | 'flooz'>('tmoney');
  const [cotisationSuccess, setCotisationSuccess] = useState(false);

  // Question box state
  const [userQuestion, setUserQuestion] = useState('');
  const [questionCategory, setQuestionCategory] = useState('Vie Affective & Mariage');
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  const [questionsList, setQuestionsList] = useState<JadQuestion[]>([
    {
      id: 'q-1',
      date: 'Cette semaine',
      question: 'Comment préserver sa sainteté et sa pureté dans un environnement universitaire ou professionnel ?',
      category: 'Sanctification',
      answered: true,
    },
    {
      id: 'q-2',
      date: 'Hier',
      question: 'Quels sont les repères bibliques pour discerner la volonté de Dieu dans le choix de son conjoint ?',
      category: 'Vie Affective & Mariage',
      answered: true,
    },
    {
      id: 'q-3',
      date: 'Aujourd’hui',
      question: 'Peut-on concilier ambitions entrepreneuriales et service assidu à l’église ?',
      category: 'Travail & Vocation',
      answered: false,
    },
  ]);

  const testimonials: JadTestimonial[] = [
    {
      id: 't-1',
      author: 'Frère Mawuli',
      role: 'Chantre à la Louange JAD',
      text: 'La JAD d’Adamavo 2 a transformé ma vie spirituelle. En servant dans le groupe de louange, j’ai découvert mon appel et expérimenté le baptême dans le Saint-Esprit.',
      date: 'Il y a 3 jours',
    },
    {
      id: 't-2',
      author: 'Sœur Delphine',
      role: 'Étudiante à l’Université de Lomé',
      text: 'Grâce aux jeûnes et prières du samedi matin avec la jeunesse, Dieu m’a accordé la grâce de valider ma licence avec mention et la paix dans mon foyer.',
      date: 'Dimanche dernier',
    },
    {
      id: 't-3',
      author: 'Frère Kévin',
      role: 'Responsable Évangélisation de Rue',
      text: 'Lors de notre sortie d’évangélisation au carrefour Adamavo, 8 jeunes ont donné leur cœur à Jésus et sont aujourd’hui baptisés dans l’eau.',
      date: 'Le mois passé',
    },
  ];

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.fullName || !signupData.phone) return;
    setSignupDone(true);
    setTimeout(() => {
      setSignupDone(false);
      setSignupData({
        fullName: '',
        phone: '',
        age: '',
        status: 'Étudiant(e)',
        commission: 'Chorale & Louange JAD',
      });
    }, 3000);
  };

  const handleCotisationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cotisationAmount <= 0) return;
    setCotisationSuccess(true);
    setTimeout(() => {
      setCotisationSuccess(false);
      setCotisationPhone('');
    }, 3000);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    const newQ: JadQuestion = {
      id: `q-${Date.now()}`,
      date: 'À l’instant',
      question: userQuestion.trim(),
      category: questionCategory,
      answered: false,
    };
    setQuestionsList([newQ, ...questionsList]);
    setUserQuestion('');
    setQuestionSubmitted(true);
    setTimeout(() => setQuestionSubmitted(false), 2500);
  };

  return (
    <div className="py-10 sm:py-14 bg-[#FAF8F5] min-h-[calc(100vh-80px)] w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 w-full">
        {/* Hero Banner JAD */}
        <div className="relative rounded-3xl overflow-hidden shadow-md border border-purple-200/80 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-purple-500/10 to-transparent pointer-events-none" />
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Mouvement Officiel de la Jeunesse Chrétienne</span>
              </div>
              <div className="text-xs font-mono text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                Paroisse Temple de la Résurrection · Adamavo 2, Lomé
              </div>
            </div>

            <div className="space-y-3 max-w-3xl">
              <h1 className="font-sacred text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                J.A.D. — Jeunesse des Assemblées de Dieu
              </h1>
              <p className="text-base sm:text-lg text-amber-200 font-sacred italic">
                « Jeune pour Christ ! — Un modèle en parole, en conduite, en foi et en pureté. »
              </p>
              <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                Bienvenue dans l'espace officiel du groupe de la J.A.D. du Temple de la Résurrection (Lomé, Togo). 
                Ici bat le cœur de la jeunesse pentecôtiste : louange enflammée, études bibliques profondes, 
                évangélisation urbaine, amitiés chrétiennes durables et accomplissement des vocations.
              </p>
            </div>

            {/* Pillar Verse Banner */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-amber-300">Verset Thème : 1 Timothée 4:12</span>
                <p className="text-slate-100 italic">
                  « Que personne ne méprise ta jeunesse ; mais sois un modèle pour les fidèles, en parole, en conduite, en charité, en foi, en pureté. »
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xl sm:text-2xl font-bold font-sacred text-amber-400 block">120+</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">Jeunes Actifs</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xl sm:text-2xl font-bold font-sacred text-white block">Samedi 16h</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">Culte de Jeunesse</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xl sm:text-2xl font-bold font-sacred text-purple-300 block">5 Pôles</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">Commissions</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xl sm:text-2xl font-bold font-sacred text-emerald-400 block">100% FCFA</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">Gérance Transparente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
          {[
            { id: 'presentation', label: 'Vision & Piliers' },
            { id: 'bureau', label: 'Bureau Exécutif JAD' },
            { id: 'adhesion', label: 'Rejoindre la JAD' },
            { id: 'cotisations', label: 'Cotisations & Projets (FCFA)' },
            { id: 'questions', label: 'Boîte aux Questions' },
          ].map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-purple-900 text-white border-purple-900 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ==================== SUB-TAB 1: PRESENTATION & PILIERS ==================== */}
        {activeSubTab === 'presentation' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* 4 Piliers Grid */}
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                  Fondements Spirituels
                </span>
                <h2 className="font-sacred text-2xl font-bold text-slate-900">
                  Les 4 Piliers de la Jeunesse des Assemblées de Dieu
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs hover:border-purple-300 transition-colors">
                  <div className="p-3 rounded-xl bg-purple-50 text-purple-900 w-fit">
                    <Flame className="w-5 h-5 text-purple-700" />
                  </div>
                  <h3 className="font-sacred text-base font-bold text-slate-900">
                    1. La Sanctification & le Saint-Esprit
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Vivre une vie pure, victorieuse sur les séductions du monde, et rechercher avec ferveur le baptême dans le Saint-Esprit selon Actes 1:8.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs hover:border-purple-300 transition-colors">
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-900 w-fit">
                    <Sparkles className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="font-sacred text-base font-bold text-slate-900">
                    2. L'Évangélisation Urbaine
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Proclamer l'Évangile sans honte dans les collèges, lycées, campus de Lomé et dans les quartiers d'Adamavo par des campagnes et des actions d'amour.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs hover:border-purple-300 transition-colors">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-900 w-fit">
                    <Award className="w-5 h-5 text-blue-900" />
                  </div>
                  <h3 className="font-sacred text-base font-bold text-slate-900">
                    3. L'Excellence Académique & Métier
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Être des premiers de classe, des artisans qualifiés et des professionnels chrétiens d'intégrité, modèles pour la nation togolaise (Daniel 1:20).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs hover:border-purple-300 transition-colors">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 w-fit">
                    <HeartHandshake className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-sacred text-base font-bold text-slate-900">
                    4. La Fraternité & l'Entraide
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Une vraie famille chrétienne où chaque jeune trouve réconfort, soutien mutuel, visites aux malades et entraide dans les études et projets.
                  </p>
                </div>
              </div>
            </div>

            {/* Commissions Grid */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <h3 className="font-sacred text-xl font-bold text-slate-900">
                    Les 5 Commissions d'Action de la JAD (Adamavo 2)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Où chaque jeune met ses dons et talents au service de Dieu
                  </p>
                </div>
                <button
                  onClick={() => setActiveSubTab('adhesion')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-purple-900 hover:bg-purple-950 rounded-xl transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Choisir ma Commission</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                    <Music className="w-4 h-4 text-purple-700" />
                    <h4>Chorale & Groupe Musical JAD</h4>
                  </div>
                  <p className="text-xs text-stone-600">
                    Animation de la louange des cultes du samedi, composition de cantiques en français et en éwé, formation musicale (piano, batterie, guitare).
                  </p>
                  <div className="text-[11px] text-stone-500 font-semibold">
                    Répétition : Vendredi 17h30 & Samedi 15h00
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                    <Send className="w-4 h-4 text-purple-700" />
                    <h4>Évangélisation & Actions Sociales</h4>
                  </div>
                  <p className="text-xs text-stone-600">
                    Évangélisation de rue, projection de films chrétiens, visites d’orphelinats et distribution de kits scolaires aux enfants démunis.
                  </p>
                  <div className="text-[11px] text-stone-500 font-semibold">
                    Sorties : 1er et 3ème samedis du mois
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                    <Shield className="w-4 h-4 text-purple-700" />
                    <h4>Intercession & Chaîne de Prière</h4>
                  </div>
                  <p className="text-xs text-stone-600">
                    Soutien dans la prière des pasteurs, des examens des étudiants, des malades et des retraites spirituelles de réveil.
                  </p>
                  <div className="text-[11px] text-stone-500 font-semibold">
                    Veille de Prière : Mercredi 05h00 & Samedi 06h00
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                    <Users className="w-4 h-4 text-purple-700" />
                    <h4>Accueil, Protocole & Ordre</h4>
                  </div>
                  <p className="text-xs text-stone-600">
                    Accueil chaleureux des nouveaux venus, distribution des bulletins, installation sous le sanctuaire et accompagnement fraternel.
                  </p>
                  <div className="text-[11px] text-stone-500 font-semibold">
                    Service : Samedi 15h30 & Dimanches
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-purple-700" />
                    <h4>Médias, Sonorisation & Digital</h4>
                  </div>
                  <p className="text-xs text-stone-600">
                    Réglage sonore de la chaire, diffusion des paroles de cantiques sur écran, prises de photos/vidéos et animation du groupe WhatsApp officiel.
                  </p>
                  <div className="text-[11px] text-stone-500 font-semibold">
                    Permanence : Chaque réunion
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                    <BookOpen className="w-4 h-4 text-purple-700" />
                    <h4>Études Bibliques & Débats</h4>
                  </div>
                  <p className="text-xs text-stone-600">
                    Organisation des tables rondes thématiques : « Pureté sexuelle », « Trouver son conjoint chrétien », « Réussir ses études ».
                  </p>
                  <div className="text-[11px] text-stone-500 font-semibold">
                    Séance : 2ème samedi du mois à 16h00
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                  Impact & Vies Transformées
                </span>
                <h3 className="font-sacred text-xl font-bold text-slate-900">
                  Témoignages des Jeunes de la JAD (Temple de la Résurrection)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 shadow-xs">
                    <p className="text-xs text-stone-700 leading-relaxed font-sans italic">
                      « {t.text} »
                    </p>
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{t.author}</span>
                        <span className="text-[11px] text-purple-700">{t.role}</span>
                      </div>
                      <span className="text-[10px] text-stone-400">{t.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== SUB-TAB 2: BUREAU EXECUTIF JAD ==================== */}
        {activeSubTab === 'bureau' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <span className="text-xs uppercase tracking-widest text-purple-800 font-bold">
                  Gouvernance Locale
                </span>
                <h2 className="font-sacred text-2xl font-bold text-slate-900">
                  Bureau Exécutif Local de la JAD (Mandat 2024–2026)
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Sous la supervision pastorale du Pasteur AMOUZOU, Pasteur Principal du Temple de la Résurrection (Adamavo 2, Lomé)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* President */}
                <div className="p-5 rounded-2xl border-2 border-purple-200 bg-purple-50/40 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-900 text-amber-300 font-bold flex items-center justify-center font-sacred text-base">
                      EA
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Frère Elom AMOUZOU</h4>
                      <span className="text-xs font-semibold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                        Président de la JAD
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Coordination générale des activités, impulsion spirituelle et liaison officielle avec le Conseil des Anciens et le Pasteur.
                  </p>
                  <div className="text-[11px] text-stone-500 font-mono">
                    Contact : +228 90 99 88 77
                  </div>
                </div>

                {/* Vice President */}
                <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center font-sacred text-base">
                      SA
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Sœur Sika AGBEKO</h4>
                      <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                        Vice-Présidente JAD
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Organisation des cultes jeunesse, suivi de l'intégration des nouvelles sœurs et coordination des retraites spirituelles.
                  </p>
                  <div className="text-[11px] text-stone-500 font-mono">
                    Contact : +228 91 12 34 56
                  </div>
                </div>

                {/* Secrétaire */}
                <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-800 text-white font-bold flex items-center justify-center font-sacred text-base">
                      KM
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Frère Komi MENSAH</h4>
                      <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        Secrétaire Général JAD
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Rédaction des procès-verbaux, tenue du registre des 120 jeunes fidèles et communication via les canaux digitaux et WhatsApp.
                  </p>
                  <div className="text-[11px] text-stone-500 font-mono">
                    Contact : +228 92 23 45 67
                  </div>
                </div>

                {/* Trésorier */}
                <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center font-sacred text-base">
                      YK
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Frère Yao KOFFI</h4>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Trésorier Principal
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Gestion rigoureuse et transparente de la caisse jeunesse en <strong>Franc CFA (FCFA)</strong>, cotisations mensuelles et budgets des camps.
                  </p>
                  <div className="text-[11px] text-stone-500 font-mono">
                    Contact : +228 93 34 56 78
                  </div>
                </div>

                {/* Chargé Évangélisation */}
                <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-rose-800 text-white font-bold flex items-center justify-center font-sacred text-base">
                      DL
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Frère David LAWSON</h4>
                      <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                        Évangélisation & Prière
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Organisation des sorties sur le terrain à Adamavo, Baguida, et direction des nuits de prière et de jeûne des jeunes.
                  </p>
                  <div className="text-[11px] text-stone-500 font-mono">
                    Contact : +228 90 45 67 89
                  </div>
                </div>

                {/* Maître de Chœur */}
                <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-800 text-white font-bold flex items-center justify-center font-sacred text-base">
                      MA
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Frère Mawuli A.</h4>
                      <span className="text-xs font-semibold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
                        Responsable Louange JAD
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Conduite du groupe musical, formation vocale des chantres et direction des répétitions de cantiques d'adoration chaque vendredi.
                  </p>
                  <div className="text-[11px] text-stone-500 font-mono">
                    Contact : +228 91 56 78 90
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SUB-TAB 3: ADHESION & INSCRIPTION ==================== */}
        {activeSubTab === 'adhesion' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="text-center space-y-2 pb-4 border-b border-stone-100">
                <div className="inline-flex p-3 rounded-full bg-purple-50 text-purple-900 mx-auto">
                  <Users className="w-6 h-6 text-purple-800" />
                </div>
                <h2 className="font-sacred text-2xl font-bold text-slate-900">
                  Formulaire d'Intégration au Groupe JAD
                </h2>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Rejoignez la jeunesse du Temple de la Résurrection (Adamavo 2). Vous serez chaleureusement accueilli(e) dès ce samedi à 16h00 !
                </p>
              </div>

              {signupDone ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 text-emerald-950 animate-in fade-in">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="font-sacred font-bold text-lg">Soyez le/la Bienvenu(e) à la JAD !</h3>
                  <p className="text-xs leading-relaxed max-w-md mx-auto">
                    Votre inscription a été enregistrée avec joie. Le Président Frère Elom AMOUZOU ou le Secrétaire Frère Komi prendra contact avec vous sur WhatsApp.
                  </p>
                  <div className="text-xs font-semibold text-emerald-800 pt-2">
                    Rendez-vous samedi à 16h00 au Sanctuaire d'Adamavo 2 !
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Nom & Prénoms *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Koffi Emmanuel AMOUZOU"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Numéro WhatsApp (Togo) *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: +228 90 12 34 56"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Tranche d'Âge</label>
                      <select
                        value={signupData.age}
                        onChange={(e) => setSignupData({ ...signupData, age: e.target.value })}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-900"
                      >
                        <option value="">Sélectionnez</option>
                        <option value="13-17 ans">13 - 17 ans (Adolescents)</option>
                        <option value="18-24 ans">18 - 24 ans (Jeunes majeurs)</option>
                        <option value="25-35 ans">25 - 35 ans (Jeunes adultes & Jeunes pros)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Situation Actuelle</label>
                      <select
                        value={signupData.status}
                        onChange={(e) => setSignupData({ ...signupData, status: e.target.value })}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-900"
                      >
                        <option value="Lycéen(ne)">Lycéen(ne)</option>
                        <option value="Étudiant(e)">Étudiant(e) à l'Université</option>
                        <option value="Jeune Professionnel(le)">Jeune Professionnel(le) / Salarié(e)</option>
                        <option value="Artisan / Entrepreneur">Artisan / Entrepreneur / Commerçant</option>
                        <option value="En recherche d'emploi">En recherche d'emploi</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Commission de Choix *</label>
                      <select
                        value={signupData.commission}
                        onChange={(e) => setSignupData({ ...signupData, commission: e.target.value })}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-900"
                      >
                        <option value="Chorale & Louange JAD">Chorale & Louange JAD</option>
                        <option value="Évangélisation & Actions Sociales">Évangélisation & Sorties</option>
                        <option value="Prière & Chaîne d'Intercession">Prière & Intercession</option>
                        <option value="Accueil, Protocole & Ordre">Accueil & Protocole</option>
                        <option value="Médias, Sono & Projection">Médias & Sonorisation</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs font-bold text-white bg-purple-900 hover:bg-purple-950 rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Flame className="w-4 h-4 text-amber-300" />
                    <span>Valider mon Inscription à la JAD</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ==================== SUB-TAB 4: COTISATIONS & PROJETS (FCFA) ==================== */}
        {activeSubTab === 'cotisations' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="space-y-1 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2 text-purple-900">
                  <Coins className="w-5 h-5 text-amber-600" />
                  <h2 className="font-sacred text-xl font-bold">
                    Cotisations & Soutien aux Projets de la Jeunesse (FCFA)
                  </h2>
                </div>
                <p className="text-xs text-stone-500">
                  Toutes les transactions de la JAD sont comptabilisées en <strong>Franc CFA (FCFA)</strong> sous le contrôle du trésorier Frère Yao KOFFI.
                </p>
              </div>

              {cotisationSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 text-emerald-950 animate-in fade-in">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="font-sacred font-bold text-lg">Offrande / Cotisation Enregistrée !</h3>
                  <p className="text-xs leading-relaxed max-w-md mx-auto">
                    Montant de <strong>{cotisationAmount.toLocaleString('fr-FR')} FCFA</strong> enregistré pour le projet sélectionné. Que le Seigneur bénisse et multiplie vos ressources !
                  </p>
                  <div className="text-[11px] font-mono text-emerald-800">
                    Reçu Trésorerie JAD généré : JAD-FCFA-{Date.now().toString().slice(-5)}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCotisationSubmit} className="space-y-5">
                  {/* Project selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Destination du Don / Cotisation</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'mensuelle', label: 'Cotisation Mensuelle' },
                        { id: 'camp', label: 'Camp National Togo' },
                        { id: 'instrument', label: 'Achat d’Instruments' },
                        { id: 'social', label: 'Entraide Étudiants' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCotisationType(item.id as any)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            cotisationType === item.id
                              ? 'bg-purple-900 text-white border-purple-900 shadow-xs'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Preset Chips in pure FCFA */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <label className="font-semibold text-slate-700">Montant en Franc CFA (FCFA)</label>
                      <span className="font-mono font-bold text-purple-900">
                        {cotisationAmount.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[500, 1000, 2000, 5000, 10000, 25000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setCotisationAmount(amt)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                            cotisationAmount === amt
                              ? 'bg-purple-900 text-white border-purple-900'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          {amt.toLocaleString('fr-FR')} FCFA
                        </button>
                      ))}
                    </div>

                    <div className="relative pt-1">
                      <input
                        type="number"
                        min="200"
                        step="500"
                        value={cotisationAmount || ''}
                        onChange={(e) => setCotisationAmount(Number(e.target.value))}
                        placeholder="Autre montant libre en FCFA"
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-900 pr-16"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                        FCFA
                      </span>
                    </div>
                  </div>

                  {/* Payment Operator */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700">Mode de Transfert Mobile Money</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setCotisationOperator('tmoney')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          cotisationOperator === 'tmoney'
                            ? 'bg-amber-50 border-amber-600 text-amber-950 ring-1 ring-amber-600'
                            : 'bg-white border-stone-200 text-stone-600'
                        }`}
                      >
                        <span className="text-xs font-bold block">T-Money (Togocel)</span>
                        <span className="text-[10px] text-stone-500">Paiement direct Togo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCotisationOperator('flooz')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          cotisationOperator === 'flooz'
                            ? 'bg-blue-50 border-blue-600 text-blue-950 ring-1 ring-blue-600'
                            : 'bg-white border-stone-200 text-stone-600'
                        }`}
                      >
                        <span className="text-xs font-bold block">Flooz (Moov Money)</span>
                        <span className="text-[10px] text-stone-500">Paiement direct Togo</span>
                      </button>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Votre Nom (ou Anonyme)</label>
                      <input
                        type="text"
                        placeholder="Ex: Frère David"
                        value={cotisationName}
                        onChange={(e) => setCotisationName(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">N° Mobile Money débité</label>
                      <input
                        type="text"
                        placeholder="Ex: +228 90 00 00 00"
                        value={cotisationPhone}
                        onChange={(e) => setCotisationPhone(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs font-bold text-white bg-gradient-to-r from-purple-900 to-indigo-950 hover:brightness-105 rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Coins className="w-4 h-4 text-amber-300" />
                    <span>Envoyer ma Cotisation ({cotisationAmount.toLocaleString('fr-FR')} FCFA)</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Card: Budget & Transparency */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100 text-slate-900">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-sacred text-base font-bold">
                    Transparence Financière JAD (FCFA)
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
                  <p>
                    Chaque franc CFA versé pour la JAD est fidèlement utilisé pour bénir la jeunesse du Temple de la Résurrection :
                  </p>
                  <ul className="space-y-2 pt-1 border-t border-stone-100">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-700 font-bold">•</span>
                      <span><strong>Cotisation Ordinaire :</strong> 500 ou 1 000 FCFA / mois pour la logistique des samedis et réconforts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-700 font-bold">•</span>
                      <span><strong>Camp Biblique National :</strong> Bourses pour aider les jeunes élèves démunis à participer.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-700 font-bold">•</span>
                      <span><strong>Matériel Musical :</strong> Cordes, câbles, micros sans fil et entretien de la batterie.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200/60 text-xs space-y-1">
                  <div className="font-semibold text-purple-950">
                    Comptabilité de la Caisse JAD :
                  </div>
                  <div className="text-[11px] text-purple-900">
                    Responsable : Frère Yao KOFFI (Trésorier)<br />
                    Contrôle : Pasteur AMOUZOU & Diaconat<br />
                    Lieu : Bureau paroissial Adamavo 2
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SUB-TAB 5: BOITE AUX QUESTIONS ==================== */}
        {activeSubTab === 'questions' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            {/* Ask form */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="space-y-1 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2 text-slate-900">
                  <HelpCircle className="w-5 h-5 text-purple-700" />
                  <h2 className="font-sacred text-xl font-bold">
                    Boîte aux Questions Spirituelles
                  </h2>
                </div>
                <p className="text-xs text-stone-500">
                  Posez vos questions anonymement. Elles seront traitées avec sagesse lors de la séance débat du samedi à 16h00.
                </p>
              </div>

              {questionSubmitted ? (
                <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 text-emerald-950 animate-in fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-sm">Question Déposée avec Succès !</h3>
                  <p className="text-xs text-emerald-800">
                    Elle a été ajoutée à l'ordre du jour de la prochaine réunion d'études bibliques de la jeunesse.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuestionSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Thème de la Question</label>
                    <select
                      value={questionCategory}
                      onChange={(e) => setQuestionCategory(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-900"
                    >
                      <option value="Vie Affective & Mariage">Vie Affective, Fréquentations & Mariage</option>
                      <option value="Sanctification">Sanctification & Pureté Personnelle</option>
                      <option value="Travail & Vocation">Études, Métiers & Entrepreneuriat</option>
                      <option value="Doctrine & Foi">Doctrines Bibliques & Saint-Esprit</option>
                      <option value="Doutes & Épreuves">Gestion du Doute & Pressions Sociales</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Votre Question (100% Confidentielle / Anonyme) *</label>
                    <textarea
                      required
                      rows={4}
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      placeholder="Ex: Que dit la Bible sur les relations amoureuses avant le mariage chrétien ?..."
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-bold text-white bg-purple-900 hover:bg-purple-950 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Déposer ma Question Anonyme</span>
                  </button>
                </form>
              )}
            </div>

            {/* Questions list */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="font-sacred text-base font-bold text-slate-900">
                    Questions Traitées & au Programme
                  </h3>
                  <p className="text-xs text-stone-500">Exemples de sujets abordés lors des cultes du samedi</p>
                </div>
                <span className="text-xs font-semibold text-purple-900 bg-purple-50 px-2 py-0.5 rounded">
                  {questionsList.length} Sujets
                </span>
              </div>

              <div className="divide-y divide-stone-100 space-y-3">
                {questionsList.map((q) => (
                  <div key={q.id} className="pt-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-md text-[10px]">
                        {q.category}
                      </span>
                      <span className="text-[10px] text-stone-400">{q.date}</span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium">
                      « {q.question} »
                    </p>
                    <div className="flex items-center gap-2 text-[11px]">
                      {q.answered ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Traité au culte de jeunesse
                        </span>
                      ) : (
                        <span className="text-amber-700 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Au programme de ce samedi
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
