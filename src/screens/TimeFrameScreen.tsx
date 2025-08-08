// src/screens/TimeFrameScreen.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScreenProps } from '../navigation/types';
import { TimeFrame } from '../types/data';
import { AppButton } from '../components/AppButton';

// Redux imports
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setTimeFrame } from '../store/calculationSlice';

export default function TimeFrameScreen({
  navigation,
}: ScreenProps<'TimeFrame'>) {
  const dispatch = useDispatch<AppDispatch>();

  const handleSelect = (timeFrame: TimeFrame) => {
    dispatch(setTimeFrame(timeFrame));
    navigation.navigate('TransportModeSelection');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculate carbon footprint for...</Text>
      <AppButton
        title="Past Month"
        onPress={() => handleSelect('Past Month')}
      />
      <AppButton
        title="Past 3 Months"
        onPress={() => handleSelect('Past 3 Months')}
      />
      <AppButton title="Past Year" onPress={() => handleSelect('Past Year')} />
    </View>
  );
}
// Styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
});
