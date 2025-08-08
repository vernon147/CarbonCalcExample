// src/components/TextInputField.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric';
}

export const TextInputField = ({
  label,
  value,
  onChangeText,
  ...rest
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
});
