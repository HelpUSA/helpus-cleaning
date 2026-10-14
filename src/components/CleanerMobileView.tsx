import React, { useState } from 'react';
import { Property, Cleaner, CleaningTask } from '../types';
import { Language, translations } from '../i18n/translations';
import {
  Smartphone,
  Play,
  CheckCircle2,
  Camera,
  AlertTriangle,
  KeyRound,
  MapPin,
  Clock,
  Wifi,
  Check
} from 'lucide-react';

interface CleanerMobileViewProps {
  properties: Property[];
  cleaners: Cleaner[];
  tasks: CleaningTask[];
  lang: Language;
  onUpdateChecklist: (taskId: string, categoryIndex: number, itemId: string, done: boolean) => void;
  onAddPhoto: (taskId: string, photoUrl: string, caption: string) => void;
  onAddDamage: (taskId: string, room: string, description: string) => void;
  onClockIn: (taskId: string) => void;
  onClockOut: (taskId: string) => void;
}

export const CleanerMobileView: React.FC<CleanerMobileViewProps> = ({
  properties,
  cleaners,
  tasks,
  lang,
  onUpdateChecklist,
  onAddPhoto,
  onAddDamage,
  onClockIn,
  onClockOut
}) => {
  const t = translations[lang];
  const [selectedCleanerId, setSelectedCleanerId] = useState<string>(cleaners[1]?.id || cleaners[0]?.id || '');
  const [activeTaskId, setActiveTaskId] = useState<string>(tasks[1]?.id || tasks[0]?.id || '');
  const [isFramed, setIsFramed] = useState(true);

  // Modal forms inside mobile
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoCaption, setPhotoCaption] = useState('Banheiro sanitizado e toalhas dobradas');
  const [photoUrlInput, setPhotoUrlInput] = useState(
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'
  );

  const [showDamageModal, setShowDamageModal] = useState(false);
  const [damageRoom, setDamageRoom] = useState('Varanda / Sacada');
  const [damageDesc, setDamageDesc] = useState('');

  const currentCleaner = cleaners.find((c) => c.id === selectedCleanerId);
  const activeTask = tasks.find((t) => t.id === activeTaskId);
  const currentProperty = activeTask ? properties.find((p) => p.id === activeTask.propertyId) : null;

  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTask) return;
    onAddPhoto(activeTask.id, photoUrlInput, photoCaption);
    setShowPhotoModal(false);
  };

  const handleDamageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTask || !damageDesc) return;
    onAddDamage(activeTask.id, damageRoom, damageDesc);
    setDamageDesc('');
    setShowDamageModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controller Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">{t.mobileAppTitle}</h2>
            <p className="text-xs text-slate-400">
              {t.mobileAppSubtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <label className="text-xs text-slate-400 font-semibold">{t.simulateAs}</label>
          <select
            value={selectedCleanerId}
            onChange={(e) => setSelectedCleanerId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-3 py-1.5 text-xs font-semibold"
          >
            {cleaners.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsFramed(!isFramed)}
            className="text-xs text-slate-400 hover:text-white border border-slate-700 px-3 py-1.5 rounded-lg bg-slate-950 transition"
          >
            {isFramed ? t.btnPhoneMode : t.btnFullscreenMode}
          </button>
        </div>
      </div>

      {/* Mobile Frame Container */}
      <div className={`mx-auto ${isFramed ? 'max-w-[420px]' : 'w-full'}`}>
        <div
          className={`${
            isFramed
              ? 'bg-slate-950 border-[8px] sm:border-[10px] border-slate-800 rounded-[36px] sm:rounded-[48px] shadow-2xl p-3 sm:p-4 overflow-hidden relative ring-1 ring-slate-700'
              : 'bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl'
          }`}
        >
          {/* Smartphone Speaker Notch */}
          {isFramed && (
            <div className="w-24 sm:w-28 h-3.5 sm:h-4 bg-slate-800 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-slate-950 rounded-full"></div>
            </div>
          )}

          {/* Cleaner Mobile App Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <img
                src={currentCleaner?.avatar}
                alt={currentCleaner?.name}
                className="w-9 h-9 rounded-full object-cover border border-amber-400"
              />
              <div>
                <p className="text-xs font-bold text-white">{currentCleaner?.name}</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {t.onDutyNotice}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <img src="/logo.png" alt="HelpUS Logo" className="w-6 h-6 rounded-full" />
              <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                HELPUS
              </span>
            </div>
          </div>

          {/* Select Turnover Job */}
          <div className="mt-3">
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              {t.unitUnderService}
            </label>
            <select
              value={activeTaskId}
              onChange={(e) => setActiveTaskId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl p-2 text-xs font-semibold"
            >
              {tasks.map((t) => {
                const p = properties.find((prop) => prop.id === t.propertyId);
                return (
                  <option key={t.id} value={t.id}>
                    {p?.name} ({t.scheduledDate} - {t.timeWindow})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Active Property Card */}
          {activeTask && currentProperty && (
            <div className="mt-4 space-y-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-32 w-full">
                  <img
                    src={currentProperty.imageUrl}
                    alt={currentProperty.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-400/20">
                    {currentProperty.code}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                    {t.yourEarning} ${activeTask.payoutAmount}
                  </span>
                </div>

                <div className="p-3.5 space-y-2.5 text-xs">
                  <div>
                    <h3 className="font-bold text-white text-sm">{currentProperty.name}</h3>
                    <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-400" /> {currentProperty.address}, Gulf Shores, AL
                    </p>
                  </div>

                  {/* House Codes */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px]">
                    <div>
                      <span className="text-slate-400 flex items-center gap-1 text-[10px]">
                        <KeyRound className="w-3 h-3 text-amber-400" /> {t.doorLock}:
                      </span>
                      <span className="font-mono font-bold text-amber-400 text-xs">
                        {currentProperty.doorCode}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 flex items-center gap-1 text-[10px]">
                        <Wifi className="w-3 h-3 text-sky-400" /> {t.wifi}:
                      </span>
                      <span className="font-mono text-slate-200 text-xs truncate block">
                        {currentProperty.wifiPassword}
                      </span>
                    </div>
                  </div>

                  {/* Operational Clock-in Button */}
                  {activeTask.status === 'pending' ? (
                    <button
                      onClick={() => onClockIn(activeTask.id)}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      {t.btnStartClean}
                    </button>
                  ) : activeTask.status === 'in_progress' ? (
                    <div className="space-y-2">
                      <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-2.5 text-center text-xs text-sky-300 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-sky-400 animate-spin" />
                        <span>
                          {t.cleanStartedNotice} {activeTask.startedAt || '10:00'}. {t.liveTimerActive}
                        </span>
                      </div>
                      <button
                        onClick={() => onClockOut(activeTask.id)}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-95"
                      >
                        <Check className="w-4 h-4" />
                        {t.btnFinishClean}
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center text-xs text-emerald-400 font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {t.turnoverCompletedNotice}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Add Photo & Report Damage */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <Camera className="w-4 h-4 text-sky-400" />
                  {t.btnEvidencePhoto}
                </button>
                <button
                  onClick={() => setShowDamageModal(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-rose-400 border border-rose-500/30 font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <AlertTriangle className="w-4 h-4" />
                  {t.btnReportDamage}
                </button>
              </div>

              {/* Room Checklists Accordion */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>{t.mandatoryChecklist}</span>
                  <span className="text-[10px] text-amber-400 font-mono">{t.tapToToggle}</span>
                </h4>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {activeTask.checklists.map((category, catIdx) => (
                    <div
                      key={catIdx}
                      className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2"
                    >
                      <p className="text-xs font-bold text-amber-400">{category.category}</p>
                      <div className="space-y-1.5">
                        {category.items.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              onUpdateChecklist(activeTask.id, catIdx, item.id, !item.done)
                            }
                            className={`w-full text-left p-2 rounded-lg text-xs flex items-center gap-2 transition ${
                              item.done
                                ? 'bg-emerald-500/10 text-slate-200 border border-emerald-500/30'
                                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${
                                item.done
                                  ? 'bg-emerald-400 border-emerald-400 text-slate-950 font-black'
                                  : 'border-slate-600 bg-slate-900'
                              }`}
                            >
                              {item.done && '✓'}
                            </span>
                            <span className={item.done ? 'line-through text-slate-400' : ''}>
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photos Uploaded in this job */}
              {activeTask.photos.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {t.attachedPhotos} ({activeTask.photos.length})
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeTask.photos.map((p) => (
                      <div
                        key={p.id}
                        className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800"
                      >
                        <img src={p.url} alt={p.caption} className="w-full h-24 object-cover" />
                        <p className="p-1.5 text-[10px] text-slate-300 truncate">{p.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modal: Add Photo */}
          {showPhotoModal && (
            <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm p-4 flex items-center justify-center">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 w-full space-y-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-sky-400" /> {t.photoModalTitle}
                </h3>
                <form onSubmit={handlePhotoSubmit} className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">{t.photoCaptionLabel}</label>
                    <input
                      type="text"
                      required
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{t.photoUrlLabel}</label>
                    <input
                      type="text"
                      required
                      value={photoUrlInput}
                      onChange={(e) => setPhotoUrlInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-[10px]"
                    />
                  </div>
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPhotoModal(false)}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg"
                    >
                      {t.btnCancel}
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-sky-400 text-slate-950 font-bold rounded-lg"
                    >
                      {t.btnSavePhoto}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal: Add Damage */}
          {showDamageModal && (
            <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm p-4 flex items-center justify-center">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 w-full space-y-3">
                <h3 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> {t.damageModalTitle}
                </h3>
                <form onSubmit={handleDamageSubmit} className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">{t.affectedRoomLabel}</label>
                    <input
                      type="text"
                      required
                      value={damageRoom}
                      onChange={(e) => setDamageRoom(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{t.damageDescLabel}</label>
                    <textarea
                      required
                      placeholder={t.damagePlaceholder}
                      value={damageDesc}
                      onChange={(e) => setDamageDesc(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white h-20"
                    />
                  </div>
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowDamageModal(false)}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg"
                    >
                      {t.btnCancel}
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-rose-500 text-white font-bold rounded-lg"
                    >
                      {t.btnSendReport}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
