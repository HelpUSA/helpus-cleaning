import React, { useState } from 'react';
import {
  Property,
  Cleaner,
  CleaningTask,
  PropertyOwner,
  CleaningCompany,
  MaterialSupply,
  UserRole
} from '../types';
import { Language, translations } from '../i18n/translations';
import {
  ShieldCheck,
  Building,
  Layers,
  Smartphone,
  KeyRound,
  Plus,
  Package,
  Users,
  CheckCircle2,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  DollarSign,
  Calendar,
  X,
  BadgeAlert,
  ArrowRight
} from 'lucide-react';

interface RolePortalViewProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  properties: Property[];
  cleaners: Cleaner[];
  tasks: CleaningTask[];
  owners: PropertyOwner[];
  companies: CleaningCompany[];
  materials: MaterialSupply[];
  lang: Language;
  onAddProperty: (prop: Omit<Property, 'id'>) => void;
  onAddOwner: (owner: Omit<PropertyOwner, 'id'>) => void;
  onAddCompany: (company: Omit<CleaningCompany, 'id'>) => void;
  onAddCleaner: (cleaner: Omit<Cleaner, 'id'>) => void;
  onAddMaterial: (mat: Omit<MaterialSupply, 'id'>) => void;
  onNavigateToMobileApp: () => void;
}

