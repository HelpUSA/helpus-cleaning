import { Property, Reservation, Cleaner, CleaningTask, PropertyOwner, CleaningCompany, MaterialSupply } from '../types';

export const initialOwners: PropertyOwner[] = [
  {
    id: 'owner-1',
    name: 'Harrison Beach Properties LLC',
    email: 'harrison.rentals@gulfshoresinvest.com',
    phone: '+1 (251) 555-0782',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    propertiesCount: 2,
    assignedPropertyIds: ['prop-1', 'prop-2'],
    status: 'active',
    contractStart: '2024-01-15',
    notes: 'Exige fotos de inspeção pós-limpeza anexadas em cada ordem de serviço.'
  },
  {
    id: 'owner-2',
    name: 'Dolphin Coast Holdings',
    email: 'invest@dolphincoastllc.com',
    phone: '+1 (404) 555-0914',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    propertiesCount: 1,
    assignedPropertyIds: ['prop-5'],
    status: 'active',
    contractStart: '2023-06-01',
    notes: 'Mansão de praia com piscina. Requer produtos ecológicos.'
  },
  {
    id: 'owner-3',
    name: 'Dr. Michael & Laura Sterling',
    email: 'm.sterling@medicalsuites.com',
    phone: '+1 (615) 555-0329',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    propertiesCount: 2,
    assignedPropertyIds: ['prop-3', 'prop-4'],
    status: 'active',
    contractStart: '2025-02-10',
    notes: 'Costumam utilizar o imóvel 1 semana por mês (Owner Stay).'
  }
];

export const initialCompanies: CleaningCompany[] = [
  {
    id: 'company-1',
    name: 'Gulf Coast Clean Pro Services',
    contactName: 'Diretoria de Operações',
    email: 'ops@cleanproal.com',
    phone: '+1 (251) 555-0140',
    address: '1240 Gulf Shores Pkwy, Suite 200',
    city: 'Gulf Shores',
    state: 'AL',
    activeStaffCount: 8,
    assignedPropertiesCount: 12,
    rating: 4.95,
    status: 'active',
    insuranceVerified: true
  },
  {
    id: 'company-2',
    name: 'Coastal Elite Turnovers LLC',
    contactName: 'Coordenação de Escalas',
    email: 'dispatch@gulfcoastalclean.com',
    phone: '+1 (251) 555-0190',
    address: '25405 Perdido Beach Blvd',
    city: 'Orange Beach',
    state: 'AL',
    activeStaffCount: 14,
    assignedPropertiesCount: 22,
    rating: 4.98,
    status: 'active',
    insuranceVerified: true
  }
];

export const initialMaterials: MaterialSupply[] = [
  {
    id: 'mat-1',
    name: 'Desinfetante Hospitalar Multissuperfície Pro 5L',
    category: 'cleaning_chemical',
    unit: 'Galão 5L',
    quantityInStock: 24,
    minThreshold: 8,
    costPerUnit: 28.50,
    supplier: 'Ecolab Hospitality',
    location: 'Depósito Central Gulf Shores'
  },
  {
    id: 'mat-2',
    name: 'Kit Enxoval Lençóis 400 Fios Algodão King',
    category: 'linen',
    unit: 'Conjunto Completo',
    quantityInStock: 45,
    minThreshold: 15,
    costPerUnit: 64.00,
    supplier: 'Standard Textile US',
    location: 'Lavanderia Industrial Orange Beach'
  },
  {
    id: 'mat-3',
    name: 'Kit Toalhas de Banho Hotelaria Premium (Gramatura 600g)',
    category: 'linen',
    unit: 'Fardo c/ 10 toalhas',
    quantityInStock: 30,
    minThreshold: 10,
    costPerUnit: 78.00,
    supplier: 'Standard Textile US',
    location: 'Depósito Central Gulf Shores'
  },
  {
    id: 'mat-4',
    name: 'Kit de Boas-Vindas Shampoo, Condicionador e Sabonete Eco',
    category: 'amenity_kit',
    unit: 'Caixa c/ 100 sachês',
    quantityInStock: 18,
    minThreshold: 5,
    costPerUnit: 42.00,
    supplier: 'Guest Supply USA',
    location: 'Depósito Central Gulf Shores'
  },
  {
    id: 'mat-5',
    name: 'Papel Higiênico Folha Dupla Premium (Fardo 48 rolos)',
    category: 'paper_goods',
    unit: 'Fardo 48 rolos',
    quantityInStock: 52,
    minThreshold: 20,
    costPerUnit: 34.50,
    supplier: 'Georgia-Pacific Commercial',
    location: 'Depósito Central Gulf Shores'
  },
  {
    id: 'mat-6',
    name: 'Aspirador Profissional com Filtro HEPA Anti-Areia',
    category: 'equipment',
    unit: 'Unidade',
    quantityInStock: 8,
    minThreshold: 3,
    costPerUnit: 220.00,
    supplier: 'ProTeam Commercial',
    location: 'Depósito Central Gulf Shores'
  }
];

