import { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [useCelsius, setUseCelsius] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      <View style={styles.option}>
        <Text style={styles.label}>🌙 Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(val) => setIsDarkMode(val)}
          trackColor={{ false: "#ccc", true: "#0288d1" }}
          thumbColor={isDarkMode ? "#ffffff" : "#f4f3f4"}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>🔔 Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(val) => setNotificationsEnabled(val)}
          trackColor={{ false: "#ccc", true: "#0288d1" }}
          thumbColor={notificationsEnabled ? "#ffffff" : "#f4f3f4"}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>🌡️ Use Celsius</Text>
        <Switch
          value={useCelsius}
          onValueChange={(val) => setUseCelsius(val)}
          trackColor={{ false: "#ccc", true: "#0288d1" }}
          thumbColor={useCelsius ? "#ffffff" : "#f4f3f4"}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>More settings coming soon 🚀</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e3f2fd",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0288d1",
    marginBottom: 30,
  },
  option: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: "#333",
  },
  footer: {
    marginTop: 30,
    padding: 10,
  },
  footerText: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
});
