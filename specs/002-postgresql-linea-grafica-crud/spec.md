# ESPECIFICACIÓN TÉCNICA FORMAL: CRUD DE LÍNEA GRÁFICA ORIGINAL Y ADAPTACIÓN DE MATERIALES (POSTGRESQL)
`specs/002-postgresql-linea-grafica-crud/spec.md`

## 1. RESUMEN EJECUTIVO
Bajo la metodología **SDD (Spec-Driven Development)**, esta especificación define la arquitectura, el modelo de datos relacional en **PostgreSQL**, y el sistema interactivo de **CRUD de Línea Gráfica Original**.

Este módulo resuelve el problema central de la gestión institucional del Gobierno Autónomo Municipal de El Alto (GAMEA): permitir a la Dirección de Comunicación cargar, versionar y actualizar la **Línea Gráfica Maestra/Original** (logos, tramas de aguayo, paletas de color, tipografías y consignas), y que este cambio **se propague y adapte automáticamente en tiempo real a todo el kit de materiales que el personal municipal utiliza día a día**.

---

## 2. HISTORIAS DE USUARIO (USER STORIES)

### US-01: Administrador / Dirección de Comunicación (DirCom)
*Como Director de Comunicación, quiero poder registrar y subir nuevas líneas gráficas oficiales (ej. Línea Bicentenario 2026, Campaña Ciudad de Oportunidades), subiendo el imagotipo en SVG/PNG, definiendo los colores institucionales y la trama textil del aguayo, para que quede almacenada formalmente en la base de datos PostgreSQL y sea la norma activa del municipio.*

### US-02: Funcionario / Personal de Secretarías y Direcciones
*Como funcionario de una secretaría municipal (Finanzas, Movilidad, Salud, etc.), quiero ingresar al portal de materiales de mi personal y ver inmediatamente todas las herramientas de mi trabajo diario (credencial de funcionario, hojas membretadas, comunicados con QR, memorándums, afiches y plantillas para redes) ya adaptadas con la línea gráfica activa y con el membrete de mi secretaría, listas para descargar o imprimir.*

### US-03: Diseñador Institucional y Auditor
*Como diseñador o auditor interno, quiero poder comparar versiones históricas de la línea gráfica en la base de datos, ver qué materiales fueron emitidos bajo cada versión, y tener un log inmutable de auditoría para garantizar que ninguna secretaría use logotipos caducos o desautorizados.*

---

## 3. REQUERIMIENTOS FUNCIONALES (RF)

### 3.1. CRUD de Línea Gráfica Original (RF-01)
- **Creación (Create)**:
  - Formulario estructurado para registrar una nueva línea gráfica:
    - Nombre descriptivo (ej: `Línea Oficial GAMEA 2026 - Orgullo Alteño`).
    - Código único de versión (ej: `LGO-2026-V1`).
    - Imagotipo Maestro (Subida en SVG, PNG o SVG inline vectorial con previsualización inmediata).
    - Paleta Cromática:
      - Color Principal (por defecto Púrpura Alteño `#4B008F`).
      - Color Secundario (Rosa Rebelde `#F5007B`).
      - Color Terciario (Turquesa Integración `#008F89`).
      - Color Acento (Oro Andino `#F5B400`).
      - Color Fondo/Superficie (`#0A0416` a `#FFFFFF`).
    - Patrón / Trama del Aguayo (estilo de franjas, opacidad, orientación).
    - Tipografía Oficial Primaria (Gotham / Montserrat) y Secundaria (Poppins / Inter).
    - Eslogan Institucional (ej: *"El Corazón de la Metrópoli"*).
    - Subtítulo de Autoridad (ej: *"Gobierno Autónomo Municipal de El Alto"*).
    - Estado: `BORRADOR`, `ACTIVA`, `ARCHIVADA`.
- **Lectura y Listado (Read)**:
  - Visualización en cuadrícula y tabla de todas las líneas gráficas registradas en PostgreSQL.
  - Indicador de la línea actualmente **ACTIVA** que rige el sistema en todo el municipio.
  - Filtros por estado, año y búsqueda por palabras clave.
- **Actualización (Update)**:
  - Modificación de tokens, reemplazo de archivos de imagotipo, ajuste de slogans y colores.
  - Acción de **"Establecer como Línea Maestra Activa"** que desactiva la anterior y re-vincula los materiales.
- **Eliminación y Archivado (Delete)**:
  - Borrado lógico o físico (con confirmación de seguridad y verificación de que no sea la línea activa).

