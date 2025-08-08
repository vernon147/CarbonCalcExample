import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { ScreenProps } from '../navigation/types';
import { AppButton } from '../components/AppButton';
import { TextInputField } from '../components/TextInputField';
import {
  AirDomesticData,
  AirInternationalData,
  CarData,
  CoachData,
  CruiseData,
  TrainData,
  TransportData,
} from '../types/data';
import { TRANSPORT_MODES } from '../constants/transportModes';

// ---- Redux Imports ----
// useSelector reads data from the store, and useDispatch sends actions to the store.
import { useSelector, useDispatch } from 'react-redux';
// These types ensure our hooks are aware of our store's specific state and dispatchable actions.
import { RootState, AppDispatch } from '../store/store';
// We import the specific action creator we want to use from our slice.
import { setTransportData } from '../store/calculationSlice';

export default function DataEntryScreen({
  route,
  navigation,
}: ScreenProps<'DataEntry'>) {
  // 1. Get navigation parameters
  const { mode, modeIndex } = route.params;

  // 2. Set up Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const selectedModes = useSelector(
    (state: RootState) => state.calculation.selectedModes,
  );

  // 3. Local state for form input. This does not need to be in Redux.
  const [inputValue, setInputValue] = useState('');

  // 4. Set the screen title dynamically based on the current mode
  useEffect(() => {
    const modeLabel =
      TRANSPORT_MODES.find(m => m.id === mode)?.label || 'Data Entry';
    navigation.setOptions({ title: modeLabel });
  }, [mode, navigation]);

  // 5. Handle the "Next" button press
  const handleNext = () => {
    // Basic validation
    const parsedValue = parseFloat(inputValue);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      Alert.alert('Invalid Input', 'Please enter a positive number.');
      return;
    }

    // Create the correct data object based on the current transport mode
    let data: TransportData | undefined;
    switch (mode) {
      case 'car':
        data = { distanceKm: parsedValue } as CarData;
        break;
      case 'coach':
        data = { distanceKm: parsedValue } as CoachData;
        break;
      case 'train':
        data = { distanceKm: parsedValue } as TrainData;
        break;
      case 'cruise':
        data = { numberOfNights: parsedValue } as CruiseData;
        break;
      case 'airDomestic':
        data = { numberOfFlights: parsedValue } as AirDomesticData;
        break;
      case 'airInternational':
        data = { numberOfFlights: parsedValue } as AirInternationalData;
        break;
    }

    // Dispatch the action to the Redux store
    if (data) {
      // The payload for our setTransportData action is an object { mode, data }
      dispatch(setTransportData({ mode, data }));
    }

    // Determine the next screen
    const nextModeIndex = modeIndex + 1;
    if (nextModeIndex < selectedModes.length) {
      // If there are more modes selected, go to the next DataEntry screen
      const nextMode = selectedModes[nextModeIndex];
      navigation.replace('DataEntry', {
        mode: nextMode,
        modeIndex: nextModeIndex,
      });
    } else {
      // If this was the last mode, go to the Results screen
      navigation.navigate('Results');
    }
  };

  // 6. Memoize form details to avoid recalculating on every render
  const formDetails = useMemo(() => {
    switch (mode) {
      case 'car':
      case 'coach':
      case 'train':
        return { label: 'Total Distance (km)', placeholder: 'e.g., 500' };
      case 'airDomestic':
      case 'airInternational':
        return { label: 'Number of one-way flights', placeholder: 'e.g., 2' };
      case 'cruise':
        return {
          label: 'Total number of nights on board',
          placeholder: 'e.g., 7',
        };
      default:
        // Fallback case, should not be reached
        return { label: 'Value', placeholder: '' };
    }
  }, [mode]);

  // 7. Render the component
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enter Details for {formDetails.label}</Text>
      <TextInputField
        label={formDetails.label}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder={formDetails.placeholder}
        keyboardType="numeric"
      />
      <AppButton title="Next" onPress={handleNext} style={styles.nextButton} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  nextButton: {
    marginTop: 30,
  },
});
