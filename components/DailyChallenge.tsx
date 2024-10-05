import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function DailyChallenge() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Challenge</Text>
      <Text style={styles.challenge}>
        Your daily challenge description goes here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e6f7ff",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  challenge: {
    fontSize: 16,
  },
});
