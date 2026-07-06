export type PropertyType = 'House' | 'Apartment' | 'Land' | 'Villa' | 'Townhouse';
export type TransactionType = 'For Sale' | 'For Rent';
export type ListingTag = 'Featured' | 'New' | 'Price Drop' | 'Sold' | 'Pending';
export type ListingStatus = 'Approved' | 'Pending' | 'Rejected';

export interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  address: string;
  price: number;
  transactionType: TransactionType;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  images: string[];
  tags: ListingTag[];
  amenities: string[];
  agentId: string;
  status: ListingStatus;
  createdAt: string;
  lat: number;
  lng: number;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  avatar: string;
  bio: string;
}

export type Role = 'guest' | 'customer' | 'agent' | 'admin';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  joined: string;
  status: 'Active' | 'Suspended';
}

export interface SavedSearch {
  id: string;
  label: string;
  query: string;
  createdAt: string;
}

export interface TourRequest {
  id: string;
  propertyId: string;
  date: string;
  time: string;
  status: 'Requested' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface Inquiry {
  id: string;
  propertyId: string;
  customerName: string;
  message: string;
  receivedAt: string;
}

export interface Filters {
  keyword: string;
  city: string;
  propertyType: PropertyType | 'Any';
  transactionType: TransactionType | 'Any';
  minPrice: number;
  maxPrice: number;
  bedrooms: number; // 0 = any, else minimum
  bathrooms: number;
}

export type View =
  | { name: 'home' }
  | { name: 'listings' }
  | { name: 'details'; propertyId: string }
  | { name: 'dashboard' };
