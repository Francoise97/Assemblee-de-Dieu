import React, { useState, useEffect } from 'react';
import { HYMNS, Hymn } from '../data/churchData';
import { Search, Music, Bookmark, BookmarkCheck, Copy, Check, Type } from 'lucide-react';

export const HymnbookView: React.FC = () => {
  const [selectedHymn, setSelectedHymn] = useState<Hymn>(HYMNS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [fontSizeLevel, setFontSizeLevel] = useState<'sm' | 'md' | 'lg'>('md');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [copiedHymn, setCopiedHymn] = useState(false);

  // Load favorites
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ad_favorite_hymns');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // fallback
    }
  }, []);

  const toggleFavorite = (hymnId: number) => {
    const isFav = favorites.includes(hymnId);
    const updated = isFav ? favorites.filter((id) => id !== hymnId) : [...favorites, hymnId];
    setFavorites(updated);
    try {
      localStorage.setItem('ad_favorite_hymns', JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  const handleCopyLyrics = () => {
    const fullText = `${selectedHymn.title} (N° ${selectedHymn.number} - ${selectedHymn.collection})\nTonalité : ${selectedHymn.key}\n\n${
      selectedHymn.chorus ? `Refrain :\n${selectedHymn.chorus}\n\n` : ''
    }Couplets :\n${selectedHymn.verses.map((v, i) => `${i + 1}. ${v}`).join('\n\n')}\n\n— Recueil Assemblée de Dieu`;

    navigator.clipboard.writeText(fullText);
    setCopiedHymn(true);
    setTimeout(() => setCopiedHymn(false), 2000);
  };

  const filteredHymns = HYMNS.filter((h) => {
    const matchesCollection = selectedCollection === 'all' || h.collection === selectedCollection;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCollection;

    const matchesNumber = h.number.toString().includes(query);
    const matchesTitle = h.title.toLowerCase().includes(query);
    const matchesLyrics = h.verses.some((v) => v.toLowerCase().includes(query));
    return matchesCollection && (matchesNumber || matchesTitle || matchesLyrics);
  });

  const fontSizeClass = {
    sm: 'text-sm sm:text-base leading-relaxed',
    md: 'text-base sm:text-lg leading-loose',
    lg: 'text-lg sm:text-xl leading-loose',
  }[fontSizeLevel];

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-800">
            <span>Liturgie & Adoration</span>
            <span aria-hidden="true">·</span>
            <span>Éphésiens 5:19</span>
          </div>
          <h1 className="font-sacred text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Recueil de Cantiques & Louanges
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            « Entretenez-vous par des psaumes, par des hymnes, et par des cantiques spirituels, chantant et célébrant de tout votre cœur les louanges du Seigneur. »
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hymn Selector & Search */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Numéro (ex: 124) ou titre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 focus:bg-white"
              />
            </div>

            {/* Collection Filter */}
            <div className="flex flex-wrap gap-1 p-1 bg-stone-100 rounded-lg text-xs">
              {['all', 'Sur les Ailes de la Foi', 'Cantiques de Réveil', 'Cantiques de la Pentecôte'].map(
                (col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedCollection(col)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      selectedCollection === col
                        ? 'bg-white text-blue-900 font-semibold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {col === 'all' ? 'Tous' : col}
                  </button>
                )
              )}
            </div>

            {/* Hymn List */}
            <div className="divide-y divide-stone-100 max-h-[500px] overflow-y-auto pr-1">
              {filteredHymns.map((hymn) => {
                const isSelected = selectedHymn.id === hymn.id;
                const isFav = favorites.includes(hymn.id);
                return (
                  <button
                    key={hymn.id}
                    onClick={() => setSelectedHymn(hymn)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-blue-50/80 text-blue-900 font-semibold'
                        : 'hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-md tabular-nums shrink-0">
                        N° {hymn.number}
                      </span>
                      <div className="truncate">
                        <span className="text-xs sm:text-sm truncate block font-medium">
                          {hymn.title}
                        </span>
                        <span className="text-[10px] text-stone-400 block truncate">
                          {hymn.collection} · {hymn.key}
                        </span>
                      </div>
                    </div>

                    {isFav && (
                      <BookmarkCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hymn Presentation Sheet */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Hymn Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-md">
                    Cantique N° {selectedHymn.number}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {selectedHymn.collection}
                  </span>
                </div>
                <h2 className="font-sacred text-2xl sm:text-3xl font-bold text-slate-900">
                  {selectedHymn.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span className="flex items-center gap-1 font-semibold text-blue-900">
                    <Music className="w-3.5 h-3.5 text-amber-700" />
                    Tonalité : {selectedHymn.key}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Thème : {selectedHymn.theme}</span>
                </div>
              </div>

              {/* Utility Tools */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                {/* Font size picker */}
                <div className="flex items-center bg-stone-100 p-1 rounded-lg">
                  <button
                    onClick={() => setFontSizeLevel('sm')}
                    className={`px-2 py-0.5 text-xs font-semibold rounded ${
                      fontSizeLevel === 'sm' ? 'bg-white shadow-xs text-blue-900' : 'text-stone-500'
                    }`}
                    title="Petite police"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSizeLevel('md')}
                    className={`px-2 py-0.5 text-xs font-semibold rounded ${
                      fontSizeLevel === 'md' ? 'bg-white shadow-xs text-blue-900' : 'text-stone-500'
                    }`}
                    title="Police moyenne"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSizeLevel('lg')}
                    className={`px-2 py-0.5 text-xs font-semibold rounded ${
                      fontSizeLevel === 'lg' ? 'bg-white shadow-xs text-blue-900' : 'text-stone-500'
                    }`}
                    title="Grande police"
                  >
                    A+
                  </button>
                </div>

                <button
                  onClick={() => toggleFavorite(selectedHymn.id)}
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    favorites.includes(selectedHymn.id)
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-stone-50 text-stone-600 hover:text-stone-900 border-stone-200'
                  }`}
                  title="Ajouter aux favoris"
                >
                  {favorites.includes(selectedHymn.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={handleCopyLyrics}
                  className="p-2 bg-stone-50 text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg text-xs flex items-center gap-1 transition-colors"
                  title="Copier les paroles"
                >
                  {copiedHymn ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Chorus Box (if present) */}
            {selectedHymn.chorus && (
              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 block">
                  Refrain Solennel :
                </span>
                <p className={`font-serif italic font-medium text-amber-950 ${fontSizeClass}`}>
                  « {selectedHymn.chorus} »
                </p>
              </div>
            )}

            {/* Verses */}
            <div className="space-y-8 font-serif text-slate-800">
              {selectedHymn.verses.map((verse, index) => (
                <div key={index} className="space-y-2">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-stone-400 block">
                    Strophe {index + 1}
                  </span>
                  <p className={fontSizeClass}>{verse}</p>
                </div>
              ))}
            </div>

            {/* Footer citation */}
            <div className="pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>Assemblée de Dieu · Chant Liturgique</span>
              <span className="font-sacred text-stone-600 font-semibold">Soli Deo Gloria</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
