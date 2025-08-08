// src/api/calculator.ts
import {
  AirDomesticData,
  AirInternationalData,
  CarData,
  CoachData,
  CruiseData,
  TrainData,
  TransportMode,
} from '../types/data';

// Emission factors (kg CO2e). THESE ARE FOR DEMONSTRATION ONLY.
const FACTORS = {
  car: 0.17, // per km
  coach: 0.027, // per passenger-km
  train: 0.041, // per passenger-km
  airDomestic: 115, // per flight (avg short-haul)
  airInternational: 950, // per flight (avg long-haul)
  cruise: 250, // per night
};

type CalculationArgs = {
  selectedModes: TransportMode[];
  transportData: any;
};

export function calculateFootprint({
  selectedModes,
  transportData,
}: CalculationArgs): number {
  let totalFootprint = 0;

  for (const mode of selectedModes) {
    const data = transportData[mode];
    if (!data) continue;

    switch (mode) {
      case 'car':
        totalFootprint += (data as CarData).distanceKm * FACTORS.car;
        break;
      case 'coach':
        totalFootprint += (data as CoachData).distanceKm * FACTORS.coach;
        break;
      case 'train':
        totalFootprint += (data as TrainData).distanceKm * FACTORS.train;
        break;
      case 'airDomestic':
        totalFootprint +=
          (data as AirDomesticData).numberOfFlights * FACTORS.airDomestic;
        break;
      case 'airInternational':
        totalFootprint +=
          (data as AirInternationalData).numberOfFlights *
          FACTORS.airInternational;
        break;
      case 'cruise':
        totalFootprint += (data as CruiseData).numberOfNights * FACTORS.cruise;
        break;
    }
  }

  return totalFootprint; // in kg CO2e
}
