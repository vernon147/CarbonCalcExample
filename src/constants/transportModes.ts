// src/constants/transportModes.ts
import { TransportMode } from '../types/data';

export const TRANSPORT_MODES: { id: TransportMode; label: string }[] = [
  { id: 'car', label: 'Road Trip (Car)' },
  { id: 'coach', label: 'Coach' },
  { id: 'train', label: 'Train' },
  { id: 'airDomestic', label: 'Air (Domestic)' },
  { id: 'airInternational', label: 'Air (International)' },
  { id: 'cruise', label: 'Cruise Ship' },
];
