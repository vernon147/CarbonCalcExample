// src/screens/TransportModeSelectionScreen.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ScreenProps } from '../navigation/types';
import { TransportMode } from '../types/data';
import { TRANSPORT_MODES } from '../constants/transportModes';
import { AppButton } from '../components/AppButton';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setSelectedModes } from '../store/calculationSlice';

export default function TransportModeSelectionScreen({
  navigation,
}: ScreenProps<'TransportModeSelection'>) {
  const [selected, setSelected] = useState<TransportMode[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const timeFrame = useSelector(
    (state: RootState) => state.calculation.timeFrame,
  );

  const toggleSelection = (modeId: TransportMode) => {
    setSelected(prev =>
      prev.includes(modeId)
        ? prev.filter(id => id !== modeId)
        : [...prev, modeId],
    );
  };

  const handleNext = () => {
    const orderedSelectedModes = TRANSPORT_MODES.map(m => m.id).filter(id =>
      selected.includes(id),
    );

    dispatch(setSelectedModes(orderedSelectedModes));

    if (orderedSelectedModes.length > 0) {
      navigation.navigate('DataEntry', {
        mode: orderedSelectedModes[0],
        modeIndex: 0,
      });
    } else {
      navigation.navigate('Results');
    }
  };

  // JSX and Styles remain the same
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Over the {timeFrame}, how has your household travelled?
      </Text>
      {TRANSPORT_MODES.map(({ id, label }) => (
        <TouchableOpacity
          key={id}
          style={[
            styles.option,
            selected.includes(id) && styles.selectedOption,
          ]}
          onPress={() => toggleSelection(id)}
        >
          <Text
            style={[
              styles.optionText,
              selected.includes(id) && styles.selectedText,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
      <AppButton title="Next" onPress={handleNext} style={styles.nextButton} />
    </ScrollView>
  );
}
// Styles remain the same

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  option: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#E6F2FF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 20,
  },
});
