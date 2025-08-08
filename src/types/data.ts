// src/types/data.ts
export type TimeFrame = 'Past Month' | 'Past 3 Months' | 'Past Year';

export type TransportMode =
  | 'car'
  | 'coach'
  | 'train'
  | 'airDomestic'
  | 'airInternational'
  | 'cruise';

// --- Data interfaces for each transport mode ---
export interface CarData {
  distanceKm: number;
}

export interface CoachData {
  distanceKm: number;
}

export interface TrainData {
  distanceKm: number;
}

export interface AirDomesticData {
  numberOfFlights: number;
}

export interface AirInternationalData {
  numberOfFlights: number;
}

export interface CruiseData {
  numberOfNights: number;
}

// Union type for all possible data structures
export type TransportData =
  | CarData
  | CoachData
  | TrainData
  | AirDomesticData
  | AirInternationalData
  | CruiseData;
