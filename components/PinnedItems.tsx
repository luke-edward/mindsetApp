import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PinnedItem {
  id: string;
  title: string;
  type: "note" | "meditation" | "challenge";
}

interface PinnedItemsProps {
  items: PinnedItem[];
  onItemPress: (item: PinnedItem) => void;
}

export function PinnedItems({ items, onItemPress }: PinnedItemsProps) {
  function renderItem({ item }: { item: PinnedItem }) {
    return (
      <TouchableOpacity onPress={() => onItemPress(item)}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Ionicons
            name={
              item.type === "note"
                ? "document"
                : item.type === "meditation"
                ? "musical-note"
                : "trophy"
            }
            size={24}
            color="black"
          />
          <Text style={{ marginLeft: 10 }}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Pinned Items</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
