import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// IMPORTAMOS TUS PANTALLAS
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import CameraScreen from "./screens/CameraScreen";
import LoginScreen from "./screens/LoginScreen"; // <--- Asegúrate de tener este archivo

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FCFEFC",
    primary: "#1E9E6E",
    card: "#FFFFFF",
    text: "#0B6E4F",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={AppTheme}>
        {/* LA APP INICIA EN 'Login' */}
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}