export const initialProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Crystal Tower Penthouse 1404',
    code: 'CT-1404',
    address: '1010 W Beach Blvd',
    city: 'Gulf Shores',
    state: 'AL',
    zip: '36542',
    bedrooms: 2,
    bathrooms: 2,
    baseCleaningFee: 165,
    cleanerPayout: 140,
    doorCode: '8492#',
    wifiSsid: 'CrystalTower_1404',
    wifiPassword: 'gulfbeachvibes',
    notes: 'Ar-condicionado deve ficar sempre em 72°F após a faxina. Hóspedes costumam trazer areia de praia.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    defaultCleanerId: 'cleaner-2'
  },
  {
    id: 'prop-2',
    name: 'Blue Water Condo 1502',
    code: 'BW-1502',
    address: '2119 W Beach Blvd',
    city: 'Gulf Shores',
    state: 'AL',
    zip: '36542',
    bedrooms: 2,
    bathrooms: 2,
    baseCleaningFee: 170,
    cleanerPayout: 145,
    doorCode: '5821#',
    wifiSsid: 'BlueWater_1502_5G',
    wifiPassword: 'bluewatervacation',
    notes: 'Vista panorâmica do Golfo. Conferir reposição dos dispensers de sabonete e toalhas de praia.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    defaultCleanerId: 'cleaner-1'
  },
  {
    id: 'prop-3',
    name: 'Shoalwater Oceanfront 205',
    code: 'SW-205',
    address: '24720 Perdido Beach Blvd',
    city: 'Orange Beach',
    state: 'AL',
    zip: '36561',
    bedrooms: 3,
    bathrooms: 2,
    baseCleaningFee: 195,
    cleanerPayout: 165,
    doorCode: '3190#',
    wifiSsid: 'Shoalwater_205',
    wifiPassword: 'shoalwaterbeach',
    notes: 'Sacada de frente para o mar com mesa externa. Requer reposição do kit de boas-vindas na bancada da cozinha.',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    defaultCleanerId: 'cleaner-4'
  },
  {
    id: 'prop-4',
    name: 'Lighthouse Beachfront Suite 802',
    code: 'LH-802',
    address: '455 E Beach Blvd',
    city: 'Gulf Shores',
    state: 'AL',
    zip: '36542',
    bedrooms: 2,
    bathrooms: 2,
    baseCleaningFee: 155,
    cleanerPayout: 130,
    doorCode: '4471#',
    wifiSsid: 'Lighthouse_802_5G',
    wifiPassword: 'sunsetgulfview',
    notes: 'Banheira de hidromassagem na suíte master deve ser higienizada e testada.',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    defaultCleanerId: 'cleaner-3'
  },
  {
    id: 'prop-5',
    name: 'Dolphin Haven Luxury Villa',
    code: 'DH-VILLA',
    address: '1840 W Beach Blvd',
    city: 'Gulf Shores',
    state: 'AL',
    zip: '36542',
    bedrooms: 5,
    bathrooms: 4,
    baseCleaningFee: 340,
    cleanerPayout: 280,
    doorCode: '9182#',
    wifiSsid: 'DolphinHaven_Private',
    wifiPassword: 'dolphins2026',
    notes: 'Casa grande com piscina privativa e churrasqueira a gás. Requer 2 cleaners para o turnover padrão.',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    defaultCleanerId: 'cleaner-2'
  }
];

