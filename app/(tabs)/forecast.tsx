import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

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
      <Text>🌡️ Max: {item.max}°C</Text>
      <Text>❄️ Min: {item.min}°C</Text>
      <Text>🌤️ Code: {item.code}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast 📅</Text>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      {loading ? (
        <ActivityIndicator size="large" />
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
  container: { flex: 1, paddingTop: 40, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    width: 300,
    alignItems: "center",
  },
  date: { fontWeight: "bold", marginBottom: 5 },
  error: { color: "red", marginTop: 10 },
});
