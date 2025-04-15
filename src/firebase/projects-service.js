import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc, 
  query, 
  where, 
  getDocs,
  getDoc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { db } from './config';
import { encode, decode } from 'js-base64';

// Colección de proyectos en Firestore
const projectsCollection = collection(db, 'projects');

// Crear un nuevo proyecto
export const createProject = async (projectData) => {
  try {
    if (!projectData.userId) {
      console.error('Se requiere userId para crear un proyecto');
      throw new Error('Se requiere ID de usuario para crear un proyecto');
    }
    
    console.log('Creando proyecto para usuario:', projectData.userId);
    console.log('Datos completos:', JSON.stringify(projectData));
    
    // Verificar conexión a Firestore
    try {
      // Una pequeña prueba para verificar la conexión
      const testCollection = collection(db, 'test_connection');
      console.log('Conexión a Firestore validada');
    } catch (connectionError) {
      console.error('Error al conectar con Firestore:', connectionError);
      throw new Error('Error de conexión con Firestore: ' + connectionError.message);
    }
    
    // Asegurar que las fechas están presentes
    const projectWithDates = {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Agregar campos vacíos si no existen
    if (!projectWithDates.html) projectWithDates.html = '';
    if (!projectWithDates.css) projectWithDates.css = '';
    if (!projectWithDates.js) projectWithDates.js = '';
    if (!projectWithDates.title) projectWithDates.title = 'Proyecto sin título';
    
    console.log('Guardando proyecto en Firestore...', JSON.stringify(projectWithDates));
    
    // Intentar crear el documento con reintentos
    let docRef = null;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts && !docRef) {
      attempts++;
      try {
        console.log(`Intento ${attempts} de ${maxAttempts}...`);
        docRef = await addDoc(projectsCollection, projectWithDates);
        console.log('Proyecto creado con ID:', docRef.id);
      } catch (addError) {
        console.error(`Error en intento ${attempts}:`, addError);
        if (attempts === maxAttempts) throw addError;
        // Esperar brevemente antes de reintentar
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    if (!docRef) {
      throw new Error('No se pudo crear el proyecto después de varios intentos');
    }
    
    return { id: docRef.id, ...projectWithDates, createdAt: new Date(), updatedAt: new Date() };
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    console.log('Detalles del error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    throw error;
  }
};

// Actualizar un proyecto existente
export const updateProject = async (projectId, projectData) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      ...projectData,
      updatedAt: serverTimestamp()
    });
    return { id: projectId, ...projectData };
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    throw error;
  }
};

// Eliminar un proyecto
export const deleteProject = async (projectId) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await deleteDoc(projectRef);
    return true;
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    throw error;
  }
};

// Obtener todos los proyectos de un usuario
export const getUserProjects = async (userId) => {
  try {
    if (!userId) {
      console.error('Se requiere un ID de usuario para obtener proyectos');
      return [];
    }
    
    console.log('Obteniendo proyectos para el usuario:', userId);
    
    const q = query(
      projectsCollection, 
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const projects = [];
    
    console.log('Proyectos encontrados:', querySnapshot.size);
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Verificar si los datos tienen las fechas
      const createdAt = data.createdAt ? 
        (typeof data.createdAt.toDate === 'function' ? data.createdAt.toDate() : data.createdAt) : 
        new Date();
        
      const updatedAt = data.updatedAt ? 
        (typeof data.updatedAt.toDate === 'function' ? data.updatedAt.toDate() : data.updatedAt) : 
        new Date();
      
      projects.push({
        id: doc.id,
        ...data,
        createdAt,
        updatedAt
      });
    });
    
    return projects;
  } catch (error) {
    console.error('Error al obtener proyectos del usuario:', error);
    // Registrar detalles adicionales para depuración
    console.log('Detalles del error:', JSON.stringify(error));
    return []; // Devolver array vacío en lugar de lanzar excepción
  }
};

// Obtener un proyecto específico
export const getProject = async (projectId) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);
    
    if (projectSnap.exists()) {
      return {
        id: projectSnap.id,
        ...projectSnap.data(),
        createdAt: projectSnap.data().createdAt?.toDate(),
        updatedAt: projectSnap.data().updatedAt?.toDate()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    throw error;
  }
};

// Guardar el código de un proyecto desde la URL
export const saveProjectFromUrl = async (userId, title, url) => {
  // Extraer el código base64 de la URL
  const codeSegment = url.split('/')[1] || '';
  const segments = codeSegment.split('|');
  
  if (segments.length !== 3) {
    throw new Error('Formato de URL inválido');
  }
  
  const [htmlBase64, cssBase64, jsBase64] = segments;
  
  try {
    // Decodificar el contenido
    const html = htmlBase64 ? decode(htmlBase64) : '';
    const css = cssBase64 ? decode(cssBase64) : '';
    const js = jsBase64 ? decode(jsBase64) : '';
    
    // Crear el proyecto en Firebase
    return await createProject({
      title,
      userId,
      html,
      css,
      js,
      codeUrl: url
    });
  } catch (error) {
    console.error('Error al guardar proyecto desde URL:', error);
    throw error;
  }
};

// Generar URL desde el código
export const generateCodeUrl = (html, css, js) => {
  const htmlEncoded = encode(html || '');
  const cssEncoded = encode(css || '');
  const jsEncoded = encode(js || '');
  
  return `/${htmlEncoded}|${cssEncoded}|${jsEncoded}`;
}; 