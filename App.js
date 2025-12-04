import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';

// --- IMPORTS DE FIREBASE ---
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; 

// --- IMPORTS DE CÁMARA ---
import { Camera } from 'expo-camera';

export default function App() {
  // --- ESTADOS ---
  const [misDatos, setMisDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardandoFoto, setGuardandoFoto] = useState(false); // Nuevo estado para saber si está subiendo
  
  const [modoCamara, setModoCamara] = useState(false);
  const [permiso, setPermiso] = useState(null);
  const cameraRef = useRef(null);

  // --- 1. INICIO: PEDIR PERMISOS Y CARGAR DATOS ---
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermiso(status === 'granted');
      await actualizarLista();
    })();
  }, []);

  // --- 2. LEER DE FIREBASE ---
  const actualizarLista = async () => {
    setCargando(true);
    try {
      const querySnapshot = await getDocs(collection(db, "elementos"));
      const listaTemporal = [];
      querySnapshot.forEach((doc) => {
        listaTemporal.push({ id: doc.id, ...doc.data() });
      });
      setMisDatos(listaTemporal.reverse()); // Lo más nuevo arriba
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  // --- 3. EL "SUPER BOTÓN": TOMA, GUARDA Y CIERRA ---
  const tomarFotoYGuardar = async () => {
    if (cameraRef.current) {
      try {
        setGuardandoFoto(true); // Ponemos un circulito de carga
        
        // A) ¡CHIS! Tomamos la foto
        const foto = await cameraRef.current.takePictureAsync({ quality: 0.5 });
        
        // B) La mandamos directo a Firebase
        await addDoc(collection(db, "elementos"), {
          titulo: "Foto del Examen",
          descripcion: "Guardada automáticamente",
          precio: 0,
          imagen: foto.uri // <--- La magia
        });

        // C) Todo listo: Cerramos cámara y actualizamos
        setModoCamara(false); 
        await actualizarLista();
        
        Alert.alert("¡Listo!", "Foto guardada en la nube");

      } catch (e) {
        Alert.alert("Error", "Falló al guardar la foto");
      } finally {
        setGuardandoFoto(false);
      }
    }
  };

  // --- VISTA: CÁMARA (PANTALLA COMPLETA) ---
  if (modoCamara) {
    if (permiso === null) return <View />;
    if (permiso === false) return <Text>No hay acceso a la cámara</Text>;

    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={cameraRef}>
          
          {/* Si está guardando, mostramos un aviso en medio */}
          {guardandoFoto && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={{color:'white', marginTop:10}}>Subiendo a Firebase...</Text>
            </View>
          )}

          {/* CONTROLES ABAJO */}
          <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 40 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              
              {/* BOTÓN CANCELAR (Izquierda) */}
              <TouchableOpacity onPress={() => setModoCamara(false)}>
                <Text style={{color: 'white', fontSize: 18}}>Cancelar</Text>
              </TouchableOpacity>

              {/* BOTÓN DISPARADOR (Centro) - ¡ESTE ES EL QUE GUARDA! */}
              <TouchableOpacity 
                onPress={tomarFotoYGuardar}
                disabled={guardandoFoto} // Se bloquea mientras guarda para no darle 2 veces
                style={{
                  width: 80, height: 80, borderRadius: 40, backgroundColor: 'white',
                  justifyContent: 'center', alignItems: 'center', borderWidth: 5, borderColor: '#ccc'
                }}>
                {/* Círculo rojo adentro */}
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'red' }} />
              </TouchableOpacity>
              
              {/* Espacio vacío a la derecha para equilibrar */}
              <View style={{width: 50}} /> 

            </View>
          </View>
        </Camera>
      </View>
    );
  }

  // --- VISTA: GALERÍA (PANTALLA PRINCIPAL) ---
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Proyecto Final</Text>

      {/* BOTÓN PARA ABRIR CÁMARA */}
      <TouchableOpacity style={styles.botonCamara} onPress={() => setModoCamara(true)}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>📷 ABRIR CÁMARA</Text>
      </TouchableOpacity>

      {/* LISTA DE FOTOS */}
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={misDatos}
          keyExtractor={(item) => item.id}
          numColumns={2} 
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image 
                source={{ uri: item.imagen }} 
                style={styles.image} 
              />
              <Text style={styles.title}>{item.titulo}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{textAlign:'center'}}>No hay fotos. ¡Toma una!</Text>}
        />
      )}
    </View>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 30, backgroundColor: '#fff' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  botonCamara: {
    backgroundColor: '#2e7d32', // Verde
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5
  },
  card: { 
    flex: 1, margin: 5, backgroundColor: '#f5f5f5', 
    borderRadius: 10, alignItems: 'center', padding: 5, elevation: 2
  },
  image: { width: '100%', height: 120, borderRadius: 8, resizeMode: 'cover' },
  title: { fontSize: 12, marginTop: 5, fontWeight: 'bold' },
  loadingOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', zIndex: 10
  }
});