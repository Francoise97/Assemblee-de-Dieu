import React, { useState } from 'react';
import { CHURCH_INFO } from '../data/churchData';
import { X, Calendar, Clock, MapPin, Phone, Mail, Check, Download, AlertCircle } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  if (!isOpen) return null;

  const handleDownloadCalendar = () => {
    // Generate .ics calendar invite for Sunday worship service
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Assemblee de Dieu//Cultes//FR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:1er Culte d'Adoration (07h00) - Assemblée de Dieu Temple de la Résurrection
DESCRIPTION:Culte dominical au Temple de la Résurrection (Adamavo 2, Lomé) avec louange et prédication de la Parole par le Pasteur AMOUZOU. Deux cultes : 07h00 et 09h00.
LOCATION:${CHURCH_INFO.address}
STATUS:CONFIRMED
RRULE:FREQ=WEEKLY;BYDAY=SU
DTSTART:20261101T070000Z
DTEND:20261101T090000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cultes_assemblee_de_dieu.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-blue-900" />
            <h2 className="font-sacred text-lg font-bold text-slate-900 tracking-wide">
              Horaires des Rassemblements & Cultes
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-slate-800 rounded-lg hover:bg-stone-200/60 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Announcement Box */}
          <div className="flex items-start gap-3 p-4 bg-blue-50/70 border border-blue-200/60 rounded-xl text-blue-950">
            <AlertCircle className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-blue-900">
                Bienvenue à tous les visiteurs et nouvelles familles
              </p>
              <p className="text-blue-950/80 leading-relaxed">
                Nos cultes sont libres d'accès. Un accueil chaleureux avec prise en charge bienveillante de vos enfants à l'École du Dimanche (ECODIM) est prévu chaque dimanche.
              </p>
            </div>
          </div>

          {/* Service Listing */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-stone-500">
              Programme Hebdomadaire
            </h3>

            <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
              {CHURCH_INFO.services.map((srv, idx) => (
                <div key={idx} className="p-4 hover:bg-stone-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase px-2 py-0.5 bg-amber-50 text-amber-900 rounded-md border border-amber-200/60">
                        {srv.day}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900">{srv.name}</h4>
                    </div>
                    <p className="text-xs text-stone-600">{srv.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 shrink-0 tabular-nums bg-stone-100 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-blue-700" />
                    <span>{srv.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Pastoral Contact */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-2.5">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Temple de la Résurrection :</span>{' '}
                {CHURCH_INFO.address}
              </div>
            </div>
            <div className="text-[11px] text-amber-800 font-medium pl-6">
              Pasteur Principal : <strong>{CHURCH_INFO.headPastor}</strong>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-800 shrink-0" />
              <span>{CHURCH_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-800 shrink-0" />
              <span>{CHURCH_INFO.email}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleDownloadCalendar}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors shadow-xs"
          >
            {downloadedIcs ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
            {downloadedIcs ? 'Rappel Calendrier Téléchargé !' : 'Ajouter au Calendrier (.ics)'}
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-200/80 hover:bg-stone-200 rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
