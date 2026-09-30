# DOCUMENTO 02: REQUERIMIENTOS FUNCIONALES (CASOS DE USO Y ÉPICAS)
## EL ALTO DIGITAL EASYSTEM (EASystem)
**Gobierno Autónomo Municipal de El Alto — Dirección de Comunicación**

---

### METADATOS DEL DOCUMENTO
- **Código**: `DOC-SDD-002`
- **Versión**: `1.0.0`
- **Fecha**: `2026-09-29`
- **Estado**: `Aprobado por el Equipo Multidisciplinario`
- **Autores**: Product Owner & Arquitecto de Software Senior

---

## 1. MATRIZ DE ÉPICAS DEL SISTEMA

| ID Épica | Nombre de la Épica | Módulos Impactados | Prioridad |
|---|---|---|---|
| **EP-01** | Portal Público y Divulgación de Identidad | Landing Pública, Portal de Ciudad | Alta (P1) |
| **EP-02** | Autenticación, Auditoría y Control de Acceso (RBAC) | Seguridad, Gestión de Usuarios, Auditoría | Crítica (P0) |
| **EP-03** | Digital Brand Book y Guías Interactivas | Módulos 1-16 del Manual de Marca | Alta (P1) |
| **EP-04** | Gobernanza de Brand Architecture | Sistema de Submarcas (Estilo NYC) | Alta (P1) |
| **EP-05** | Brand Asset Management (BAM / Biblioteca de Recursos) | Repositorio Vectorial, Filtros y Descargas | Crítica (P0) |
| **EP-06** | Motor de Generación Automática de Piezas Gráficas | Canvas Engine, Templates, Exportador | Crítica (P0) |
| **EP-07** | Brand Validator & Auditoría de Cumplimiento (Score) | Computer Vision, Validación de Reglas | Alta (P1) |
| **EP-08** | Asistente de IA Institucional (Alto IA) | LLM, Generación de Copys, Asesoría | Media (P2) |
| **EP-09** | Flujos de Aprobación y Dashboard Administrativo | DirCom Workflow, Métricas y KPIs | Alta (P1) |

---

## 2. HISTORIAS DE USUARIO Y CASOS DE USO DETALLADOS

### ÉPICA 01: Portal Público y Divulgación de Identidad
- **US-01.1 (Landing Institucional de Impacto)**: 
  - *Como* ciudadano o funcionario visitante,
  - *Quiero* explorar una landing page moderna con estética vanguardista inspirada en la fuerza de El Alto,
  - *Para* comprender el valor de la marca municipal, el concepto del aguayo y la visión de ciudad digital.
  - *Criterios de Aceptación*: Hero con video/animación de líneas de aguayo, secciones A a F según el requerimiento, botón de acceso a Brand Manager, cumplimiento de accesibilidad WCAG 2.1 AA.
- **US-01.2 (Acceso Rápido a Kit de Prensa Público)**:
  - *Como* periodista o medio de comunicación,
  - *Quiero* descargar versiones autorizadas del logotipo oficial en PNG y SVG de alta resolución con su área de reserva garantizada,
  - *Para* incluirlo en transmisiones o notas de prensa sin necesidad de registrarme.

---

### ÉPICA 02: Autenticación, Auditoría y Control de Acceso (RBAC)
- **US-02.1 (Autenticación Segura Multi-Factor)**:
  - *Como* usuario municipal registrado,
  - *Quiero* iniciar sesión con credenciales institucionales y segundo factor (TOTP) opcional,
  - *Para* proteger el acceso a las herramientas oficiales de comunicación.
- **US-02.2 (Control Estricto de Roles)**:
  - *Roles definidos*:
    1. `ADMINISTRADOR`: Parametrización del sistema, tokens, usuarios y permisos.
    2. `DIRECTOR_COMUNICACION`: Aprobación de campañas, emisión de comunicados de emergencia, validación de excepciones.
    3. `DISENADOR`: Carga de vectores, diseño y publicación de plantillas maestras en el motor.
    4. `USUARIO_MUNICIPAL`: Generación de piezas para su secretaría mediante plantillas bloqueadas.
    5. `AUDITOR`: Consulta de registros inmutables, descargas y cumplimiento de normas.

---

### ÉPICA 03: Digital Brand Book Interactivo (16 Módulos)
- **US-03.1 (Exploración Interactiva de Normas)**:
  - *Como* usuario del sistema,
  - *Quiero* navegar por los 16 módulos normativos (Presentación, Misión/Visión, Aguayo, Imagotipo, Retícula, Área Segura, Usos Incorrectos, Colores, Tipografías, Papelería, Merchandising, Vehículos, etc.),
  - *Para* consultar directrices exactas con ejemplos visuales "Correcto vs. Incorrecto" en tiempo real.
