import { Text, View, StyleSheet, Image } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://source.unsplash.com/random/800x600?mindfulness",
        }}
        style={styles.headerImage}
      />
      <Text style={styles.text}>About screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  headerImage: {
    width: 800,
    height: 600,
    resizeMode: "cover",
  },
});
