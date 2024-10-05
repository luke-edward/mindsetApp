import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
}

export function Checkbox({ checked, onPress, label }: CheckboxProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Text style={styles.checkmark}>X</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#000",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  label: {
    marginLeft: 8,
  },
});
