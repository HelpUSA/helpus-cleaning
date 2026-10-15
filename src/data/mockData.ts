import { Property, Reservation, Cleaner, CleaningTask } from '../types';

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
    name: 'Gulf Shores Plantation Villa 21',
    code: 'GSP-21',
    address: '400 Plantation Rd',
    city: 'Gulf Shores',
    state: 'AL',
    zip: '36542',
    bedrooms: 3,
    bathrooms: 2,
    baseCleaningFee: 195,
    cleanerPayout: 165,
    doorCode: '1029#',
    wifiSsid: 'Plantation_Villa21',
    wifiPassword: 'plantationresort',
    notes: 'Varanda de frente para o mar com mesa externa. Requer reposição do kit de boas-vindas na bancada da cozinha.',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    defaultCleanerId: 'cleaner-1'
  },
  {
    id: 'prop-3',
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
    id: 'prop-4',
    name: 'Dolphin Haven Beach House',
    code: 'DH-BEACH',
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
    assignedPropertiesCount: 5
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
    assignedPropertiesCount: 8
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
    assignedPropertiesCount: 4
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
    totalAmount: 1480,
    cleaningFee: 165,
    status: 'in_house',
    notes: 'Check-out amanhã às 10:00 pontual para permitir turnover antes da próxima reserva.'
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
    totalAmount: 1390,
    cleaningFee: 165,
    status: 'confirmed',
    notes: 'Check-in no mesmo dia do check-out anterior (Turnover Rápido / Back-to-Back).'
  },
  {
    id: 'res-103',
    propertyId: 'prop-2',
    guestName: 'Sarah Jenkins (Direct Booking)',
    guestEmail: 'sarah.j@icloud.com',
    guestPhone: '+1 (205) 884-9022',
    channel: 'direct',
    checkIn: '2026-10-09',
    checkOut: '2026-10-13',
    checkInTime: '16:00',
    checkOutTime: '10:00',
    guestsCount: 6,
    totalAmount: 2150,
    cleaningFee: 195,
    status: 'checked_out',
    notes: 'Reserva direta feita pelo site HelpUS. Hóspedes deixaram gorjeta de $20 na bancada.'
  },
  {
    id: 'res-104',
    propertyId: 'prop-4',
    guestName: 'Família Richardson',
    guestEmail: 'richardson.family@yahoo.com',
    guestPhone: '+1 (770) 512-3344',
    channel: 'booking',
    checkIn: '2026-10-11',
    checkOut: '2026-10-15',
    checkInTime: '16:00',
    checkOutTime: '10:00',
    guestsCount: 9,
    totalAmount: 3890,
    cleaningFee: 340,
    status: 'in_house',
    notes: 'Festa de aniversário na praia. Equipe dupla agendada para o turnover.'
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
    propertyId: 'prop-3',
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
  }
];
