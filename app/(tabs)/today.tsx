import React from "react";
import { StyleSheet, View } from "react-native";
import { ParallaxScrollView } from "../../components/ParallaxScrollView";
import { DailyQuote } from "../../components/DailyQuote";
import { DailyChallenge } from "../../components/DailyChallenge";

export default function TodayScreen() {
  return (
    <View style={styles.container}>
      <DailyChallenge />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
