export interface User {
  id: string;
  name: string;
  email: string;
  type: 'requester' | 'traveler' | 'both';
  avatar?: string;
  rating: number;
  totalDeliveries: number;
  joinDate: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  phone?: string;
  location?: string;
}

export interface DeliveryRequest {
  id: string;
  title: string;
  description: string;
  itemType: string;
  size: 'small' | 'medium' | 'large';
  weight: number;
  pickupLocation: Location;
  dropoffLocation: Location;
  requesterId: string;
  requesterName: string;
  requesterRating: number;
  travelerId?: string;
  travelerName?: string;
  status: 'posted' | 'accepted' | 'in-transit' | 'delivered' | 'cancelled';
  budget: number;
  preferredDate: string;
  urgency: 'low' | 'medium' | 'high';
  createdAt: string;
  estimatedDeliveryTime?: string;
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  zipCode: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  deliveryId?: string;
}

export interface Payment {
  id: string;
  deliveryId: string;
  amount: number;
  status: 'pending' | 'held' | 'completed' | 'refunded';
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';
  createdAt: string;
  completedAt?: string;
}

export interface Review {
  id: string;
  deliveryId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  voiceAnnouncements: boolean;
}