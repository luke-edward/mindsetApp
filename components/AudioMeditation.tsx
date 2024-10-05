import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AudioMeditationProps {
  title: string;
  audioUrl: number | string; // Can be either a require'd asset or a string URL
  imageUrl?: ImageSourcePropType;
  duration: string;
  backgroundColor: string;
  onPlay: () => Promise<void>;
  isPlaying: boolean; // Add this prop
}

const AudioMeditation: React.FC<AudioMeditationProps> = ({
  title,
  imageUrl,
  duration,
  backgroundColor,
  onPlay,
  isPlaying, // Use this prop
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {imageUrl && <Image source={imageUrl} style={styles.image} />}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      <TouchableOpacity style={styles.playButton} onPress={onPlay}>
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={40}
          color="#4A90E2"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
  playButton: {
    padding: 10,
  },
});

export default AudioMeditation;
