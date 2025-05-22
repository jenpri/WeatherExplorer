import { useState } from "react";
import { ImageBackground, Platform, StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [useCelsius, setUseCelsius] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Settings ⚙️</Text>

        <View style={styles.option}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            accessibilityLabel="Toggle dark mode setting"
            thumbColor={isDarkMode ? "#f5dd4b" : "#ccc"}
            trackColor={{ false: "#999", true: "#444" }}
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.label}>Use Celsius</Text>
          <Switch
            value={useCelsius}
            onValueChange={setUseCelsius}
            accessibilityLabel="Switch between Celsius and Fahrenheit"
            thumbColor={useCelsius ? "#4fc3f7" : "#ccc"}
            trackColor={{ false: "#999", true: "#0288d1" }}
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.label}>Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            accessibilityLabel="Toggle notifications setting"
            thumbColor={notifications ? "#81c784" : "#ccc"}
            trackColor={{ false: "#999", true: "#388e3c" }}
          />
        </View>

        <Text style={styles.note}>
          {Platform.OS === "web"
            ? "Note: Notifications and dark mode preferences are for display only on web."
            : ""}
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
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 10,
  },
  label: {
    color: "#fff",
    fontSize: 18,
  },
  note: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 14,
    color: "#ccc",
    fontStyle: "italic",
  },
});

