import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { DraggableHeader } from "./DraggableHeader";

interface ParallaxScrollViewProps {
  headerMinHeight: number;
  headerMaxHeight: number;
  headerContent: React.ReactNode;
  children: React.ReactNode;
}

export function ParallaxScrollView({
  headerMinHeight,
  headerMaxHeight,
  headerContent,
  children,
}: ParallaxScrollViewProps) {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <DraggableHeader
        minHeight={headerMinHeight}
        maxHeight={headerMaxHeight}
        scrollY={scrollY}
      >
        {/* Ensure headerContent is wrapped in a Text component if it's a string */}
        {typeof headerContent === "string" ? (
          <Text style={styles.headerText}>{headerContent}</Text>
        ) : (
          headerContent
        )}
      </DraggableHeader>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={{ height: headerMaxHeight }} />
        {children}
      </Animated.ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