export const RolePortalView: React.FC<RolePortalViewProps> = ({
  currentRole,
  onRoleChange,
  properties,
  cleaners,
  tasks,
  owners,
  companies,
  materials,
  lang,
  onAddProperty,
  onAddOwner,
  onAddCompany,
  onAddCleaner,
  onAddMaterial,
  onNavigateToMobileApp
}) => {
  const t = translations[lang];

  // Modals state
  const [showPropModal, setShowPropModal] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showCleanerModal, setShowCleanerModal] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);

  // Forms states
  // Owner Form
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('+1 (251) 555-0800');
  const [ownerNotes, setOwnerNotes] = useState('');

  // Company Form
  const [companyName, setCompanyName] = useState('');
  const [companyContact, setCompanyContact] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('+1 (251) 555-0900');
  const [companyAddress, setCompanyAddress] = useState('Gulf Shores, AL');

  // Cleaner Form
  const [cleanerName, setCleanerName] = useState('');
  const [cleanerEmail, setCleanerEmail] = useState('');
  const [cleanerPhone, setCleanerPhone] = useState('+1 (251) 555-0155');
  const [cleanerRate, setCleanerRate] = useState(150);
  const [cleanerState, setCleanerState] = useState('Alabama');

  // Material Form
  const [matName, setMatName] = useState('');
  const [matCat, setMatCat] = useState<MaterialSupply['category']>('cleaning_chemical');
  const [matUnit, setMatUnit] = useState('Galão 5L');
  const [matQty, setMatQty] = useState(20);
  const [matMin, setMatMin] = useState(5);
  const [matCost, setMatCost] = useState(30);
  const [matSupplier, setMatSupplier] = useState('Ecolab Hospitality');

  // Property Form
  const [propName, setPropName] = useState('');
  const [propAddress, setPropAddress] = useState('Gulf Shores, AL');
  const [propBeds, setPropBeds] = useState(2);
  const [propBaths, setPropBaths] = useState(2);
  const [propFee, setPropFee] = useState(165);
  const [propPayout, setPropPayout] = useState(140);
  const [propDoor, setPropDoor] = useState('4589#');

  const handleCreateOwner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName) return;
    onAddOwner({
      name: ownerName,
      email: ownerEmail || `${ownerName.toLowerCase().replace(/\s+/g, '.')}@rentals.com`,
      phone: ownerPhone,
      propertiesCount: 1,
      assignedPropertyIds: [properties[0]?.id || 'prop-1'],
      status: 'active',
      notes: ownerNotes || 'Proprietário cadastrado no portal HelpUS.'
    });
    setOwnerName('');
    setShowOwnerModal(false);
  };

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName) return;
    onAddCompany({
      name: companyName,
      contactName: companyContact || 'Gerência',
      email: companyEmail || 'contato@limpezas.com',
      phone: companyPhone,
      address: companyAddress,
      city: 'Gulf Shores',
      state: 'AL',
      activeStaffCount: 4,
      assignedPropertiesCount: 6,
      rating: 5.0,
      status: 'active',
      insuranceVerified: true
    });
    setCompanyName('');
    setShowCompanyModal(false);
  };

  const handleCreateCleaner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cleanerName) return;
    onAddCleaner({
      name: cleanerName,
      email: cleanerEmail || `${cleanerName.toLowerCase().replace(/\s+/g, '.')}@cleaner.com`,
      phone: cleanerPhone,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      payoutRate: cleanerRate,
      active: true,
      assignedPropertiesCount: 3,
      state: cleanerState,
      city: 'Gulf Shores',
      whatsapp: cleanerPhone.replace(/\D/g, '')
    });
    setCleanerName('');
    setShowCleanerModal(false);
  };

  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matName) return;
    onAddMaterial({
      name: matName,
      category: matCat,
      unit: matUnit,
      quantityInStock: matQty,
      minThreshold: matMin,
      costPerUnit: matCost,
      supplier: matSupplier,
      location: 'Depósito Central Gulf Shores'
    });
    setMatName('');
    setShowMaterialModal(false);
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
      notes: 'Cadastrado via portal de atribuições.',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    });
    setPropName('');
    setShowPropModal(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Top Banner Header with Role Selector */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/70 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-500 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded">
                PORTAL RBAC
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{t.portalTitle}</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t.portalSubtitle}
            </p>
          </div>

          {/* Interactive Role Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-full md:w-auto">
            <span className="text-[11px] font-bold text-slate-400 px-2 hidden sm:inline">
              {t.switchRole}
            </span>

            <button
              onClick={() => onRoleChange('superadmin')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                currentRole === 'superadmin' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              SuperAdmin
            </button>

            <button
              onClick={() => onRoleChange('property_manager')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                currentRole === 'property_manager' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Administradora
            </button>

            <button
              onClick={() => onRoleChange('cleaning_company')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                currentRole === 'cleaning_company' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Empresa Limpeza
            </button>

            <button
              onClick={() => onRoleChange('cleaner')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                currentRole === 'cleaner' ? 'bg-sky-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Diarista
            </button>

            <button
              onClick={() => onRoleChange('owner')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                currentRole === 'owner' ? 'bg-purple-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Proprietário
            </button>
          </div>
        </div>

        {/* Action Trigger Buttons for Current Role */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6 pt-5 border-t border-slate-800/80">
          {(currentRole === 'superadmin' || currentRole === 'property_manager') && (
            <>
              <button
                onClick={() => setShowPropModal(true)}
                className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold shadow transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.newProperty}</span>
              </button>

              <button
                onClick={() => setShowOwnerModal(true)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 px-3.5 py-2 rounded-xl text-xs font-bold border border-purple-500/30 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.btnNewOwner}</span>
              </button>
            </>
          )}

          {(currentRole === 'superadmin' || currentRole === 'cleaning_company') && (
            <>
              <button
                onClick={() => setShowCleanerModal(true)}
                className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold shadow transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.btnNewCleaner}</span>
              </button>

              <button
                onClick={() => setShowMaterialModal(true)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 px-3.5 py-2 rounded-xl text-xs font-bold border border-amber-500/30 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.btnNewMaterial}</span>
              </button>
            </>
          )}

          {currentRole === 'superadmin' && (
            <button
              onClick={() => setShowCompanyModal(true)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.btnNewCompany}</span>
            </button>
          )}

          {currentRole === 'owner' && (
            <span className="text-xs text-purple-300 bg-purple-950/60 border border-purple-500/30 px-3 py-1.5 rounded-xl font-medium">
              Ambiente exclusivo do Proprietário • Visualizando 2 imóveis em Gulf Shores, AL
            </span>
          )}

          {currentRole === 'cleaner' && (
            <button
              onClick={onNavigateToMobileApp}
              className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-black shadow transition"
            >
              <Smartphone className="w-4 h-4" />
              <span>Abrir App Móvel de Campo</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: SUPERADMIN / PROPERTY MANAGER / CLEANING COMPANY (ADMINISTRATIVE SECTIONS) */}
      {(currentRole === 'superadmin' || currentRole === 'property_manager') && (
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-purple-400" />
              {t.ownersTitle} ({owners.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {owners.map((owner) => (
              <div key={owner.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow">
                <div className="flex items-center gap-3">
                  <img src={owner.avatar} alt={owner.name} className="w-12 h-12 rounded-full object-cover border border-purple-400" />
                  <div>
                    <h3 className="font-bold text-white text-sm">{owner.name}</h3>
                    <p className="text-xs text-purple-400 font-semibold">{owner.propertiesCount} Imóveis Vinculados</p>
                  </div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] space-y-1 text-slate-300">
                  <p className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-400" /> {owner.phone}</p>
                  <p className="flex items-center gap-1.5 truncate"><Mail className="w-3 h-3 text-slate-400" /> {owner.email}</p>
                  <p className="text-slate-400 pt-1 border-t border-slate-900 text-[10px]">{owner.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(currentRole === 'superadmin' || currentRole === 'cleaning_company') && (
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-400" />
              {t.materialsTitle} ({materials.length})
            </h2>
          </div>

          {/* Materials & Linens Inventory Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((mat) => {
              const isLowStock = mat.quantityInStock <= mat.minThreshold;
              return (
                <div
                  key={mat.id}
                  className={`bg-slate-900 border rounded-2xl p-4 shadow space-y-3 ${
                    isLowStock ? 'border-orange-500/50 bg-gradient-to-b from-orange-950/20 to-slate-900' : 'border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        {mat.category === 'cleaning_chemical'
                          ? t.materialsCategoryChemical
                          : mat.category === 'linen'
                          ? t.materialsCategoryLinen
                          : mat.category === 'paper_goods'
                          ? t.materialsCategoryPaper
                          : mat.category === 'amenity_kit'
                          ? t.materialsCategoryAmenity
                          : t.materialsCategoryEquipment}
                      </span>
                      <h3 className="font-bold text-white text-xs mt-1.5 line-clamp-1">{mat.name}</h3>
                    </div>
                    {isLowStock ? (
                      <span className="text-[10px] bg-orange-500 text-slate-950 font-black px-2 py-0.5 rounded animate-pulse">
                        {t.stockThresholdAlert}
                      </span>
                    ) : (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
                        {t.stockAdequate}
                      </span>
                    )}
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Em Estoque:</span>
                      <strong className="text-white font-mono">{mat.quantityInStock} {mat.unit}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Ponto de Pedido:</span>
                      <span className="text-slate-400 font-mono">{mat.minThreshold} {mat.unit}</span>
                    </div>
                    <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-900">
                      <span>Custo Unitário:</span>
                      <strong className="text-emerald-400 font-mono">${mat.costPerUnit.toFixed(2)}</strong>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate pt-1">📍 {mat.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {currentRole === 'superadmin' && (
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-400" />
              {t.companiesTitle} ({companies.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companies.map((comp) => (
              <div key={comp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-sm">{comp.name}</h3>
                    <p className="text-xs text-slate-400">{comp.contactName} • {comp.address}</p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
                    Seguro Verificado
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Diaristas Ativos</span>
                    <strong className="text-white font-mono">{comp.activeStaffCount} profissionais</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Imóveis Atendidos</span>
                    <strong className="text-amber-400 font-mono">{comp.assignedPropertiesCount} condomínios</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VIEW 2: OWNER PORTAL VIEW */}
      {currentRole === 'owner' && (
        <section className="space-y-6">
          <div className="bg-purple-950/20 border border-purple-500/30 rounded-2xl p-5 space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-purple-400" />
              Portal do Proprietário • Meus Imóveis
            </h2>
            <p className="text-xs text-slate-300">
              Acompanhe o estado de conservação das suas unidades de praia, vistorias aprovadas e solicite estadias próprias sem taxa de limpeza.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {properties.slice(0, 2).map((p) => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-3">
                <div className="relative h-44 w-full">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-slate-950/90 text-amber-400 font-bold text-xs px-2.5 py-1 rounded border border-amber-400/20">
                    {p.code}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded shadow">
                    Vistoria Aprovada (99/100)
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-white text-base">{p.name}</h3>
                    <p className="text-xs text-slate-400">{p.address}, {p.city}, {p.state}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Senha Fechadura:</span>
                      <strong className="text-amber-400 font-mono">{p.doorCode}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Rede Wi-Fi:</span>
                      <span className="text-slate-200 font-mono">{p.wifiSsid}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Solicitando bloqueio para ${p.name}...`)}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition shadow"
                  >
                    Solicitar Estadia Própria (Owner Stay)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VIEW 3: CLEANER PORTAL VIEW */}
      {currentRole === 'cleaner' && (
        <section className="space-y-4">
          <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-sky-400" />
              Ambiente do Diarista & Equipe de Campo
            </h2>
            <p className="text-xs text-slate-300">
              Você possui 2 turnos agendados para hoje. Acesse o aplicativo de campo para iniciar o Clock-in e preencher os checklists por cômodo.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 max-w-md mx-auto">
            <Smartphone className="w-12 h-12 text-sky-400 mx-auto" />
            <h3 className="font-bold text-white text-base">Pronto para começar seu turno?</h3>
            <p className="text-xs text-slate-400">
              Utilize o aplicativo no smartphone com visualização responsiva otimizada para campo em Gulf Shores, AL.
            </p>
            <button
              onClick={onNavigateToMobileApp}
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition"
            >
              Iniciar Faxina no App Móvel
            </button>
          </div>
        </section>
      )}

      {/* MODAL: NOVO PROPRIETÁRIO */}
      {showOwnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-purple-400" /> {t.modalOwnerTitle}
              </h3>
              <button onClick={() => setShowOwnerModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateOwner} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nome / Razão Social</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Harrison Beach Rentals LLC"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Telefone</label>
                  <input
                    type="text"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">E-mail</label>
                  <input
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Observações / Requisitos Especiais</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Exige fotos de vistoria após cada saída."
                  value={ownerNotes}
                  onChange={(e) => setOwnerNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowOwnerModal(false)} className="px-3.5 py-2 bg-slate-800 text-slate-300 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg shadow">Salvar Proprietário</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVO MATERIAL / INSUMO */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-400" /> {t.modalMaterialTitle}
              </h3>
              <button onClick={() => setShowMaterialModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateMaterial} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nome do Insumo / Material</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Desinfetante Multissuperfície Hospitalar 5L"
                  value={matName}
                  onChange={(e) => setMatName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Categoria</label>
                  <select
                    value={matCat}
                    onChange={(e) => setMatCat(e.target.value as MaterialSupply['category'])}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  >
                    <option value="cleaning_chemical">{t.materialsCategoryChemical}</option>
                    <option value="linen">{t.materialsCategoryLinen}</option>
                    <option value="paper_goods">{t.materialsCategoryPaper}</option>
                    <option value="amenity_kit">{t.materialsCategoryAmenity}</option>
                    <option value="equipment">{t.materialsCategoryEquipment}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Unidade de Medida</label>
                  <input
                    type="text"
                    value={matUnit}
                    onChange={(e) => setMatUnit(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Quantidade</label>
                  <input
                    type="number"
                    min={1}
                    value={matQty}
                    onChange={(e) => setMatQty(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Estoque Mínimo</label>
                  <input
                    type="number"
                    min={1}
                    value={matMin}
                    onChange={(e) => setMatMin(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Custo Unitário ($)</label>
                  <input
                    type="number"
                    min={1}
                    value={matCost}
                    onChange={(e) => setMatCost(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Fornecedor</label>
                <input
                  type="text"
                  value={matSupplier}
                  onChange={(e) => setMatSupplier(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowMaterialModal(false)} className="px-3.5 py-2 bg-slate-800 text-slate-300 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg shadow">Salvar Insumo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVO DIARISTA */}
      {showCleanerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" /> {t.modalCleanerTitle}
              </h3>
              <button onClick={() => setShowCleanerModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateCleaner} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Beatriz Silva"
                  value={cleanerName}
                  onChange={(e) => setCleanerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Telefone (Baldwin County)</label>
                  <input
                    type="text"
                    value={cleanerPhone}
                    onChange={(e) => setCleanerPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Estado de Atuação</label>
                  <select
                    value={cleanerState}
                    onChange={(e) => setCleanerState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  >
                    <option value="Alabama">Alabama (AL)</option>
                    <option value="Florida">Flórida (FL)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Tarifa Padrão por Turno ($ USD)</label>
                <input
                  type="number"
                  min={80}
                  value={cleanerRate}
                  onChange={(e) => setCleanerRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCleanerModal(false)} className="px-3.5 py-2 bg-slate-800 text-slate-300 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded-lg shadow">Cadastrar Diarista</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVA EMPRESA DE LIMPEZA */}
      {showCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" /> {t.modalCompanyTitle}
              </h3>
              <button onClick={() => setShowCompanyModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateCompany} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nome da Empresa de Limpeza</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Gulf Shores Elite Cleaners LLC"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Responsável / Contato</label>
                  <input
                    type="text"
                    value={companyContact}
                    onChange={(e) => setCompanyContact(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Telefone</label>
                  <input
                    type="text"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Endereço Operacional</label>
                <input
                  type="text"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCompanyModal(false)} className="px-3.5 py-2 bg-slate-800 text-slate-300 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg shadow">Salvar Empresa</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVO IMÓVEL */}
      {showPropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-400" /> {t.modalPropTitle}
              </h3>
              <button onClick={() => setShowPropModal(false)} className="text-slate-400 hover:text-white">✕</button>
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
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelPropFee}</label>
                  <input
                    type="number"
                    value={propFee}
                    onChange={(e) => setPropFee(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{t.labelPropPayout}</label>
                  <input
                    type="number"
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
                <button type="button" onClick={() => setShowPropModal(false)} className="px-3.5 py-2 bg-slate-800 text-slate-300 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg shadow">Salvar Imóvel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