export const initialCleaners: Cleaner[] = [
  {
    id: 'cleaner-1',
    name: 'Maria Santos',
    phone: '+1 (251) 555-0142',
    email: 'maria.santos@cleanproal.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 4.95,
    payoutRate: 150,
    active: true,
    assignedPropertiesCount: 5,
    state: 'Alabama',
    city: 'Gulf Shores',
    whatsapp: '12515550142'
  },
  {
    id: 'cleaner-2',
    name: 'Coastal Elite Cleaners',
    phone: '+1 (251) 555-0199',
    email: 'crew@gulfcoastalclean.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5.0,
    payoutRate: 160,
    active: true,
    assignedPropertiesCount: 8,
    state: 'Alabama',
    city: 'Orange Beach',
    whatsapp: '12515550199'
  },
  {
    id: 'cleaner-3',
    name: 'Carlos Mendez',
    phone: '+1 (251) 555-0284',
    email: 'carlos.mendez@breezewayal.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 4.88,
    payoutRate: 140,
    active: true,
    assignedPropertiesCount: 4,
    state: 'Alabama',
    city: 'Foley',
    whatsapp: '12515550284'
  },
  {
    id: 'cleaner-4',
    name: 'Amanda Brooks',
    phone: '+1 (850) 555-0312',
    email: 'amanda.brooks@coastalpro.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 4.92,
    payoutRate: 155,
    active: true,
    assignedPropertiesCount: 6,
    state: 'Florida',
    city: 'Perdido Key',
    whatsapp: '18505550312'
  }
];

export const initialReservations: Reservation[] = [
  {
    id: 'res-101',
    propertyId: 'prop-1',
    guestName: 'Robert & Jennifer Miller',
    guestEmail: 'r.miller@gmail.com',
    guestPhone: '+1 (404) 923-1188',
    channel: 'airbnb',
    checkIn: '2026-10-10',
    checkOut: '2026-10-14',
    checkInTime: '16:00',
    checkOutTime: '10:00',
    guestsCount: 4,
    adultsCount: 2,
    childrenCount: 2,
    totalAmount: 1480,
    cleaningFee: 165,
    status: 'checked_out',
    notes: 'Check-out realizado às 10:00 pontual para permitir turnover rápido (T/A).'
  },
  {
    id: 'res-102',
    propertyId: 'prop-1',
    guestName: 'David Thompson',
    guestEmail: 'd.thompson@outlook.com',
    guestPhone: '+1 (615) 349-8201',
    channel: 'vrbo',
    checkIn: '2026-10-14',
    checkOut: '2026-10-18',
    checkInTime: '16:00',
    checkOutTime: '10:00',
    guestsCount: 3,
    adultsCount: 2,
    childrenCount: 1,
    totalAmount: 1390,
    cleaningFee: 165,
    status: 'in_house',
    isTurnaround: true,
    notes: 'Check-in no mesmo dia do check-out anterior (Turnover Rápido T/A 10h-16h).'
  },
  {
    id: 'res-103',
    propertyId: 'prop-2',
    guestName: 'Bloqueio: Reunião do Proprietário',
    guestEmail: 'owners@beachrentalgroup.com',
    guestPhone: '+1 (251) 555-0100',
    channel: 'owner_block',
    checkIn: '2026-10-12',
    checkOut: '2026-10-15',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    guestsCount: 2,
    adultsCount: 2,
    childrenCount: 0,
    totalAmount: 0,
    cleaningFee: 0,
    status: 'checked_out',
    isOwnerBlock: true,
    blockReason: 'Owner Meeting & Property Walkthrough',
    notes: 'Uso exclusivo dos proprietários. Sem cobrança de taxa de hospedagem.'
  },
  {
    id: 'res-104',
    propertyId: 'prop-2',
    guestName: 'Sarah Jenkins (Direct Booking)',
    guestEmail: 'sarah.j@icloud.com',
    guestPhone: '+1 (205) 884-9022',
    channel: 'direct',
    checkIn: '2026-10-15',
    checkOut: '2026-10-20',
    checkInTime: '16:00',
    checkOutTime: '10:00',
    guestsCount: 4,
    adultsCount: 4,
    childrenCount: 0,
    totalAmount: 1850,
    cleaningFee: 170,
    status: 'confirmed',
    isTurnaround: true,
    notes: 'Reserva direta confirmada. Hóspedes VIP chegam às 16:00.'
  },
  {
    id: 'res-105',
    propertyId: 'prop-3',
    guestName: 'Família Richardson',
    guestEmail: 'richardson.family@yahoo.com',
    guestPhone: '+1 (770) 512-3344',
    channel: 'booking',
    checkIn: '2026-10-11',
    checkOut: '2026-10-16',
    checkInTime: '16:00',
    checkOutTime: '10:00',
    guestsCount: 6,
    adultsCount: 4,
    childrenCount: 2,
    totalAmount: 2390,
    cleaningFee: 195,
    status: 'in_house',
    notes: 'Férias de outono da família. Solicitaram 2 toalhas de praia adicionais.'
  },
  {
    id: 'res-106',
    propertyId: 'prop-4',
    guestName: 'Mason & Claire Wedding Party',
    guestEmail: 'mason.claire.wedding@gmail.com',
    guestPhone: '+1 (404) 831-9920',
    channel: 'airbnb',
    checkIn: '2026-10-13',
    checkOut: '2026-10-17',
    checkInTime: '16:00',
    checkOutTime: '10:00',
    guestsCount: 4,
    adultsCount: 4,
    childrenCount: 0,
    totalAmount: 1560,
    cleaningFee: 155,
    status: 'in_house',
    notes: 'Hóspedes de casamento na praia em Gulf Shores.'
  },
  {
    id: 'res-107',
    propertyId: 'prop-5',
    guestName: 'Bloqueio: Manutenção & Pintura Externa',
    guestEmail: 'maintenance@helpusbr.com',
    guestPhone: '+1 (251) 555-0999',
    channel: 'owner_block',
    checkIn: '2026-10-14',
    checkOut: '2026-10-17',
    checkInTime: '08:00',
    checkOutTime: '17:00',
    guestsCount: 0,
    adultsCount: 0,
    childrenCount: 0,
    totalAmount: 0,
    cleaningFee: 0,
    status: 'in_house',
    isOwnerBlock: true,
    blockReason: 'Maintenance / Deep Deck Recoat',
    notes: 'Imóvel bloqueado para manutenção da piscina e verniz no deck.'
  }
];