- **US-03.2 (Sandbox de Área Segura y Retícula)**:
  - *Como* diseñador,
  - *Quiero* interactuar con un visor que dibuje dinámicamente la retícula 'X' y el área de reserva alrededor del imagotipo según el tamaño de lienzo seleccionado,
  - *Para* verificar si mi composición respeta los márgenes institucionales.

---

### ÉPICA 04: Gobernanza de Brand Architecture (NYC Style)
- **US-04.1 (Constructor de Submarcas Avaladas)**:
  - *Como* Director de Comunicación,
  - *Quiero* generar el bloque de marca oficial para una Secretaría o Dirección Municipal seleccionando su nombre formal,
  - *Para* que el sistema componga automáticamente el imagotipo oficial con el descriptor tipográfico en Gotham con proporciones y espaciados matemáticamente exactos.
- **US-04.2 (Catalogación de Campañas Temporales)**:
  - *Como* Director de Comunicación,
  - *Quiero* registrar una campaña municipal temporal (ej. "Vacunación Masiva Alteña"),
  - *Para* asociarle su paleta derivada, fecha de vigencia y sellos obligatorios de patrocinio.

---

### ÉPICA 05: Brand Asset Management (BAM)
- **US-05.1 (Directorio Categorizado con Metadatos)**:
  - *Estructura de Carpetas*: `/logos`, `/versiones` (positiva, negativa, monocromo), `/svg`, `/png`, `/pdf`, `/plantillas`, `/documentos`, `/fotografias`, `/videos`.
  - *Filtros*: Búsqueda instantánea por formato, secretaría, paleta y tags semánticos.
- **US-05.2 (Firma de Uso y Trazabilidad de Descargas)**:
  - *Criterio*: Toda descarga de activo para proveedores externos registra una marca de agua o hash criptográfico vinculado al usuario que autorizó la entrega.

---

### ÉPICA 06: Motor de Generación Gráfica Automática
- **US-06.1 (Generación de Piezas en 3 Pasos)**:
  1. *Selección de Formato*: Post Instagram (1080x1080), Story (1080x1920), Afiche A3 (Print 300 DPI), Comunicado Oficial (A4), Credencial, Banner horizontal.
  2. *Ingreso de Parámetros*: Título, cuerpo del mensaje, secretaría emisora, fecha, fotografía de fondo opcional.
  3. *Renderizado Server-side/Canvas*: El sistema bloquea márgenes, aplica logos oficiales, ajusta contrastes de texto para legibilidad y genera PNG, PDF para imprenta con marcas de corte o SVG.
- **US-06.2 (Generador de Comunicados Oficiales con Verificación QR)**:
  - *Como* encargado de prensa,
  - *Quiero* redactar un comunicado oficial urgente,
  - *Para* que el sistema renderice el formato con folio único, fecha y código QR que enlaza a la URL oficial de verificación pública de autenticidad en el dominio municipal.

---

### ÉPICA 07: Brand Validator & Brand Score
- **US-07.1 (Auditoría de Imagen por Inteligencia Artificial)**:
  - *Flujo*: El usuario arrastra un archivo JPG/PNG/PDF al validador.
  - *Reglas Automáticas*:
    1. Detección de imagotipo: verificación de deformación de aspecto (aspect-ratio distortion < 1%).
    2. Detección de colores: histograma de píxeles para asegurar que los tonos correspondan a la paleta institucional (`#4B008F`, `#F5007B`, `#008F89`, `#F5B400`, `#690BB2`) con tolerancia Delta-E < 2.0.
    3. Área de reserva: ausencia de elementos visuales invasivos a menos de 2X del imagotipo.
  - *Salida*: **Brand Score (0% a 100%)** con reporte interactivo de observaciones.

---

### ÉPICA 08: Alto IA Brand Assistant
- **US-08.1 (Asistente de Redacción Institucional)**:
  - Generación de textos para comunicados oficiales, notas de prensa y copys para redes sociales adaptados a la jerga y sensibilidad del pueblo alteño, manteniendo solemnidad e institucionalidad.
- **US-08.2 (Consultorio Normativo)**:
  - Respuestas en lenguaje natural a dudas como: "¿Puedo usar el imagotipo en fondo amarillo?", "¿Cuál es el tamaño mínimo para credenciales en PVC?".

---

### ÉPICA 09: Flujos de Aprobación y Dashboard Administrativo
- **US-09.1 (Bandeja de Aprobaciones DirCom)**:
  - Las piezas que no alcancen 100% en Brand Validator o que correspondan a campañas de alta sensibilidad requieren autorización formal del Director de Comunicación en un clic.
- **US-09.2 (Tablero de Control de Impacto Visual)**:
  - Gráficos de piezas generadas por secretaría, horas hombre ahorradas en diseño, formatos más demandados y log de actividades en tiempo real.
