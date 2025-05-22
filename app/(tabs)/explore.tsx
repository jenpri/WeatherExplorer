import React, { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ExploreScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchWeather = async () => {
    Keyboard.dismiss();
    setErrorMsg("");
    setWeather(null);

    if (city.toLowerCase() === "dublin") {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=53.3498&longitude=-6.2603&current_weather=true&timezone=auto`
        );
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (error) {
        setErrorMsg("Failed to fetch weather data.");
      }
    } else {
      setErrorMsg("Only 'Dublin' is currently supported in this version.");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Explore the Weather</Text>

        <TextInput
          placeholder="Enter a city (e.g. Dublin)"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity onPress={fetchWeather} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : weather ? (
          <View style={styles.result}>
            <Text style={styles.weatherText}>Temperature: {weather.temperature}°C</Text>
            <Text style={styles.weatherText}>Wind Speed: {weather.windspeed} km/h</Text>
            <Text style={styles.weatherText}>Weather Code: {weather.weathercode}</Text>
          </View>
        ) : null}
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
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ffffffcc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0288d1",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  result: {
    backgroundColor: "#ffffff33",
    padding: 15,
    borderRadius: 10,
  },
  weatherText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  error: {
    color: "#ffdddd",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});


