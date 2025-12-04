// NOMBRE DEL ARCHIVO: firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // <--- OBLIGATORIO

const firebaseConfig = {
  apiKey: "TU_API_KEY_REAL", // <--- Pega tus claves aquí
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);

// EXPORTACIONES (Lo que buscan los otros archivos)
export const db = getFirestore(app);
export const auth = getAuth(app);