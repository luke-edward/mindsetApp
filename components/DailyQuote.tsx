import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface DailyQuoteProps {
  scrollY: Animated.SharedValue<number>;
  onExpand: (expanded: boolean) => void;
  isExpanded: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export function DailyQuote({ scrollY, onExpand, isExpanded }: DailyQuoteProps) {
  const expandProgress = useSharedValue(isExpanded ? 1 : 0);

  useEffect(() => {
    expandProgress.value = withTiming(isExpanded ? 1 : 0, { duration: 300 });
  }, [isExpanded]);

  const toggleExpand = () => {
    onExpand(!isExpanded);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      expandProgress.value,
      [0, 1],
      [200, SCREEN_HEIGHT],
      Extrapolate.CLAMP
    );

    const width = interpolate(
      expandProgress.value,
      [0, 1],
      [SCREEN_WIDTH - 32, SCREEN_WIDTH],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      expandProgress.value,
      [0, 1],
      [8, 0],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [-50, 0],
      [50, 0],
      Extrapolate.CLAMP
    );

    const expandedTranslateY = interpolate(
      expandProgress.value,
      [0, 1],
      [0, -100],
      Extrapolate.CLAMP
    );

    return {
      height,
      width,
      borderRadius,
      transform: [
        { translateY: translateY + expandedTranslateY },
        { translateX: (SCREEN_WIDTH - width) / 2 },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <StatusBar hidden={isExpanded} />
      <View style={styles.contentContainer}>
        <Text style={styles.quote}>
          "I've lived the life of a man without teeth, he thought about it. A
          life of a man without teeth. I've never bitten, I've been waiting,
          keeping myself for later - and now I've just ascertained that I don't
          have teeth anymore."
        </Text>
        <Text style={styles.author}>- Jean-Paul Sartre</Text>
        {isExpanded && (
          <>
            <Text style={styles.source}>From: The Age of Reason</Text>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Sartre_1967_crop.jpg",
              }}
              style={styles.authorImage}
            />
            <Text style={styles.anecdote}>
              "The Age of Reason" (1945) is the first novel in Sartre's trilogy
              "The Roads to Freedom". It explores themes of existentialism and
              freedom through the story of a philosophy teacher facing a
              personal crisis. The novel reflects Sartre's own philosophical
              ideas about personal responsibility and the human condition.
            </Text>
          </>
        )}
      </View>
      {!isExpanded && (
        <TouchableOpacity style={styles.expandButton} onPress={toggleExpand}>
          <Ionicons name="chevron-down" size={24} color="#ecf0f1" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#2c2c2c",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: SCREEN_WIDTH - 64,
  },
  quote: {
    fontSize: 18,
    color: "#ecf0f1",
    marginBottom: 16,
    textAlign: "center",
  },
  author: {
    fontSize: 14,
    color: "#bdc3c7",
    textAlign: "center",
  },
  source: {
    fontSize: 12,
    color: "#95a5a6",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  authorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  anecdote: {
    fontSize: 14,
    color: "#ecf0f1",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 20,
  },
  expandButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    padding: 8,
  },
  collapseButton: {
    position: "absolute",
    top: 16,
    left: 16,
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
  },
});
