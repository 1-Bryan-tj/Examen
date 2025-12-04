import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera"; 

const API_URL = "http://192.168.100.9:3000/elementos"; // <--- PON TU IP AQUÍ

export default function CameraScreen() {
  const navigation = useNavigation<any>();
  const [permission, requestPermission] = useCameraPermissions();
  const [guardando, setGuardando] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{color:'white', textAlign:'center', marginBottom:20}}>Falta permiso</Text>
        <Button title="Dar Permiso" onPress={requestPermission} />
      </View>
    );
  }

  const tomarFoto = async () => {
    if (cameraRef.current && !guardando) {
      try {
        setGuardando(true);
        
        // 1. TOMAR FOTO (Configuración estándar segura)
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: false,
          skipProcessing: false // Lo dejamos en false para asegurar compatibilidad
        });

        if (!photo?.uri) throw new Error("Error de cámara");

        // 2. ENVIAR A TU SERVIDOR JSON
        const nuevoElemento = {
          titulo: `Foto ${new Date().toLocaleTimeString()}`,
          descripcion: "Enviado desde el celular",
          imagen: photo.uri, 
          precio: 0,
          fecha: new Date().toISOString()
        };

        const respuesta = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoElemento)
        });

        if (!respuesta.ok) throw new Error("Error conectando al servidor");

        // 3. ÉXITO
        Alert.alert("¡Guardado!", "Se subió a db.json");
        navigation.navigate("Products");

      } catch (e: any) {
        console.error(e);
        Alert.alert("Error", "Revisa tu IP y que json-server esté corriendo.");
      } finally {
        setGuardando(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" mode="picture" ref={cameraRef}>
        {guardando && (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{color:'white'}}>Guardando...</Text>
            </View>
        )}
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.btnTxt}>Cancelar</Text></TouchableOpacity>
          <TouchableOpacity onPress={tomarFoto} style={styles.captureBtn} disabled={guardando} />
          <View style={{width:60}}/>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  camera: { flex: 1 },
  loader: { ...StyleSheet.absoluteFillObject, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center', zIndex:10 },
  controls: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 40 },
  btnTxt: { color: 'white', fontSize: 18, marginBottom: 20 },
  captureBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', borderWidth: 5, borderColor: '#ccc' }
});