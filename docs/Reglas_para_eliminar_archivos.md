# Reglas para Eliminar Archivos No Utilizados

Este documento define las reglas estrictas que deben cumplirse para eliminar archivos del proyecto que **no se estén utilizando en la funcionalidad del código**. El objetivo es liberar espacio, mejorar la organización y reducir la confusión en el mantenimiento del código.

---

## 1. Verificación de Uso en el Código

- **Búsqueda de Referencias**:  
  Verificar que el archivo no esté importado ni referenciado en ningún otro archivo del proyecto.  
  **Herramientas recomendadas**:  
  - Búsqueda global en el proyecto (`Ctrl + Shift + F` o similar).  
  - Herramientas de análisis de dependencias (e.g., `eslint`, `ts-prune`, etc.).

- **Importaciones Dinámicas**:  
  Revisar que el archivo no se esté cargando mediante importaciones dinámicas (por ejemplo, `require()` o `import()`).

---

## 2. Exclusión de Archivos Críticos de Configuración

- No se deben eliminar archivos fundamentales de la configuración del proyecto, tales como:
  - `.env`
  - `vite.config.js`
  - `webpack.config.js`
  - `tsconfig.json`
  - `babel.config.js`
  - Otros archivos que configuren el entorno o la compilación.

---

## 3. Confirmación con el Equipo

- **Comunicación**:  
  Antes de proceder a la eliminación, confirmar con el equipo de desarrollo en caso de tener dudas sobre el uso del archivo. Es posible que el archivo esté en uso en ramas o funcionalidades en desarrollo.

---

## 4. Revisión de Pruebas Automatizadas

- **Cobertura de Tests**:  
  Asegurarse de que el archivo no se encuentre referenciado en pruebas unitarias o de integración (e.g., Jest, Cypress, etc.).

---

## 5. Verificación de Assets

- **Medios y Estilos**:  
  Verificar que imágenes, íconos, fuentes, y otros archivos multimedia no estén utilizados en:
  - HTML, CSS, SCSS o componentes del frontend.
  - Herramientas recomendadas para detectar archivos no usados en builds (e.g., `unused-files-webpack-plugin`).

---

## 6. Archivos de Documentación

- **Importancia de la Documentación**:  
  No eliminar archivos de documentación (como `README.md`, `CONTRIBUTING.md`, etc.) sin confirmar que no estén referenciados en la wiki, sitio web u otros recursos públicos.

---

## 7. Respaldo y Control de Versiones

- **Copia de Seguridad**:  
  Realizar una copia de seguridad temporal o ejecutar la eliminación en un commit separado para poder revertir los cambios si fuese necesario.
  
- **Revisión del Historial**:  
  Consultar el historial de Git para determinar si el archivo se ha modificado recientemente o si está relacionado con funcionalidades activas.

---

## 8. Automatización y Verificación Continua

- **Integración Continua (CI)**:  
  Se recomienda integrar estas verificaciones en un flujo de CI para asegurar un mantenimiento constante del proyecto.
  
- **Validación**:  
  Verificar los cambios en un entorno de prueba antes de hacer merge a la rama principal.

---

## 9. Consideraciones Finales

- **Impacto**:  
  La eliminación de archivos no utilizados debe realizarse de manera responsable, asegurando que no afecte la funcionalidad del código.
  
- **Ejecución**:  
  CursorIA (o la herramienta de limpieza) debe implementar estas reglas de manera automatizada, eliminando únicamente aquellos archivos que cumplan todos los criterios anteriores.

---

> **Importante**: Asegúrate de revisar cada regla y, en caso de duda, consultar con el equipo antes de proceder a la eliminación de archivos.
