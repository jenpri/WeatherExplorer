import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ForecastScreen() {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const data = await response.json();

        const days = data.daily.time.map((date: string, index: number) => ({
          date,
          max: data.daily.temperature_2m_max[index],
          min: data.daily.temperature_2m_min[index],
        }));

        setForecast(days);
      } catch (error) {
        setErrorMsg("Failed to load forecast.");
      }

      setLoading(false);
    })();
  }, []);

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" }}

      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>5-Day Forecast 🌤️</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : (
          <ScrollView style={styles.scroll}>
            {forecast.map((day, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.date}>{day.date}</Text>
                <Text style={styles.temp}>
                  🔺 {day.max}°C   🔻 {day.min}°C
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
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
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  error: {
    color: "#ffdddd",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  scroll: {
    marginTop: 10,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  temp: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
