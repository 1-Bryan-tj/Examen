import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const IMAGES = [
  { id: "1", source: require("../assets/galeria imagen 1.jpg") },
  { id: "2", source: require("../assets/galeria imagen 2.jpg") },
  { id: "3", source: require("../assets/galeria imagen 3.jpg") },
  { id: "4", source: require("../assets/galeria imagen 4.jpg") },
];

export default function ProductsScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galería</Text>

      <FlatList
        data={IMAGES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.source} style={styles.image} />
          </View>
        )}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Camera")}>
        <Text style={styles.buttonText}>Abrir Cámara</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFDF7", padding: 14 },
  title: { fontSize: 24, fontWeight: "800", color: "#8A4B00", marginBottom: 12, alignSelf: "center" },
  card: { flex: 1, padding: 8 },
  image: { width: "100%", height: 140, borderRadius: 12, backgroundColor: "#eee" },
  primaryButton: { marginTop: 12, backgroundColor: "#FF8C42", padding: 14, borderRadius: 12, alignItems: "center" },
  secondaryButton: { marginTop: 8, backgroundColor: "#6C7A89", padding: 12, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700" },
});
