# Documentación del Proyecto CodeU

## Descripción General

CodeU es una plataforma de desarrollo web en tiempo real que permite a los usuarios practicar los conocimientos de los fundamentos web, creando ejercicios funcionales de manera rápida e intuitiva. La plataforma ofrece un editor de código con vista previa instantánea, facilitando el desarrollo web sin necesidad de configuraciones complejas.

## Requisitos Funcionales

1. **Editor de Código Colaborativo**
   - Implementar un editor de código que soporte HTML, CSS y JavaScript
   - Proporcionar resaltado de sintaxis y autocompletado
   - Permitir la edición en tiempo real con actualizaciones instantáneas

2. **Vista Previa en Tiempo Real**
   - Mostrar el resultado del código escrito de forma inmediata
   - Actualizar la vista previa automáticamente cuando el código cambie
   - Proporcionar retroalimentación visual para errores de sintaxis o ejecución

3. **Sistema de Layouts**
   - Implementar al menos tres disposiciones diferentes (vertical, horizontal, grid)
   - Permitir al usuario cambiar entre layouts según sus preferencias
   - Guardar la preferencia de layout seleccionada por el usuario

4. **Gestión de Proyectos**
   - Crear, editar y eliminar proyectos
   - Guardar automáticamente el progreso
   - Organizar proyectos por categorías o etiquetas

5. **Sistema de Autenticación**
   - Registro e inicio de sesión de usuarios
   - Recuperación de contraseña
   - Perfiles de usuario básicos

6. **Compartir Proyectos**
   - Generar enlaces para compartir proyectos
   - Configurar permisos de acceso (solo lectura, edición)

7. **Personalización del Editor**
   - Cambiar tema (claro/oscuro)
   - Ajustar tamaño de fuente
   - Configurar tabulación y otras preferencias del editor


## Requisitos No Funcionales

1. **Rendimiento**
   - Tiempo de respuesta máximo de 500ms para actualizaciones de la vista previa
   - Carga inicial de la aplicación en menos de 3 segundos
   - Funcionamiento fluido incluso con proyectos complejos

2. **Usabilidad**
   - Interfaz intuitiva que no requiera tutoriales extensos
   - Disposición clara de los controles y funcionalidades
   - Retroalimentación visual para todas las acciones del usuario

3. **Compatibilidad**
   - Funcionamiento en los navegadores principales (Chrome, Firefox, Safari, Edge)
   - Diseño responsive para adaptarse a diferentes tamaños de pantalla
   - Compatibilidad con sistemas operativos modernos

4. **Seguridad**
   - Protección de datos de usuario
   - Sanitización de código ingresado para prevenir inyecciones
   - Implementación de HTTPS para todas las comunicaciones

5. **Escalabilidad**
   - Arquitectura que permita escalar a miles de usuarios concurrentes
   - Optimización de recursos para minimizar costos de infraestructura
   - Capacidad para añadir nuevas funcionalidades sin afectar el rendimiento

6. **Accesibilidad**
   - Cumplimiento básico de WCAG 2.1 nivel AA
   - Soporte para navegación por teclado
   - Contraste adecuado y textos legibles

7. **Mantenibilidad**
   - Código modular y bien documentado
   - Pruebas automatizadas para funcionalidades críticas
   - Estructura de proyecto organizada y estándar

## Criterios de Aceptación

### Editor de Código
- **DADO** que un usuario accede al editor  
  **CUANDO** escribe código HTML, CSS o JavaScript válido  
  **ENTONCES** debe verse el resaltado de sintaxis correspondiente

- **DADO** que un usuario está editando código  
  **CUANDO** comete un error de sintaxis  
  **ENTONCES** debe recibir una indicación visual del error

### Vista Previa
- **DADO** que un usuario edita el código  
  **CUANDO** deja de escribir por 300ms  
  **ENTONCES** la vista previa debe actualizarse automáticamente

- **DADO** que el código contiene un error de JavaScript  
  **CUANDO** se ejecuta la vista previa  
  **ENTONCES** debe mostrarse el error en la consola de la vista previa

### Sistema de Usuarios
- **DADO** que un visitante no registrado usa la aplicación  
  **CUANDO** crea un proyecto  
  **ENTONCES** debe poder guardarlo localmente y recibir una invitación para registrarse

