import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen() {
  const navigation = useNavigation<any>();
  const [cameraType, setCameraType] = useState<"back" | "front">("back");
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  let ImagePicker: any = null;
  try {
    ImagePicker = require("expo-image-picker");
  } catch (e) {
    ImagePicker = null;
  }

  const requestPermission = async () => {
    if (!ImagePicker) return false;
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === "granted";
    } catch (e) {
      console.warn("Error pidiendo permiso:", e);
      return false;
    }
  };

  const openCamera = async () => {
    if (!ImagePicker) {
      Alert.alert("Nota", "expo-image-picker no está instalado — usando imagen de ejemplo.");
      setPhotoUri("https://placekitten.com/800/600");
      return;
    }

    const ok = await requestPermission();
    if (!ok) {
      Alert.alert("Permiso denegado", "No se pueden tomar fotos sin permiso de cámara.");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: false,
        cameraType: cameraType,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setPhotoUri(uri);
      }
    } catch (e) {
      console.warn("Error al abrir cámara:", e);
      Alert.alert("Error", "No se pudo abrir la cámara.");
    }
  };

  const toggleCamera = () => setCameraType((p) => (p === "back" ? "front" : "back"));

  return (
    <View style={styles.root}>
      <View style={styles.body}>
        <Text style={styles.title}>Cámara</Text>

        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.preview} />
        ) : (
          <Text style={styles.placeholder}>No hay foto todavía</Text>
        )}

        <TouchableOpacity style={styles.smallButton} onPress={toggleCamera}>
          <Text style={styles.smallButtonText}>{cameraType === "back" ? "Usar Trasera" : "Usar Frontal"}</Text>
        </TouchableOpacity>
        <View style={{ height: 8 }} />
        <TouchableOpacity style={styles.primaryButton} onPress={openCamera}>
          <Text style={styles.buttonText}>Abrir Cámara</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Products") }>
          <Text style={styles.buttonText}>Abrir Galería</Text>
        </TouchableOpacity>
        <View style={{ height: 8 }} />
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Home") }>
          <Text style={styles.buttonText}>Volver al Inicio</Text>
        </TouchableOpacity>
        {photoUri && (
          <>
            <View style={{ height: 8 }} />
            <TouchableOpacity style={styles.ghostButton} onPress={() => setPhotoUri(null)}>
              <Text style={{ color: "#0B6E4F" }}>Tomar otra</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  body: { flex: 1, justifyContent: "center", alignItems: "center", padding: 18 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12, color: "#0B6E4F" },
  preview: { width: "90%", height: 320, marginBottom: 12, borderRadius: 12, backgroundColor: "#f3f3f3" },
  placeholder: { color: "#8E8E93", marginBottom: 12 },
  smallButton: { backgroundColor: "#FFD27F", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  smallButtonText: { color: "#6C3A00", fontWeight: "700" },
  primaryButton: { marginTop: 8, backgroundColor: "#1E9E6E", padding: 12, borderRadius: 12, alignItems: "center" },
  secondaryButton: { marginTop: 8, backgroundColor: "#6C7A89", padding: 12, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700" },
  ghostButton: { padding: 10, borderRadius: 10, backgroundColor: "#E6F4EA", alignItems: "center" },
  footer: { padding: 12, backgroundColor: "#FBFBFB" },
});

