import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";


const API_URL = "http://192.168.100.9:3000/elementos"; // <--- PON TU IP AQUÍ

export default function ProductsScreen() {
  const navigation = useNavigation<any>();
  const [misDatos, setMisDatos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const cargarDatos = async () => {
        try {
          const respuesta = await fetch(API_URL);
          const datos = await respuesta.json();
          setMisDatos(datos.reverse()); 
        } catch (e) {
          console.error(e);
        } finally {
          setCargando(false);
        }
      };
      cargarDatos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galería API</Text>
      
      {cargando ? (
        <ActivityIndicator size="large" color="#1E9E6E" />
      ) : (
        <FlatList
          data={misDatos}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{paddingBottom: 80}}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imagen }} style={styles.image} />
              <Text style={styles.cardTitle}>{item.titulo}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{textAlign:'center', marginTop:20}}>No hay fotos.</Text>}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("Camera")}>
        <Text style={{fontSize: 30}}>📷</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: 'center', marginBottom: 15, color: '#333' },
  card: { flex: 1, margin: 5, backgroundColor: 'white', borderRadius: 10, padding: 5, elevation: 2 },
  image: { width: "100%", height: 150, borderRadius: 8, backgroundColor: "#eee" },
  cardTitle: { fontSize: 12, textAlign: 'center', marginTop: 5 },
  fab: { position: 'absolute', bottom: 30, right: 30, width: 70, height: 70, borderRadius: 35, backgroundColor: '#1E9E6E', justifyContent: 'center', alignItems: 'center', elevation: 8 }
});