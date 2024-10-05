import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NoteCardProps {
  title: string;
  content: string;
  timeAgo: string;
  isStarred: boolean;
  onStar: () => void;
  onMoreOptions: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  content,
  timeAgo,
  isStarred,
  onStar,
  onMoreOptions,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content} numberOfLines={2}>
        {content}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onStar}>
            <Ionicons
              name={isStarred ? "star" : "star-outline"}
              size={20}
              color={isStarred ? "#FFD700" : "#666"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onMoreOptions} style={styles.moreOptions}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeAgo: {
    fontSize: 12,
    color: "#999",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreOptions: {
    marginLeft: 16,
  },
});

export default NoteCard;
