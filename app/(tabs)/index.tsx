import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1170&q=80",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome! 👋</Text>
        <Text style={styles.subtitle}>
          Your weather adventure starts here.
        </Text>
        <Text style={styles.quote}>
          "Sunshine is delicious, rain is refreshing, wind braces us up..." 🌤️
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#eee",
    textAlign: "center",
    marginBottom: 20,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#ccc",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
