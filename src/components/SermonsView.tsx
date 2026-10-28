import React, { useState, useEffect, useRef } from 'react';
import { SERMONS, Sermon } from '../data/churchData';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  FileText,
  Download,
  Search,
  BookOpen,
  User,
  Clock,
  Sparkles,
  Save,
  Check,
} from 'lucide-react';

export const SermonsView: React.FC = () => {
  const [selectedSermon, setSelectedSermon] = useState<Sermon>(SERMONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0); // in seconds
  const [playbackRate, setPlaybackRate] = useState<1 | 1.25 | 1.5>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Personal notes state per sermon
  const [notes, setNotes] = useState<{ [sermonId: string]: string }>({});
  const [savedNoteStatus, setSavedNoteStatus] = useState(false);

  const totalSeconds = selectedSermon.durationMinutes * 60;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ad_sermon_notes');
      if (stored) {
        setNotes(JSON.parse(stored));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Playback timer simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackRate, totalSeconds]);

  const handleSelectSermon = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    setPlaybackTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (seconds: number) => {
    setPlaybackTime(Math.min(Math.max(0, seconds), totalSeconds));
  };

  const handleJumpToTranscript = (timeStr: string) => {
    const [min, sec] = timeStr.split(':').map(Number);
    const targetSeconds = (min || 0) * 60 + (sec || 0);
    handleSeek(targetSeconds);
    setIsPlaying(true);
  };

  const handleNoteChange = (text: string) => {
    const updated = { ...notes, [selectedSermon.id]: text };
    setNotes(updated);
    try {
      localStorage.setItem('ad_sermon_notes', JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  const handleSaveNoteManually = () => {
    try {
      localStorage.setItem('ad_sermon_notes', JSON.stringify(notes));
      setSavedNoteStatus(true);
      setTimeout(() => setSavedNoteStatus(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleExportNote = () => {
    const noteText = notes[selectedSermon.id] || '';
    const fileContent = `Notes de Prédication — Assemblée de Dieu\n=========================================\nTitre : ${selectedSermon.title}\nPrédicateur : ${selectedSermon.preacher}\nDate : ${selectedSermon.date}\nPassage Biblique : ${selectedSermon.scripture}\n\nMes Notes Personnelles :\n${noteText}\n\nExporté depuis l'application officielle de l'Assemblée de Dieu.`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `notes_${selectedSermon.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const filteredSermons = SERMONS.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.preacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.scripture.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-800">
            <span>Temple de la Résurrection · Adamavo 2</span>
            <span aria-hidden="true">·</span>
            <span>Pasteur AMOUZOU</span>
          </div>
          <h1 className="font-sacred text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Chaire Pastorale & Messages du Pasteur AMOUZOU
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Écoutez les enseignements inspirés proclamés au Temple de la Résurrection d'Adamavo 2, suivez les points clés et consignez vos notes spirituelles personnelles.
          </p>
        </div>

        {/* Featured Sermon Player Station */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60 inline-block">
                Série : {selectedSermon.series}
              </span>
              <h2 className="font-sacred text-xl sm:text-2xl font-bold text-slate-900">
                {selectedSermon.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                <span className="flex items-center gap-1 text-slate-800 font-medium">
                  <User className="w-3.5 h-3.5 text-blue-900" />
                  {selectedSermon.preacher}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-semibold text-blue-950">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  {selectedSermon.scripture}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {selectedSermon.durationMinutes} min
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedSermon.date}</span>
              </div>
            </div>

            {/* Playback Speed & Audio Settings */}
            <div className="flex items-center gap-2 self-start lg:self-center">
              <div className="flex items-center bg-stone-100 p-1 rounded-lg">
                {([1, 1.25, 1.5] as const).map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                      playbackRate === rate
                        ? 'bg-white text-blue-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                title={isMuted ? 'Activer le son' : 'Couper le son'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Interactive Audio Player Controls */}
          <div className="space-y-3 p-5 rounded-xl bg-slate-950 text-white">
            {/* Timeline scrubber */}
            <div className="space-y-1.5">
              <input
                type="range"
                min="0"
                max={totalSeconds}
                value={playbackTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 tabular-nums">
                <span>{formatTime(playbackTime)}</span>
                <span>{formatTime(totalSeconds)}</span>
              </div>
            </div>

            {/* Transport Buttons */}
            <div className="flex items-center justify-center gap-6 pt-1">
              <button
                onClick={() => handleSeek(playbackTime - 15)}
                className="p-2 text-slate-300 hover:text-white transition-colors"
                title="Reculer de 15 secondes"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 transition-transform active:scale-95 shadow-md"
                aria-label={isPlaying ? 'Mettre en pause' : 'Écouter'}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => handleSeek(playbackTime + 15)}
                className="p-2 text-slate-300 hover:text-white transition-colors"
                title="Avancer de 15 secondes"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2-Column: Synced Transcript + Personal Notes Taking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            {/* Synchronized Transcript */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                <FileText className="w-4 h-4 text-blue-900" />
                <span>Points Clés & Transcription par Heure</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2 border border-stone-200 rounded-xl p-3 bg-stone-50/70">
                {selectedSermon.transcript.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleJumpToTranscript(item.time)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-stone-200 flex items-start gap-3 group"
                  >
                    <span className="text-xs font-mono font-semibold text-blue-900 bg-blue-100/80 px-2 py-0.5 rounded-md tabular-nums group-hover:bg-blue-900 group-hover:text-white transition-colors shrink-0">
                      {item.time}
                    </span>
                    <p className="text-xs text-stone-700 leading-relaxed group-hover:text-slate-900">
                      {item.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Integrated Notes Pad */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Mes Notes de Méditation (Auto-sauvegardées)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveNoteManually}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-900 hover:text-blue-950 transition-colors"
                    title="Sauvegarder"
                  >
                    {savedNoteStatus ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{savedNoteStatus ? 'Enregistré' : 'Sauver'}</span>
                  </button>
                  <button
                    onClick={handleExportNote}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 hover:text-stone-900 transition-colors"
                    title="Exporter en fichier texte"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exporter .txt</span>
                  </button>
                </div>
              </div>

              <textarea
                value={notes[selectedSermon.id] || ''}
                onChange={(e) => handleNoteChange(e.target.value)}
                placeholder="Notez ici les révélations, versets et résolutions reçus durant ce message..."
                rows={7}
                className="w-full p-3.5 text-xs text-slate-800 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all resize-none font-sans"
              />
            </div>
          </div>
        </div>

        {/* Catalog of Previous Sermons */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-sacred text-xl font-bold text-slate-900">
              Archives des Prédications
            </h3>

            {/* Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher pasteur, texte..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 w-48 sm:w-60"
                />
              </div>

              <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-lg">
                {['all', 'Foi', 'Saint-Esprit', 'Sanctification'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      selectedCategory === cat
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-stone-600 hover:text-slate-900'
                    }`}
                  >
                    {cat === 'all' ? 'Toutes' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sermons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => {
              const isCurrent = selectedSermon.id === sermon.id;
              return (
                <div
                  key={sermon.id}
                  className={`bg-white rounded-xl border p-5 flex flex-col justify-between transition-all ${
                    isCurrent
                      ? 'border-blue-900 ring-2 ring-blue-900/10 shadow-md'
                      : 'border-stone-200 hover:border-stone-300 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold text-amber-800">{sermon.category}</span>
                      <span className="tabular-nums">{sermon.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 line-clamp-2">
                      {sermon.title}
                    </h4>
                    <p className="text-xs text-stone-600 font-semibold text-blue-900">
                      {sermon.scripture}
                    </p>
                    <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                      {sermon.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-600 font-medium">
                      {sermon.preacher}
                    </span>
                    <button
                      onClick={() => handleSelectSermon(sermon)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        isCurrent && isPlaying
                          ? 'bg-blue-900 text-white'
                          : 'bg-stone-100 text-slate-800 hover:bg-blue-900 hover:text-white'
                      }`}
                    >
                      {isCurrent && isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>En cours</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Écouter</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
