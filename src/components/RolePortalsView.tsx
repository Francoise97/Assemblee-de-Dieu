import React, { useState, useEffect } from 'react';
import { CHURCH_INFO, MINISTRIES, Ministry } from '../data/churchData';
import { ChurchLogo } from './ChurchLogo';
import {
  Shield,
  UserCheck,
  Building,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  Heart,
  Plus,
  CheckCircle,
  Clock,
  FileText,
  AlertCircle,
  Phone,
  Mail,
  Send,
  Lock,
  Compass,
  Sparkles,
  Award,
  LogIn,
  LogOut,
  Eye,
  EyeOff,
  User,
  Check,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  Bookmark,
} from 'lucide-react';

export type UserRole = 'pastor' | 'deacon' | 'admin' | 'member' | 'department';

export interface UserSession {
  role: UserRole;
  fullName: string;
  title: string;
  department: string;
  emailOrPhone: string;
  avatarText: string;
  badgeColor: string;
  permissions: string[];
}

interface PastoralAppointment {
  id: string;
  memberName: string;
  phone: string;
  reason: string;
  preferredDate: string;
  status: 'pending' | 'confirmed' | 'completed';
}

interface SocialAidRecord {
  id: string;
  beneficiary: string;
  type: string;
  amount: number;
  date: string;
  status: 'accordé' | 'en cours';
}

interface ChurchMemberRecord {
  id: string;
  fullName: string;
  phone: string;
  district: string;
  department: string;
  isBaptized: boolean;
  joinDate: string;
}

interface FinancialEntry {
  id: string;
  date: string;
  type: 'recette' | 'dépense';
  category: string;
  amount: number;
  description: string;
}

// Preset Accounts for Church Departments
const PRESET_ACCOUNTS: { [key in UserRole]: { user: UserSession; defaultUsername: string; defaultPin: string; roleLabel: string; desc: string } } = {
  pastor: {
    user: {
      role: 'pastor',
      fullName: 'Pasteur AMOUZOU',
      title: 'Pasteur Principal de la Paroisse',
      department: 'Direction Pastorale',
      emailOrPhone: '+228 90 12 34 56',
      avatarText: 'PA',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      permissions: ['Gestion des Prédications', 'Confirmation des Rendez-vous', 'Supervision Liturgique', 'Célébration des Cultes'],
    },
    defaultUsername: 'pasteur.amouzou',
    defaultPin: 'pasteur2026',
    roleLabel: 'Côté Pasteur',
    desc: 'Accès réservé au Pasteur AMOUZOU pour la chaire, la conduite spirituelle et les entretiens pastoraux.',
  },
  deacon: {
    user: {
      role: 'deacon',
      fullName: 'Diacre KODJO Mensah',
      title: 'Responsable du Corps Diaconal',
      department: 'Diaconat & Œuvres Sociales',
      emailOrPhone: '+228 91 23 45 67',
      avatarText: 'DK',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      permissions: ['Assistance Sociale', 'Sainte Cène', 'Logistique Cultes 7h & 9h', 'Accueil & Ordre'],
    },
    defaultUsername: 'diacre.kodjo',
    defaultPin: 'diacre2026',
    roleLabel: 'Côté Diacre',
    desc: 'Accès réservé aux diacres pour le service des tables, la Sainte Cène et l’aide aux personnes vulnérables d’Adamavo 2.',
  },
  admin: {
    user: {
      role: 'admin',
      fullName: 'Frère EKLOU (Secrétaire-Trésorier)',
      title: 'Administrateur Paroissial',
      department: 'Secrétariat Général & Finances',
      emailOrPhone: '+228 92 34 56 78',
      avatarText: 'AE',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      permissions: ['Registre des Membres', 'Grand Livre Trésorerie FCFA', 'Comptabilité Caisse', 'Gestion Inventaire'],
    },
    defaultUsername: 'admin.resurrection',
    defaultPin: 'admin2026',
    roleLabel: 'Côté Administrateur',
    desc: 'Accès réservé au secrétariat pour la comptabilité paroissiale, les registres de fidèles et les annonces.',
  },
  member: {
    user: {
      role: 'member',
      fullName: 'Sœur Kafui Mensah',
      title: 'Fidèle Membre d’Adamavo 2',
      department: 'Paroisse Temple de la Résurrection',
      emailOrPhone: '+228 93 45 67 89',
      avatarText: 'KM',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      permissions: ['Demande de Visite Pastorale', 'Carnet Spirituel', 'Historique Dîmes & Dons', 'Participation Prières'],
    },
    defaultUsername: 'membre.kafui',
    defaultPin: 'membre2026',
    roleLabel: 'Côté Membre',
    desc: 'Espace des fidèles de l’église pour les demandes pastorales, carnets de méditations et vie de l’assemblée.',
  },
  department: {
    user: {
      role: 'department',
      fullName: 'Frère Elom Amouzou',
      title: 'Président J.A.D. Adamavo 2',
      department: 'Jeunesse des Assemblées de Dieu',
      emailOrPhone: '+228 90 99 88 77',
      avatarText: 'EA',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      permissions: ['Gestion de la Jeunesse JAD', 'Programmes Samedi 16h', 'Évangélisation Urbaine', 'Formation'],
    },
    defaultUsername: 'jad.adamavo',
    defaultPin: 'jad2026',
    roleLabel: 'Côté Département (JAD / Dorcas...)',
    desc: 'Accès pour les responsables de départements : JAD, Action des Femmes Dorcas, Hommes d’Honneur, ECODIM.',
  },
};

