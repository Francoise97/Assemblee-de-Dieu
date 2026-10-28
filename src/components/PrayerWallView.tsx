import React, { useState, useEffect } from 'react';
import { INITIAL_PRAYER_ITEMS, PrayerItem, CHURCH_INFO } from '../data/churchData';
import { Heart, Plus, Send, ShieldCheck, PhoneCall, Check, Lock, Sparkles, Filter } from 'lucide-react';

export const PrayerWallView: React.FC = () => {
  const [prayers, setPrayers] = useState<PrayerItem[]>(INITIAL_PRAYER_ITEMS);
  const [prayedSet, setPrayedSet] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // New request form state
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<PrayerItem['category']>('Santé');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedPrayers = localStorage.getItem('ad_prayer_items');
      if (storedPrayers) {
        setPrayers(JSON.parse(storedPrayers));
      }
      const storedPrayed = localStorage.getItem('ad_prayed_ids');
      if (storedPrayed) {
        setPrayedSet(new Set(JSON.parse(storedPrayed)));
      }
    } catch {
      // fallback
    }
  }, []);

  const handlePrayForRequest = (id: string) => {
    if (prayedSet.has(id)) return;

    const newPrayed = new Set(prayedSet).add(id);
    setPrayedSet(newPrayed);

    const updated = prayers.map((p) => {
      if (p.id === id) {
        return { ...p, prayerCount: p.prayerCount + 1 };
      }
      return p;
    });

    setPrayers(updated);
    try {
      localStorage.setItem('ad_prayer_items', JSON.stringify(updated));
      localStorage.setItem('ad_prayed_ids', JSON.stringify(Array.from(newPrayed)));
    } catch {
      // fallback
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newReq: PrayerItem = {
      id: `req-${Date.now()}`,
      author: isAnonymous || !author.trim() ? 'Un membre de la communauté' : author.trim(),
      location: location.trim() || 'Sanctuaire',
      category,
      content: content.trim(),
      date: 'À l’instant',
      prayerCount: 1,
      isAnonymous,
    };

    const updated = [newReq, ...prayers];
    setPrayers(updated);
    try {
      localStorage.setItem('ad_prayer_items', JSON.stringify(updated));
    } catch {
      // fallback
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsFormOpen(false);
      setContent('');
      setAuthor('');
      setLocation('');
      setIsAnonymous(false);
    }, 1500);
  };

  const categories = [
    'all',
    'Santé',
    'Famille',
    'Travail & Projets',
    'Délivrance & Foi',
    'Action de Grâce',
  ];

  const filteredPrayers = prayers.filter((p) => {
    return activeCategory === 'all' || p.category === activeCategory;
  });

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-800">
              <span>Chambre Haute & Communion</span>
              <span aria-hidden="true">·</span>
              <span>Jacques 5:16</span>
            </div>
            <h1 className="font-sacred text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Mur d'Intercession & Requêtes de Prière
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              « La prière fervente du juste a une grande efficacité. » Portons ensemble les fardeaux de nos frères et sœurs du Temple de la Résurrection à Adamavo 2 (Lomé) et célébrons les merveilles de Dieu.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-xl transition-all shadow-sm active:scale-98 self-start whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Déposer une Intention de Prière</span>
          </button>
        </div>

        {/* Emergency Pastoral Hotline Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-amber-50/80 border border-amber-200 rounded-xl gap-4">
          <div className="flex items-center gap-3 text-amber-950">
            <div className="p-2.5 bg-amber-100 rounded-lg shrink-0">
              <PhoneCall className="w-5 h-5 text-amber-800" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-amber-900 block">
                Besoin d'un accompagnement pastoral urgent ou d'une prière immédiate ?
              </span>
              <span className="text-amber-800 font-medium">
                {CHURCH_INFO.emergencyPrayerLine}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Confidentialité Pastorale Garantie</span>
          </div>
        </div>

        {/* Form Drawer (When Opened) */}
        {isFormOpen && (
          <div className="bg-white rounded-2xl border border-stone-300 p-6 sm:p-8 shadow-md animate-in slide-in-from-top duration-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2 text-slate-900">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="font-sacred text-lg font-bold">
                  Partager votre besoin avec l'Assemblée
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Annuler
              </button>
            </div>

            {formSubmitted ? (
              <div className="p-8 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Requête Déposée avec Succès</h4>
                <p className="text-xs text-emerald-800">
                  Votre intention a été ajoutée au mur et confiée aux intercesseurs de l'Assemblée de Dieu.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Votre Prénom ou Nom (optionnel)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Sœur Sarah"
                      disabled={isAnonymous}
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 focus:bg-white disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Catégorie de la Requête
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as PrayerItem['category'])}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 focus:bg-white"
                    >
                      <option value="Santé">Santé & Guérison</option>
                      <option value="Famille">Famille & Couple</option>
                      <option value="Travail & Projets">Travail & Orientation</option>
                      <option value="Délivrance & Foi">Délivrance & Croissance Spirituelle</option>
                      <option value="Action de Grâce">Action de Grâce & Témoignage</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Sujet et Détail de la Prière *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Décrivez votre intention de prière avec simplicité et foi..."
                    className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 focus:bg-white resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-stone-300 text-blue-900 focus:ring-blue-900"
                    />
                    <span className="text-xs text-stone-600 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-stone-400" />
                      Garder cette requête 100% anonyme
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publier pour Intercession</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrer par thème :</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeCategory === cat
                    ? 'bg-white text-blue-900 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'all' ? 'Toutes les Intentions' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prayer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrayers.map((item) => {
            const hasPrayed = prayedSet.has(item.id);
            const isGratitude = item.category === 'Action de Grâce';

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                  isGratitude
                    ? 'bg-amber-50/40 border-amber-200/80'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                } shadow-xs hover:shadow-sm`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-md text-[11px] ${
                        isGratitude
                          ? 'bg-amber-100 text-amber-900 font-bold'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-stone-400 text-[11px]">{item.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                    {item.content}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs text-stone-500 truncate max-w-[150px]">
                    {item.isAnonymous ? (
                      <span className="italic text-stone-400">Anonyme</span>
                    ) : (
                      <span className="font-semibold text-slate-800">{item.author}</span>
                    )}
                  </div>

                  {/* Interactive "J'ai prié" button */}
                  <button
                    onClick={() => handlePrayForRequest(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                      hasPrayed
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        hasPrayed ? 'fill-rose-600 text-rose-600' : 'text-stone-400'
                      }`}
                    />
                    <span className="tabular-nums">{item.prayerCount}</span>
                    <span className="text-[11px] font-medium">
                      {hasPrayed ? 'J’ai prié' : 'Je prie'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
