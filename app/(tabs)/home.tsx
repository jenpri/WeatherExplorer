import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to WeatherExplorer 🌤️</Text>
      <Text>Current weather based on your location will appear here.</Text>
    </View>
  );
}
