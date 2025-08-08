// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import TimeFrameScreen from '../screens/TimeFrameScreen';
import TransportModeSelectionScreen from '../screens/TransportModeSelectionScreen';
import DataEntryScreen from '../screens/DataEntryScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="TimeFrame"
      screenOptions={{ headerBackTitleVisible: false }}
    >
      <Stack.Screen
        name="TimeFrame"
        component={TimeFrameScreen}
        options={{ title: 'Carbon Calculator' }}
      />
      <Stack.Screen
        name="TransportModeSelection"
        component={TransportModeSelectionScreen}
        options={{ title: 'Select Transport' }}
      />
      <Stack.Screen name="DataEntry" component={DataEntryScreen} />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: 'Your Footprint' }}
      />
    </Stack.Navigator>
  );
}