export const RolePortalsView: React.FC = () => {
  // Authentication session
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [loginRole, setLoginRole] = useState<UserRole>('pastor');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected Department for department leaders
  const [selectedDeptCode, setSelectedDeptCode] = useState<'JAD' | 'DORCAS' | 'ECODIM' | 'CHORALE'>('JAD');

  // PASTOR STATE
  const [appointments, setAppointments] = useState<PastoralAppointment[]>([
    {
      id: 'apt-1',
      memberName: 'Frère Koffi',
      phone: '+228 91 22 33 44',
      reason: 'Entretien préalable au mariage chrétien',
      preferredDate: 'Mercredi 16h00',
      status: 'confirmed',
    },
    {
      id: 'apt-2',
      memberName: 'Sœur Akossiwa',
      phone: '+228 92 33 44 55',
      reason: 'Prière de délivrance et réconfort familial',
      preferredDate: 'Jeudi 10h00',
      status: 'pending',
    },
    {
      id: 'apt-3',
      memberName: 'Famille Lawson',
      phone: '+228 90 44 55 66',
      reason: 'Visite pastorale et bénédiction de nouveau domicile à Adamavo 2',
      preferredDate: 'Samedi 11h00',
      status: 'pending',
    },
  ]);

  // DEACON STATE
  const [socialAids, setSocialAids] = useState<SocialAidRecord[]>([
    { id: 'aid-1', beneficiary: 'Veuve Adjovi', type: 'Assistance alimentaire & vivres', amount: 35000, date: '22 Oct 2026', status: 'accordé' },
    { id: 'aid-2', beneficiary: 'Famille Dossou', type: 'Aide scolaire pour orphelins', amount: 50000, date: '18 Oct 2026', status: 'accordé' },
    { id: 'aid-3', beneficiary: 'Frère Mensan', type: 'Soutien médical d’urgence', amount: 25000, date: 'Hier', status: 'en cours' },
  ]);

  const [communionChecklist, setCommunionChecklist] = useState<{ id: string; label: string; done: boolean }[]>([
    { id: 'chk-1', label: 'Préparation du pain sans levain et coupes de vin de communion', done: true },
    { id: 'chk-2', label: 'Désinfection et mise en place des plateaux de Sainte Cène', done: true },
    { id: 'chk-3', label: 'Organisation des équipes d’accueil aux deux cultes (7h & 9h)', done: false },
    { id: 'chk-4', label: 'Vérification de la sonorisation et micros de la chaire', done: true },
    { id: 'chk-5', label: 'Installation des rangées supplémentaires sous le préau', done: false },
  ]);

  // ADMIN STATE
  const [members, setMembers] = useState<ChurchMemberRecord[]>([
    { id: 'mbr-1', fullName: 'Kossi Mensah', phone: '+228 90 11 22 33', district: 'Adamavo 2 - Église', department: 'Hommes d’Honneur', isBaptized: true, joinDate: '2021' },
    { id: 'mbr-2', fullName: 'Abla Sedzro', phone: '+228 91 44 55 66', district: 'Adamavo - Grand Marché', department: 'Action des Femmes (Dorcas)', isBaptized: true, joinDate: '2020' },
    { id: 'mbr-3', fullName: 'Elom Amouzou', phone: '+228 92 77 88 99', district: 'Adamavo 2', department: 'Jeunesse (JAD)', isBaptized: true, joinDate: '2023' },
    { id: 'mbr-4', fullName: 'Dodzi Agbeko', phone: '+228 93 00 11 22', district: 'Lomé - Baguida', department: 'Chorale & Louange', isBaptized: false, joinDate: '2025' },
  ]);

  const [finances, setFinances] = useState<FinancialEntry[]>([
    { id: 'fin-1', date: '25 Oct 2026', type: 'recette', category: 'Dîmes & Offrandes', amount: 485000, description: 'Collecte des 2 cultes du dimanche (7h et 9h)' },
    { id: 'fin-2', date: '24 Oct 2026', type: 'dépense', category: 'Social & Compassion', amount: 110000, description: 'Aide aux veuves et personnes vulnérables d’Adamavo' },
    { id: 'fin-3', date: '20 Oct 2026', type: 'recette', category: 'Projet Extension', amount: 250000, description: 'Souscription spéciale travaux préau' },
    { id: 'fin-4', date: '15 Oct 2026', type: 'dépense', category: 'Charges Temple', amount: 85000, description: 'Facture électricité & eau du sanctuaire' },
  ]);

  // MEMBER STATE
  const [memberNotes, setMemberNotes] = useState<string[]>([
    'Méditation sur Philippiens 3:10 : Vivre la puissance de la résurrection chaque matin.',
    'Résolution : Participer activement à l’étude biblique du mercredi à 18h30.',
  ]);
  const [newNote, setNewNote] = useState('');

  // FORM SUBMISSIONS
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [newMemberDept, setNewMemberDept] = useState('Jeunesse (JAD)');
  const [memberCreatedMsg, setMemberCreatedMsg] = useState(false);

  const [appointmentMember, setAppointmentMember] = useState('');
  const [appointmentPhone, setAppointmentPhone] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem('ad_auth_session');
      if (storedSession) {
        setCurrentUser(JSON.parse(storedSession));
      } else {
        // Set default to null so user sees the login portal
        setCurrentUser(null);
      }

      const storedApts = localStorage.getItem('ad_pastoral_apts');
      if (storedApts) setAppointments(JSON.parse(storedApts));

      const storedMembers = localStorage.getItem('ad_church_members');
      if (storedMembers) setMembers(JSON.parse(storedMembers));

      const storedFinances = localStorage.getItem('ad_finances');
      if (storedFinances) setFinances(JSON.parse(storedFinances));
    } catch {
      // fallback
    }
  }, []);

  // Update inputs when selecting role tab in login
  const handleSelectLoginRole = (role: UserRole) => {
    setLoginRole(role);
    setLoginError('');
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleFillDemoCredentials = (role: UserRole) => {
    const preset = PRESET_ACCOUNTS[role];
    setUsernameInput(preset.defaultUsername);
    setPasswordInput(preset.defaultPin);
    setLoginError('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const preset = PRESET_ACCOUNTS[loginRole];

      // Validate credentials (or accept demo credentials / non-empty values)
      const username = usernameInput.trim().toLowerCase();
      const password = passwordInput.trim();

      const isValid =
        (username === preset.defaultUsername.toLowerCase() && password === preset.defaultPin) ||
        (username.length >= 3 && password.length >= 4);

      if (isValid) {
        const session: UserSession = {
          ...preset.user,
          fullName: username === preset.defaultUsername.toLowerCase() ? preset.user.fullName : `Utilisateur (${username})`,
        };
        setCurrentUser(session);
        try {
          localStorage.setItem('ad_auth_session', JSON.stringify(session));
        } catch {
          // fallback
        }
      } else {
        setLoginError(`Identifiant ou code d'accès incorrect pour le rôle ${preset.roleLabel}. Cliquez sur "Remplir Démo" pour vous connecter instantanément.`);
      }
    }, 600);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('ad_auth_session');
    } catch {
      // fallback
    }
  };

  const handleConfirmAppointment = (id: string) => {
    const updated = appointments.map((a) => (a.id === id ? { ...a, status: 'confirmed' as const } : a));
    setAppointments(updated);
    try {
      localStorage.setItem('ad_pastoral_apts', JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newRecord: ChurchMemberRecord = {
      id: `mbr-${Date.now()}`,
      fullName: newMemberName.trim(),
      phone: newMemberPhone.trim() || '+228 90 00 00 00',
      district: 'Adamavo 2',
      department: newMemberDept,
      isBaptized: true,
      joinDate: '2026',
    };

    const updated = [newRecord, ...members];
    setMembers(updated);
    try {
      localStorage.setItem('ad_church_members', JSON.stringify(updated));
    } catch {
      // fallback
    }

    setMemberCreatedMsg(true);
    setNewMemberName('');
    setNewMemberPhone('');
    setTimeout(() => setMemberCreatedMsg(false), 2000);
  };

  const handleRequestAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentMember.trim() || !appointmentReason.trim()) return;

    const newApt: PastoralAppointment = {
      id: `apt-${Date.now()}`,
      memberName: appointmentMember.trim(),
      phone: appointmentPhone.trim() || '+228 90 00 00 00',
      reason: appointmentReason.trim(),
      preferredDate: 'Prochain créneau pastoral (Mercredi 18h30 / Vendredi 18h30)',
      status: 'pending',
    };

    const updated = [newApt, ...appointments];
    setAppointments(updated);
    try {
      localStorage.setItem('ad_pastoral_apts', JSON.stringify(updated));
    } catch {
      // fallback
    }

    setAppointmentSubmitted(true);
    setAppointmentMember('');
    setAppointmentPhone('');
    setAppointmentReason('');
    setTimeout(() => setAppointmentSubmitted(false), 2500);
  };

  const handleToggleChecklist = (id: string) => {
    setCommunionChecklist(
      communionChecklist.map((c) => (c.id === id ? { ...c, done: !c.done } : c))
    );
  };

  const handleAddMemberNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setMemberNotes([newNote.trim(), ...memberNotes]);
    setNewNote('');
  };

  // Financial calculations
  const totalRecettes = finances
    .filter((f) => f.type === 'recette')
    .reduce((sum, f) => sum + f.amount, 0);
  const totalDepenses = finances
    .filter((f) => f.type === 'dépense')
    .reduce((sum, f) => sum + f.amount, 0);
  const soldeCaisse = totalRecettes - totalDepenses;

  // -------------------------------------------------------------
  // VIEW 1: LOGIN PORTAL (WHEN NOT AUTHENTICATED)
  // -------------------------------------------------------------
  if (!currentUser) {
    const activePreset = PRESET_ACCOUNTS[loginRole];

    return (
      <div className="py-12 sm:py-16 bg-[#FAF8F5] min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
            {/* Header with church emblem */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white text-center space-y-3 relative">
              <div className="flex justify-center">
                <ChurchLogo variant="mark" size="md" withGlow={true} />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold block">
                  Temple de la Résurrection · Adamavo 2, Lomé
                </span>
                <h1 className="font-sacred text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                  Portail d'Authentification Sécurisé
                </h1>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                  Connectez-vous à votre espace ecclésial selon votre rôle ou département.
                </p>
              </div>
            </div>

            {/* Role Tab Selector for Login */}
            <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2 text-center sm:text-left">
                1. Choisissez votre Département / Rôle :
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['pastor', 'deacon', 'admin', 'member', 'department'] as UserRole[]).map((r) => {
                  const isSelected = loginRole === r;
                  return (
                    <button
                      key={r}
                      onClick={() => handleSelectLoginRole(r)}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-900/20'
                          : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                      }`}
                    >
                      {r === 'pastor' && <Shield className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-amber-700'}`} />}
                      {r === 'deacon' && <Heart className={`w-4 h-4 ${isSelected ? 'text-rose-400' : 'text-rose-600'}`} />}
                      {r === 'admin' && <Building className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-blue-900'}`} />}
                      {r === 'member' && <Users className={`w-4 h-4 ${isSelected ? 'text-blue-300' : 'text-emerald-700'}`} />}
                      {r === 'department' && <Award className={`w-4 h-4 ${isSelected ? 'text-purple-300' : 'text-purple-700'}`} />}
                      <span className="text-[11px] font-bold truncate max-w-full">
                        {r === 'pastor' && 'Pasteur'}
                        {r === 'deacon' && 'Diacre'}
                        {r === 'admin' && 'Admin'}
                        {r === 'member' && 'Membre'}
                        {r === 'department' && 'Département'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Form Box */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Selected Role Banner */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <KeyRound className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-amber-900 block">
                    Accès : {activePreset.roleLabel} ({activePreset.user.fullName})
                  </span>
                  <p className="text-amber-950/80 leading-relaxed">
                    {activePreset.desc}
                  </p>
                </div>
              </div>

              {loginError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Identifiant / Email ou N° Téléphone (Togocel / Moov)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      placeholder={`Ex: ${activePreset.defaultUsername}`}
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Mot de Passe / Code PIN
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Code secret"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-900 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Quick Auto-Fill Demo Credentials button */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => handleFillDemoCredentials(loginRole)}
                    className="inline-flex items-center gap-1.5 text-blue-900 hover:text-blue-950 font-semibold underline"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Remplir identifiants démo ({activePreset.defaultUsername})</span>
                  </button>

                  <span className="text-[11px] text-stone-400 font-mono">
                    Code : {activePreset.defaultPin}
                  </span>
                </div>

                {/* Submit Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4 text-amber-300" />
                  <span>
                    {isSubmitting
                      ? 'Authentification en cours...'
                      : `Se Connecter en tant que ${activePreset.roleLabel.replace('Côté ', '')}`}
                  </span>
                </button>
              </form>

              {/* Quick direct switch pills for demo convenience */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block text-center">
                  Accès Rapide en 1 Clic (Sans Saisie) :
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {(['pastor', 'deacon', 'admin', 'member', 'department'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        const preset = PRESET_ACCOUNTS[r];
                        setCurrentUser(preset.user);
                        try {
                          localStorage.setItem('ad_auth_session', JSON.stringify(preset.user));
                        } catch {
                          // fallback
                        }
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg transition-colors"
                    >
                      Connexion 1-clic : {r === 'pastor' ? 'Pasteur AMOUZOU' : r === 'deacon' ? 'Diacre' : r === 'admin' ? 'Admin' : r === 'member' ? 'Membre' : 'JAD'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED WORKSPACES
  // -------------------------------------------------------------
  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Session & Identity Bar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-900 text-white font-sacred font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
              {currentUser.avatarText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">{currentUser.fullName}</h3>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${currentUser.badgeColor}`}>
                  {currentUser.title}
                </span>
              </div>
              <p className="text-xs text-stone-500">{currentUser.department} · {CHURCH_INFO.district}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* Role switchers for quick switching without logging out */}
            <div className="flex items-center bg-stone-100 p-1 rounded-lg text-xs">
              {(['pastor', 'deacon', 'admin', 'member', 'department'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    const preset = PRESET_ACCOUNTS[r];
                    setCurrentUser(preset.user);
                    try {
                      localStorage.setItem('ad_auth_session', JSON.stringify(preset.user));
                    } catch {
                      // fallback
                    }
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    currentUser.role === r
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {r === 'pastor' && 'Pasteur'}
                  {r === 'deacon' && 'Diacre'}
                  {r === 'admin' && 'Admin'}
                  {r === 'member' && 'Membre'}
                  {r === 'department' && 'Département'}
                </button>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
              title="Fermer la session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* -------------------- 1. ESPACE PASTEUR -------------------- */}
        {currentUser.role === 'pastor' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Pastor Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 text-white border border-amber-400/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <Award className="w-4 h-4" />
                  <span>Chaire & Sacerdoce Pastoral</span>
                </div>
                <h2 className="font-sacred text-2xl sm:text-3xl font-bold">
                  Espace Pastoral — Pasteur AMOUZOU
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Bienvenue, serviteur de Dieu. Supervisez les rendez-vous pastoraux des fidèles d'Adamavo 2, préparez la chaire pour les cultes dominicaux (7h et 9h) et l'étude biblique du mercredi à 18h30.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
                  <span className="text-2xl font-bold font-sacred text-amber-300 block">
                    {appointments.filter((a) => a.status === 'pending').length}
                  </span>
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider">
                    Visites en Attente
                  </span>
                </div>
                <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
                  <span className="text-2xl font-bold font-sacred text-white block">
                    2
                  </span>
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider">
                    Cultes Dimanche
                  </span>
                </div>
              </div>
            </div>

            {/* Pastor Appointments Queue */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h3 className="font-sacred text-lg font-bold text-slate-900">
                    Demandes d'Entretien & Visites Pastorales
                  </h3>
                  <p className="text-xs text-stone-500">
                    Sollicitations directes des familles et fidèles du quartier Adamavo 2
                  </p>
                </div>
                <span className="text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-lg">
                  {appointments.length} demandes
                </span>
              </div>

              <div className="divide-y divide-stone-100">
                {appointments.map((apt) => (
                  <div key={apt.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{apt.memberName}</span>
                        <span className="text-xs text-stone-400 font-mono">({apt.phone})</span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {apt.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700">{apt.reason}</p>
                      <p className="text-[11px] text-blue-900 font-medium">
                        Créneau souhaité : {apt.preferredDate}
                      </p>
                    </div>

                    {apt.status === 'pending' && (
                      <button
                        onClick={() => handleConfirmAppointment(apt.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors shrink-0"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Confirmer le Rendez-vous</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Liturgical Directives for the Week */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <h4 className="font-sacred text-base font-bold text-slate-900">
                  Horaires des Rassemblements
                </h4>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center justify-between p-2 bg-stone-50 rounded-lg">
                    <span>Mercredi 18h30 : Étude Biblique & Enseignement</span>
                    <span className="font-semibold text-blue-900">Pasteur AMOUZOU</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-stone-50 rounded-lg">
                    <span>Vendredi 18h30 : Veillée d'Intercession & Délivrance</span>
                    <span className="font-semibold text-blue-900">Corps Pastoral</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-stone-50 rounded-lg">
                    <span>Dimanche 07h00 : 1er Culte d'Adoration & Sainte Cène</span>
                    <span className="font-semibold text-amber-800">Célébration</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-stone-50 rounded-lg">
                    <span>Dimanche 09h00 : 2ème Culte de Puissance & Bénédiction</span>
                    <span className="font-semibold text-amber-800">Célébration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <h4 className="font-sacred text-base font-bold text-slate-900">
                  Notes Pastorales du Pasteur AMOUZOU
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  « Que les diacres veillent à l'accueil bienveillant des nouveaux convertis du quartier Adamavo 2. Les moniteurs de l'ECODIM doivent être présents dès 06h45 pour accueillir les enfants des parents du 1er culte. »
                </p>
                <div className="text-[11px] text-amber-800 font-serif italic text-right">
                  — Pasteur AMOUZOU, Pasteur Principal
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 2. ESPACE DIACRE -------------------- */}
        {currentUser.role === 'deacon' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Deacon Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white border border-rose-400/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
                  <Heart className="w-4 h-4" />
                  <span>Service des Tables & Assistance Fraternelle</span>
                </div>
                <h2 className="font-sacred text-2xl sm:text-3xl font-bold">
                  Espace Diaconat & Œuvres Sociales
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Actes 6:3 — Servir l'Église dans l'ordre, l'assistance aux veuves, aux orphelins et veiller à la bonne logistique de la maison de Dieu à Adamavo 2.
                </p>
              </div>

              <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center shrink-0">
                <span className="text-2xl font-bold font-sacred text-rose-300 block">
                  {socialAids.reduce((sum, a) => sum + a.amount, 0).toLocaleString()} FCFA
                </span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wider">
                  Assistance Distribuée
                </span>
              </div>
            </div>

            {/* 2-Column: Social Assistance Registry + Sunday Logistics Checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Social Assistance */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="font-sacred text-lg font-bold text-slate-900">
                      Registre de Compassion & Aides Sociales
                    </h3>
                    <p className="text-xs text-stone-500">
                      Assistance de l'église aux familles nécessiteuses d'Adamavo 2
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md">
                    Ministère Dorcas
                  </span>
                </div>

                <div className="divide-y divide-stone-100">
                  {socialAids.map((aid) => (
                    <div key={aid.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{aid.beneficiary}</h4>
                        <p className="text-[11px] text-stone-600">{aid.type}</p>
                        <span className="text-[10px] text-stone-400">{aid.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-rose-900 block tabular-nums">
                          {aid.amount.toLocaleString()} FCFA
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {aid.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sunday Logistics Checklist */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-stone-100">
                  <h3 className="font-sacred text-base font-bold text-slate-900">
                    Logistique du Dimanche (Cultes 7h & 9h)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Checklist opérationnelle pour les diacres de service
                  </p>
                </div>

                <div className="space-y-2">
                  {communionChecklist.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 cursor-pointer text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => handleToggleChecklist(item.id)}
                        className="mt-0.5 rounded border-stone-300 text-blue-900 focus:ring-blue-900"
                      />
                      <span className={item.done ? 'line-through text-stone-400' : 'text-slate-800'}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 3. ESPACE ADMINISTRATEUR -------------------- */}
        {currentUser.role === 'admin' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Admin Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-amber-400/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <Building className="w-4 h-4" />
                  <span>Secrétariat & Trésorerie Paroissiale</span>
                </div>
                <h2 className="font-sacred text-2xl sm:text-3xl font-bold">
                  Espace Administration & Registres
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Tenue des registres des fidèles d'Adamavo 2, gérance des finances et suivi du solde de caisse en FCFA.
                </p>
              </div>

              {/* KPI Strip */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
                  <span className="text-2xl font-bold font-sacred text-amber-300 block">
                    {members.length}
                  </span>
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider">
                    Membres Enregistrés
                  </span>
                </div>
                <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
                  <span className="text-2xl font-bold font-sacred text-emerald-400 block tabular-nums">
                    {soldeCaisse.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider">
                    Solde Caisse (FCFA)
                  </span>
                </div>
              </div>
            </div>

            {/* 2-Column: Financial Ledger & Add New Church Member */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Financial Ledger */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-sacred text-lg font-bold text-slate-900">
                    Grand Livre de Trésorerie (Entrées / Sorties)
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Solde : {soldeCaisse.toLocaleString()} FCFA
                  </span>
                </div>

                <div className="divide-y divide-stone-100">
                  {finances.map((f) => (
                    <div key={f.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                              f.type === 'recette' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                            }`}
                          >
                            {f.type}
                          </span>
                          <span className="text-xs font-semibold text-slate-900">{f.category}</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5">{f.description}</p>
                        <span className="text-[10px] text-stone-400">{f.date}</span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-mono font-bold tabular-nums ${
                            f.type === 'recette' ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          {f.type === 'recette' ? '+' : '-'} {f.amount.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Members Registration Form & Registry */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
                <div>
                  <h3 className="font-sacred text-base font-bold text-slate-900">
                    Enregistrer un Nouveau Fidèle
                  </h3>
                  <p className="text-xs text-stone-500">
                    Ajout au registre officiel des membres d'Adamavo 2
                  </p>
                </div>

                {memberCreatedMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Nouveau membre enregistré avec succès !</span>
                  </div>
                )}

                <form onSubmit={handleAddMember} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Nom & Prénom *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Yawo Kodjo"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Téléphone (Togocel / Moov)</label>
                    <input
                      type="text"
                      placeholder="Ex: +228 90 12 34 56"
                      value={newMemberPhone}
                      onChange={(e) => setNewMemberPhone(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Département d'Appartenance</label>
                    <select
                      value={newMemberDept}
                      onChange={(e) => setNewMemberDept(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-900"
                    >
                      <option value="Jeunesse (JAD)">Jeunesse des Assemblées de Dieu (JAD)</option>
                      <option value="Action des Femmes (Dorcas)">Action des Femmes (Dorcas)</option>
                      <option value="Hommes d’Honneur">Hommes d’Honneur</option>
                      <option value="Chorale & Louange">Chorale & Louange</option>
                      <option value="Missions & Évangélisation">Missions & Évangélisation</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors shadow-xs"
                  >
                    Ajouter au Registre
                  </button>
                </form>

                {/* Quick roster list */}
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    Derniers fidèles inscrits :
                  </span>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {members.slice(0, 4).map((m) => (
                      <div key={m.id} className="text-xs flex justify-between p-1.5 bg-stone-50 rounded">
                        <span className="font-semibold text-slate-800">{m.fullName}</span>
                        <span className="text-stone-500 text-[11px]">{m.department}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 4. ESPACE MEMBRE DE L'ÉGLISE -------------------- */}
        {currentUser.role === 'member' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Member Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white border border-amber-400/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  <Users className="w-4 h-4" />
                  <span>Fidèle Membre du Temple de la Résurrection</span>
                </div>
                <h2 className="font-sacred text-2xl sm:text-3xl font-bold">
                  Mon Espace Chrétien & Vie d'Église
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Bienvenue, <strong>{currentUser.fullName}</strong>. Gardez le contact avec le <strong>Pasteur AMOUZOU</strong>, consignez vos méditations spirituelles et suivez la vie de votre paroisse à Adamavo 2.
                </p>
              </div>

              <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center shrink-0">
                <span className="text-xs font-semibold text-amber-300 block uppercase">
                  Paroisse Locale
                </span>
                <span className="font-sacred text-base font-bold text-white block">
                  Adamavo 2 · Lomé
                </span>
                <span className="text-[11px] text-slate-300 block">
                  Cultes Dimanche 7h & 9h
                </span>
              </div>
            </div>

            {/* 2-Column: Request Pastoral Meeting + Personal Spiritual Journal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Request pastoral meeting with Pasteur AMOUZOU */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="pb-3 border-b border-stone-100">
                  <h3 className="font-sacred text-lg font-bold text-slate-900">
                    Demander une Visite ou un Entretien Pastoral
                  </h3>
                  <p className="text-xs text-stone-500">
                    Prenez rendez-vous directement auprès du Pasteur AMOUZOU pour un conseil, une prière ou un baptême.
                  </p>
                </div>

                {appointmentSubmitted ? (
                  <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 text-emerald-900">
                    <CheckCircle className="w-7 h-7 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-sm">Demande Transmise au Pasteur</h4>
                    <p className="text-xs text-emerald-700">
                      Le Pasteur AMOUZOU ou le secrétariat paroissial vous rappellera sur votre numéro pour confirmer le créneau.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRequestAppointment} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Votre Nom & Prénom *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: Sœur Kafui Mensah"
                        value={appointmentMember}
                        onChange={(e) => setAppointmentMember(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Numéro de Téléphone *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: +228 90 12 34 56"
                        value={appointmentPhone}
                        onChange={(e) => setAppointmentPhone(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Motif de la demande *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Ex: Conseil spirituel, entretien pré-baptismal, prière pour le foyer..."
                        value={appointmentReason}
                        onChange={(e) => setAppointmentReason(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-900 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors shadow-xs"
                    >
                      Envoyer ma Demande au Pasteur AMOUZOU
                    </button>
                  </form>
                )}
              </div>

              {/* Personal Spiritual Journal */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="pb-3 border-b border-stone-100">
                  <h3 className="font-sacred text-lg font-bold text-slate-900">
                    Mon Carnet Spirituel Personnel
                  </h3>
                  <p className="text-xs text-stone-500">
                    Consignez vos résolutions de foi, versets médités et sujets de gratitude
                  </p>
                </div>

                <form onSubmit={handleAddMemberNote} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Écrivez une pensée ou résolution reçue pendant le culte..."
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-900 resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors"
                    >
                      Ajouter au Carnet
                    </button>
                  </div>
                </form>

                <div className="space-y-2 pt-2 border-t border-stone-100">
                  {memberNotes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed font-sans">
                      <p>{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 5. ESPACE RESPONSABLE DÉPARTEMENT -------------------- */}
        {currentUser.role === 'department' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Department Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 text-white border border-purple-400/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300">
                  <Award className="w-4 h-4" />
                  <span>Direction des Départements Ecclésiaux</span>
                </div>
                <h2 className="font-sacred text-2xl sm:text-3xl font-bold">
                  Espace Responsable — {selectedDeptCode} (Adamavo 2)
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Pilotez les activités de votre département, planifiez les réunions du samedi et préparez la jeunesse et les ministères sous l'onction du Saint-Esprit.
                </p>
              </div>

              {/* Department Selector */}
              <div className="flex flex-wrap gap-1.5 bg-white/10 p-1.5 rounded-xl border border-white/20 self-start md:self-center">
                {(['JAD', 'DORCAS', 'ECODIM', 'CHORALE'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDeptCode(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedDeptCode === d
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Department Actions & Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-sacred text-lg font-bold text-slate-900">
                    Programme d'Action du Département {selectedDeptCode}
                  </h3>
                  <span className="text-xs font-semibold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md">
                    Temple de la Résurrection
                  </span>
                </div>

                <div className="space-y-3 text-xs text-stone-700">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Prochaine Rencontre :</span>
                    <p>Chaque samedi à 16h00 au Sanctuaire d'Adamavo 2</p>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Objectif Semestriel :</span>
                    <p>Mobilisation de 50 jeunes chrétiens zélés pour l'évangélisation de proximité et le soutien à la chorale.</p>
                  </div>

                  <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200/60 space-y-1 text-purple-950">
                    <span className="font-bold block">Directive du Pasteur AMOUZOU :</span>
                    <p className="italic">« Gardez la flamme allumée, enseignez la sanctification sans compromis à notre jeunesse. »</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-stone-100">
                  <h3 className="font-sacred text-base font-bold text-slate-900">
                    Bénévoles & Équipiers Inscrits
                  </h3>
                  <p className="text-xs text-stone-500">Membres engagés dans ce département</p>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 bg-stone-50 rounded-lg flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">Frère Elom Amouzou</span>
                    <span className="text-purple-700 font-bold">Responsable</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-lg flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">Sœur Akossiwa</span>
                    <span className="text-stone-500">Secrétaire JAD</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-lg flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">Frère Dodzi</span>
                    <span className="text-stone-500">Chargé Logistique</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
