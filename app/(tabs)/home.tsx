import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        Alert.alert("Permission denied", "Location access was not granted.");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&current_weather=true`
          );
          const data = await response.json();
          setWeather(data.current_weather);
        } catch (error) {
          setErrorMsg("Failed to fetch weather data.");
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 WeatherExplorer</Text>

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#00BFFF" />
      ) : weather ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📍 Your Location</Text>
          <Text style={styles.text}>🌡️ Temperature: <Text style={styles.bold}>{weather.temperature}°C</Text></Text>
          <Text style={styles.text}>💨 Wind: <Text style={styles.bold}>{weather.windspeed} km/h</Text></Text>
          <Text style={styles.text}>🕒 Time: <Text style={styles.bold}>{weather.time}</Text></Text>
        </View>
      ) : (
        <Text style={styles.error}>No data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd", // fondo azul claro
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0288d1", // azul vibrante
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1976d2",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

