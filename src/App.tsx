/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DoctrinesSection } from './components/DoctrinesSection';
import { DailyDevotionalSection } from './components/DailyDevotionalSection';
import { SermonsView } from './components/SermonsView';
import { PrayerWallView } from './components/PrayerWallView';
import { MinistriesView } from './components/MinistriesView';
import { HymnbookView } from './components/HymnbookView';
import { GivingView } from './components/GivingView';
import { RolePortalsView } from './components/RolePortalsView';
import { HistorySection } from './components/HistorySection';
import { JadView } from './components/JadView';
import { ScheduleModal } from './components/ScheduleModal';
import { LogoShowcaseModal } from './components/LogoShowcaseModal';
import { Footer } from './components/Footer';
import { ChurchLogo } from './components/ChurchLogo';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  PlayCircle,
  BookOpen,
  Users,
  History,
  Landmark,
  Flame,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 selection:bg-amber-100 selection:text-amber-900 font-sans w-full max-w-full overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleNavigate}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenLogoShowcase={() => setIsLogoModalOpen(true)}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section with Sanctuary Image & Operational Utility */}
            <HeroSection
              onNavigate={handleNavigate}
              onOpenSchedule={() => setIsScheduleOpen(true)}
              onOpenLogoShowcase={() => setIsLogoModalOpen(true)}
            />

            {/* The 4 Fundamental Truths of the Assemblies of God */}
            <DoctrinesSection />

            {/* Daily Devotional (Pain Vivant) */}
            <DailyDevotionalSection />

            {/* Home Teasers: Quick Gateways to Ministries, Sermons & Prayer */}
            <section className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                      Vie de l'Église Locale
                    </span>
                    <h2 className="font-sacred text-2xl sm:text-3xl font-bold text-slate-900">
                      Ressources & Espaces Communautaires
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsLogoModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Sceau Unique Officiel</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 0: Portails & Rôles */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-amber-50 text-amber-900 rounded-xl w-fit">
                        <Users className="w-6 h-6 text-amber-700" />
                      </div>
                      <h3 className="font-sacred text-lg font-bold text-slate-900">
                        Espaces par Rôle
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Accès dédiés : Côté Pasteur (AMOUZOU), Côté Diacre (œuvres sociales), Côté Administrateur (trésorerie) & Côté Membre.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('portals')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-900 hover:text-blue-950 pt-2 group"
                    >
                      <span>Ouvrir les espaces</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Card 1: Prédications */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 text-blue-900 rounded-xl w-fit">
                        <PlayCircle className="w-6 h-6 text-blue-900" />
                      </div>
                      <h3 className="font-sacred text-lg font-bold text-slate-900">
                        Chaire Pastorale
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Écoutez les messages du Pasteur AMOUZOU avec transcription et bloc-notes intégré.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('sermons')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-900 hover:text-blue-950 pt-2 group"
                    >
                      <span>Accéder aux prédications</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Card 2: Intercession & Prière */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-rose-50 text-rose-800 rounded-xl w-fit">
                        <HeartHandshake className="w-6 h-6 text-rose-700" />
                      </div>
                      <h3 className="font-sacred text-lg font-bold text-slate-900">
                        Mur d'Intercession
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Déposez vos requêtes ou priez pour les familles d'Adamavo 2 avec le compteur en direct.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('prayer')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-rose-800 hover:text-rose-900 pt-2 group"
                    >
                      <span>Rejoindre la prière</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Card 3: Recueil de Cantiques */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-stone-100 text-stone-700 rounded-xl w-fit">
                        <BookOpen className="w-6 h-6 text-stone-800" />
                      </div>
                      <h3 className="font-sacred text-lg font-bold text-slate-900">
                        Recueil de Cantiques
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Hymnes classiques (« Sur les ailes de la foi ») et chants de réveil avec paroles complètes.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('hymns')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-stone-800 hover:text-slate-950 pt-2 group"
                    >
                      <span>Feuilleter le recueil</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Banner Callout for History & National Leadership */}
                <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-amber-400/30">
                  <div className="flex items-center gap-4 text-center md:text-left">
                    <div className="p-3.5 bg-amber-400/10 text-amber-300 rounded-2xl border border-amber-400/20 shrink-0 hidden sm:block">
                      <Landmark className="w-8 h-8 text-amber-300" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
                          1914 · 1936 · 2024
                        </span>
                        <span className="text-xs text-stone-300">
                          37 ans de présidence Rév. Djakouti · Élection Rév. Dr. ADADÉ Ayi
                        </span>
                      </div>
                      <h3 className="font-sacred text-lg sm:text-xl font-bold text-white">
                        Histoire des Assemblées de Dieu & Bureau Exécutif National du Togo
                      </h3>
                      <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
                        Découvrez la genèse mondiale à Hot Springs, l'implantation pionnière au Togo en 1936, l'héritage des anciens dirigeants et la composition officielle du Bureau National (7 membres) élu à Atakpamé.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate('history')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shadow-md shrink-0 whitespace-nowrap"
                  >
                    <History className="w-4 h-4 text-slate-950" />
                    <span>Découvrir l'Histoire & le Bureau</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Banner Callout for JAD (Jeunesse des Assemblées de Dieu) */}
                <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-purple-400/30">
                  <div className="flex items-center gap-4 text-center md:text-left">
                    <div className="p-3.5 bg-amber-400/20 text-amber-300 rounded-2xl border border-amber-400/30 shrink-0 hidden sm:block">
                      <Flame className="w-8 h-8 text-amber-300 fill-amber-300" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-500/30 text-amber-300 border border-purple-400/40 uppercase tracking-wider">
                          Jeunesse J.A.D. · « Jeune pour Christ ! »
                        </span>
                        <span className="text-xs text-purple-200">
                          1 Timothée 4:12 · Chaque Samedi à 16h00
                        </span>
                      </div>
                      <h3 className="font-sacred text-lg sm:text-xl font-bold text-white">
                        Groupe de la J.A.D. (Temple de la Résurrection)
                      </h3>
                      <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                        Rejoignez les 120 jeunes de la paroisse : louange vivante, commissions d'action, bureau des jeunes, boîte aux questions spirituelles et cotisations en FCFA.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate('jad')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shadow-md shrink-0 whitespace-nowrap"
                  >
                    <Flame className="w-4 h-4 text-slate-950 fill-current" />
                    <span>Découvrir le Groupe JAD</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Banner Callout for Giving & Missions */}
                <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-amber-400/20">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="p-3 bg-white/10 rounded-2xl border border-white/20 shrink-0 hidden sm:block">
                      <ChurchLogo variant="mark" size="md" />
                    </div>
                    <div>
                      <h3 className="font-sacred text-lg sm:text-xl font-bold text-amber-300">
                        Soutenir l'Œuvre de Dieu & les Missions (Franc CFA)
                      </h3>
                      <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
                        Votre fidélité dans les dîmes et offrandes permet de faire retentir l'Évangile jusqu'aux extrémités de la terre et de secourir les plus démunis d'Adamavo.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate('giving')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:brightness-105 transition-all shadow-md shrink-0 whitespace-nowrap"
                  >
                    <span>Faire un Don / Dîme (FCFA)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'history' && <HistorySection onNavigate={handleNavigate} />}
        {activeTab === 'jad' && <JadView />}
        {activeTab === 'portals' && <RolePortalsView />}
        {activeTab === 'sermons' && <SermonsView />}
        {activeTab === 'prayer' && <PrayerWallView />}
        {activeTab === 'ministries' && <MinistriesView onNavigateToJad={() => handleNavigate('jad')} />}
        {activeTab === 'hymns' && <HymnbookView />}
        {activeTab === 'giving' && <GivingView />}
      </main>

      {/* Modals */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />

      <LogoShowcaseModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenLogoShowcase={() => setIsLogoModalOpen(true)}
      />
    </div>
  );
}
