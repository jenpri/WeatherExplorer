import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${loc.coords.latitude}&longitude=${loc.coords.longitude}&current_weather=true`
      );
      const data = await response.json();
      setWeather(data.current_weather);
      setLoading(false);
    })();
  }, []);

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1502082553048-f009c37129b9" }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to WeatherExplorer ☁️</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : weather ? (
          <>
            <Text style={styles.info}>
              📍 Your location: {location?.coords.latitude.toFixed(2)}, {location?.coords.longitude.toFixed(2)}
            </Text>
            <Text style={styles.info}>🌡️ Temperature: {weather.temperature}°C</Text>
            <Text style={styles.info}>💨 Wind speed: {weather.windspeed} km/h</Text>
          </>
        ) : (
          <Text style={styles.info}>Could not load weather data.</Text>
        )}

        <Text style={styles.motivation}>
          "No matter the weather, always bring your own sunshine." ☀️
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
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  info: {
    fontSize: 18,
    color: "#eee",
    marginBottom: 10,
    textAlign: "center",
  },
  motivation: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#fdd835",
    textAlign: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

