# DOCUMENTO 04: ARQUITECTURA DE SOFTWARE Y MICROSERVICIOS
## EL ALTO DIGITAL EASYSTEM (EASystem)
**Gobierno Autónomo Municipal de El Alto — Dirección de Comunicación**

---

### METADATOS DEL DOCUMENTO
- **Código**: `DOC-SDD-004`
- **Versión**: `1.0.0`
- **Fecha**: `2026-09-29`
- **Estado**: `Aprobado por el Equipo Multidisciplinario`
- **Autores**: Arquitecto de Software Senior & Ingeniero DevOps

---

## 1. PATRÓN ARQUITECTÓNICO GENERAL
EASystem adopta una **Arquitectura Modular Hexagonal (Ports & Adapters)** empaquetada como un monolito modular escalable, listo para desacoplarse en microservicios independientes cuando la demanda de cómputo lo requiera.

```
                            ┌──────────────────────────────────────────┐
                            │    Frontend Next.js 14+ (App Router)     │
                            │  [Landing] [Brand Book] [Generator UI]   │
                            └────────────────────┬─────────────────────┘
                                                 │ HTTPS / JSON / FormData
                                                 ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        API GATEWAY / REVERSE PROXY (NGINX / TRAEFIK)                    │
└────────────────────────────────────────┬───────────────────────────────────────────────┘
                                         │
 ┌───────────────────────────────────────┴───────────────────────────────────────────────┐
 │                                 EASYSTEM BACKEND CORE                                 │
 │                                                                                       │
 │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
 │  │   Auth Module    │  │   Brand Module   │  │   BAM Storage    │  │  Audit Engine │  │
 │  │ (JWT/RBAC/OAuth) │  │  (Tokens & Rules)│  │ (Assets Manager) │  │  (Hash Chain) │  │
 │  └─────────┬────────┘  └────────┬─────────┘  └────────┬─────────┘  └───────┬───────┘  │
 │            │                    │                     │                    │          │
 │            ▼                    ▼                     ▼                    ▼          │
 │  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
 │  │                          Domain Layer & Business Rules                          │  │
 │  └──────────────────────────────────────┬──────────────────────────────────────────┘  │
 │                                         │                                             │
 │  ┌──────────────────────────────────────┴──────────────────────────────────────────┐  │
 │  │                SERVICIOS ESPECIALIZADOS DE ALTO RENDIMIENTO                     │  │
 │  │                                                                                 │  │
 │  │  ┌───────────────────────────────┐        ┌───────────────────────────────────┐ │  │
 │  │  │ Graphic Generator Service     │        │ Brand Validator Service           │ │  │
 │  │  │ (Sharp / Konva / Puppeteer)   │        │ (CV / Pixel Analysis / LLM Vision)│ │  │
 │  │  └──────────────┬────────────────┘        └─────────────────┬─────────────────┘ │  │
 │  │                 │                                           │                   │  │
 │  │                 ▼                                           ▼                   │  │
 │  │  ┌───────────────────────────────┐        ┌───────────────────────────────────┐ │  │
 │  │  │ Render Queue Worker (BullMQ)  │        │ Alto IA Assistant Service         │ │  │
 │  │  │ (Async Batch Processing)      │        │ (Local LLM / OpenAI Compatible)   │ │  │
 │  │  └───────────────────────────────┘        └───────────────────────────────────┘ │  │
 │  └─────────────────────────────────────────────────────────────────────────────────┘  │
 └────────────────────────────────────────┬──────────────────────────────────────────────┘
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
┌───────────────────────┐     ┌───────────────────────┐     ┌───────────────────────┐
│     PostgreSQL 16     │     │       Redis 7         │     │    MinIO S3 Storage   │
│ (Relational Data &    │     │ (Cache, Rate Limiting │     │ (Vector Assets, SVGs, │
│  Audit Logs)          │     │  & Job Queue Engine)  │     │  PDFs, Renders)       │
└───────────────────────┘     └───────────────────────┘     └───────────────────────┘
```

