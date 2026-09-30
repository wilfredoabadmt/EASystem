# DOCUMENTO 07: CONTRATOS DE API (OPENAPI 3.1 & SDK DE TOKENS)
## EL ALTO DIGITAL EASYSTEM (EASystem)
**Gobierno Autónomo Municipal de El Alto — Dirección de Comunicación**

---

### METADATOS DEL DOCUMENTO
- **Código**: `DOC-SDD-007`
- **Versión**: `1.0.0`
- **Fecha**: `2026-09-29`
- **Estado**: `Aprobado por el Equipo Multidisciplinario`
- **Autores**: Arquitecto de Software Senior & Ingeniero de Integraciones

---

## 1. CONVENCIONES Y SEGURIDAD DE LA API REST
- **Base URL**: `https://easystem.elalto.gob.bo/api/v1`
- **Formato de Comunicación**: `application/json` con respuestas estandarizadas `{ "success": boolean, "data": any, "meta": any, "error": any }`.
- **Autenticación**: `Authorization: Bearer <JWT>`
- **Rate Limiting**:
  - Rutas Públicas: 60 peticiones/minuto por IP.
  - Renderizado / Generador Gráfico: 15 peticiones/minuto por usuario autenticado.
  - Auditoría / Validador de Marca: 10 peticiones/minuto por usuario autenticado.

---

## 2. ESPECIFICACIÓN DE ENDPOINTS PRINCIPALES

### 2.1. Módulo Brand & Design Tokens (`/brand`)
- `GET /brand/tokens`: Retorna la especificación completa de tokens en formato W3C JSON.
  - *Response*: `{ "colors": { "primary": "#4B008F", ... }, "typography": { ... } }`
- `GET /brand/architecture`: Retorna la jerarquía oficial de la Marca Madre y todas las Secretarías y Submarcas activas.
- `GET /brand/book/modules`: Retorna la lista y contenido estructurado de los 16 módulos interactivos del Brand Book.

### 2.2. Módulo de Generación Gráfica Automática (`/generator`)
- `POST /generator/render`:
  - *Headers*: `Content-Type: application/json`
  - *Request Body*:
    ```json
    {
      "templateId": "uuid-template-comunicado-a4",
      "format": "PDF",
      "dpi": 300,
      "variables": {
        "title": "COMUNICADO DE PRENSA URGENTE",
        "secretariaCode": "SEC-MOVILIDAD",
        "dateText": "29 de Septiembre de 2026",
        "bodyText": "La Dirección de Comunicación informa a la ciudadanía alteña que...",
        "includeAguayoBorder": true
      }
    }
    ```
  - *Response*:
    ```json
    {
      "success": true,
      "data": {
        "jobId": "job-render-987123",
        "status": "PROCESSING",
        "estimatedSeconds": 2.5
      }
    }
    ```
- `GET /generator/jobs/:jobId`: Consulta el estado y descarga la URL pre-firmada del archivo generado (`PNG`, `PDF`, `SVG`).

### 2.3. Módulo Brand Validator (`/validator`)
- `POST /validator/evaluate`:
  - *Headers*: `Content-Type: multipart/form-data`
  - *Body Form*: `file`: Archivo binario (PNG, JPG, PDF) a inspeccionar.
  - *Response*:
    ```json
    {
      "success": true,
      "data": {
        "brandScore": 100,
        "isApproved": true,
        "summary": "Marca 100% aprobada. Cumple con paleta oficial, proporciones de imagotipo y márgenes seguros.",
        "detections": {
          "logoDetected": true,
          "logoAspectRatioDistortion": 0.0,
          "colorCompliance": {
            "primaryPurpleMatch": true,
            "foreignColorsDetected": []
          },
          "safeAreaClearancePx": 45
        }
      }
    }
    ```

### 2.4. Módulo Alto IA Assistant (`/ai`)
- `POST /ai/copywriting`:
  - *Body*: `{ "topic": "Mantenimiento de luminarias", "targetAudience": "vecinos_distrito_8", "tone": "institucional_cercano" }`
  - *Response*: `{ "headline": "...", "bodyText": "...", "hashtags": ["#ElAltoDePie", "#GestionMunicipal"] }`
- `POST /ai/brand-consult`:
  - *Body*: `{ "question": "¿Puedo colocar el imagotipo sobre una foto sin el fondo púrpura?" }`
  - *Response*: `{ "answer": "De acuerdo al Módulo 10 del Brand Book, cuando el imagotipo se aplica sobre fotografía debe...", "moduleReference": 10 }`
