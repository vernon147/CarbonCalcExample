// src/screens/ResultsScreen.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScreenProps } from '../navigation/types';
import { AppButton } from '../components/AppButton';
import { calculateFootprint } from '../api/calculator'; // We will update this file next

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { resetState } from '../store/calculationSlice';

export default function ResultsScreen({ navigation }: ScreenProps<'Results'>) {
  const dispatch = useDispatch<AppDispatch>();
  const { timeFrame, selectedModes, transportData } = useSelector(
    (state: RootState) => state.calculation,
  );

  const totalFootprint = calculateFootprint({ selectedModes, transportData });
  const totalInTonnes = (totalFootprint / 1000).toFixed(2);

  const handleStartOver = () => {
    dispatch(resetState());
    navigation.popToTop();
  };

  // JSX and Styles remain the same
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Result</Text>
      <Text style={styles.subHeader}>
        Based on your travel for the {timeFrame || 'selected period'}:
      </Text>
      <View style={styles.resultBox}>
        <Text style={styles.resultValue}>{totalInTonnes}</Text>
        <Text style={styles.resultUnit}>tonnes of CO2e</Text>
      </View>
      <AppButton
        title="Start Over"
        onPress={handleStartOver}
        style={styles.resetButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 15,
  },
  resultBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  resultUnit: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#555',
  },
});
