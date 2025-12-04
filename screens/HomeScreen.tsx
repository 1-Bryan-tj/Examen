import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Camera")}>
        <Text style={styles.buttonText}>Abrir Cámara</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.altButton]} onPress={() => navigation.navigate("Products")}>
        <Text style={styles.buttonText}>Abrir Galería</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5FFFA", alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 30, fontWeight: "800", color: "#0B6E4F", marginBottom: 28 },
  button: { width: "80%", padding: 14, backgroundColor: "#1E9E6E", borderRadius: 12, alignItems: "center", marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 6 },
  altButton: { backgroundColor: "#6EC1A3" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
});
