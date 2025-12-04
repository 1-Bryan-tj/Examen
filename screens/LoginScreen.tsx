import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
  
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Ingresa usuario y contraseña');
      return;
    }

    setLoading(true);
    
   
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Home'); 
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Examen Final</Text>
      <Text style={styles.subtitle}></Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario (ej. Juan)"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1E9E6E" />
      ) : (
        <View style={{gap: 10}}>
          <Button title="Entrar" onPress={handleLogin} color="#1E9E6E" />
          <Button title="Registrar" onPress={handleLogin} color="#666" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: '#1E9E6E' },
  subtitle: { textAlign: 'center', marginBottom: 30, color: '#666' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 12, borderRadius: 8 }
});