---

## 2. DESCOMPOSICIÓN DE MÓDULOS DE NEGOCIO

### 2.1. Módulo de Autenticación y Cuentas (`auth`)
- **Responsabilidad**: Gestión de funcionarios municipales, recuperación de credenciales, autenticación por doble factor y verificación de roles y secretarías.
- **Puertos de Entrada**: Controladores REST para login, refresh token, cambio de contraseña y perfil.
- **Políticas**: Tokens JWT efímeros (15 minutos) con refresh tokens rotativos almacenados en Redis y PostgreSQL con revocación instantánea.

### 2.2. Módulo de Brand Tokens y Arquitectura de Marca (`brand`)
- **Responsabilidad**: Servir como la única fuente de verdad para valores cromáticos, escalas tipográficas, retículas y relaciones entre la marca madre y las secretarías.
- **Salida**: Generación automática de `tokens.json`, `variables.css` y `tokens.ts` consumibles por cualquier subproyecto municipal.

### 2.3. Módulo BAM (Brand Asset Management - `assets`)
- **Responsabilidad**: Gestión del ciclo de vida de los activos vectoriales y rasterizados del municipio.
- **Operaciones**: Subida de archivos, compresión automática, cálculo de hash criptográfico, asignación de tags semánticos y generación de previsualizaciones thumbnail web.

### 2.4. Módulo Renderizador Gráfico (`generator`)
- **Responsabilidad**: Recepción de layouts JSON provenientes del cliente y compilación a formatos finales de alta fidelidad:
  - Formato Redes Sociales: WebP y PNG sRGB 72/144 DPI optimizados.
  - Formato Imprenta Institucional: PDF/X-1a a 300 DPI con perfiles CMYK FOGRA39 y sangrías de 3mm.
  - Formato Vectorial Editable: SVG limpio compatible con Illustrator/CorelDraw/Inkscape.

### 2.5. Módulo Brand Validator (`validator`)
- **Responsabilidad**: Inspección algorítmica de archivos cargados para determinar si cumplen la normativa del GAMEA:
  - **Fase 1 (Inspección de Color)**: Extracción de paleta dominante (K-means clustering) y cálculo de distancia Delta-E con respecto a `#4B008F`, `#F5007B`, `#008F89`, `#F5B400` y `#690BB2`.
  - **Fase 2 (Inspección de Imagotipo)**: Correlación cruzada de plantillas (Template Matching) para verificar que el isotipo no presente estiramiento vertical u horizontal.
  - **Fase 3 (Score)**: Ponderación de 0 a 100 puntos y emisión de observaciones específicas.

### 2.6. Módulo Alto IA (`ai-assistant`)
- **Responsabilidad**: Agente multimodal conectado a la base de conocimiento del Manual de Imagen Institucional:
  - Soporte de preguntas normativas mediante RAG (Retrieval-Augmented Generation) sobre los documentos del sistema.
  - Generación de comunicados y declaraciones de prensa siguiendo la pauta de estilo alteña.

---

## 3. INTEGRACIÓN CONTINUA Y TOPOLOGÍA DE DESPLIEGUE

### 3.1. Contenedores Docker de Producción
1. `easystem-web`: Servicio Next.js optimizado (Standalone Node runner).
2. `easystem-api`: Backend NestJS compilado.
3. `easystem-worker`: Instancia dedicada a tareas pesadas de BullMQ y renderizado.
4. `easystem-db`: PostgreSQL 16 Alpine con almacenamiento en volumen SSD NVMe persistente.
5. `easystem-cache`: Redis 7 Alpine protegido por contraseña.
6. `easystem-storage`: MinIO Server en modo clúster local.

### 3.2. Estrategia de Cero Downtime
- Los despliegues se orquestan mediante **Coolify / Docker Swarm** con comprobación de salud activa (`GET /api/health`).
- Las migraciones de base de datos se ejecutan en etapa de *Pre-Deployment* evitando bloqueos de tablas durante el tráfico en vivo.
