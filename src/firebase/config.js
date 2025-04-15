// Importar las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBdO7bod5H6K_Ql9TyZOVDxLvdLtxpdJIM",
  authDomain: "code-u-814ef.firebaseapp.com",
  projectId: "code-u-814ef",
  storageBucket: "code-u-814ef.firebasestorage.app",
  messagingSenderId: "929869917674",
  appId: "1:929869917674:web:031e7d204abe7d5eb81693"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancias de los servicios
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 