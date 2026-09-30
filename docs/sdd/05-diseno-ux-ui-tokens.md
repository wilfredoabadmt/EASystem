# DOCUMENTO 05: DISEÑO UX/UI Y SISTEMA DE DESIGN TOKENS (W3C COMPLIANT)
## EL ALTO DIGITAL EASYSTEM (EASystem)
**Gobierno Autónomo Municipal de El Alto — Dirección de Comunicación**

---

### METADATOS DEL DOCUMENTO
- **Código**: `DOC-SDD-005`
- **Versión**: `1.0.0`
- **Fecha**: `2026-09-29`
- **Estado**: `Aprobado por el Equipo Multidisciplinario`
- **Autores**: UX/UI Lead & Branding Specialist

---

## 1. PRINCIPIOS DE EXPERIENCIA DE USUARIO (UX GUBERNAMENTAL)

1. **Dignidad e Identidad Metropoliana**: La interfaz celebra la fuerza de El Alto con estética premium, modo oscuro institucional, micro-animaciones fluidas y gradientes calculados que evocan la luz andina y los textiles del aguayo.
2. **Cero Fricción en Tareas Críticas**: Un funcionario debe ser capaz de emitir un comunicado oficial o generar una tarjeta de redes sociales en menos de 3 clics sin conocimientos previos de diseño gráfico.
3. **Claridad Visual y Jerarquía Estricta**: La información debe ser evidente de un vistazo; estados de error claros y sin ambigüedades.
4. **Accesibilidad Universal (A11y)**: Ratios de contraste superiores a 4.5:1 para texto normal y 3:1 para elementos de interfaz, navegación 100% operable por teclado y etiquetas ARIA en todos los componentes interactivos.

---

## 2. ESPECIFICACIÓN TÉCNICA DE DESIGN TOKENS (FORMATO W3C STANDARD)

Los Design Tokens de EASystem se compilan automáticamente a CSS Custom Properties, JSON para aplicaciones móviles y SCSS para sistemas heredados.

```json
{
  "brand": {
    "color": {
      "primary": {
        "value": "#4B008F",
        "type": "color",
        "description": "Púrpura Alteño - Color primario institucional"
      },
      "secondary": {
        "value": "#F5007B",
        "type": "color",
        "description": "Rosa Rebelde - Dinamismo y juventud alteña"
      },
      "teal": {
        "value": "#008F89",
        "type": "color",
        "description": "Turquesa Integración - Visión de futuro y tecnología"
      },
      "gold": {
        "value": "#F5B400",
        "type": "color",
        "description": "Oro Cultura - Riqueza andina y comercio"
      },
      "purpleDeep": {
        "value": "#690BB2",
        "type": "color",
        "description": "Púrpura Profundo - Contraste institucional secundario"
      }
    },
    "typography": {
      "fontFamily": {
        "heading": {
          "value": "'Gotham', 'Montserrat', -apple-system, sans-serif",
          "type": "fontFamily",
          "description": "Fuente mandataria para titulares y logotipos"
        },
        "body": {
          "value": "'Poppins', 'Segoe UI', -apple-system, sans-serif",
          "type": "fontFamily",
          "description": "Fuente para cuerpos de texto, UI y lecturas prolongadas"
        }
      },
      "fontSize": {
        "xs": { "value": "0.75rem", "type": "dimension" },
        "sm": { "value": "0.875rem", "type": "dimension" },
        "base": { "value": "1.0rem", "type": "dimension" },
        "lg": { "value": "1.125rem", "type": "dimension" },
        "xl": { "value": "1.25rem", "type": "dimension" },
        "2xl": { "value": "1.5rem", "type": "dimension" },
        "3xl": { "value": "2.0rem", "type": "dimension" },
        "4xl": { "value": "2.5rem", "type": "dimension" },
        "hero": { "value": "3.5rem", "type": "dimension" }
      }
    },
    "spacing": {
      "none": { "value": "0px", "type": "dimension" },
      "xs": { "value": "4px", "type": "dimension" },
      "sm": { "value": "8px", "type": "dimension" },
      "md": { "value": "16px", "type": "dimension" },
      "lg": { "value": "24px", "type": "dimension" },
      "xl": { "value": "32px", "type": "dimension" },
      "2xl": { "value": "48px", "type": "dimension" },
      "3xl": { "value": "64px", "type": "dimension" }
    },
    "borderRadius": {
      "none": { "value": "0px", "type": "dimension" },
      "sm": { "value": "4px", "type": "dimension" },
      "md": { "value": "8px", "type": "dimension" },
      "lg": { "value": "16px", "type": "dimension" },
      "full": { "value": "9999px", "type": "dimension" }
    },
    "shadows": {
      "card": {
        "value": "0 10px 30px -5px rgba(75, 0, 143, 0.15)",
        "type": "boxShadow"
      },
      "glowPurple": {
        "value": "0 0 25px rgba(75, 0, 143, 0.4)",
        "type": "boxShadow"
      },
      "glowPink": {
        "value": "0 0 25px rgba(245, 0, 123, 0.4)",
        "type": "boxShadow"
      }
    }
  }
}
```

