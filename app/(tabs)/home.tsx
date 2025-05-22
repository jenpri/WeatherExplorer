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
      <Text style={styles.title}>Welcome to WeatherExplorer 🌦️</Text>

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#00f" />
      ) : weather ? (
        <>
          <Text style={styles.text}>Temperature: {weather.temperature}°C</Text>
          <Text style={styles.text}>Windspeed: {weather.windspeed} km/h</Text>
          <Text style={styles.text}>Time: {weather.time}</Text>
        </>
      ) : (
        <Text>No weather data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16 },
  error: { color: "red", fontSize: 16, margin: 10 },
});
