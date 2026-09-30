# DOCUMENTO 09: ESTRATEGIA INTEGRAL DE PRUEBAS Y ASEGURAMIENTO DE CALIDAD (QA)
## EL ALTO DIGITAL EASYSTEM (EASystem)
**Gobierno Autónomo Municipal de El Alto — Dirección de Comunicación**

---

### METADATOS DEL DOCUMENTO
- **Código**: `DOC-SDD-009`
- **Versión**: `1.0.0`
- **Fecha**: `2026-09-29`
- **Estado**: `Aprobado por el Equipo Multidisciplinario`
- **Autores**: QA Lead & Arquitecto de Software Senior

---

## 1. PIRÁMIDE DE PRUEBAS DE EASystem

```
                     ▲
                    / \
                   /   \
                  / E2E \   <- Flujos completos de usuario (Playwright)
                 /-------\
                /  Brand  \  <- Auditoría de Brand Score y Renderizado Gráfico
               /  Visual   \
              /-------------\
             / Integración   \ <- Contratos de API, Auth RBAC y Base de Datos
            /-----------------\
           /   Unitarias       \ <- Tokens W3C, Funciones puras, Cálculos de Color
          /---------------------\
```

---

## 2. SUITES DE PRUEBAS OBLIGATORIAS

### 2.1. Pruebas Unitarias (Jest / Vitest)
- **Tokens de Color**: Verificar que la conversión de `#4B008F` a RGB y CMYK cumpla con los valores normalizados en el Manual Institucional.
- **Álgebra de Área Segura**: Validar que la función de cálculo de retícula reserve exactamente $2X$ unidades perimetrales sin importar la escala del imagotipo.
- **Validación de Payloads Zod**: Asegurar que peticiones con colores no autorizados o formatos fuera de especificación sean rechazadas inmediatamente.

### 2.2. Pruebas de Integración de API (Supertest)
- **Aislamiento de RBAC**: Comprobar que un `USUARIO_MUNICIPAL` reciba un error `403 Forbidden` si intenta publicar una campaña de crisis o modificar los Tokens institucionales.
- **Cadena de Auditoría Inmutable**: Comprobar que tras insertar una serie de eventos, la verificación de `record_hash` SHA-256 coincida exactamente con la secuencia esperada.

### 2.3. Pruebas Visuales y de Renderizado de Marca (Brand Quality Gate)
- **Fidelidad Tipográfica**: Comprobación de que los PDFs generados a 300 DPI tengan las fuentes Gotham y Poppins vectorizadas y no convertidas a mapa de bits pixelado.
- **Resistencia al Camino Infeliz**:
  - Subida de archivos corruptos o extensiones falsificadas (ej. un ejecutable renombrado a `.png`).
  - Textos de comunicado con caracteres especiales andinos (aymara) o longitud extrema para comprobar que el texto no desborde el canvas ni tape el imagotipo.

### 2.4. Pruebas End-to-End (E2E) con Playwright
1. **Flujo Público**: Carga de la Landing -> Navegación interactiva por el concepto del aguayo -> Descarga de logo oficial en SVG.
2. **Flujo de Operación Municipal**: Inicio de sesión como usuario municipal -> Selección de plantilla de Comunicado A4 -> Redacción de titular y cuerpo -> Previsualización -> Descarga de PDF con código QR operativo.
3. **Flujo de Auditoría DirCom**: Subida de afiche al Brand Validator -> Verificación de que el reporte señale correctamente el Brand Score obtenido y marque en rojo el elemento infractor si existe deformación.
