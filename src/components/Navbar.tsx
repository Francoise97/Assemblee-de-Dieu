import React, { useState } from 'react';
import { ChurchLogo } from './ChurchLogo';
import { Menu, X, Calendar, Sparkles, LogIn } from 'lucide-react';

export type NavTab = 'home' | 'history' | 'jad' | 'sermons' | 'prayer' | 'ministries' | 'hymns' | 'giving' | 'portals';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenSchedule: () => void;
  onOpenLogoShowcase: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenSchedule,
  onOpenLogoShowcase,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavTab; label: string; badge?: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'history', label: 'Histoire & Bureau' },
    { id: 'jad', label: 'Jeunesse (JAD)', badge: 'Actif' },
    { id: 'sermons', label: 'Prédications' },
    { id: 'prayer', label: 'Intercession' },
    { id: 'ministries', label: 'Ministères' },
    { id: 'hymns', label: 'Cantiques' },
    { id: 'giving', label: 'Dons & Dîmes (FCFA)' },
  ];

  const handleLinkClick = (id: NavTab) => {
    onTabChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 w-full max-w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Bar Contract: 3 zones separated by gap */}
        <div className="flex items-center justify-between gap-3 md:gap-4 lg:gap-6 h-20 w-full">
          {/* Zone 1: Brand Zone (Single element with unique logo) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-800 rounded-lg p-1 transition-opacity hover:opacity-95"
              aria-label="Accueil Assemblée de Dieu"
            >
              <ChurchLogo variant="horizontal" size="md" />
            </button>

            <button
              onClick={onOpenLogoShowcase}
              className="hidden 2xl:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-md transition-colors"
              title="Découvrir le logo et ses symboles"
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Sceau Officiel</span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean text links with hover underline, visible on xl) */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 text-xs 2xl:text-sm font-medium text-stone-700">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-blue-900 font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Direct Login Access */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleLinkClick('portals')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 border ${
                activeTab === 'portals'
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-slate-800 border-stone-200'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-blue-900" />
              <span>Espaces Rôles</span>
            </button>

            <button
              onClick={onOpenSchedule}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow-xs hover:shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Horaires des Cultes</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenSchedule}
              className="p-2 text-blue-900 bg-blue-50 rounded-lg text-xs font-medium sm:hidden"
              aria-label="Cultes"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-800"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200 w-full">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSchedule();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-blue-900 rounded-lg shadow-xs"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Consulter les Horaires des Cultes</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogoShowcase();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-amber-900 bg-amber-50 border border-amber-200 rounded-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Découvrir le Logo Unique & Symboles</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
