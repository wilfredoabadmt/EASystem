/**
 * DESIGN TOKENS OFICIALES — EL ALTO DIGITAL EASYSTEM
 * Basado en el Manual de Imagen Institucional del GAMEA
 */

export const BRAND_TOKENS = {
  colors: {
    primaryPurple: '#4B008F',    // Púrpura Alteño (Institucionalidad, Liderazgo)
    secondaryPink: '#F5007B',    // Rosa Rebelde (Juventud, Fuerza, Dinamismo)
    tealFuture: '#008F89',       // Turquesa Integración (Tecnología, Futuro)
    goldCulture: '#F5B400',      // Oro Cultura / Sol Andino (Economía, Riqueza Ancestral)
    purpleDeep: '#690BB2',       // Púrpura Profundo (Soporte, Contraste)
    
    // Tonos de fondo y UI
    bgDark: '#0B0517',
    bgCard: '#150A2B',
    bgCardHover: '#201040',
    bgElevated: '#2A1454',
    textLight: '#F8F9FA',
    textMuted: '#B8ACCB',
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(245, 0, 123, 0.35)',
    successTeal: '#008F89',
    warningGold: '#F5B400',
    errorRed: '#FF3366',
  },
  typography: {
    headingFont: "'Montserrat', 'Gotham', -apple-system, sans-serif",
    bodyFont: "'Poppins', -apple-system, sans-serif",
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '20px',
    full: '9999px',
  },
  shadows: {
    card: '0 12px 36px -8px rgba(0, 0, 0, 0.6)',
    glowPurple: '0 0 30px rgba(75, 0, 143, 0.45)',
    glowPink: '0 0 30px rgba(245, 0, 123, 0.45)',
    glowTeal: '0 0 30px rgba(0, 143, 137, 0.45)',
  }
};

export const SECRETARIAS_MUNICIPALES = [
  { id: 'alcaldia', name: 'Despacho del Alcalde', code: 'DESP-ALC', color: '#4B008F' },
  { id: 'comunicacion', name: 'Dirección de Comunicación Institucional', code: 'DIRCOM', color: '#F5007B' },
  { id: 'movilidad', name: 'Secretaría Municipal de Movilidad Urbana', code: 'SMMU', color: '#008F89' },
  { id: 'salud', name: 'Secretaría Municipal de Salud y Deportes', code: 'SMSD', color: '#008F89' },
  { id: 'educacion', name: 'Secretaría de Educación y Cultura', code: 'SMEC', color: '#F5B400' },
  { id: 'infraestructura', name: 'Secretaría de Infraestructura Pública', code: 'SMIP', color: '#690BB2' },
  { id: 'desarrollo_economico', name: 'Secretaría de Desarrollo Económico', code: 'SMDE', color: '#F5B400' },
  { id: 'seguridad', name: 'Secretaría de Seguridad Ciudadana', code: 'SMSC', color: '#4B008F' }
];

export const BRAND_MODULES_16 = [
  { id: 1, title: 'Presentación de Marca', category: 'Identidad', desc: 'Introducción a la identidad oficial de la metrópoli alteña.' },
  { id: 2, title: 'Misión Institucional', category: 'Estrategia', desc: 'Propósito gubernamental del Gobierno Autónomo Municipal.' },
  { id: 3, title: 'Visión de Futuro', category: 'Estrategia', desc: 'El Alto como corazón industrial y tecnológico de Bolivia.' },
  { id: 4, title: 'Valores Alteños', category: 'Identidad', desc: 'Fuerza, valentía, honestidad, comunidad y resiliencia.' },
  { id: 5, title: 'Concepto del Aguayo', category: 'Semiótica', desc: 'El tejido andino ancestral transformado en líneas de conectividad digital.' },
  { id: 6, title: 'Patrones Textiles', category: 'Gráfica', desc: 'Tramas geométricas vectoriales para enmarcado y texturas.' },
  { id: 7, title: 'Imagotipo Central', category: 'Normativa', desc: 'Construcción geométrica y simbólica del logotipo principal.' },
  { id: 8, title: 'Retícula de Construcción', category: 'Normativa', desc: 'Módulos X y proporciones matemáticas de la marca.' },
  { id: 9, title: 'Área Segura (Reserva)', category: 'Normativa', desc: 'Espacio mínimo obligatorio para proteger la legibilidad.' },
  { id: 10, title: 'Usos Incorrectos', category: 'Protección', desc: 'Prohibiciones de distorsión, sombras duras o colores no oficiales.' },
  { id: 11, title: 'Paleta Cromática', category: 'Tokens', desc: 'Púrpura Alteño, Rosa Rebelde, Turquesa, Oro y Púrpura Profundo.' },
  { id: 12, title: 'Tipografías Gotham y Poppins', category: 'Tokens', desc: 'Pesos, jerarquías para titulares, cuerpos y web.' },
  { id: 13, title: 'Papelería Oficial', category: 'Aplicaciones', desc: 'Hojas membretadas, sobres, carpetas y credenciales.' },
  { id: 14, title: 'Merchandising Institucional', category: 'Aplicaciones', desc: 'Chalecos, gorras, tazas, bolígrafos y elementos urbanos.' },
  { id: 15, title: 'Eventos y Escenografías', category: 'Aplicaciones', desc: 'Podios, backings de prensa y vallas de inauguración.' },
  { id: 16, title: 'Parque Automotor', category: 'Aplicaciones', desc: 'Rotulación vehicular para ambulancias, patrullas y buses municipales.' }
];