### 3.2. Motor de Adaptación Automática a Materiales del Personal (RF-02)
Al seleccionar o modificar una línea gráfica original, el sistema computa de inmediato su aplicación a los 8 tipos de materiales indispensables para el personal municipal:

1. **Credencial / Carnet de Identificación del Personal**:
   - Formato estándar de fotocheck vertical (54 x 86 mm).
   - Incluye: Foto del funcionario, nombres y apellidos, cargo, secretaría o dirección, código QR institucional de validación, firma autorizada y cintillo de aguayo de la línea activa.
2. **Hoja Membretada Oficial**:
   - Formato A4 / Carta para correspondencia oficial externa, decretos y notas de despacho.
   - Cabecera con imagotipo maestro, código de documento, marca de agua central y pie de página con dirección institucional y sellos oficiales.
3. **Comunicado Oficial de Prensa**:
   - Formato para difusión pública inmediata en redes e imprenta.
   - Código QR dinámico con verificación de autenticidad, título en tipografía oficial y borde de seguridad perimetral.
4. **Memorándum y Circular Interna**:
   - Formato corporativo para trámites intra-institucionales entre secretarías con casillas de "DE:", "A:", "REF:", fecha y rúbricas.
5. **Afiche Institucional / Convocatoria (A3 / A4)**:
   - Diseño para eventos cívicos, ferias distritales y talleres con composición fotográfica, titular jerárquico y logotipo institucional normalizado.
6. **Plantillas para Redes Sociales**:
   - Post Cuadrado (1080x1080 px) para Facebook/Instagram.
   - Historia / Reel (1080x1920 px).
   - Banner horizontal de cabecera (1200x630 px).
7. **Firma de Correo Electrónico Institucional**:
   - Formato HTML/Visual limpio con datos del funcionario, logo activo, enlaces y aviso de confidencialidad legal municipal.
8. **Carátula de Expedientes y Carpetas de Proyecto**:
   - Portada para proyectos de inversión pública, carpetas de obras y licitaciones del GAMEA.

### 3.3. Personalización por Funcionario y Secretaría (RF-03)
- El personal puede seleccionar su Secretaría/Dirección (ej: *Secretaría Municipal de Movilidad Urbana*, *Secretaría Municipal de Salud*, *Dirección de Obras Públicas*).
- El sistema inyecta dinámicamente los datos del funcionario en los materiales para previsualizarlos en vivo.
- Posibilidad de descargar los materiales en **PNG de alta resolución**, **SVG vectorial**, o abrir vista de **impresión directa**.

### 3.4. Persistencia en Base de Datos PostgreSQL (RF-04)
- Esquema relacional con tablas:
  - `lineas_graficas`: Registro maestro de identidades gráficas.
  - `materiales_catalogo`: Definición de los tipos de materiales institucionales.
  - `secretarias`: Secretarías y direcciones municipales de El Alto.
  - `funcionarios_personal`: Datos de prueba y personal municipal.
  - `materiales_generados`: Registro histórico de piezas generadas y vinculadas a la línea gráfica activa.
  - `audit_logs`: Trazabilidad inmutable de creación, edición y activación de líneas.
- Script de inicialización y datos semilla pre-cargados con la línea oficial de El Alto y líneas alternativas para demostración.
- API REST con endpoints `/api/lineas-graficas` para operaciones completas de lectura, escritura, actualización y activación.

---

## 4. CRITERIOS DE ACEPTACIÓN OBSERVABLES

- [ ] **CA-01**: La interfaz presenta una pestaña dedicada **"Línea Gráfica & Materiales"** en el panel principal.
- [ ] **CA-02**: El usuario puede crear una nueva línea gráfica cargando su imagotipo, colores, eslogan y aguayo, guardándola exitosamente en la base de datos PostgreSQL.
- [ ] **CA-03**: Al cambiar la "Línea Gráfica Activa", todos los 8 materiales del personal se actualizan inmediatamente en tiempo real mostrando los nuevos colores, imagotipo y tramas.
- [ ] **CA-04**: El personal puede interactuar con el selector de secretarías y funcionarios de prueba, viendo cómo se adaptan sus credenciales, memorándums, comunicados y hojas membretadas.
- [ ] **CA-05**: El usuario puede editar y eliminar líneas gráficas existentes, y el sistema previene la eliminación accidental de la línea activa.
- [ ] **CA-06**: Cada material del personal cuenta con botón de exportación o previsualización de impresión nítida.
- [ ] **CA-07**: El estado de conexión con PostgreSQL se muestra en pantalla, con soporte de persistencia local transparente en caso de contingencia.
