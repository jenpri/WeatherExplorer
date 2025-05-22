import { Image, StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Welcome to</Text>
      <Text style={styles.logo}>WeatherExplorer</Text>

      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
        }}
        style={styles.image}
      />

      <Text style={styles.subtitle}>Explore the weather with color, clarity and style.</Text>
      <Text style={styles.footer}>Swipe through the tabs to get started ➡️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: "#0288d1",
    marginBottom: 5,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#01579b",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  footer: {
    fontSize: 14,
    color: "#777",
    marginTop: 30,
    fontStyle: "italic",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 20,
  },
});
