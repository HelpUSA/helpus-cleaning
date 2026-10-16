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
  RefreshCw,
  Zap,
  ShieldAlert,
  MessageSquare,
  Wrench,
  CheckCheck,
  MapPin,
  Calendar
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
  const [taskFilter, setTaskFilter] = useState<'all' | 'turnaround' | 'unconfirmed' | 'work_order'>('all');
  const [selectedTaskDetails, setSelectedTaskDetails] = useState<CleaningTask | null>(null);

  const getProperty = (id: string) => properties.find((p) => p.id === id);
  const getCleaner = (id?: string) => cleaners.find((c) => c.id === id);

  // Operational metrics
  const unconfirmedCount = tasks.filter((t) => t.status === 'unconfirmed').length;
  const turnaroundCount = tasks.filter((t) => t.isTurnaround).length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inspectedCount = tasks.filter((t) => t.status === 'inspected').length;
  const workOrdersCount = tasks.filter((t) => t.status === 'work_order' || t.taskType === 'work_order').length;
  const totalPayout = tasks.reduce((acc, t) => acc + t.payoutAmount, 0);

  // Batch action: Confirm all unconfirmed appointments
  const handleConfirmAllAppointments = () => {
    const unconfirmedTasks = tasks.filter((t) => t.status === 'unconfirmed');
    unconfirmedTasks.forEach((t) => {
      onUpdateTaskStatus(t.id, 'pending');
    });
  };

  // Filtered tasks based on sub-filter
  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === 'turnaround') return task.isTurnaround;
    if (taskFilter === 'unconfirmed') return task.status === 'unconfirmed';
    if (taskFilter === 'work_order') return task.status === 'work_order' || task.taskType === 'work_order';
    return true;
  });

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

        {/* RESORTCLEANING INSPIRED "TODAY'S OPERATIONS BOARD" */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">
                {t.resortOpsToday} • Gulf Shores & Orange Beach, AL
              </h3>
            </div>

            {/* 1-Click Batch Confirmation Button */}
            {unconfirmedCount > 0 && (
              <button
                onClick={handleConfirmAllAppointments}
                className="flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-xl shadow-lg transition"
              >
                <CheckCheck className="w-4 h-4" />
                <span>{t.btnConfirmAll} ({unconfirmedCount})</span>
              </button>
            )}
          </div>

          {/* Operational Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* T/A Turn Arounds */}
            <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-amber-300 font-bold uppercase">{t.taCount}</span>
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{turnaroundCount}</p>
              <span className="text-[9px] text-slate-400 block mt-0.5">10h Saída ➔ 16h Entrada</span>
            </div>

            {/* Unconfirmed Queue */}
            <div className="bg-slate-950/80 border border-orange-500/30 rounded-xl p-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-orange-400 font-bold uppercase">{t.unconfirmedCount}</span>
                <Clock className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-orange-400 mt-1">{unconfirmedCount}</p>
              <span className="text-[9px] text-slate-400 block mt-0.5">Aguardando confirmação</span>
            </div>

            {/* In Progress */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase">{t.inProgress}</span>
              <p className="text-xl sm:text-2xl font-black text-sky-400 mt-1">{inProgressCount}</p>
              <span className="text-[9px] text-slate-400 block mt-0.5">Clock-in ativo</span>
            </div>

            {/* Completed */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase">{t.completedCleans}</span>
              <p className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">{completedCount}</p>
              <span className="text-[9px] text-slate-400 block mt-0.5">Pronto p/ vistoria</span>
            </div>

            {/* Inspected Ready */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase">{t.inspectedReady}</span>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{inspectedCount}</p>
              <span className="text-[9px] text-slate-400 block mt-0.5">Hóspede liberado</span>
            </div>

            {/* Total Payout */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase">{t.totalPayoutDue}</span>
              <p className="text-xl sm:text-2xl font-black text-amber-300 mt-1">${totalPayout}</p>
              <span className="text-[9px] text-slate-400 block mt-0.5">Remuneração equipes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {selectedTab === 'turnovers' && (
        <section className="space-y-4">
          {/* Sub-Filters: All, T/A, Unconfirmed, Work Orders */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setTaskFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  taskFilter === 'all' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos ({tasks.length})
              </button>
              <button
                onClick={() => setTaskFilter('turnaround')}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                  taskFilter === 'turnaround' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                {t.taCount} ({turnaroundCount})
              </button>
              <button
                onClick={() => setTaskFilter('unconfirmed')}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                  taskFilter === 'unconfirmed' ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-3 h-3" />
                {t.tabConfirmationQueue} ({unconfirmedCount})
              </button>
              <button
                onClick={() => setTaskFilter('work_order')}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                  taskFilter === 'work_order' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wrench className="w-3 h-3" />
                {t.statusWorkOrder} ({workOrdersCount})
              </button>
            </div>

            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {t.realtimeSyncNotice}
            </span>
          </div>

          {/* Turnovers Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredTasks.map((task) => {
              const prop = getProperty(task.propertyId);
              const cleaner = getCleaner(task.cleanerId);
              const totalItems = task.checklists.reduce((acc, c) => acc + c.items.length, 0);
              const doneItems = task.checklists.reduce(
                (acc, c) => acc + c.items.filter((i) => i.done).length,
                0
              );
              const progressPct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;
              const isUnconfirmed = task.status === 'unconfirmed';

              return (
                <div
                  key={task.id}
                  className={`bg-slate-900 border rounded-2xl p-4 sm:p-5 shadow-lg space-y-4 transition-all flex flex-col justify-between ${
                    isUnconfirmed
                      ? 'border-orange-500/50 bg-gradient-to-b from-orange-950/20 to-slate-900'
                      : task.status === 'inspected'
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
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                            {prop?.code || 'PROP'}
                          </span>
                          {task.isTurnaround && (
                            <span
                              title={t.turnaroundDesc}
                              className="inline-flex items-center gap-0.5 bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow animate-pulse"
                            >
                              <Zap className="w-2.5 h-2.5 fill-slate-950" />
                              T/A 10h-16h
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-slate-100 text-sm mt-1">{prop?.name}</h3>
                        <p className="text-xs text-slate-400 truncate max-w-[200px]">{prop?.address}</p>
                      </div>

                      {/* Status Badges conforming to ResortCleaning colors */}
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow whitespace-nowrap ${
                          isUnconfirmed
                            ? 'bg-orange-500 text-slate-950 animate-pulse'
                            : task.status === 'work_order'
                            ? 'bg-purple-600 text-white'
                            : task.status === 'inspected'
                            ? 'bg-emerald-500 text-slate-950'
                            : task.status === 'completed'
                            ? 'bg-indigo-500 text-white'
                            : task.status === 'in_progress'
                            ? 'bg-sky-500 text-slate-950 animate-pulse'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {isUnconfirmed
                          ? t.statusUnconfirmed
                          : task.status === 'work_order'
                          ? t.statusWorkOrder
                          : task.status === 'inspected'
                          ? t.statusInspected
                          : task.status === 'completed'
                          ? t.statusReadyInspection
                          : task.status === 'in_progress'
                          ? t.statusCleaningNow
                          : t.statusPending}
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
                          className="bg-slate-900 border border-slate-700 text-slate-100 rounded px-2 py-1 text-xs max-w-[140px] truncate"
                        >
                          <option value="">{t.unassigned}</option>
                          {cleaners.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} ({c.state === 'Florida' ? 'FL' : 'AL'})
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
                    {/* Instant Confirm Button for Unconfirmed Tasks */}
                    {isUnconfirmed ? (
                      <button
                        onClick={() => onUpdateTaskStatus(task.id, 'pending')}
                        className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-black py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                      >
                        <Check className="w-4 h-4" /> Confirmar Agendamento
                      </button>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Cleaners & Staff Management Tab (Modeled after ResortCleaning staff-management) */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {cleaners.map((c) => {
              const cleanerTasks = tasks.filter((t) => t.cleanerId === c.id);
              const earned = cleanerTasks.reduce((acc, t) => acc + t.payoutAmount, 0);
              const cleanPhone = c.phone.replace(/\D/g, '');

              return (
                <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/60 shadow"
                      />
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-white text-sm truncate">{c.name}</h3>
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                            c.state === 'Florida' ? 'bg-orange-500/20 text-orange-400' : 'bg-sky-500/20 text-sky-400'
                          }`}>
                            {c.state === 'Florida' ? 'FL' : 'AL'}
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                          ⭐ {c.rating} • {c.assignedPropertiesCount} {t.fixedProps}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {c.city || 'Gulf Shores'}, {c.state || 'Alabama'}
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
                  </div>

                  {/* Quick Dispatch & Contact Buttons */}
                  <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                    <a
                      href={`tel:${c.phone}`}
                      className="flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-xl transition font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t.btnCall}</span>
                    </a>
                    <a
                      href={`https://wa.me/${c.whatsapp || cleanPhone}?text=Olá%20${encodeURIComponent(c.name)},%20sua%20escala%20de%20turnovers%20HelpUS%20está%20atualizada.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl transition font-bold shadow"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{t.btnWhatsApp}</span>
                    </a>
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
              {tasks.flatMap((taskItem) => taskItem.damageReports).length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">{t.noDamages}</p>
              ) : (
                tasks.flatMap((taskItem) =>
                  taskItem.damageReports.map((d) => (
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
              {tasks.flatMap((taskItem) => taskItem.lostAndFound).length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">{t.noLostItems}</p>
              ) : (
                tasks.flatMap((taskItem) =>
                  taskItem.lostAndFound.map((lf) => (
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
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.modalAuditPhotos} ({selectedTaskDetails.photos.length})
              </h4>
              {selectedTaskDetails.photos.length === 0 ? (
                <p className="text-xs text-slate-500 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  Nenhuma foto anexada ainda.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedTaskDetails.photos.map((p) => (
                    <div key={p.id} className="relative rounded-xl overflow-hidden border border-slate-800 group">
                      <img src={p.url} alt={p.caption} className="w-full h-28 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-2 flex flex-col justify-end text-[10px]">
                        <span className="font-bold text-white line-clamp-1">{p.caption}</span>
                        <span className="text-slate-400 font-mono">{p.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedTaskDetails(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700"
              >
                {t.close}
              </button>
              {selectedTaskDetails.status !== 'inspected' && (
                <button
                  onClick={() => {
                    onInspectTask(selectedTaskDetails.id, 99, 'SuperAdmin Master');
                    setSelectedTaskDetails(null);
                  }}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> {t.btnApprove100}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
