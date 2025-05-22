import { useState } from "react";
import { ActivityIndicator, Button, Keyboard, StyleSheet, Text, TextInput, View } from "react-native";

export default function ExploreScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getWeather = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setWeather(null);
    setErrorMsg(null);

    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setErrorMsg("City not found.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: `${name}, ${country}`,
        ...weatherData.current_weather,
      });
    } catch (err) {
      setErrorMsg("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Weather by City 🔍</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name (e.g. Tokyo)"
        value={city}
        onChangeText={setCity}
      />

      <Button title="Search" onPress={getWeather} disabled={!city} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.resultText}>📍 {weather.city}</Text>
          <Text style={styles.resultText}>🌡️ Temp: {weather.temperature}°C</Text>
          <Text style={styles.resultText}>💨 Wind: {weather.windspeed} km/h</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: {
    width: "90%",
    height: 40,
    borderColor: "#999",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  error: { color: "red", marginTop: 10 },
  result: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
  },
  resultText: { fontSize: 16, marginBottom: 5 },
});
