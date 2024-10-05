import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

// Change this line to import Colors as a named import
import { Colors } from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Set the tab bar background color to grey
        // tabBarStyle: { backgroundColor: "grey" },
        // Set the header (top bar) background color to grey
        headerStyle: { backgroundColor: "#2c2c2c" },
        // Set the header title color to white for better contrast
        headerTitleStyle: { color: "white" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "MINDSET",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href={{ pathname: "/(tabs)/today" }} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="white" // Change this to white for better visibility
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />
      {/* Add any other tabs you need here */}
    </Tabs>
  );
}
