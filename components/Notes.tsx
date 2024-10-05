import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NoteProps {
  content: string;
  time: string;
  isPlaceholder?: boolean;
}

function Note({ content, time, isPlaceholder }: NoteProps) {
  if (isPlaceholder) {
    return (
      <View style={[styles.noteContainer, styles.placeholderContainer]}>
        <Ionicons name="add" size={24} color="#A0A0A0" />
      </View>
    );
  }

  return (
    <View style={styles.noteContainer}>
      <Text style={styles.noteContent}>{content}</Text>
      <View style={styles.noteFooter}>
        <Text style={styles.noteTime}>{time}</Text>
        <View style={styles.noteActions}>
          <Ionicons
            name="star-outline"
            size={16}
            color="#A0A0A0"
            style={styles.actionIcon}
          />
          <Ionicons name="ellipsis-horizontal" size={16} color="#A0A0A0" />
        </View>
      </View>
    </View>
  );
}

export function Notes() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        {/* <TouchableOpacity>
          <Text style={styles.seeAll}>See all notes</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.notesGrid}>
        <Note content="Lorem ipsum dolor sit amet." time="1 week ago" />
        <Note content="Note 2" time="57 sec ago" />
        <Note content="Note 3" time="57 sec ago" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#4CAF50",
    fontSize: 14,
  },
  notesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  noteContainer: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#A0A0A0",
  },
  noteContent: {
    color: "#000000",
    fontSize: 14,
    marginBottom: 8,
  },
  noteFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteTime: {
    color: "#A0A0A0",
    fontSize: 12,
  },
  noteActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    marginRight: 8,
  },
});
