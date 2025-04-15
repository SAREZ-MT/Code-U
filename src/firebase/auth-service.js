import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './config';

// Crear un usuario nuevo
export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Actualizar el perfil con el nombre de usuario
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Iniciar sesión con un usuario existente
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
    // Eliminar el usuario del localStorage
    localStorage.removeItem('user');
    return true;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Obtener el usuario actual
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Escuchar cambios en el estado de autenticación
export const onAuthChanged = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Guardar usuario en localStorage (para persistencia entre recargas)
export const saveUserToLocalStorage = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }));
  } else {
    localStorage.removeItem('user');
  }
};

// Obtener usuario de localStorage
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}; 