- **DADO** que un usuario está autenticado  
  **CUANDO** guarda un proyecto  
  **ENTONCES** debe sincronizarse con su cuenta y estar disponible en diferentes dispositivos


### Personalización
- **DADO** que un usuario cambia las preferencias del editor  
  **CUANDO** cierra sesión y vuelve a iniciarla  
  **ENTONCES** sus preferencias deben mantenerse

- **DADO** que un usuario cambia el tema del editor  
  **CUANDO** la página se actualiza  
  **ENTONCES** el tema seleccionado debe persistir

### Rendimiento
- **DADO** que un usuario está trabajando en un proyecto  
  **CUANDO** edita el código  
  **ENTONCES** la interfaz debe responder en menos de 100ms

- **DADO** que un usuario carga un proyecto grande  
  **CUANDO** la carga se completa  
  **ENTONCES** el editor debe mantener su fluidez sin congelarse

## Arquitectura del Sistema

### Tipo de Servicio
La arquitectura implementada es una **aplicación monolítica frontend-centrica** con posibilidad de escalabilidad hacia microservicios en el futuro. La lógica principal se ejecuta en el cliente, con un backend liviano para gestión de usuarios y almacenamiento de proyectos.

### Patrón de Diseño
- **Frontend**: Arquitectura basada en componentes utilizando Vue.js (Composition API)
- **Gestión de Estado**: Patrón Flux para manejo de estado global
- **Diseño de UI**: Enfoque de "Atomic Design" con componentes modulares
- **Comunicación**: Patrón Observer para sincronización en tiempo real

## Tecnologías Utilizadas

### Frontend
- **Framework**: Vue.js 3.x con Composition API
- **Router**: Vue Router
- **Estado**: Estado global personalizado (no Vuex/Pinia)
- **Compilación**: Vite.js
- **Editor de Código**: Editor personalizado basado en Monaco Editor
- **Estilos**: CSS personalizado con variables CSS (sin frameworks)

### Backend (Ligero)
- **Autenticación**: Firebase Authentication o similar
- **Almacenamiento**: Firestore/Realtime Database o similar
- **Despliegue**: Vercel/Netlify para frontend, Firebase Functions para backend

## Estructura del Proyecto

```
code-u/
├── public/               # Archivos estáticos
├── src/                  # Código fuente principal
│   ├── assets/           # Recursos estáticos (imágenes, fuentes)
│   │   └── codi-editor/  # Componentes relacionados con el editor
│   ├── components/       # Componentes Vue reutilizables
│   │   └── codi-editor/  # Componentes relacionados con el editor
│   ├── css/              # Estilos CSS globales
│   ├── pages/            # Componentes de página
│   │   ├── auth/         # Páginas de autenticación
│   │   ├── dashboard/    # Dashboard y gestión de proyectos
│   │   └── landing/      # Página de aterrizaje
│   ├── utils/            # Utilidades y helpers
│   ├── editor.js         # Lógica principal del editor
│   ├── App.vue           # Componente raíz
│   ├── main.js           # Punto de entrada de la aplicación
│   ├── vue-main.js       # Configuración de Vue
│   └── state.js          # Gestión de estado global
├── dist/                 # Archivos compilados para producción
├── index.html            # HTML principal
└── vite.config.js        # Configuración de Vite
```

## Style Islands (Islas de Estilo)

### 1. Landing Page (Marketing)
- **Estilo**: Moderno con gradientes vibrantes
- **Paleta**: Tonos azules, morados y acentos amarillos
- **Características**: 
  - Fondos con degradados sutiles
  - Animaciones suaves en elementos decorativos
  - Estilo "glassmorphism" para tarjetas y botones
  - Transiciones fluidas entre secciones

### 2. Sistema de Autenticación
- **Estilo**: Minimalista con fondo en degradado negro mate
- **Paleta**: Negro, gris oscuro con acentos azules/morados
- **Características**:
  - Formularios con animaciones sutiles
  - Botones con degradados y efectos hover
  - Feedback visual para interacciones

