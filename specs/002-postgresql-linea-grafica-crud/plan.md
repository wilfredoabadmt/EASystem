# PLAN TÉCNICO: PERSISTENCIA POSTGRESQL, CRUD DE LÍNEA GRÁFICA Y ADAPTACIÓN DE MATERIALES
`specs/002-postgresql-linea-grafica-crud/plan.md`

## 1. ARQUITECTURA TÉCNICA GENERAL

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND REACT (EASystem UI)                     │
│                                                                        │
│  [CRUD Línea Gráfica]  ◄───►  [Motor de Adaptación] ──► [Vista Materiales]
│   - Formulario de Subida         - Inyector de Tokens    - Credenciales
│   - Paleta de Colores            - Renderizador SVG/CSS   - Membretadas
│   - Selector Activa/Borrador     - Sincronizador Estado  - Comunicados QR
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ JSON / REST API / State
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  CAPA DE SERVICIOS & PERSISTENCIA                      │
│                                                                        │
│   [DB Service / PostgreSQL Client]   ◄──►   [Local Fallback Storage]   │
│    - Connection Pool (pg)                    - IndexedDB / LocalStorage│
│    - Schema Migrations / DDL                 - Offline Resilience      │
│    - Seed Data                               - Instant Sync            │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ SQL / TCP :5432
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     POSTGRESQL 16 ENTERPRISE DB                        │
│                                                                        │
│   - public.lineas_graficas       - public.materiales_catalogo          │
│   - public.secretarias           - public.funcionarios_personal        │
│   - public.materiales_generados  - audit.logs (Hash Chain inmutable)   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. ESQUEMA DDL POSTGRESQL (`init-db.sql`)

```sql
-- Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabla Maestra: Líneas Gráficas Originales
CREATE TABLE IF NOT EXISTS public.lineas_graficas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(32) NOT NULL UNIQUE,
    nombre VARCHAR(128) NOT NULL,
    descripcion TEXT,
    year_vigencia INT NOT NULL DEFAULT 2026,
    is_activa BOOLEAN NOT NULL DEFAULT FALSE,
    estado VARCHAR(20) NOT NULL DEFAULT 'BORRADOR', -- 'ACTIVA', 'BORRADOR', 'ARCHIVADA'
    
    -- Imagotipo y Texturas
    logo_svg TEXT NOT NULL,
    logo_subbrand_text VARCHAR(128) DEFAULT 'Gobierno Autónomo Municipal de El Alto',
    aguayo_pattern_type VARCHAR(64) DEFAULT 'geometric_classic',
    aguayo_colors JSONB NOT NULL DEFAULT '["#4B008F", "#F5007B", "#008F89", "#F5B400", "#690BB2"]'::jsonb,
    
    -- Paleta Cromática Institucional (HEX)
    color_primary VARCHAR(7) NOT NULL DEFAULT '#4B008F',
    color_secondary VARCHAR(7) NOT NULL DEFAULT '#F5007B',
    color_teal VARCHAR(7) NOT NULL DEFAULT '#008F89',
    color_gold VARCHAR(7) NOT NULL DEFAULT '#F5B400',
    color_dark VARCHAR(7) NOT NULL DEFAULT '#090314',
    color_surface VARCHAR(7) NOT NULL DEFAULT '#1A0E2E',
    
    -- Tipografías y Consignas
    font_headings VARCHAR(64) NOT NULL DEFAULT 'Gotham, Montserrat, sans-serif',
    font_body VARCHAR(64) NOT NULL DEFAULT 'Poppins, Inter, sans-serif',
    slogan VARCHAR(256) NOT NULL DEFAULT 'El Corazón de la Metrópoli',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla Catálogo: Tipos de Materiales Institucionales para el Personal
CREATE TABLE IF NOT EXISTS public.materiales_catalogo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo VARCHAR(64) NOT NULL UNIQUE,
    nombre VARCHAR(128) NOT NULL,
    categoria VARCHAR(64) NOT NULL, -- 'PAPELERIA', 'IDENTIFICACION', 'PRENSA', 'DIGITAL'
    descripcion TEXT,
    dimensiones VARCHAR(64) NOT NULL, -- '54x86 mm', 'A4 210x297 mm', '1080x1080 px'
    soporte VARCHAR(64) NOT NULL -- 'Impreso', 'Digital', 'Prensa'
);

-- Tabla Personal y Secretarías
CREATE TABLE IF NOT EXISTS public.secretarias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(32) NOT NULL UNIQUE,
    nombre VARCHAR(128) NOT NULL,
    titular VARCHAR(128) NOT NULL,
    edificio VARCHAR(128) DEFAULT 'Jach''a Uta - Casa Municipal'
);

CREATE TABLE IF NOT EXISTS public.funcionarios_personal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    secretaria_id UUID REFERENCES public.secretarias(id),
    nombre_completo VARCHAR(128) NOT NULL,
    cargo VARCHAR(128) NOT NULL,
    ci VARCHAR(32) NOT NULL,
    matricula VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL,
    telefono VARCHAR(32),
    avatar_url TEXT
);
```

---

## 3. PLAN DE COMPONENTES FRONTEND Y SERVICIOS

1. **`src/services/dbService.ts`**:
   - Administrador de persistencia PostgreSQL y sincronización local.
   - Provee métodos `getLineasGraficas()`, `createLineaGrafica()`, `updateLineaGrafica()`, `deleteLineaGrafica()`, `setActivaLineaGrafica()`.
   - Provee datos semilla preconfigurados del GAMEA.
   - Detecta si hay backend PostgreSQL conectado o activa modo offline/local con persistencia persistente e indicador de estado de base de datos.
2. **`src/components/LineaGraficaManager.tsx`**:
   - Pestaña principal de gobernanza y CRUD.
   - Modales/Vistas:
     - Formulario de alta/edición de Línea Gráfica Original con selector de paletas, carga de SVG/imagen, vista previa en tiempo real del isotipo y del aguayo.
     - Cuadrícula de líneas existentes con etiquetas de estado (`ACTIVA`, `BORRADOR`, `ARCHIVADA`).
     - Botón de acción para "Activar Línea Maestra".
3. **`src/components/MaterialesPersonalAdaptados.tsx`**:
   - Submódulo que toma la línea gráfica activa y muestra los 8 materiales del personal:
     - 1. **Credencial Institucional de Personal**: Formato vertical con foto, QR, cargo, secretaría y aguayo.
     - 2. **Hoja Membretada Oficial**: Formato A4 con encabezado, código de decreto, marca de agua central y pie de página.
     - 3. **Comunicado de Prensa**: Formato oficial con sello de urgencia y QR de verificación.
     - 4. **Memorándum Interno**: Para despacho entre secretarías.
     - 5. **Afiche Convocatoria A3**: Para ferias y actividades distritales.
     - 6. **Plantilla Post Redes 1080x1080**: Formato social media.
     - 7. **Firma de Correo Institucional**: Tarjeta de contacto oficial para Outlook/Gmail.
     - 8. **Carátula de Expediente de Proyecto**: Portada de carpetas de inversión y licitación.
   - Selector en vivo de funcionario/secretaría para ver cómo muta el material para cada miembro del equipo.
   - Botón de descarga/exportación y previsualización de impresión para cada pieza.
4. **Actualización de Navegación en `src/App.tsx`**:
   - Añadir la nueva pestaña `"Línea Gráfica & Materiales"` con icono distintivo.
5. **Generación de script de PostgreSQL (`scripts/init-postgresql.sql`) y `docker-compose.yml`**:
   - Facilitar el despliegue inmediato de PostgreSQL en Docker o Coolify.