---

## 3. COMPILACIÓN A VARIABLES CSS NATIVAS (`tokens.css`)

```css
:root {
  /* Paleta Institucional El Alto */
  --ea-color-primary: #4B008F;
  --ea-color-primary-rgb: 75, 0, 143;
  --ea-color-secondary: #F5007B;
  --ea-color-secondary-rgb: 245, 0, 123;
  --ea-color-teal: #008F89;
  --ea-color-gold: #F5B400;
  --ea-color-purple-deep: #690BB2;

  /* Superficies y Fondos */
  --ea-bg-dark: #0F081D;
  --ea-bg-card: #180E2E;
  --ea-bg-card-hover: #221440;
  --ea-border-subtle: rgba(255, 255, 255, 0.08);
  --ea-border-highlight: rgba(245, 0, 123, 0.3);

  /* Tipografías */
  --ea-font-heading: 'Gotham', 'Montserrat', -apple-system, sans-serif;
  --ea-font-body: 'Poppins', 'Segoe UI', -apple-system, sans-serif;

  /* Espaciado Modular */
  --ea-space-xs: 4px;
  --ea-space-sm: 8px;
  --ea-space-md: 16px;
  --ea-space-lg: 24px;
  --ea-space-xl: 32px;
  --ea-space-2xl: 48px;

  /* Radios y Sombras */
  --ea-radius-sm: 4px;
  --ea-radius-md: 8px;
  --ea-radius-lg: 16px;
  --ea-shadow-card: 0 10px 30px -5px rgba(0, 0, 0, 0.5);
  --ea-shadow-brand: 0 4px 20px rgba(75, 0, 143, 0.35);
}
```

---

## 4. ESPECIFICACIÓN DE COMPONENTES CORE DEL DESIGN SYSTEM

1. **Button (Botón Gubernamental)**:
   - Variantes: `primary` (gradiente Púrpura Alteño a Rosa Rebelde con glow en hover), `secondary` (borde con sutil brillo turquesa), `outline`, `ghost`.
   - Micro-interacción: escala 0.98 al hacer clic, brillo interior sutil al pasar el cursor.
2. **Brand Card (Contenedor de Activos y Módulos)**:
   - Fondo en cristal ahumado oscuro (glassmorphism: `backdrop-filter: blur(12px)`), borde perimetral sutil que reacciona a los colores del aguayo.
3. **Score Gauge (Indicador de Validación de Marca)**:
   - Anillo circular interactivo que anima de 0 a 100%. Color dinámico: 0-69% (Rojo), 70-89% (Amarillo Oro), 90-100% (Verde/Turquesa Integración).
4. **Aguayo Banner Grid**:
   - Elemento decorativo vectorial responsivo que dibuja la trama geométrica andina de fondo con opacidad baja (6-10%) para enmarcar comunicados y diplomas oficiales.
