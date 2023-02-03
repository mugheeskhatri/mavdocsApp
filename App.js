import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthProvider from "./src/contextAPI";
import { Login } from "./src/screens/authScreens";

export default function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