### 3. Dashboard y Gestión de Proyectos
- **Estilo**: Interfaz funcional con énfasis en usabilidad
- **Paleta**: Tonos oscuros para reducir fatiga visual
- **Características**:
  - Tarjetas de proyecto con previsualización
  - Sistema de navegación claro
  - Iconografía consistente

### 4. Editor de Código
- **Estilo**: Profesional inspirado en editores de código modernos
- **Paleta**: Fondo oscuro con sintaxis resaltada en colores contrastantes
- **Características**:
  - Layout ajustable con paneles redimensionables
  - Temas cambiables (claro/oscuro)
  - Controles de layout para diferentes vistas de previsualización

## Dependencias Principales

```json
{
  "dependencies": {
    "vue": "^3.3.x",
    "vue-router": "^4.2.x",
    "monaco-editor": "^0.43.x",
    "firebase": "^10.x.x",
    "lit": "^3.0.x"
  },
  "devDependencies": {
    "vite": "^4.5.x",
    "eslint": "^8.49.x",
    "prettier": "^3.0.x"
  }
}
```

## Guía de Implementación Paso a Paso con CursorIA

### Fase 1: Configuración del Proyecto

1. **Crear proyecto base con Vite y Vue**
   ```
   npm create vite@latest code-u -- --template vue
   cd code-u
   npm install
   ```

2. **Instalar dependencias principales**
   ```
   npm install vue-router monaco-editor firebase lit
   ```

3. **Configurar estructura básica de carpetas**
   ```
   mkdir -p src/{components,pages/{auth,dashboard,landing},utils,css,assets}
   ```

4. **Configurar Vite**
   - Modificar `vite.config.js` para manejar las resoluciones de módulos y optimizaciones

### Fase 2: Componentes Esenciales

1. **Crear sistema de estado global**
   - Implementar `state.js` con gestión de estado reactivo

2. **Configurar rutas**
   - Implementar sistema de rutas con autenticación protegida
   - Crear páginas principales (Landing, Login, Dashboard, Editor)

3. **Implementar sistema de autenticación**
   - Crear componentes de login/registro
   - Integrar con servicio de autenticación

### Fase 3: Desarrollo del Editor

1. **Integrar Monaco Editor**
   - Crear componente wrapper para Monaco
   - Configurar opciones básicas del editor

2. **Implementar funcionalidad de guardado**
   - Crear sistema para guardar proyectos
   - Implementar autosave y control de versiones

3. **Desarrollar sistema de vista previa**
   - Crear iframe seguro para renderizar código
   - Implementar sistema de actualización en tiempo real

### Fase 4: Funcionalidades Avanzadas

1. **Sistema de compartir proyectos**
   - Implementar generación de enlaces de compartir
   - Configurar diferentes niveles de permisos

2. **Temas y personalización**
   - Añadir selección de temas para el editor
   - Implementar opciones de personalización

3. **Vista previa responsiva**
   - Añadir diferentes layouts (escritorio, tablet, móvil)
   - Permitir cambios de tamaño y orientación

### Fase 5: Landing Page y Marketing

1. **Diseñar landing page atractiva**
   - Implementar secciones clave (características, pricing, testimonios)
   - Añadir call-to-action efectivos

2. **Mejorar UI/UX**
   - Aplicar efectos visuales coherentes
   - Optimizar para diferentes dispositivos


## Estado Actual y Limitaciones

### Implementado
- Sistema de autenticación básico
- Editor de código funcional con opciones de configuración
- Landing page con diseño moderno y responsive
- Dashboard para gestión de proyectos

### Pendiente
- Sistema para compartir proyectos mediante enlaces
- Exportación de proyectos en diferentes formatos
- Sistema de plantillas predefinidas

## Conclusiones

CodeU es una plataforma ambiciosa para desarrollo web que simplifica la creación de aplicaciones mediante un editor intuitivo y colaborativo. La estructura del proyecto sigue patrones modernos de desarrollo frontend, con énfasis en la experiencia de usuario y el rendimiento.

El desarrollo con CursorIA facilita la implementación rápida de componentes y funcionalidades, pero requiere un enfoque estructurado y una definición clara de requisitos para maximizar la calidad del código generado.

---

*Documentación generada con CursorIA basada en el análisis del proyecto CodeU* 