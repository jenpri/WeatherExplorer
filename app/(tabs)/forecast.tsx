import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

// Mapea el código del clima a emojis + descripción
function getWeatherDescription(code: number) {
  if (code === 0) return "☀️ Clear";
  if (code >= 1 && code <= 3) return "🌤️ Partly Cloudy";
  if (code >= 45 && code <= 48) return "🌫️ Fog";
  if (code >= 51 && code <= 67) return "🌦️ Drizzle";
  if (code >= 71 && code <= 77) return "❄️ Snow";
  if (code >= 80 && code <= 82) return "🌧️ Rain Showers";
  if (code >= 95 && code <= 99) return "⛈️ Thunderstorm";
  return "❓ Unknown";
}

export default function ForecastScreen() {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied.");
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        );
        const data = await res.json();

        const forecastData = data.daily.time.map((date: string, index: number) => ({
          date,
          max: data.daily.temperature_2m_max[index],
          min: data.daily.temperature_2m_min[index],
          code: data.daily.weathercode[index],
        }));

        setForecast(forecastData);
      } catch (error) {
        setErrorMsg("Failed to load forecast.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.weather}>{getWeatherDescription(item.code)}</Text>
      <Text style={styles.temp}>🌡️ Max: {item.max}°C</Text>
      <Text style={styles.temp}>❄️ Min: {item.min}°C</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 5-Day Forecast</Text>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0288d1" />
      ) : (
        <FlatList
          data={forecast}
          keyExtractor={(item) => item.date}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd",
    paddingTop: 40,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0288d1",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 12,
    width: 330,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  weather: {
    fontSize: 20,
    marginBottom: 8,
  },
  temp: {
    fontSize: 16,
    color: "#444",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

