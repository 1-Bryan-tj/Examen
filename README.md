# Examen - App móvil

Instrucciones rápidas para ejecutar la aplicación (Windows PowerShell):

1. Instala dependencias (usa Node.js 18+ recomendado):

```powershell
cd "c:\Users\Shark_tj12\Downloads\trabajos poo\Examen"
npm install
```

2. Iniciar la app con Expo:

```powershell
npm start
# o
npx expo start
```

3. Abrir en dispositivo/emulador:
- Escanea el QR con Expo Go desde tu móvil (iOS/Android) o
- Presiona `a` para abrir en Android emulator, `i` para iOS (si está configurado).

Notas:
- La app usa `react-navigation`. Si tienes problemas con permisos de cámara, instala `expo-image-picker` y concede permisos.
- Para construir una versión nativa usa `eas build` o `expo build` según tu flujo.

Si quieres, puedo ejecutar comprobaciones adicionales o ajustar colores/estilos más. ¡Dime qué prefieres!