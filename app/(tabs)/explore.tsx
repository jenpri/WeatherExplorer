import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>🔍 Search Weather by City</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Tokyo, Madrid, Lima"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#999"
        />

        <View style={styles.button}>
          <Button title="Search" onPress={getWeather} disabled={!city} color="#0288d1" />
        </View>

        {loading && <ActivityIndicator size="large" color="#0288d1" style={{ marginTop: 20 }} />}
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

        {weather && (
          <View style={styles.card}>
            <Text style={styles.resultText}>📍 {weather.city}</Text>
            <Text style={styles.resultText}>🌡️ Temp: {weather.temperature}°C</Text>
            <Text style={styles.resultText}>💨 Wind: {weather.windspeed} km/h</Text>
            <Text style={styles.resultText}>🕒 Time: {weather.time}</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0288d1",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#90caf9",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
    color: "#333",
  },
  button: {
    width: "100%",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  resultText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

