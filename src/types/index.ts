export type ChannelType = 'direct' | 'airbnb' | 'vrbo' | 'booking' | 'owner_block';

export type ReservationStatus = 'confirmed' | 'in_house' | 'checked_out' | 'cancelled';

export type TaskStatus = 'unconfirmed' | 'pending' | 'in_progress' | 'completed' | 'inspected' | 'needs_attention' | 'work_order';

export interface Property {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  baseCleaningFee: number;
  cleanerPayout: number;
  doorCode: string;
  wifiSsid: string;
  wifiPassword: string;
  notes: string;
  imageUrl: string;
  defaultCleanerId?: string;
  ownerId?: string;
  companyId?: string;
}

export interface Reservation {
  id: string;
  propertyId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  channel: ChannelType;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  checkInTime: string; // e.g. "16:00"
  checkOutTime: string; // e.g. "10:00"
  guestsCount: number;
  adultsCount?: number;
  childrenCount?: number;
  totalAmount: number;
  cleaningFee: number;
  status: ReservationStatus;
  notes?: string;
  isOwnerBlock?: boolean;
  blockReason?: string;
  isTurnaround?: boolean;
}

export type UserRole = 'superadmin' | 'property_manager' | 'cleaning_company' | 'cleaner' | 'owner';

export interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  propertiesCount: number;
  assignedPropertyIds: string[];
  status: 'active' | 'pending';
  contractStart?: string;
  notes?: string;
}

export interface CleaningCompany {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  activeStaffCount: number;
  assignedPropertiesCount: number;
  rating: number;
  status: 'active' | 'suspended';
  insuranceVerified: boolean;
}

export interface MaterialSupply {
  id: string;
  name: string;
  category: 'cleaning_chemical' | 'linen' | 'paper_goods' | 'amenity_kit' | 'equipment';
  unit: string;
  quantityInStock: number;
  minThreshold: number;
  costPerUnit: number;
  supplier: string;
  location: string;
}

export interface Cleaner {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  payoutRate: number;
  active: boolean;
  assignedPropertiesCount: number;
  state?: string;
  city?: string;
  whatsapp?: string;
  companyId?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface ChecklistCategory {
  category: string;
  items: ChecklistItem[];
}

export interface PhotoProof {
  id: string;
  url: string;
  type: 'before' | 'after' | 'damage';
  caption: string;
  timestamp: string;
}

export interface DamageReport {
  id: string;
  room: string;
  description: string;
  severity: 'low' | 'medium' | 'critical';
  timestamp: string;
  photoUrl?: string;
}

export interface LostAndFoundItem {
  id: string;
  item: string;
  room: string;
  status: 'reported' | 'matched_guest' | 'returned';
  timestamp: string;
}

export interface CleaningTask {
  id: string;
  propertyId: string;
  reservationId?: string;
  cleanerId?: string;
  scheduledDate: string; // YYYY-MM-DD
  timeWindow: string; // e.g. "10:00 - 15:00"
  status: TaskStatus;
  taskType?: 'cleaning' | 'inspection' | 'work_order';
  isTurnaround?: boolean;
  isVip?: boolean;
  startedAt?: string;
  completedAt?: string;
  inspectedAt?: string;
  inspectorName?: string;
  inspectorScore?: number; // 1-100
  payoutAmount: number;
  checklists: ChecklistCategory[];
  photos: PhotoProof[];
  damageReports: DamageReport[];
  lostAndFound: LostAndFoundItem[];
}
