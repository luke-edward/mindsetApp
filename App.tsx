import React from "react";
import { ExpoRoot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ExpoRoot context={require("./app")} />
    </GestureHandlerRootView>
  );
}
