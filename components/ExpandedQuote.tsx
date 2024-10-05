import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ExpandedQuoteProps {
  onClose: () => void;
}

export function ExpandedQuote({ onClose }: ExpandedQuoteProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.quote}>
          "Your daily inspirational quote here, now displayed in full on the
          entire screen."
        </Text>
        <Text style={styles.author}>- Author Name</Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 32,
  },
  quote: {
    fontSize: 24,
    color: "#ecf0f1",
    marginBottom: 16,
    textAlign: "center",
  },
  author: {
    fontSize: 18,
    color: "#bdc3c7",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    bottom: 32,
    padding: 16,
    backgroundColor: "#34495e",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#ecf0f1",
    fontSize: 16,
  },
});