export const createDefaultChecklists = () => [
  {
    category: 'Cozinha e Eletrodomésticos',
    items: [
      { id: 'k1', label: 'Lava-louça esvaziada e desinfetada', done: true },
      { id: 'k2', label: 'Geladeira e freezer higienizados e livres de odores', done: true },
      { id: 'k3', label: 'Micro-ondas e forno desengordurados', done: true },
      { id: 'k4', label: 'Cafeteira Keurig limpa e abastecida com 4 pods', done: true },
      { id: 'k5', label: 'Lixeira com saco novo e fundo sanitizado', done: true }
    ]
  },
  {
    category: 'Banheiros & Higienização',
    items: [
      { id: 'b1', label: 'Vaso sanitário sanitizado com selo de garantia', done: true },
      { id: 'b2', label: 'Box de vidro sem manchas de calcário ou sabão', done: true },
      { id: 'b3', label: 'Kit de 4 toalhas de banho e 2 de rosto dobradas padrão hotelaria', done: true },
      { id: 'b4', label: 'Sabonetes, xampus e papel higiênico premium repostos', done: true }
    ]
  },
  {
    category: 'Quartos & Roupas de Cama',
    items: [
      { id: 'q1', label: 'Lençóis 400 fios trocados e esticados sem rugas', done: true },
      { id: 'q2', label: 'Travesseiros com protetores e fronhas novas', done: true },
      { id: 'q3', label: 'Aspirado profundo embaixo das camas', done: true },
      { id: 'q4', label: 'Gavetas e armários checados para itens esquecidos', done: true }
    ]
  },
  {
    category: 'Varanda, Sala e Areia de Praia',
    items: [
      { id: 'v1', label: 'Areia da praia totalmente aspirada e passada pano', done: true },
      { id: 'v2', label: 'Mobília de varanda limpa e alinhada com vista mar', done: true },
      { id: 'v3', label: 'Sofás e almofadas higienizados e aspirados', done: true }
    ]
  },
  {
    category: 'Inspeção Final & Conforto Hóspede',
    items: [
      { id: 'f1', label: 'Termostato ajustado para 72°F (22°C)', done: true },
      { id: 'f2', label: 'Fechadura eletrônica testada com nova senha', done: true },
      { id: 'f3', label: 'Luzes de boas-vindas acesas na entrada', done: true }
    ]
  }
];

