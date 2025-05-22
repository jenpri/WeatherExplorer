import { ScrollView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.giantEmoji}>⛅🌈🌧️☀️</Text>

      <Text style={styles.title}>Welcome to WeatherExplorer!</Text>

      <Text style={styles.subtitle}>
        Get the weather you need with a splash of color and fun! 🎨💧
      </Text>

      <Text style={styles.section}>
        🌍 Location-based forecast  
        📅 Daily & weekly info  
        ⚡ Real-time updates  
        🔔 Alerts and tips
      </Text>

      <Text style={styles.quote}>
        "No matter the weather, always bring your own sunshine." ☀️
      </Text>

      <Text style={styles.footer}>Let’s explore the sky together! 🚀🌤️</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fcefe3",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  giantEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#e65100",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#4e342e",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    fontSize: 16,
    color: "#5d4037",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 26,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#3e2723",
    textAlign: "center",
    backgroundColor: "#fff8e1",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  footer: {
    fontSize: 16,
    marginTop: 30,
    color: "#6d4c41",
    textAlign: "center",
  },
});

