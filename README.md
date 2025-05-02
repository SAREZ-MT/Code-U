# CodeU - Editor de Código Colaborativo en Tiempo Real

![Logo de CodeU](./src/assets/code-u-logo.svg)

## Descripción

CodeU es una plataforma de desarrollo web colaborativo con renderizado en tiempo real que permite a los usuarios practicar las principales tecnologias del desarrollo web de manera rápida e intuitiva. La plataforma ofrece un editor de código con vista previa instantánea, facilitando el desarrollo web sin necesidad de configuraciones complejas.

## Características Principales

- **Editor de Código**: Editor basado en Monaco Editor con autocompletado, resaltado de sintaxis y más.
- **Vista Previa Instantánea**: Visualización en tiempo real de los cambios realizados en HTML, CSS y JavaScript.
- **Diferentes Layouts**: Múltiples disposiciones para el editor y la vista previa, adaptables a diferentes preferencias.
- **Gestión de Proyectos**: Guarda y carga proyectos de forma sencilla.
- **Personalización**: Ajusta el tamaño de fuente, y otras opciones del editor según tus preferencias.

## Tecnologías Utilizadas

- **Frontend**: Vue.js 3 con Composition API
- **Editor de Código**: Monaco Editor
- **Estado**: Estado global personalizado 
- **Compilación**: Vite.js
- **Backend**: Firebase (Autenticación y Almacenamiento)
- **Estilos**: CSS personalizado con variables CSS

## Estructura del Proyecto

```
code-u/
├── src/                  # Código fuente principal
│   ├── assets/           # Recursos estáticos (imágenes, logos)
│   ├── components/       # Componentes Vue y del editor
│   ├── css/              # Estilos CSS globales
│   ├── pages/            # Componentes de página (auth, dashboard, landing)
│   ├── constants/        # Constantes y configuraciones
│   ├── firebase/         # Servicios de Firebase
│   ├── language/         # Traducciones y configuración de idiomas
│   ├── monaco-prettier/  # Integración de Prettier con Monaco
│   ├── router/           # Configuración de rutas
│   ├── utils/            # Utilidades y helpers
│   ├── editor.js         # Configuración del editor de código
│   ├── main.js           # Punto de entrada principal
│   └── state.js          # Gestión de estado global
├── public/               # Archivos estáticos públicos
├── dist/                 # Archivos compilados para producción
├── assets/               # Recursos adicionales (iconos, fuentes)
├── index.html            # HTML principal
└── vite.config.js        # Configuración de Vite
```

## Instalación y Ejecución

### Requisitos Previos

- Node.js (v14.x o superior)
- npm o yarn

### Pasos para Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/xxxxxxxxxx/code-u.git
   cd code-u
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno:
   - Copia `.env.example` a `.env`
   - Configura tus credenciales de Firebase y otras variables necesarias

4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

5. Abre el navegador en `http://localhost:3000`

## Compilación para Producción

```
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

## Funcionalidades

### Editor de Código

El editor de código está basado en Monaco Editor (el mismo que utiliza VS Code) y ofrece:

- Autocompletado inteligente
- Resaltado de sintaxis
- Emmet para HTML y CSS
- Atajos de teclado personalizables
- Formateo de código con Prettier

### Layouts

CodeU proporciona múltiples layouts para adaptarse a diferentes flujos de trabajo:

- Vertical (editor y vista previa lado a lado)
- Horizontal (editor arriba, vista previa abajo)
- Grid (múltiples paneles organizados en cuadrícula)

### Gestión de Proyectos

- Guarda proyectos en la nube
- Comparte proyectos mediante URLs
- Exporta proyectos como archivos HTML

## Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Empuja a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo [LICENSE](./LICENSE).

## Contacto

Nombre del Equipo - [correo@ejemplo.com](mailto:correo@ejemplo.com)

Enlace del Proyecto: [https://github.com/tu-usuario/code-u](https://github.com/tu-usuario/code-u) 