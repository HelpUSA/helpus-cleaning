import React, { useState } from 'react';
import { Property, Cleaner, CleaningTask } from '../types';
import { Language, translations } from '../i18n/translations';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  UserCheck,
  Camera,
  AlertOctagon,
  Award,
  DollarSign,
  Check,
  Eye,
  Phone,
  RefreshCw
} from 'lucide-react';

interface HousekeepingViewProps {
  properties: Property[];
  cleaners: Cleaner[];
  tasks: CleaningTask[];
  lang: Language;
  onUpdateTaskStatus: (taskId: string, status: CleaningTask['status']) => void;
  onAssignCleaner: (taskId: string, cleanerId: string) => void;
  onInspectTask: (taskId: string, score: number, inspector: string) => void;
}

export const HousekeepingView: React.FC<HousekeepingViewProps> = ({
  properties,
  cleaners,
  tasks,
  lang,
  onUpdateTaskStatus,
  onAssignCleaner,
  onInspectTask
}) => {
  const t = translations[lang];
  const [selectedTab, setSelectedTab] = useState<'turnovers' | 'cleaners' | 'damage'>('turnovers');
  const [selectedTaskDetails, setSelectedTaskDetails] = useState<CleaningTask | null>(null);

  const getProperty = (id: string) => properties.find((p) => p.id === id);
  const getCleaner = (id?: string) => cleaners.find((c) => c.id === id);

  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inspectedCount = tasks.filter((t) => t.status === 'inspected').length;
  const totalPayout = tasks.reduce((acc, t) => acc + t.payoutAmount, 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/70 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-sky-400 text-slate-950 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded">
                {t.housekeepingBadge}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{t.housekeepingTitle}</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t.housekeepingSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-full md:w-auto">
            <button
              onClick={() => setSelectedTab('turnovers')}
              className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedTab === 'turnovers' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabTurnovers} ({tasks.length})
            </button>
            <button
              onClick={() => setSelectedTab('cleaners')}
              className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedTab === 'cleaners' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabCleaners} ({cleaners.length})
            </button>
            <button
              onClick={() => setSelectedTab('damage')}
              className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedTab === 'damage' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabDamage}
            </button>
          </div>
        </div>

        {/* Operational Status Metrics (Fully responsive grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5 mt-6">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase">{t.turnoversToday}</span>
            <p className="text-lg sm:text-xl font-black text-amber-400 mt-1">{tasks.length}</p>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase">{t.inProgress}</span>
            <p className="text-lg sm:text-xl font-black text-sky-400 mt-1">{inProgressCount}</p>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase">{t.completedCleans}</span>
            <p className="text-lg sm:text-xl font-black text-indigo-400 mt-1">{completedCount}</p>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase">{t.inspectedReady}</span>
            <p className="text-lg sm:text-xl font-black text-emerald-400 mt-1">{inspectedCount}</p>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">{t.totalPayoutDue}</span>
            <p className="text-lg sm:text-xl font-black text-amber-300 mt-1">${totalPayout}</p>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {selectedTab === 'turnovers' && (
        <section className="space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              {t.tabTurnovers} (Gulf Shores, AL)
            </h2>
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {t.realtimeSyncNotice}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {tasks.map((task) => {
              const prop = getProperty(task.propertyId);
              const cleaner = getCleaner(task.cleanerId);
              const totalItems = task.checklists.reduce((acc, c) => acc + c.items.length, 0);
              const doneItems = task.checklists.reduce(
                (acc, c) => acc + c.items.filter((i) => i.done).length,
                0
              );
              const progressPct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

              return (
                <div
                  key={task.id}
                  className={`bg-slate-900 border rounded-2xl p-4 sm:p-5 shadow-lg space-y-4 transition-all flex flex-col justify-between ${
                    task.status === 'inspected'
                      ? 'border-emerald-500/40 hover:border-emerald-500'
                      : task.status === 'in_progress'
                      ? 'border-sky-500/50 hover:border-sky-400'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3.5">
                    {/* Card Header: Property & Status Badge */}
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[11px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {prop?.code || 'PROP'}
                        </span>
                        <h3 className="font-bold text-slate-100 text-sm mt-1">{prop?.name}</h3>
                        <p className="text-xs text-slate-400 truncate max-w-[200px]">{prop?.address}</p>
                      </div>

                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow whitespace-nowrap ${
                          task.status === 'inspected'
                            ? 'bg-emerald-500 text-slate-950'
                            : task.status === 'completed'
                            ? 'bg-indigo-500 text-white'
                            : task.status === 'in_progress'
                            ? 'bg-sky-500 text-slate-950 animate-pulse'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {task.status === 'inspected'
                          ? t.statusInspected
                          : task.status === 'completed'
                          ? t.statusReadyInspection
                          : task.status === 'in_progress'
                          ? t.statusCleaningNow
                          : t.statusAwaiting}
                      </span>
                    </div>

                    {/* Window & Cleaner Assignment */}
                    <div className="bg-slate-950/80 rounded-xl p-3 text-xs space-y-2 border border-slate-800">
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400" /> {t.windowTurnover}:
                        </span>
                        <span className="font-mono font-bold text-slate-200">
                          {task.scheduledDate} ({task.timeWindow})
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-slate-300 pt-1.5 border-t border-slate-900">
                        <span className="text-slate-400 flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-sky-400" /> {t.cleanerLabel}:
                        </span>
                        <select
                          value={task.cleanerId || ''}
                          onChange={(e) => onAssignCleaner(task.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-slate-100 rounded px-2 py-1 text-xs"
                        >
                          {cleaners.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex justify-between items-center text-slate-300 pt-1.5 border-t border-slate-900">
                        <span className="text-slate-400 flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {t.payoutLabel}:
                        </span>
                        <span className="font-bold text-emerald-400">${task.payoutAmount}</span>
                      </div>
                    </div>

                    {/* Checklist Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                        <span>{t.progressRooms}</span>
                        <span className="text-slate-200 font-mono">
                          {doneItems}/{totalItems} ({progressPct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            progressPct === 100 ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Evidence & Damage Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded text-slate-300 text-[11px]">
                        <Camera className="w-3.5 h-3.5 text-sky-400" /> {task.photos.length} {t.photosBadge}
                      </span>
                      {task.damageReports.length > 0 && (
                        <span className="flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded text-[11px] font-semibold">
                          <AlertOctagon className="w-3.5 h-3.5" /> {task.damageReports.length} {t.damageBadge}
                        </span>
                      )}
                      {task.inspectorScore && (
                        <span className="ml-auto flex items-center gap-1 bg-amber-400/10 text-amber-300 border border-amber-400/30 px-2 py-1 rounded text-[11px] font-bold">
                          <Award className="w-3.5 h-3.5" /> {t.scoreBadge} {task.inspectorScore}/100
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Operational Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                    <button
                      onClick={() => setSelectedTaskDetails(task)}
                      className="w-full sm:flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> {t.btnViewDetails}
                    </button>

                    {task.status !== 'inspected' && (
                      <button
                        onClick={() => onInspectTask(task.id, 99, 'SuperAdmin Master')}
                        className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl transition flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20 whitespace-nowrap"
                      >
                        <Check className="w-4 h-4" /> {t.btnApproveInspection}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Cleaners & Crews Roster Tab */}
      {selectedTab === 'cleaners' && (
        <section className="space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-400" />
              {t.crewsTitle}
            </h2>
            <span className="text-xs text-slate-400">
              Total: {cleaners.length} {t.crewsSubtitle}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {cleaners.map((c) => {
              const cleanerTasks = tasks.filter((t) => t.cleanerId === c.id);
              const earned = cleanerTasks.reduce((acc, t) => acc + t.payoutAmount, 0);

              return (
                <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/60 shadow"
                    />
                    <div>
                      <h3 className="font-bold text-white text-base">{c.name}</h3>
                      <p className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                        ⭐ {c.rating} / 5.0 • {c.assignedPropertiesCount} {t.fixedProps}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3 text-sky-400" /> {c.phone}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>{t.assignedTurnovers}:</span>
                      <span className="font-bold text-white">{cleanerTasks.length}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>{t.avgRate}:</span>
                      <span className="font-bold text-slate-200">${c.payoutRate}</span>
                    </div>
                    <div className="flex justify-between text-slate-300 pt-1.5 border-t border-slate-900">
                      <span className="text-emerald-400 font-semibold">{t.totalToReceive}:</span>
                      <span className="font-extrabold text-emerald-400 text-sm">${earned}</span>
                    </div>
                  </div>

                  <div className="pt-1 flex gap-2">
                    <button
                      onClick={() => alert(`Enviando rota para ${c.name} (${c.phone})...`)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-xl transition"
                    >
                      {t.btnSendRouteWhatsapp}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Damage & Lost and Found Tab */}
      {selectedTab === 'damage' && (
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            {t.damageTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Damage Reports */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
              <h3 className="font-bold text-rose-400 text-sm uppercase tracking-wider">{t.damagesSection}</h3>
              {tasks.flatMap((t) => t.damageReports).length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">{t.noDamages}</p>
              ) : (
                tasks.flatMap((t) =>
                  t.damageReports.map((d) => (
                    <div key={d.id} className="bg-slate-950 p-3 rounded-xl border border-rose-500/20 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-200">{d.room}</span>
                        <span className="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                          {d.severity}
                        </span>
                      </div>
                      <p className="text-slate-400">{d.description}</p>
                      <p className="text-[10px] text-slate-500">{t.registeredAt} {d.timestamp}</p>
                    </div>
                  ))
                )
              )}
            </div>

            {/* Lost & Found */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
              <h3 className="font-bold text-sky-400 text-sm uppercase tracking-wider">{t.lostFoundSection}</h3>
              {tasks.flatMap((t) => t.lostAndFound).length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">{t.noLostItems}</p>
              ) : (
                tasks.flatMap((t) =>
                  t.lostAndFound.map((lf) => (
                    <div key={lf.id} className="bg-slate-950 p-3 rounded-xl border border-sky-500/20 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-200">{lf.item}</span>
                        <span className="bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                          {t.matchedGuest}
                        </span>
                      </div>
                      <p className="text-slate-400">{t.locationLabel}: {lf.room}</p>
                      <p className="text-[10px] text-slate-500">{t.registeredAt} {lf.timestamp}</p>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Modal: Task Inspection & Details */}
      {selectedTaskDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  {getProperty(selectedTaskDetails.propertyId)?.code}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                  {t.modalAuditTitle}: {getProperty(selectedTaskDetails.propertyId)?.name}
                </h3>
              </div>
              <button onClick={() => setSelectedTaskDetails(null)} className="text-slate-400 hover:text-white text-base">✕</button>
            </div>

            {/* Checklists Preview */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.modalAuditChecklists} ({selectedTaskDetails.checklists.length} {t.modalAuditAreas})
              </h4>
              <div className="space-y-2">
                {selectedTaskDetails.checklists.map((cat, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                    <p className="font-semibold text-amber-400">{cat.category}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                      {cat.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-1.5">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${item.done ? 'text-emerald-400' : 'text-slate-600'}`}
                          />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Evidence Gallery */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.modalAuditPhotos}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedTaskDetails.photos.map((p) => (
                  <div key={p.id} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                    <img src={p.url} alt={p.caption} className="w-full h-36 object-cover" />
                    <div className="p-2 text-[11px]">
                      <p className="font-semibold text-slate-200">{p.caption}</p>
                      <p className="text-slate-500 text-[10px]">{t.registeredAt} {p.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedTaskDetails(null)}
                className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-700"
              >
                {t.close}
              </button>
              {selectedTaskDetails.status !== 'inspected' && (
                <button
                  onClick={() => {
                    onInspectTask(selectedTaskDetails.id, 99, 'SuperAdmin Master');
                    setSelectedTaskDetails(null);
                  }}
                  className="px-4 py-2 bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold hover:bg-emerald-300 shadow"
                >
                  {t.btnApprove100}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