export const initialTasks: CleaningTask[] = [
  {
    id: 'task-501',
    propertyId: 'prop-2',
    reservationId: 'res-103',
    cleanerId: 'cleaner-2', // Coastal Elite Cleaners
    scheduledDate: '2026-10-13',
    timeWindow: '10:00 - 15:00',
    status: 'inspected',
    startedAt: '10:15',
    completedAt: '12:45',
    inspectedAt: '13:10',
    inspectorName: 'SuperAdmin HelpUS Master',
    inspectorScore: 99,
    payoutAmount: 165,
    checklists: createDefaultChecklists(),
    photos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
        type: 'after',
        caption: 'Banheiro higienizado com toalhas dobradas',
        timestamp: '12:30'
      },
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
        type: 'after',
        caption: 'Cozinha pronta e desinfetada',
        timestamp: '12:40'
      }
    ],
    damageReports: [],
    lostAndFound: []
  },
  {
    id: 'task-502',
    propertyId: 'prop-1',
    reservationId: 'res-101',
    cleanerId: 'cleaner-2', // Coastal Elite Cleaners
    scheduledDate: '2026-10-14',
    timeWindow: '10:00 - 15:30',
    status: 'pending',
    payoutAmount: 140,
    checklists: createDefaultChecklists().map(c => ({
      ...c,
      items: c.items.map(i => ({ ...i, done: false }))
    })),
    photos: [],
    damageReports: [],
    lostAndFound: []
  },
  {
    id: 'task-503',
    propertyId: 'prop-4',
    cleanerId: 'cleaner-3', // Carlos
    scheduledDate: '2026-10-14',
    timeWindow: '11:00 - 16:00',
    status: 'in_progress',
    startedAt: '11:05',
    payoutAmount: 130,
    checklists: createDefaultChecklists(),
    photos: [
      {
        id: 'p3',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
        type: 'before',
        caption: 'Estado inicial da suíte',
        timestamp: '11:07'
      }
    ],
    damageReports: [
      {
        id: 'dmg-1',
        room: 'Varanda / Deck',
        description: 'Cadeira de praia plástica quebrada pelo vento.',
        severity: 'low',
        timestamp: '11:30'
      }
    ],
    lostAndFound: [
      {
        id: 'lf-1',
        item: 'Carregador Apple MacBook branco',
        room: 'Quarto 2 (na tomada atrás do criado-mudo)',
        status: 'matched_guest',
        timestamp: '11:45'
      }
    ]
  },
  {
    id: 'task-504',
    propertyId: 'prop-2',
    reservationId: 'res-104',
    cleanerId: 'cleaner-1', // Maria Santos
    scheduledDate: '2026-10-15',
    timeWindow: '10:00 - 15:30',
    status: 'unconfirmed',
    isTurnaround: true,
    isVip: true,
    payoutAmount: 145,
    checklists: createDefaultChecklists().map(c => ({
      ...c,
      items: c.items.map(i => ({ ...i, done: false }))
    })),
    photos: [],
    damageReports: [],
    lostAndFound: []
  },
  {
    id: 'task-505',
    propertyId: 'prop-1',
    reservationId: 'res-102',
    cleanerId: undefined,
    scheduledDate: '2026-10-18',
    timeWindow: '10:00 - 15:30',
    status: 'unconfirmed',
    isTurnaround: true,
    payoutAmount: 140,
    checklists: createDefaultChecklists().map(c => ({
      ...c,
      items: c.items.map(i => ({ ...i, done: false }))
    })),
    photos: [],
    damageReports: [],
    lostAndFound: []
  },
  {
    id: 'task-506',
    propertyId: 'prop-3',
    reservationId: 'res-105',
    cleanerId: 'cleaner-4', // Amanda Brooks
    scheduledDate: '2026-10-16',
    timeWindow: '10:00 - 15:00',
    status: 'pending',
    isTurnaround: false,
    payoutAmount: 165,
    checklists: createDefaultChecklists().map(c => ({
      ...c,
      items: c.items.map(i => ({ ...i, done: false }))
    })),
    photos: [],
    damageReports: [],
    lostAndFound: []
  },
  {
    id: 'task-507',
    propertyId: 'prop-5',
    reservationId: 'res-107',
    cleanerId: 'cleaner-2',
    scheduledDate: '2026-10-17',
    timeWindow: '08:00 - 16:00',
    status: 'work_order',
    taskType: 'work_order',
    payoutAmount: 220,
    checklists: createDefaultChecklists().map(c => ({
      ...c,
      items: c.items.map(i => ({ ...i, done: false }))
    })),
    photos: [],
    damageReports: [],
    lostAndFound: []
  }
];
