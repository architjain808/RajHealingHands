import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string; // Optional now as we use custom vector scenes
  color: string; // Tailwind color class prefix e.g., 'teal', 'orange'
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  time: string;
  role?: string; // e.g., "Back Pain Patient"
}

export interface ContactFormState {
  name: string;
  problem: string;
}

export interface Patient {
  id: string;
  name: string;
  contact: string;
  date: string;
  dayOfOPD: number;
  condition: string;
  address: string;
  amountPaid: number;
  createdAt: string;
}