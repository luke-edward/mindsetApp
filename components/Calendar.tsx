import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Calendar() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDate = new Date();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Day 15</Text>
      <View style={styles.calendarContainer}>
        {days.map((day, index) => {
          const isCurrentDay = index === currentDate.getDay();
          return (
            <View
              key={day}
              style={[styles.dayContainer, isCurrentDay && styles.currentDay]}
            >
              <Text
                style={[styles.dayText, isCurrentDay && styles.currentDayText]}
              >
                {day}
              </Text>
              <Text
                style={[styles.dateText, isCurrentDay && styles.currentDayText]}
              >
                {new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  currentDate.getDate() - currentDate.getDay() + index
                ).getDate()}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 24,
  },
  calendarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#333333",
    borderRadius: 10,
    padding: 16,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40, // Set a fixed width for all day containers
    height: 60, // Set a fixed height for all day containers
  },
  currentDay: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  dayText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  currentDayText: {
    color: "#000000",
  },
});
