import React, { useState } from 'react';
import { Property, Reservation, ChannelType } from '../types';
import { Language, translations } from '../i18n/translations';
import {
  Building2,
  CalendarDays,
  KeyRound,
  Wifi,
  Plus,
  Download,
  AlertTriangle,
  Sparkles,
  CalendarRange,
  Table as TableIcon,
  Zap,
  Shield,
  X,
  Phone,
  Mail,
  Clock,
  UserCheck
} from 'lucide-react';

interface PmsViewProps {
  properties: Property[];
  reservations: Reservation[];
  lang: Language;
  onAddBooking: (booking: Omit<Reservation, 'id'>) => void;
  onAddProperty: (prop: Omit<Property, 'id'>) => void;
}

export const PmsView: React.FC<PmsViewProps> = ({
  properties,
  reservations,
  lang,
  onAddBooking,
  onAddProperty
}) => {
  const t = translations[lang];
  const [viewMode, setViewMode] = useState<'ribbon' | 'table'>('ribbon');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [selectedDrawerRes, setSelectedDrawerRes] = useState<Reservation | null>(null);

  // Form states for new booking
  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0]?.id || '');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('+1 (251) 555-0100');
  const [channel, setChannel] = useState<ChannelType>('direct');
  const [isOwnerBlock, setIsOwnerBlock] = useState(false);
  const [blockReason, setBlockReason] = useState('Reunião de Proprietário');
  const [checkIn, setCheckIn] = useState('2026-10-15');
  const [checkOut, setCheckOut] = useState('2026-10-18');
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(1200);

  // Form states for new property
  const [propName, setPropName] = useState('');
  const [propAddress, setPropAddress] = useState('Gulf Shores, AL');
  const [propBeds, setPropBeds] = useState(2);
  const [propBaths, setPropBaths] = useState(2);
  const [propFee, setPropFee] = useState(160);
  const [propPayout, setPropPayout] = useState(135);
  const [propDoor, setPropDoor] = useState('1234#');

  // Timeline dates for the Ribbon calendar (14 days window around Oct 15, 2026)
  const timelineDates = [
    { date: '2026-10-09', dayOfWeek: 'Sex', dayNum: 9 },
    { date: '2026-10-10', dayOfWeek: 'Sáb', dayNum: 10 },
    { date: '2026-10-11', dayOfWeek: 'Dom', dayNum: 11 },
    { date: '2026-10-12', dayOfWeek: 'Seg', dayNum: 12 },
    { date: '2026-10-13', dayOfWeek: 'Ter', dayNum: 13 },
    { date: '2026-10-14', dayOfWeek: 'Qua', dayNum: 14 },
    { date: '2026-10-15', dayOfWeek: 'Qui', dayNum: 15, isToday: true },
    { date: '2026-10-16', dayOfWeek: 'Sex', dayNum: 16 },
    { date: '2026-10-17', dayOfWeek: 'Sáb', dayNum: 17 },
    { date: '2026-10-18', dayOfWeek: 'Dom', dayNum: 18 },
    { date: '2026-10-19', dayOfWeek: 'Seg', dayNum: 19 },
    { date: '2026-10-20', dayOfWeek: 'Ter', dayNum: 20 },
    { date: '2026-10-21', dayOfWeek: 'Qua', dayNum: 21 },
    { date: '2026-10-22', dayOfWeek: 'Qui', dayNum: 22 }
  ];

  const filteredReservations = reservations.filter(
    (res) => filterChannel === 'all' || res.channel === filterChannel
  );

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName && !isOwnerBlock) return;
    const prop = properties.find((p) => p.id === selectedPropertyId);
    const finalName = isOwnerBlock ? `${t.ownerBlockTag}: ${blockReason}` : guestName;

    onAddBooking({
      propertyId: selectedPropertyId,
      guestName: finalName,
      guestEmail: guestEmail || (isOwnerBlock ? 'owners@beachrentalgroup.com' : `${finalName.toLowerCase().replace(/\s+/g, '.')}@email.com`),
      guestPhone: guestPhone || '+1 (251) 555-0100',
      channel: isOwnerBlock ? 'owner_block' : channel,
      checkIn,
      checkOut,
      checkInTime: '16:00',
      checkOutTime: '10:00',
      guestsCount: adultsCount + childrenCount,
      adultsCount,
      childrenCount,
      totalAmount: isOwnerBlock ? 0 : totalAmount,
      cleaningFee: isOwnerBlock ? 0 : (prop ? prop.baseCleaningFee : 160),
      status: 'confirmed',
      isOwnerBlock,
      blockReason: isOwnerBlock ? blockReason : undefined,
      notes: isOwnerBlock ? 'Bloqueio de proprietário HelpUS.' : 'HelpUS PMS sync.'
    });

    setGuestName('');
    setIsOwnerBlock(false);
    setShowBookingModal(false);
  };

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propName) return;
    onAddProperty({
      name: propName,
      code: propName.substring(0, 4).toUpperCase(),
      address: propAddress,
      city: 'Gulf Shores',
      state: 'AL',
      zip: '36542',
      bedrooms: propBeds,
      bathrooms: propBaths,
      baseCleaningFee: propFee,
      cleanerPayout: propPayout,
      doorCode: propDoor,
      wifiSsid: `${propName.replace(/\s+/g, '')}_Guest`,
      wifiPassword: 'gulfbeach2026',
      notes: 'HelpUS vacation rental.',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    });
    setPropName('');
    setShowPropertyModal(false);
  };

  const exportCSV = () => {
    const headers = ['ID,Property,Guest,Channel,Check-In,Check-Out,TotalAmount,CleaningFee,Status'];
    const rows = reservations.map((r) => {
      const p = properties.find((prop) => prop.id === r.propertyId);
      return `"${r.id}","${p?.name || ''}","${r.guestName}","${r.channel}","${r.checkIn}","${r.checkOut}","$${r.totalAmount}","$${r.cleaningFee}","${r.status}"`;
    });
    const blob = new Blob([[...headers, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HelpUS_Bookings_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const calculateStayDurationNights = (inDate: string, outDate: string) => {
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/70 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded">
                {t.pmsBadge}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{t.pmsTitle}</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t.pmsSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
            {/* View Switcher: Ribbon Calendar vs Table */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setViewMode('ribbon')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'ribbon'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CalendarRange className="w-3.5 h-3.5" />
                <span>{t.viewModeRibbon}</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'table'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>{t.viewModeTable}</span>
              </button>
            </div>

            <button
              onClick={exportCSV}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportCsv}</span>
            </button>
            <button
              onClick={() => setShowPropertyModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 px-3 py-2 rounded-xl text-xs font-semibold border border-amber-500/30 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.newProperty}</span>
            </button>
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-amber-400/10 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t.newBooking}</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 sm:p-3.5">
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t.totalProperties}</p>
            <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{properties.length}</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 sm:p-3.5">
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t.kpiActiveBookings}</p>
            <p className="text-xl sm:text-2xl font-black text-sky-400 mt-1">{reservations.length}</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 sm:p-3.5">
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t.kpiCleaningFeesCollected}</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
              ${reservations.reduce((acc, r) => acc + r.cleaningFee, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 sm:p-3.5">
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t.kpiBackToBackAlert}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-xs bg-amber-400/20 text-amber-400 font-black px-2 py-0.5 rounded border border-amber-400/40 animate-pulse">
                <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                {reservations.filter((r) => r.isTurnaround).length} T/A Turnarounds
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Showcase Cards */}
      <section className="space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            {t.propertiesTitle}
          </h2>
          <span className="text-xs text-slate-400">
            Total: {properties.length} {t.propertiesSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-32 w-full overflow-hidden">
                  <img
                    src={prop.imageUrl}
                    alt={prop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-amber-400 font-extrabold text-[10px] px-2 py-0.5 rounded border border-amber-400/20">
                    {prop.code}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-emerald-500/90 text-slate-950 font-black text-[11px] px-2 py-0.5 rounded shadow">
                    ${prop.baseCleaningFee} {t.fee}
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  <div>
                    <h3 className="font-bold text-slate-100 text-xs group-hover:text-amber-400 transition line-clamp-1">
                      {prop.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">{prop.city}, {prop.state}</p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1.5 border-t border-slate-800">
                    <span>🛏️ {prop.bedrooms} {t.bedrooms}</span>
                    <span>🚿 {prop.bathrooms} {t.bathrooms}</span>
                    <span className="text-amber-400 font-semibold">${prop.cleanerPayout} {t.cleanerPayout}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Bookings & Reservations Hub */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-sky-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              {viewMode === 'ribbon' ? t.viewModeRibbon : t.reservationsTitle}
            </h2>
            <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700">
              {filteredReservations.length}
            </span>
          </div>

          {/* Channel Filters */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs max-w-full overflow-x-auto">
            {['all', 'airbnb', 'vrbo', 'direct', 'booking', 'owner_block'].map((c) => (
              <button
                key={c}
                onClick={() => setFilterChannel(c)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold uppercase text-[10px] whitespace-nowrap transition ${
                  filterChannel === c
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {c === 'all'
                  ? t.allChannels
                  : c === 'owner_block'
                  ? t.ownerBlockTag
                  : c === 'direct'
                  ? t.channelDirect
                  : c}
              </button>
            ))}
          </div>
        </div>

        {/* RIBBON TIMELINE VIEW (HelpUS horizontal ribbon workflow) */}
        {viewMode === 'ribbon' ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Ribbon Timeline Header Info */}
            <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Legenda de Canais & Bloqueios:</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">Airbnb</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">Vrbo</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">HelpUS Direto</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">Bloqueio Proprietário</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" /> = Turnover Back-to-Back (T/A)
                </span>
                <span className="text-slate-600">|</span>
                <span>Clique em qualquer barra para abrir detalhes</span>
              </div>
            </div>

            {/* Horizontal Timeline Scroll Area */}
            <div className="overflow-x-auto">
              <div className="min-w-[980px]">
                {/* Timeline Header Row (Dates) */}
                <div className="grid grid-cols-12 border-b border-slate-800 bg-slate-950/90 text-center font-mono">
                  {/* Property Name Column Header */}
                  <div className="col-span-3 p-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider border-r border-slate-800">
                    Propriedade (Gulf Shores)
                  </div>
                  {/* 14 Date Columns mapped to 9 grid columns */}
                  <div className="col-span-9 grid grid-cols-14 divide-x divide-slate-800/60">
                    {timelineDates.map((d) => (
                      <div
                        key={d.date}
                        className={`py-2 px-1 text-center ${
                          d.isToday ? 'bg-amber-400/15 border-b-2 border-amber-400' : ''
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 block font-sans">{d.dayOfWeek}</span>
                        <span className={`text-xs font-extrabold ${d.isToday ? 'text-amber-400' : 'text-slate-200'}`}>
                          {d.dayNum}
                        </span>
                        {d.isToday && (
                          <span className="text-[8px] font-black uppercase text-amber-400 bg-amber-400/20 px-1 rounded block">
                            {t.ribbonToday}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline Property Rows */}
                <div className="divide-y divide-slate-800/80">
                  {properties.map((prop) => {
                    const propRes = filteredReservations.filter((r) => r.propertyId === prop.id);
                    return (
                      <div key={prop.id} className="grid grid-cols-12 hover:bg-slate-800/20 transition group">
                        {/* Property Left Identifier */}
                        <div className="col-span-3 p-3 border-r border-slate-800 flex items-center justify-between gap-2">
                          <div className="truncate">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-amber-400 text-xs">{prop.code}</span>
                              <span className="text-[10px] text-slate-500 font-mono">🛏️{prop.bedrooms} 🚿{prop.bathrooms}</span>
                            </div>
                            <p className="text-xs font-medium text-slate-200 truncate">{prop.name}</p>
                          </div>
                        </div>

                        {/* Ribbon Timeline Bar Track */}
                        <div className="col-span-9 relative grid grid-cols-14 min-h-[64px] items-center divide-x divide-slate-800/40 p-1">
                          {/* Background Grid Cells */}
                          {timelineDates.map((d) => (
                            <div
                              key={d.date}
                              className={`h-full ${d.isToday ? 'bg-amber-400/5' : ''}`}
                            />
                          ))}

                          {/* Reservation Ribbon Bars overlaid across the track */}
                          {propRes.map((res) => {
                            // Calculate column placement relative to timelineDates start (2026-10-09)
                            const startDate = new Date(res.checkIn);
                            const baseDate = new Date('2026-10-09');
                            const dayOffset = Math.max(0, Math.round((startDate.getTime() - baseDate.getTime()) / (1000 * 3600 * 24)));
                            const nights = calculateStayDurationNights(res.checkIn, res.checkOut);
                            const widthCols = Math.min(14 - dayOffset, nights);

                            if (dayOffset >= 14 || dayOffset + widthCols <= 0) return null;

                            const isOwner = res.isOwnerBlock || res.channel === 'owner_block';
                            const isAirbnb = res.channel === 'airbnb';
                            const isVrbo = res.channel === 'vrbo';

                            return (
                              <div
                                key={res.id}
                                onClick={() => setSelectedDrawerRes(res)}
                                style={{
                                  left: `${(dayOffset / 14) * 100}%`,
                                  width: `${Math.max(8, (widthCols / 14) * 100)}%`
                                }}
                                className={`absolute h-10 rounded-xl px-2.5 py-1 z-10 cursor-pointer shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-between border ${
                                  isOwner
                                    ? 'bg-purple-950/80 border-purple-500/50 text-purple-200 hover:border-purple-400'
                                    : isAirbnb
                                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-200 hover:border-rose-400'
                                    : isVrbo
                                    ? 'bg-blue-950/80 border-blue-500/50 text-blue-200 hover:border-blue-400'
                                    : 'bg-amber-950/80 border-amber-500/50 text-amber-200 hover:border-amber-400'
                                }`}
                              >
                                <div className="truncate flex-1 pr-1">
                                  <div className="flex items-center gap-1.5 text-[11px] font-bold leading-tight truncate">
                                    {isOwner && <Shield className="w-3 h-3 text-purple-400 shrink-0" />}
                                    <span className="truncate">{res.guestName}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[9px] text-slate-400 font-mono">
                                    <span>{nights} {t.nights}</span>
                                    <span>•</span>
                                    <span>👥 {res.adultsCount || 2}A{res.childrenCount ? `, ${res.childrenCount}C` : ''}</span>
                                  </div>
                                </div>

                                {res.isTurnaround && (
                                  <span
                                    title={t.turnaroundDesc}
                                    className="shrink-0 flex items-center gap-0.5 bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow animate-pulse"
                                  >
                                    <Zap className="w-2.5 h-2.5 fill-slate-950" />
                                    T/A
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Bookings Table View */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap sm:whitespace-normal">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">{t.tableColCode}</th>
                    <th className="py-3 px-4">{t.guest}</th>
                    <th className="py-3 px-4">{t.channel}</th>
                    <th className="py-3 px-4">{t.tableColDates}</th>
                    <th className="py-3 px-4">{t.tableColTotal}</th>
                    <th className="py-3 px-4">{t.tableColFee}</th>
                    <th className="py-3 px-4">{t.status}</th>
                    <th className="py-3 px-4 text-center">{t.tableColTrigger}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredReservations.map((res) => {
                    const prop = properties.find((p) => p.id === res.propertyId);
                    return (
                      <tr
                        key={res.id}
                        onClick={() => setSelectedDrawerRes(res)}
                        className="hover:bg-slate-800/40 transition cursor-pointer"
                      >
                        <td className="py-3 px-4">
                          <span className="font-bold text-amber-400 block">{prop?.code || 'PROP'}</span>
                          <span className="text-slate-400 text-[11px] truncate block max-w-[180px]">
                            {prop?.name}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-100 block">{res.guestName}</span>
                          <span className="text-slate-500 text-[11px]">{res.guestEmail}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block font-black uppercase text-[10px] px-2 py-0.5 rounded ${
                              res.isOwnerBlock || res.channel === 'owner_block'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : res.channel === 'airbnb'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : res.channel === 'vrbo'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : res.channel === 'direct'
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            {res.isOwnerBlock || res.channel === 'owner_block'
                              ? t.ownerBlockTag
                              : res.channel === 'direct'
                              ? t.channelDirect
                              : res.channel}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-mono text-slate-200">
                            {res.checkIn} <span className="text-slate-500">➔</span> {res.checkOut}
                          </div>
                          <span className="text-[10px] text-slate-500">
                            {t.checkOutLabel}: {res.checkOutTime} | {t.checkInLabel}: {res.checkInTime}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-100">${res.totalAmount}</td>
                        <td className="py-3 px-4 font-semibold text-emerald-400">${res.cleaningFee}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              res.status === 'in_house'
                                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                                : res.status === 'checked_out'
                                ? 'bg-slate-700 text-slate-300'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            {res.status === 'in_house' ? t.statusInHouse : res.status === 'checked_out' ? t.statusCheckedOut : t.statusConfirmed}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {res.isTurnaround ? (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-1 rounded-md border border-rose-500/30 animate-pulse">
                              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" /> {t.alertBackToBack}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-md border border-slate-700">
                              <Sparkles className="w-3 h-3 text-amber-400" /> {t.syncedHousekeeping}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Slide-over Booking Detail Drawer (HelpUS quick-action drawer) */}
      {selectedDrawerRes && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md p-6 h-full overflow-y-auto space-y-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Reserva #{selectedDrawerRes.id.toUpperCase()}
                </span>
                <h3 className="text-lg font-bold text-white">{t.bookingDetailsTitle}</h3>
              </div>
              <button
                onClick={() => setSelectedDrawerRes(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Property Card */}
            {(() => {
              const prop = properties.find((p) => p.id === selectedDrawerRes.propertyId);
              return (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={prop?.imageUrl}
                      alt={prop?.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                      <span className="text-xs font-bold text-amber-400">{prop?.code}</span>
                      <h4 className="font-bold text-slate-100 text-sm leading-tight">{prop?.name}</h4>
                      <p className="text-[11px] text-slate-400">{prop?.address}, {prop?.city}, {prop?.state}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.doorCode}: <strong className="text-white font-mono">{prop?.doorCode}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Wifi className="w-3.5 h-3.5 text-sky-400" />
                      <span className="truncate">{t.wifi}: <strong className="text-white font-mono">{prop?.wifiSsid}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Dates & Times */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">{t.stayDuration}:</span>
                <span className="font-bold text-amber-400">
                  {calculateStayDurationNights(selectedDrawerRes.checkIn, selectedDrawerRes.checkOut)} {t.nights}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.checkInLabel}</span>
                  <p className="font-bold text-slate-100 mt-0.5">{selectedDrawerRes.checkIn}</p>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {selectedDrawerRes.checkInTime}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.checkOutLabel}</span>
                  <p className="font-bold text-slate-100 mt-0.5">{selectedDrawerRes.checkOut}</p>
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {selectedDrawerRes.checkOutTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.guest}</h4>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                <p className="font-bold text-slate-100 text-sm">{selectedDrawerRes.guestName}</p>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedDrawerRes.guestPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedDrawerRes.guestEmail}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 text-slate-400 flex items-center gap-2">
                  <span>Hóspedes:</span>
                  <strong className="text-white">
                    {selectedDrawerRes.adultsCount || selectedDrawerRes.guestsCount} {t.adults}
                    {selectedDrawerRes.childrenCount ? `, ${selectedDrawerRes.childrenCount} ${t.children}` : ''}
                  </strong>
                </div>
              </div>
            </div>

            {/* Financials & Housekeeping Trigger */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{t.tableColTotal}:</span>
                <span className="font-bold text-slate-100 text-sm">${selectedDrawerRes.totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{t.tableColFee}:</span>
                <span className="font-bold text-emerald-400">${selectedDrawerRes.cleaningFee}</span>
              </div>
              {selectedDrawerRes.isTurnaround && (
                <div className="mt-2 p-2 bg-amber-400/10 border border-amber-400/30 rounded-lg text-amber-300 text-[11px] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400" />
                  <span><strong>{t.turnaroundTag}:</strong> {t.turnaroundDesc}</span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => setSelectedDrawerRes(null)}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition shadow"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Booking & Owner Block */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" /> {t.modalBookingTitle}
              </h3>
              <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-white text-base">✕</button>
            </div>

            {/* Owner Block Toggle Switch */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="text-xs font-bold text-slate-200">{t.ownerBlockTag}</p>
                  <p className="text-[10px] text-slate-400">Bloqueio para proprietário, manutenção ou vistoria</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isOwnerBlock}
                onChange={(e) => setIsOwnerBlock(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
              />
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">{t.labelProperty}</label>
                <select
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              {isOwnerBlock ? (
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.blockType}</label>
                  <select
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100"
                  >
                    <option value="Reunião de Proprietário">{t.blockReasonMeeting}</option>
                    <option value="Semana dos Proprietários">{t.blockReasonOwnerWeek}</option>
                    <option value="Manutenção & Reparos">{t.blockReasonMaintenance}</option>
                    <option value="Limpeza Profunda Especial">{t.blockReasonSpecialClean}</option>
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">{t.labelGuestName}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.placeholderGuestName}
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">{t.labelChannel}</label>
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value as ChannelType)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                    >
                      <option value="direct">{t.channelDirect}</option>
                      <option value="airbnb">{t.channelAirbnb}</option>
                      <option value="vrbo">{t.channelVrbo}</option>
                      <option value="booking">{t.channelBooking}</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelCheckIn}</label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelCheckOut}</label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.adults}</label>
                  <input
                    type="number"
                    min={1}
                    value={adultsCount}
                    onChange={(e) => setAdultsCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.children}</label>
                  <input
                    type="number"
                    min={0}
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>

              {!isOwnerBlock && (
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelTotalAmount}</label>
                  <input
                    type="number"
                    min={100}
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  {t.btnCancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 shadow"
                >
                  {t.btnConfirmBooking}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Property */}
      {showPropertyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" /> {t.modalPropTitle}
              </h3>
              <button onClick={() => setShowPropertyModal(false)} className="text-slate-400 hover:text-white text-base">✕</button>
            </div>
            <form onSubmit={handleCreateProperty} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">{t.labelPropName}</label>
                <input
                  type="text"
                  required
                  placeholder={t.placeholderPropName}
                  value={propName}
                  onChange={(e) => setPropName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">{t.labelPropAddress}</label>
                <input
                  type="text"
                  required
                  value={propAddress}
                  onChange={(e) => setPropAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelPropBeds}</label>
                  <input
                    type="number"
                    min={1}
                    value={propBeds}
                    onChange={(e) => setPropBeds(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelPropBaths}</label>
                  <input
                    type="number"
                    min={1}
                    value={propBaths}
                    onChange={(e) => setPropBaths(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelPropFee}</label>
                  <input
                    type="number"
                    min={50}
                    value={propFee}
                    onChange={(e) => setPropFee(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelPropPayout}</label>
                  <input
                    type="number"
                    min={50}
                    value={propPayout}
                    onChange={(e) => setPropPayout(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelPropDoor}</label>
                  <input
                    type="text"
                    value={propDoor}
                    onChange={(e) => setPropDoor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPropertyModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  {t.btnCancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 shadow"
                >
                  {t.btnCreateProp}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
