// src/navigation/types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransportMode } from '../types/data';

export type RootStackParamList = {
  TimeFrame: undefined;
  TransportModeSelection: undefined;
  DataEntry: { mode: TransportMode; modeIndex: number };
  Results: undefined;
};

// Helper type for screens
export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
