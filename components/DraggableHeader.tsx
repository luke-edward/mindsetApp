import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DraggableHeaderProps {
  minHeight: number;
  maxHeight: number;
  children: React.ReactNode;
  scrollY: SharedValue<number>;
}

export function DraggableHeader({
  minHeight,
  maxHeight,
  children,
  scrollY,
}: DraggableHeaderProps) {
  const insets = useSafeAreaInsets();

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, maxHeight - minHeight],
      [maxHeight, minHeight],
      Extrapolate.CLAMP
    );

    return {
      height: height + insets.top,
      paddingTop: insets.top,
    };
  });

  return (
    <Animated.View style={[styles.header, headerStyle]}>
      <View style={styles.content}>
        {/* Ensure children is wrapped in a Text component if it's a string */}
        {typeof children === "string" ? (
          <Text style={styles.headerText}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 1000,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
