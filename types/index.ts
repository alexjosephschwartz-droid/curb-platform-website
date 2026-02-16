export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  price: number;
  kbbRetailPrice: number;
  currentBid: number;
  bidCount: number;
  timeRemaining: string;
  image: string;
  location: string;
  condition: 'Good' | 'Fair' | 'Rough';
  status: 'Active' | 'Ending Soon';
}

export interface VehicleDetail extends Vehicle {
  vin: string;
  color: string;
  transmission: string;
  fuelType: string;
  minimumBid: number;
  images: string[];
  dealer: DealerInfo;
  inspection: InspectionReport;
  repairs: RepairItem[];
  bidHistory: BidHistoryEntry[];
}

export interface DealerInfo {
  name: string;
  rating: number;
  totalSales: number;
}

export interface InspectionReport {
  exterior: string;
  interior: string;
  mechanical: string;
}

export interface RepairItem {
  item: string;
  cost: number;
}

export interface BidHistoryEntry {
  bidder: string;
  amount: number;
  time: string;
}

export interface Dealer extends DealerInfo {
  balance: number;
}

export type NotificationType = 'bid' | 'auction' | 'system' | 'message';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  verified: boolean;
}
