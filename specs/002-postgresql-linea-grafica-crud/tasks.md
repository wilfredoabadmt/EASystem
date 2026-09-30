# LISTA DE TAREAS: CRUD LÍNEA GRÁFICA ORIGINAL Y MATERIALES (POSTGRESQL)
`specs/002-postgresql-linea-grafica-crud/tasks.md`

- [x] **TASK-01**: Crear archivo DDL de PostgreSQL (`scripts/init-postgresql.sql`) con tablas `lineas_graficas`, `materiales_catalogo`, `secretarias`, `funcionarios_personal`, `audit_logs` y datos semilla iniciales.
- [x] **TASK-02**: Crear archivo `docker-compose.yml` para arranque inmediato de PostgreSQL 16 con extensiones uuid y pgcrypto.
- [x] **TASK-03**: Implementar servicio de persistencia y base de datos `src/services/dbService.ts` con soporte para PostgreSQL (API REST) y resiliencia de almacenamiento local con sincronización y semillas del GAMEA.
- [x] **TASK-04**: Desarrollar el componente interactivo de CRUD de Línea Gráfica Original `src/components/LineaGraficaManager.tsx`:
  - Formulario de subida/edición (código, nombre, colores HEX/RGB, imagotipo SVG/PNG, aguayo, eslogan, estado).
  - Grid de líneas registradas con estados (ACTIVA, BORRADOR, ARCHIVADA).
  - Acciones de Crear, Editar, Eliminar y "Activar como Línea Maestra".
- [x] **TASK-05**: Desarrollar el motor interactivo de adaptación a materiales del personal municipal `src/components/MaterialesPersonalAdaptados.tsx`:
  - 1. Credencial de Identificación del Personal con foto y QR.
  - 2. Hoja Membretada A4 con encabezado y marca de agua.
  - 3. Comunicado Oficial de Prensa con verificación QR.
  - 4. Memorándum Interno de Secretaría.
  - 5. Afiche Institucional A3 para convocatorias.
  - 6. Plantilla para Redes Sociales 1080x1080.
  - 7. Firma de Correo Electrónico Institucional.
  - 8. Carátula de Expedientes y Proyectos.
  - Selector de secretarías y funcionarios del personal en vivo.
  - Botón de descarga/exportación y vista de impresión para cada material.
- [x] **TASK-06**: Integrar el nuevo módulo en `src/App.tsx`, barra de navegación superior y actualizar estilos en `src/index.css`.
- [x] **TASK-07**: Actualizar `.specify/feature.json` y `CLAUDE.md` con la feature activa.
- [x] **TASK-08**: Verificación y compilación de TypeScript (`npm run build`), pruebas de comportamiento en vivo y reporte de cumplimiento.
