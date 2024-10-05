import React, { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import {
  StyleSheet,
  View,
  useColorScheme,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { DailyQuote } from "../../components/DailyQuote";
import { Calendar } from "../../components/Calendar";
import AudioMeditation from "../../components/AudioMeditation";
import NoteCard from "../../components/NoteCard";
import NoteEditor from "../../components/NoteEditor";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as Permissions from "expo-permissions";

export default function TabOneScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const scrollY = useSharedValue(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [notes, setNotes] = useState<
    Array<{
      id: string;
      title: string;
      content: string;
      timeAgo: string;
      isStarred: boolean;
    }>
  >([]);
  const [isNoteEditorVisible, setIsNoteEditorVisible] = useState(false);
  const [isQuoteExpanded, setIsQuoteExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [isHeaderIconPressed, setIsHeaderIconPressed] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );
      if (status !== "granted") {
        console.error("Audio permission not granted");
      }
    })();
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const backgroundColor = colorScheme === "dark" ? "#1A1A1A" : "#F5F5F5";

  useEffect(() => {
    navigation.setOptions({
      headerLeft: isQuoteExpanded
        ? () => (
            <TouchableOpacity
              onPress={() => handleQuoteExpand(false)}
              style={{ paddingLeft: 16 }} // Add left padding here
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
              />
            </TouchableOpacity>
          )
        : undefined,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setIsHeaderIconPressed(true);
            setTimeout(() => setIsHeaderIconPressed(false), 200);
          }}
          style={{ paddingRight: 16 }}
        >
          <Ionicons
            name="grid-outline"
            size={24}
            color={
              isHeaderIconPressed
                ? "#4A90E2"
                : colorScheme === "dark"
                ? "#FFFFFF"
                : "#000000"
            }
          />
        </TouchableOpacity>
      ),
    });
  }, [isQuoteExpanded, colorScheme, isHeaderIconPressed]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playAudio = async (audioUrl: string) => {
    try {
      if (sound) {
        if (currentAudioUrl === audioUrl) {
          if (isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
          } else {
            await sound.playAsync();
            setIsPlaying(true);
          }
          return;
        } else {
          await sound.unloadAsync();
        }
      }

      console.log("Loading Sound");
      const newSound = new Audio.Sound();
      await newSound.loadAsync({
        uri: audioUrl,
      });
      setSound(newSound);
      setCurrentAudioUrl(audioUrl);

      console.log("Playing Sound");
      await newSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handleAddNote = (title: string, content: string) => {
    const newNote = {
      id: Date.now().toString(), // Simple way to generate a unique id
      title,
      content,
      timeAgo: "Just now",
      isStarred: false,
    };
    setNotes([newNote, ...notes]);
    setIsNoteEditorVisible(false);
  };

  const handleQuoteExpand = (expanded: boolean) => {
    setIsQuoteExpanded(expanded);
  };

  const handleStarNote = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isStarred: !note.isStarred } : note
      )
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }]}
      edges={["bottom", "left", "right"]}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Mindset",
        }}
      />
      <DailyQuote
        scrollY={scrollY}
        onExpand={handleQuoteExpand}
        isExpanded={isQuoteExpanded}
      />
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={styles.spacer} />
        <Calendar />
        <AudioMeditation
          title="Meditations by Marcus Aurelius"
          audioUrl="https://dn720003.ca.archive.org/0/items/meditations_0708_librivox/meditations_01_marcusaurelius.mp3"
          imageUrl={require("../../assets/images/m.jpg")}
          duration="25:30"
          backgroundColor="#E6F3FF"
          onPlay={() =>
            playAudio(
              "https://dn720003.ca.archive.org/0/items/meditations_0708_librivox/meditations_01_marcusaurelius.mp3"
            )
          }
          isPlaying={
            isPlaying &&
            currentAudioUrl ===
              "https://dn720003.ca.archive.org/0/items/meditations_0708_librivox/meditations_01_marcusaurelius.mp3"
          }
        />
        <AudioMeditation
          title="The Art of Living by Epictetus"
          audioUrl="https://www.learnoutloud.com/audiobooks/Enchiridion.mp3"
          duration="40:00"
          imageUrl={require("../../assets/images/e.jpeg")}
          backgroundColor="#FFE6E6"
          onPlay={() =>
            playAudio("https://www.learnoutloud.com/audiobooks/Enchiridion.mp3")
          }
          isPlaying={
            isPlaying &&
            currentAudioUrl ===
              "https://www.learnoutloud.com/audiobooks/Enchiridion.mp3"
          }
        />
        <AudioMeditation
          title="Letters from a Stoic by Seneca"
          audioUrl="https://ia801501.us.archive.org/12/items/morallettersvol1_1501_librivox/morallettersvol1_01_seneca_128kb.mp3"
          duration="50:00"
          imageUrl={require("../../assets/images/s.png")}
          backgroundColor="#E6FFE6"
          onPlay={() =>
            playAudio(
              "https://ia801501.us.archive.org/12/items/morallettersvol1_1501_librivox/morallettersvol1_01_seneca_128kb.mp3"
            )
          }
          isPlaying={
            isPlaying &&
            currentAudioUrl ===
              "https://ia801501.us.archive.org/12/items/morallettersvol1_1501_librivox/morallettersvol1_01_seneca_128kb.mp3"
          }
        />

        <View style={styles.notesSection}>
          <View style={styles.notesHeader}>
            <Text style={styles.notesTitle}>Notes</Text>
            {/* <TouchableOpacity onPress={() => console.log("See all notes")}>
              <Text style={styles.seeAllNotes}>See all notes</Text>
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity
            style={styles.addNoteContainer}
            onPress={() => setIsNoteEditorVisible(true)}
          >
            <Ionicons name="add" size={24} color="#4A90E2" />
            <View style={styles.addNoteDashed}>
              <Text style={styles.addNoteText}>Add a note</Text>
            </View>
          </TouchableOpacity>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.content}
              timeAgo={note.timeAgo}
              isStarred={note.isStarred}
              onStar={() => handleStarNote(note.id)}
              onMoreOptions={() => console.log("More options")}
            />
          ))}
        </View>
      </Animated.ScrollView>
      <Modal
        visible={isNoteEditorVisible}
        animationType="slide"
        onRequestClose={() => setIsNoteEditorVisible(false)}
      >
        <NoteEditor
          onSave={handleAddNote}
          onCancel={() => setIsNoteEditorVisible(false)}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  spacer: {
    height: 200, // Adjust this value based on the height of your DailyQuote component
  },
  notesSection: {
    marginTop: 24,
  },
  notesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 10,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  seeAllNotes: {
    color: "white",
    fontSize: 14,
  },
  addNoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  addNoteDashed: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 16,
    marginLeft: 16,
  },
  addNoteText: {
    color: "#4A90E2",
    textAlign: "center",
  },
});
