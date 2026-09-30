-- =============================================================================
-- EL ALTO DIGITAL EASYSTEM (EASystem)
-- DDL DE INICIALIZACIÓN DE BASE DE DATOS POSTGRESQL 16
-- Esquema para Líneas Gráficas Originales, Materiales de Personal y Auditoría
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Esquema de Auditoría Criptográfica
CREATE SCHEMA IF NOT EXISTS audit;

CREATE TABLE IF NOT EXISTS audit.logs (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID,
    user_name VARCHAR(128),
    action VARCHAR(64) NOT NULL,
    resource_type VARCHAR(64) NOT NULL,
    resource_id VARCHAR(128) NOT NULL,
    payload_diff JSONB,
    previous_hash VARCHAR(64),
    record_hash VARCHAR(64) NOT NULL UNIQUE
);

-- Trigger de Hash Inmutable
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

DROP TRIGGER IF EXISTS trg_audit_hash_chain ON audit.logs;
CREATE TRIGGER trg_audit_hash_chain
BEFORE INSERT ON audit.logs
FOR EACH ROW EXECUTE FUNCTION audit.generate_hash_chain();

-- =============================================================================
-- TABLAS DEL DOMINIO PRINCIPAL
-- =============================================================================

-- 1. Secretarías y Direcciones Municipales del GAMEA
CREATE TABLE IF NOT EXISTS public.secretarias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(32) NOT NULL UNIQUE,
    nombre VARCHAR(128) NOT NULL,
    titular VARCHAR(128) NOT NULL,
    edificio VARCHAR(128) DEFAULT 'Jach''a Uta - Casa Municipal',
    sigla VARCHAR(16) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Funcionarios / Personal Municipal
CREATE TABLE IF NOT EXISTS public.funcionarios_personal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    secretaria_id UUID REFERENCES public.secretarias(id) ON DELETE SET NULL,
    nombre_completo VARCHAR(128) NOT NULL,
    cargo VARCHAR(128) NOT NULL,
    ci VARCHAR(32) NOT NULL,
    matricula VARCHAR(32) NOT NULL UNIQUE,
    email VARCHAR(128) NOT NULL,
    telefono VARCHAR(32),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Líneas Gráficas Originales (CRUD Maestro)
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
    sub_slogan VARCHAR(256) DEFAULT 'Ciudad de Oportunidades y Trabajo',
    
    created_by VARCHAR(128) DEFAULT 'Dirección de Comunicación',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Catálogo de Materiales Institucionales que usa el Personal
CREATE TABLE IF NOT EXISTS public.materiales_catalogo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo VARCHAR(64) NOT NULL UNIQUE,
    nombre VARCHAR(128) NOT NULL,
    categoria VARCHAR(64) NOT NULL, -- 'PAPELERIA', 'IDENTIFICACION', 'PRENSA', 'DIGITAL', 'EVENTOS'
    descripcion TEXT,
    dimensiones VARCHAR(64) NOT NULL,
    soporte VARCHAR(64) NOT NULL
);

