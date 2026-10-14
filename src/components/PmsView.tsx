import React, { useState } from 'react';
import { Property, Reservation, ChannelType } from '../types';
import { Language, translations } from '../i18n/translations';
import {
  Building2,
  CalendarDays,
  KeyRound,
  Wifi,
  DollarSign,
  Plus,
  ExternalLink,
  Download,
  AlertTriangle,
  Sparkles,
  Users,
  CheckCircle,
  Tag
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
      notes: 'Reserva sincronizada via motor OwnerRez.'
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
      notes: 'Cadastrado no ecossistema HelpUS.',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    });
    setPropName('');
    setShowPropertyModal(false);
  };

  const exportCSV = () => {
    const headers = ['ID,Imovel,Hospede,Canal,Check-In,Check-Out,ValorTotal,TaxaLimpeza,Status'];
    const rows = reservations.map((r) => {
      const p = properties.find((prop) => prop.id === r.propertyId);
      return `"${r.id}","${p?.name || ''}","${r.guestName}","${r.channel}","${r.checkIn}","${r.checkOut}","$${r.totalAmount}","$${r.cleaningFee}","${r.status}"`;
    });
    const blob = new Blob([[...headers, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OwnerRez_Bookings_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/70 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded">
                OWNERREZ CLONE
              </span>
              <h1 className="text-2xl font-extrabold text-white">Central de Imóveis & Reservas (PMS)</h1>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Controle centralizado de calendários, check-ins, taxas de limpeza e integração de canais em Gulf Shores, AL.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition"
            >
              <Download className="w-4 h-4" />
              {t.exportCsv}
            </button>
            <button
              onClick={() => setShowPropertyModal(true)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 px-3.5 py-2 rounded-xl text-xs font-semibold border border-amber-500/30 transition"
            >
              <Plus className="w-4 h-4" />
              {t.newProperty}
            </button>
            <button
              onClick={() => setShowBookingModal(true)}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-amber-400/10 transition"
            >
              <Plus className="w-4 h-4" />
              {t.newBooking}
            </button>
          </div>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t.totalProperties}</p>
            <p className="text-2xl font-black text-amber-400 mt-1">{properties.length}</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Reservas Ativas</p>
            <p className="text-2xl font-black text-sky-400 mt-1">{reservations.length}</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Taxas de Limpeza Coletadas</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">
              ${reservations.reduce((acc, r) => acc + r.cleaningFee, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Turnovers em Alerta</p>
            <p className="text-2xl font-black text-rose-400 mt-1">2 Back-to-Back</p>
          </div>
        </div>
      </div>

      {/* Properties Showcase (OwnerRez Property Portfolio) */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            {t.propertiesTitle}
          </h2>
          <span className="text-xs text-slate-400">Total: {properties.length} condomínios e casas de praia</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-lg transition-all group"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={prop.imageUrl}
                  alt={prop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 font-extrabold text-[11px] px-2.5 py-1 rounded-md border border-amber-400/20">
                  {prop.code}
                </span>
                <span className="absolute bottom-3 right-3 bg-emerald-500/90 text-slate-950 font-black text-xs px-2 py-0.5 rounded shadow">
                  ${prop.baseCleaningFee} taxa
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-amber-400 transition line-clamp-1">
                    {prop.name}
                  </h3>
                  <p className="text-xs text-slate-400">{prop.address}, {prop.city}, {prop.state}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <span>🛏️ {prop.bedrooms} Quartos</span>
                  <span>🚿 {prop.bathrooms} Banheiros</span>
                  <span className="text-amber-400 font-semibold">${prop.cleanerPayout} cleaner</span>
                </div>
                {/* Security Access Details (Door & Wifi) */}
                <div className="bg-slate-950/80 rounded-lg p-2.5 text-[11px] space-y-1.5 border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <KeyRound className="w-3 h-3 text-amber-400" /> Senha Porta:
                    </span>
                    <span className="font-mono font-bold text-slate-200">{prop.doorCode}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-sky-400" /> Wi-Fi:
                    </span>
                    <span className="font-mono text-slate-300">{prop.wifiSsid}</span>
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
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-sky-400" />
            {t.reservationsTitle}
          </h2>

          {/* Channel Filters */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
            {['all', 'airbnb', 'vrbo', 'direct', 'booking'].map((c) => (
              <button
                key={c}
                onClick={() => setFilterChannel(c)}
                className={`px-3 py-1 rounded-lg font-semibold uppercase text-[10px] transition ${
                  filterChannel === c
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {c === 'all' ? 'Todos os Canais' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Código / Imóvel</th>
                  <th className="py-3 px-4">{t.guest}</th>
                  <th className="py-3 px-4">{t.channel}</th>
                  <th className="py-3 px-4">{t.dates} (Check-in ➔ Check-out)</th>
                  <th className="py-3 px-4">Valor Total</th>
                  <th className="py-3 px-4">Taxa Limpeza</th>
                  <th className="py-3 px-4">{t.status}</th>
                  <th className="py-3 px-4 text-center">Gatilho Housekeeping</th>
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
                          {res.channel}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-200">
                          {res.checkIn} <span className="text-slate-500">➔</span> {res.checkOut}
                        </div>
                        <span className="text-[10px] text-slate-500">
                          Saída: {res.checkOutTime} | Entrada: {res.checkInTime}
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
                          {res.status === 'in_house' ? 'Hóspede no Imóvel' : res.status === 'checked_out' ? 'Check-out Feito' : 'Confirmada'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isBackToBack ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-1 rounded-md border border-rose-500/30 animate-pulse">
                            <AlertTriangle className="w-3 h-3" /> Turno Rápido 10h-16h
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-md border border-slate-700">
                            <Sparkles className="w-3 h-3 text-amber-400" /> Sincronizado ResortCleaning
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" /> Nova Reserva / Bloqueio (OwnerRez)
              </h3>
              <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateBooking} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Imóvel</label>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Nome do Hóspede</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: John Smith"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Canal</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as ChannelType)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  >
                    <option value="direct">HelpUS Direct</option>
                    <option value="airbnb">Airbnb</option>
                    <option value="vrbo">Vrbo</option>
                    <option value="booking">Booking.com</option>
                    <option value="owner_block">Bloqueio Proprietário</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Check-in</label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Check-out</label>
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
                  <label className="block text-slate-300 mb-1 font-semibold">Número de Hóspedes</label>
                  <input
                    type="number"
                    min={1}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Valor Total ($ USD)</label>
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
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 shadow"
                >
                  Confirmar Reserva & Agendar Faxina
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Property */}
      {showPropertyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" /> Cadastrar Novo Imóvel (Gulf Shores)
              </h3>
              <button onClick={() => setShowPropertyModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateProperty} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nome da Propriedade / Condomínio</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Phoenix All Suites 402"
                  value={propName}
                  onChange={(e) => setPropName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Endereço em Gulf Shores / Orange Beach</label>
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
                  <label className="block text-slate-300 mb-1 font-semibold">Quartos</label>
                  <input
                    type="number"
                    min={1}
                    value={propBeds}
                    onChange={(e) => setPropBeds(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Banheiros</label>
                  <input
                    type="number"
                    min={1}
                    value={propBaths}
                    onChange={(e) => setPropBaths(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Taxa Cobrada ($)</label>
                  <input
                    type="number"
                    min={50}
                    value={propFee}
                    onChange={(e) => setPropFee(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Pago ao Cleaner ($)</label>
                  <input
                    type="number"
                    min={50}
                    value={propPayout}
                    onChange={(e) => setPropPayout(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Senha Fechadura</label>
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
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 shadow"
                >
                  Cadastrar Imóvel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
