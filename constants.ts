import { Activity, Heart, UserCheck, Zap, Smile, Brain, Baby, Accessibility } from 'lucide-react';
import { Service, Review } from './types';

export const WHATSAPP_NUMBER = "918979375090";

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Manual Therapy',
    description: 'Hands-on techniques to mobilize joints and soft tissues.',
    icon: Activity,
    color: 'teal',
  },
  {
    id: '2',
    title: 'Pediatric Care',
    description: 'Fun and effective therapy for our little champions.',
    icon: Baby,
    color: 'orange',
  },
  {
    id: '3',
    title: 'Neuro Rehab',
    description: 'Rewiring the brain for better movement and control.',
    icon: Brain,
    color: 'purple',
  },
  {
    id: '4',
    title: 'Post-Op Recovery',
    description: 'Getting you back on your feet after surgery.',
    icon: UserCheck,
    color: 'blue',
  },
  {
    id: '5',
    title: 'Sports Injury',
    description: 'Fast recovery for athletes to return to the game.',
    icon: Zap,
    color: 'rose',
  },
  {
    id: '6',
    title: 'Geriatric Care',
    description: 'Gentle care to improve mobility for seniors.',
    icon: Accessibility,
    color: 'green',
  },
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Priya Sharma',
    role: 'Back Pain Relief',
    rating: 5,
    text: "Anshikka Arora is magical! The clinic has such a happy vibe, and my pain is completely gone.",
    time: "2 weeks ago",
  },
  {
    id: '2',
    author: 'Rahul Verma',
    role: 'Sports Recovery',
    rating: 5,
    text: "Super fun environment and serious results. I'm back on the field faster than expected!",
    time: "1 month ago",
  },
  {
    id: '3',
    author: 'Sita Gupta',
    role: 'Neck Mobility',
    rating: 5,
    text: "The exercises are easy to follow and Anshikka makes the sessions really interesting.",
    time: "3 days ago",
  },
  {
    id: '4',
    author: 'Amit Singh',
    role: 'Shoulder Rehab',
    rating: 5,
    text: "Highly recommended! Very professional yet friendly approach.",
    time: "2 months ago",
  }
];

export const COLORS = {
  primary: '#2dd4bf', // Teal 400
  secondary: '#38bdf8', // Sky 400
  background: '#F0FDFA', // Teal 50
  text: '#334155', // Slate 700
};