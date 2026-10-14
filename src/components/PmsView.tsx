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
  Sparkles
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
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [filterChannel, setFilterChannel] = useState<string>('all');

  // Form states for new booking
  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0]?.id || '');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [channel, setChannel] = useState<ChannelType>('direct');
  const [checkIn, setCheckIn] = useState('2026-10-15');
  const [checkOut, setCheckOut] = useState('2026-10-18');
  const [guestsCount, setGuestsCount] = useState(4);
  const [totalAmount, setTotalAmount] = useState(1200);

  // Form states for new property
  const [propName, setPropName] = useState('');
  const [propAddress, setPropAddress] = useState('Gulf Shores, AL');
  const [propBeds, setPropBeds] = useState(2);
  const [propBaths, setPropBaths] = useState(2);
  const [propFee, setPropFee] = useState(160);
  const [propPayout, setPropPayout] = useState(135);
  const [propDoor, setPropDoor] = useState('1234#');

  const filteredReservations = reservations.filter(
    (res) => filterChannel === 'all' || res.channel === filterChannel
  );

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName) return;
    const prop = properties.find((p) => p.id === selectedPropertyId);
    onAddBooking({
      propertyId: selectedPropertyId,
      guestName,
      guestEmail: guestEmail || `${guestName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      guestPhone: '+1 (251) 555-0100',
      channel,
      checkIn,
      checkOut,
      checkInTime: '16:00',
      checkOutTime: '10:00',
      guestsCount,
      totalAmount,
      cleaningFee: prop ? prop.baseCleaningFee : 160,
      status: 'confirmed',
      notes: 'HelpUS PMS sync.'
    });
    setGuestName('');
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

        {/* Quick KPI Cards (Fully responsive grid) */}
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
            <p className="text-xl sm:text-2xl font-black text-rose-400 mt-1">{t.kpiBackToBackNotice}</p>
          </div>
        </div>
      </div>

      {/* Properties Showcase */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 sm:h-44 w-full overflow-hidden">
                  <img
                    src={prop.imageUrl}
                    alt={prop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 font-extrabold text-[11px] px-2.5 py-1 rounded-md border border-amber-400/20">
                    {prop.code}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-emerald-500/90 text-slate-950 font-black text-xs px-2 py-0.5 rounded shadow">
                    ${prop.baseCleaningFee} {t.fee}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm group-hover:text-amber-400 transition line-clamp-1">
                      {prop.name}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">{prop.address}, {prop.city}, {prop.state}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <span>🛏️ {prop.bedrooms} {t.bedrooms}</span>
                    <span>🚿 {prop.bathrooms} {t.bathrooms}</span>
                    <span className="text-amber-400 font-semibold">${prop.cleanerPayout} {t.cleanerPayout}</span>
                  </div>
                  {/* Security Access Details (Door & Wifi) */}
                  <div className="bg-slate-950/80 rounded-lg p-2.5 text-[11px] space-y-1.5 border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <KeyRound className="w-3 h-3 text-amber-400" /> {t.doorCode}:
                      </span>
                      <span className="font-mono font-bold text-slate-200">{prop.doorCode}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Wifi className="w-3 h-3 text-sky-400" /> {t.wifi}:
                      </span>
                      <span className="font-mono text-slate-300 truncate max-w-[120px]">{prop.wifiSsid}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bookings & Reservations Hub */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-sky-400" />
            {t.reservationsTitle}
          </h2>

          {/* Channel Filters (Responsive wrap) */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs max-w-full overflow-x-auto">
            {['all', 'airbnb', 'vrbo', 'direct', 'booking'].map((c) => (
              <button
                key={c}
                onClick={() => setFilterChannel(c)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold uppercase text-[10px] whitespace-nowrap transition ${
                  filterChannel === c
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {c === 'all' ? t.allChannels : c}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table (Scrollable on small mobile screens) */}
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
                  const isBackToBack = res.id === 'res-102';
                  return (
                    <tr key={res.id} className="hover:bg-slate-800/40 transition">
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
                            res.channel === 'airbnb'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : res.channel === 'vrbo'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : res.channel === 'direct'
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {res.channel === 'direct' ? t.channelDirect : res.channel}
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
                        {isBackToBack ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-1 rounded-md border border-rose-500/30 animate-pulse">
                            <AlertTriangle className="w-3 h-3" /> {t.alertBackToBack}
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
      </section>

      {/* Modal: New Booking */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" /> {t.modalBookingTitle}
              </h3>
              <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-white text-base">✕</button>
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
                    <option value="owner_block">{t.channelOwnerBlock}</option>
                  </select>
                </div>
              </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelGuestsCount}</label>
                  <input
                    type="number"
                    min={1}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
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
              </div>
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
