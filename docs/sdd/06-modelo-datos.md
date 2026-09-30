# DOCUMENTO 06: MODELO DE DATOS RELACIONAL Y POLÍTICAS DE ALMACENAMIENTO
## EL ALTO DIGITAL EASYSTEM (EASystem)
**Gobierno Autónomo Municipal de El Alto — Dirección de Comunicación**

---

### METADATOS DEL DOCUMENTO
- **Código**: `DOC-SDD-006`
- **Versión**: `1.0.0`
- **Fecha**: `2026-09-29`
- **Estado**: `Aprobado por el Equipo Multidisciplinario`
- **Autores**: Arquitecto de Software Senior & Administrador de Base de Datos (DBA)

---

## 1. ESQUEMA RELACIONAL POSTGRESQL (DIAGRAMA ER)

```mermaid
erDiagram
    USERS ||--o{ REFRESH_TOKENS : has
    USERS }|--|| ROLES : belongs_to
    USERS }|--|| SECRETARIAS : member_of
    SECRETARIAS ||--o{ SUBBRANDS : owns
    SUBBRANDS ||--o{ TEMPLATES : customizes
    USERS ||--o{ ASSETS : uploads
    ASSET_CATEGORIES ||--o{ ASSETS : classifies
    USERS ||--o{ GENERATED_PIECES : renders
    TEMPLATES ||--o{ GENERATED_PIECES : instantiates
    GENERATED_PIECES ||--o| VALIDATION_AUDITS : scored_by
    USERS ||--o{ AUDIT_LOGS : triggers

    USERS {
        uuid id PK
        string email UK
        string password_hash
        string full_name
        string cargo
        uuid secretaria_id FK
        uuid role_id FK
        boolean is_active
        boolean totp_enabled
        timestamp created_at
    }

    SECRETARIAS {
        uuid id PK
        string code UK
        string name
        string titular
        boolean is_active
    }

    SUBBRANDS {
        uuid id PK
        uuid secretaria_id FK
        string name
        string descriptor_text
        jsonb token_overrides
        string status
    }

    ASSETS {
        uuid id PK
        string title
        string file_key
        string mime_type
        int file_size
        string file_hash_sha256
        uuid category_id FK
        uuid uploader_id FK
        jsonb metadata
        boolean is_public
        timestamp created_at
    }

    TEMPLATES {
        uuid id PK
        string title
        string format_type
        int canvas_width
        int canvas_height
        jsonb canvas_schema
        uuid created_by FK
        boolean is_locked
        timestamp created_at
    }

    GENERATED_PIECES {
        uuid id PK
        uuid template_id FK
        uuid created_by FK
        string output_file_key
        string format
        string verification_qr_token UK
        string approval_status
        uuid approved_by FK
        timestamp created_at
    }

    VALIDATION_AUDITS {
        uuid id PK
        uuid piece_id FK
        int brand_score
        jsonb rules_breakdown
        jsonb detected_colors
        float aspect_ratio_delta
        boolean is_approved
        timestamp evaluated_at
    }

    AUDIT_LOGS {
        bigserial id PK
        timestamp timestamp
        uuid user_id FK
        string action
        string resource_type
        string resource_id
        string ip_address
        jsonb payload_diff
        string previous_hash
        string record_hash UK
    }
```

---

## 2. DDL DE TABLAS CORE Y POLÍTICA DE AUDITORÍA INMUTABLE

```sql
-- Creación de Extensiones Requeridas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Esquema de Auditoría Inmutable
CREATE SCHEMA IF NOT EXISTS audit;

CREATE TABLE audit.logs (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID REFERENCES public.users(id),
    action VARCHAR(64) NOT NULL,
    resource_type VARCHAR(64) NOT NULL,
    resource_id VARCHAR(128) NOT NULL,
    ip_address INET,
    payload_diff JSONB,
    previous_hash VARCHAR(64),
    record_hash VARCHAR(64) NOT NULL UNIQUE
);

-- Trigger de Inmutabilidad Criptográfica para Auditoría
CREATE OR REPLACE FUNCTION audit.generate_hash_chain()
RETURNS TRIGGER AS $$
DECLARE
    last_hash VARCHAR(64);
BEGIN
    SELECT record_hash INTO last_hash FROM audit.logs ORDER BY id DESC LIMIT 1;
    NEW.previous_hash := COALESCE(last_hash, 'GENESIS_EASYSTEM_EL_ALTO_2026');
    NEW.record_hash := encode(digest(
        NEW.timestamp::text || 
        COALESCE(NEW.user_id::text, '') || 
        NEW.action || 
        NEW.resource_id || 
        COALESCE(NEW.payload_diff::text, '') || 
        NEW.previous_hash, 
        'sha256'
    ), 'hex');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit_hash_chain
BEFORE INSERT ON audit.logs
FOR EACH ROW EXECUTE FUNCTION audit.generate_hash_chain();
```

---

## 3. POLÍTICAS DE ALMACENAMIENTO S3 / MINIO
1. **Reglas de Retención**:
   - `easystem-public`: Acceso anónimo de solo lectura para descargas de prensa y logos; CDN con caché de 30 días.
   - `easystem-vault`: Acceso restringido vía URLs pre-firmadas con expiración de 10 minutos para descargas de artes editables.
   - `easystem-renders`: Almacenamiento con ciclo de vida (renders temporales eliminados a los 60 días; piezas oficiales aprobadas preservadas de forma permanente).
2. **Estructura de Paths Canónicos**:
   - `/logos/{version}/{monochrome|color}/{lang}/{asset_name}.svg`
   - `/templates/{category}/{id}/schema.json`
   - `/renders/{secretaria_code}/{YYYY}/{MM}/{unique_id}.pdf`
