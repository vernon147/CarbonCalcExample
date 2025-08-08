// src/store/calculationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimeFrame, TransportData, TransportMode } from '../types/data';

interface CalculationState {
  timeFrame: TimeFrame | null;
  selectedModes: TransportMode[];
  transportData: Partial<Record<TransportMode, TransportData>>;
}

const initialState: CalculationState = {
  timeFrame: null,
  selectedModes: [],
  transportData: {},
};

export const calculationSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    setTimeFrame: (state, action: PayloadAction<TimeFrame>) => {
      state.timeFrame = action.payload; // RTK uses Immer, so "mutating" state here is safe
    },
    setSelectedModes: (state, action: PayloadAction<TransportMode[]>) => {
      state.selectedModes = action.payload;
    },
    setTransportData: (
      state,
      action: PayloadAction<{ mode: TransportMode; data: TransportData }>,
    ) => {
      const { mode, data } = action.payload;
      state.transportData[mode] = data;
    },
    resetState: state => {
      state.timeFrame = initialState.timeFrame;
      state.selectedModes = initialState.selectedModes;
      state.transportData = initialState.transportData;
    },
  },
});

// Export actions for use in components
export const { setTimeFrame, setSelectedModes, setTransportData, resetState } =
  calculationSlice.actions;

// Export the reducer to be used in the store
export default calculationSlice.reducer;