-- 5. Materiales Generados / Adaptados
CREATE TABLE IF NOT EXISTS public.materiales_generados (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    linea_grafica_id UUID REFERENCES public.lineas_graficas(id) ON DELETE CASCADE,
    material_tipo VARCHAR(64) NOT NULL,
    secretaria_id UUID REFERENCES public.secretarias(id) ON DELETE SET NULL,
    funcionario_id UUID REFERENCES public.funcionarios_personal(id) ON DELETE SET NULL,
    variables JSONB NOT NULL DEFAULT '{}'::jsonb,
    qr_token VARCHAR(128) UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- SEED DATA (DATOS SEMILLA INSTITUCIONALES)
-- =============================================================================

-- Secretarías
INSERT INTO public.secretarias (id, codigo, nombre, titular, sigla) VALUES
('a0000000-0000-0000-0000-000000000001', 'SEC-DIRCOM', 'Dirección de Comunicación Institucional', 'Lic. Nayra Choque Quispe', 'DIRCOM'),
('a0000000-0000-0000-0000-000000000002', 'SEC-MOVILIDAD', 'Secretaría Municipal de Movilidad Urbana', 'Ing. Reynaldo Cazas Mamani', 'SMMU'),
('a0000000-0000-0000-0000-000000000003', 'SEC-SALUD', 'Secretaría Municipal de Salud y Deportes', 'Dra. Beatriz Condori Callisaya', 'SMSD'),
('a0000000-0000-0000-0000-000000000004', 'SEC-FINANZAS', 'Secretaría Municipal de Administración y Finanzas', 'Lic. Carlos Huanca Tarqui', 'SMAF'),
('a0000000-0000-0000-0000-000000000005', 'SEC-DESARROLLO', 'Secretaría Municipal de Desarrollo Económico', 'Lic. Marisol Flores Tito', 'SMDE')
ON CONFLICT (codigo) DO NOTHING;

-- Funcionarios del Personal
INSERT INTO public.funcionarios_personal (id, secretaria_id, nombre_completo, cargo, ci, matricula, email, telefono) VALUES
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Nayra Choque Quispe', 'Directora de Comunicación Institucional', '6798124 LP', 'GAMEA-2026-0041', 'n.choque@elalto.gob.bo', '+591 71542109'),
('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'Reynaldo Cazas Mamani', 'Secretario de Movilidad Urbana', '4832109 LP', 'GAMEA-2026-0112', 'r.cazas@elalto.gob.bo', '+591 76219800'),
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'Beatriz Condori Callisaya', 'Secretaria Municipal de Salud', '5902143 LP', 'GAMEA-2026-0205', 'b.condori@elalto.gob.bo', '+591 73098124'),
('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Wilfredo Apaza Ramos', 'Jefe de Diseño y Comunicación Digital', '7231456 LP', 'GAMEA-2026-0331', 'w.apaza@elalto.gob.bo', '+591 70188923')
ON CONFLICT (matricula) DO NOTHING;

-- Catálogo de Materiales
INSERT INTO public.materiales_catalogo (tipo, nombre, categoria, descripcion, dimensiones, soporte) VALUES
('CREDENCIAL', 'Credencial de Identificación del Personal', 'IDENTIFICACION', 'Fotocheck vertical con foto, QR de verificación y aguayo institucional.', '54 x 86 mm', 'PVC / Impreso'),
('HOJA_MEMBRETADA', 'Hoja Membretada Oficial de Despacho', 'PAPELERIA', 'Carta/A4 para correspondencia oficial, decretos y notas de secretaría.', 'A4 (210 x 297 mm)', 'Papel Bond 90g / PDF'),
('COMUNICADO_PRENSA', 'Comunicado Oficial de Prensa con QR', 'PRENSA', 'Formato de difusión pública de urgencia con firma institucional y validación QR.', 'A4 / Digital', 'Digital y Prensa'),
('MEMORANDUM', 'Memorándum y Circular Interna', 'PAPELERIA', 'Documento para gestión y comunicación interinstitucional entre secretarías.', 'Carta (216 x 279 mm)', 'Impreso / Digital'),
('AFICHE_CONVOCATORIA', 'Afiche y Convocatoria Institucional A3', 'EVENTOS', 'Afiche oficial para ferias distritales, programas vecinales y capacitaciones.', 'A3 (297 x 420 mm)', 'Couché 150g'),
('POST_REDES_1080', 'Plantilla Post Redes Sociales (1:1)', 'DIGITAL', 'Plantilla estandarizada para Facebook, Twitter e Instagram institucional.', '1080 x 1080 px', 'Web / Redes'),
('FIRMA_CORREO', 'Firma de Correo Electrónico Institucional', 'DIGITAL', 'Tarjeta digital para emails oficiales de los funcionarios municipales.', '600 x 200 px', 'HTML / Outlook'),
('CARATULA_EXPEDIENTE', 'Carátula de Expediente y Carpeta de Proyectos', 'PAPELERIA', 'Portada oficial para carpetas de obras, auditorías y licitaciones.', 'Oficio / A4', 'Cartulina / PDF')
ON CONFLICT (tipo) DO NOTHING;

-- Líneas Gráficas Semilla
-- 1. Línea Oficial Activa: GAMEA 2026 "Orgullo Alteño"
INSERT INTO public.lineas_graficas (
    id, codigo, nombre, descripcion, year_vigencia, is_activa, estado,
    logo_svg, logo_subbrand_text, aguayo_pattern_type, aguayo_colors,
    color_primary, color_secondary, color_teal, color_gold, color_dark, color_surface,
    font_headings, font_body, slogan, sub_slogan, created_by
) VALUES (
    'c0000000-0000-0000-0000-000000000001',
    'LGO-2026-OFICIAL',
    'Línea Gráfica Maestra GAMEA 2026 - Orgullo Alteño',
    'Identidad oficial y vigente del Gobierno Autónomo Municipal de El Alto inspirada en el Aguayo y la vanguardia metropolitana.',
    2026,
    TRUE,
    'ACTIVA',
    '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="#4B008F" stroke="#F5007B" stroke-width="3"/><path d="M50 14L62 38H38L50 14Z" fill="#F5B400"/><path d="M22 42L46 54L22 66V42Z" fill="#008F89"/><path d="M78 42V66L54 54L78 42Z" fill="#F5007B"/><circle cx="50" cy="58" r="14" fill="#690BB2" stroke="#FFFFFF" stroke-width="2"/><path d="M50 49L54 57H46L50 49Z" fill="#F5B400"/><path d="M42 62H58L50 70L42 62Z" fill="#008F89"/></svg>',
    'Gobierno Autónomo Municipal de El Alto',
    'geometric_classic',
    '["#4B008F", "#F5007B", "#008F89", "#F5B400", "#690BB2"]'::jsonb,
    '#4B008F', '#F5007B', '#008F89', '#F5B400', '#090314', '#1A0E2E',
    'Gotham, Montserrat, sans-serif',
    'Poppins, Inter, sans-serif',
    'El Corazón de la Metrópoli',
    'Ciudad de Oportunidades y Trabajo',
    'Dirección de Comunicación'
),
-- 2. Línea Alternativa: Bicentenario Alteño 2026
(
    'c0000000-0000-0000-0000-000000000002',
    'LGO-2026-BICENTENARIO',
    'Línea Especial Bicentenario 2026 - Fuerza y Luz',
    'Variante conmemorativa con realce en tonos dorados, turquesa de integración y trama ceremonial de aguayo.',
    2026,
    FALSE,
    'BORRADOR',
    '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#0B2B28"/><circle cx="50" cy="50" r="38" stroke="#F5B400" stroke-width="4"/><path d="M50 18L58 36L78 40L62 54L68 74L50 62L32 74L38 54L22 40L42 36L50 18Z" fill="#F5B400"/><circle cx="50" cy="50" r="16" fill="#008F89"/><circle cx="50" cy="50" r="8" fill="#FFFFFF"/></svg>',
    'Bicentenario El Alto — GAMEA',
    'ceremonial_gold',
    '["#008F89", "#F5B400", "#4B008F", "#E6C229", "#0B2B28"]'::jsonb,
    '#008F89', '#F5B400', '#4B008F', '#E6C229', '#051817', '#0F3733',
    'Gotham, Montserrat, sans-serif',
    'Poppins, Inter, sans-serif',
    '200 Años de Soberanía e Identidad',
    'Pueblo Victorioso de Altura',
    'Comisión de Festejos y Cultura'
)
ON CONFLICT (codigo) DO NOTHING;

-- Registro de Auditoría Inicial
INSERT INTO audit.logs (user_name, action, resource_type, resource_id, payload_diff)
VALUES ('Sistema SDD', 'INIT_DATABASE', 'SCHEMA', 'EASYSTEM_DB_V1', '{"status": "Database Initialized Successfully"}'::jsonb);
