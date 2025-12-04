import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// ESTA LÍNEA ES LA QUE TE FALTABA O DABA ERROR:
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "TU_API_KEY_REAL_AQUI", // <--- OJO: Pega tus claves de Firebase aquí
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);

// EXPORTAMOS TODO (Si falta auth, el login falla)
export const db = getFirestore(app);
export const auth = getAuth(app);