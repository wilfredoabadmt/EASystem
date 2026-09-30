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

export interface OrganigramaUnidad {
  id: string;
  name: string;
  code: string;
  category: 'ADMINISTRATIVA' | 'SUSTANTIVA' | 'CONTROL';
  direcciones?: {
    id: string;
    name: string;
    code: string;
    unidades?: string[];
  }[];
}

export interface OrganigramaNivel {
  nivel: string;
  descripcion: string;
  entidades: {
    id: string;
    name: string;
    code: string;
    color: string;
    tipo: 'CENTRAL' | 'SUBALCALDIA' | 'DESCONCENTRADO' | 'DESCENTRALIZADO';
    direcciones?: {
      name: string;
      unidades: string[];
    }[];
  }[];
}

export const ESTRUCTURA_ORGANIZACIONAL_2026 = {
  decreto: 'D.M. N° 200',
  gestion: 'Gestión 2026',
  gobierno: 'Gobierno Autónomo Municipal de El Alto',
  niveles: [
    {
      id: 'nivel_ejecutivo',
      titulo: 'Nivel Ejecutivo & Asesoramiento y Control',
      entidades: [
        {
          id: 'despacho_alcalde',
          name: 'Despacho del Alcalde',
          code: 'DESP-ALC',
          color: '#4B008F',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección General de Asesoría Legal',
              unidades: [
                'Unidad de Normas Municipales y Asuntos Administrativos',
                'Unidad de Asuntos Jurisdiccionales',
                'Unidad de Defensa y Regularización de Bienes de Dominio Municipal'
              ]
            },
            {
              name: 'Dirección de Relaciones Internacionales',
              unidades: []
            },
            {
              name: 'Unidades de Asesoramiento y Control Directo',
              unidades: [
                'Unidad Sumariante',
                'Unidad de Auditoría Interna',
                'Unidad de Transparencia y Lucha Contra la Corrupción',
                'Unidad de Relaciones Públicas y Protocolo',
                'Unidad de Límites'
              ]
            }
          ]
        },
        {
          id: 'sm_gestion_institucional',
          name: 'Secretaría Municipal de Gestión Institucional',
          code: 'SMGI',
          color: '#690BB2',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección de Comunicación (DIRCOM)',
              unidades: [
                'Unidad de Prensa',
                'Unidad de Imagen Corporativa',
                'Unidad de Comunicación Digital'
              ]
            },
            {
              name: 'Dirección de Atención Ciudadana',
              unidades: [
                'Unidad de Coordinación con Subalcaldías',
                'Unidad de Archivo Central',
                'Unidad de Prevención de Conflictos',
                'Unidad de Sistema Único de Trámites'
              ]
            },
            {
              name: 'Unidades de Soporte Institucional',
              unidades: [
                'Unidad del Observatorio Municipal',
                'Unidad de Gestión Social'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'secretarias_municipales',
      titulo: 'Secretarías Municipales (Nivel Operativo y Sustantivo)',
      entidades: [
        {
          id: 'sm_administracion_finanzas',
          name: 'Secretaría Municipal de Administración y Finanzas',
          code: 'SMAF',
          color: '#4B008F',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección de Contrataciones',
              unidades: ['Unidad de Adquisiciones y Contrataciones Menores', 'Unidad Jurídica de Contrataciones', 'Unidad de Licitaciones', 'Unidad de Almacenes']
            },
            {
              name: 'Dirección Administrativa',
              unidades: ['Unidad de Activos Fijos', 'Unidad de Servicios Generales y Mantenimiento', 'Unidad de Administración de Sistemas de Información']
            },
            {
              name: 'Dirección de Administración Tributaria Municipal',
              unidades: ['Unidad de Ingresos y Control Tributario', 'Unidad de Asesoría Jurídica y Cobranza Coactiva', 'Unidad de Fiscalización y Recaudaciones']
            },
            {
              name: 'Dirección del Tesoro Municipal',
              unidades: ['Unidad de Tesorería', 'Unidad de Presupuesto', 'Unidad de Contabilidad', 'Unidad de Crédito Público y Gestión de Financiamiento']
            },
            {
              name: 'Dirección de Talento Humano',
              unidades: ['Unidad de Registro', 'Unidad de Asesoría Legal DTH', 'Unidad de Planillas y Control', 'Unidad de Selección y Contratación', 'Unidad de Capacitación y Evaluación']
            },
            {
              name: 'Dirección de Administración Territorial y Catastro',
              unidades: ['Unidad de Catastro Municipal y Cartografía', 'Unidad Jurídica de Administración Territorial', 'Unidad de Administración Territorial']
            },
            {
              name: 'Dirección de Planificación',
              unidades: ['Unidad de Desarrollo Organizacional', 'Unidad de Programación de Operaciones', 'Unidad de Inversión Pública y Seguimiento', 'Unidad de Planificación Estratégica', 'Unidad de Ordenamiento Territorial']
            }
          ]
        },
        {
          id: 'sm_movilidad_urbana',
          name: 'Secretaría Municipal de Movilidad Urbana',
          code: 'SMMU',
          color: '#008F89',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección de Regulación de la Movilidad Urbana',
              unidades: ['Unidad de Regulación del Transporte', 'Unidad de Señalización y Semaforización', 'Unidad de Vialidad', 'Unidad de Planificación de la Movilidad Urbana Sostenible', 'Unidad Guardia Municipal de Transporte']
            },
            {
              name: 'Dirección Municipal de Transporte Público – Bus Municipal',
              unidades: ['Unidad de Mantenimiento', 'Unidad de Operaciones', 'Unidad de Administración y Recaudo']
            }
          ]
        },
        {
          id: 'sm_educacion_cultura',
          name: 'Secretaría Municipal de Educación y Cultura',
          code: 'SMEC',
          color: '#F5B400',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección de Deportes',
              unidades: ['Unidad de Infraestructura', 'Unidad de Fortalecimiento Deportivo']
            },
            {
              name: 'Dirección de Cultura',
              unidades: ['Escuela Municipal de Artes', 'Unidad de Fomento a Iniciativas Artísticas y Culturales', 'Unidad de Administración de Espacios Culturales', 'Unidad de Turismo']
            },
            {
              name: 'Dirección de Atención y Servicios de Educación',
              unidades: []
            },
            {
              name: 'Dirección de Adm. y Mejora de la Infraestructura y Equipamiento Educativo',
              unidades: ['Unidad de Programas Educativos', 'Unidad de Regularización Bienes Inmuebles Sector de Educación', 'Unidad de Mejora de la Infraestructura y Equipamiento Educativo']
            }
          ]
        },
        {
          id: 'sm_desarrollo_humano',
          name: 'Secretaría Municipal de Desarrollo Humano y Social Integral',
          code: 'SMDHSI',
          color: '#F5007B',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección de Niñez, Género y Atención Social',
              unidades: ['Unidad de la Mujer', 'Unidad de la Infancia, Niñez y Adolescencia', 'Unidad de Atención Integral a la Familia', 'Unidad de Poblaciones Diversas']
            },
            {
              name: 'Dirección de Desarrollo Integral',
              unidades: ['Unidad de Adultos Mayores', 'Unidad de la Juventud', 'Unidad de Atención a Personas con Discapacidad']
            }
          ]
        },
        {
          id: 'sm_seguridad_ciudadana',
          name: 'Secretaría Municipal de Seguridad Ciudadana',
          code: 'SMSC',
          color: '#4B008F',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección de Seguridad Pública, Programas y Soluciones Tecnológicas',
              unidades: ['Unidad de Programas de Seguridad Ciudadana y Soluciones Tecnológicas']
            },
            {
              name: 'Intendencia, Guardia y Banda Municipal',
              unidades: ['Intendencia Municipal', 'Guardia Municipal', 'Banda Municipal']
            }
          ]
        },
        {
          id: 'sm_salud',
          name: 'Secretaría Municipal de Salud',
          code: 'SMS',
          color: '#008F89',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección de Gestión en Salud',
              unidades: ['Unidad de Promoción y Prevención', 'Unidad de Epidemiología', 'Unidad de Programas y Proyectos', 'Unidad Técnica de Administración del S.U.S.']
            },
            {
              name: 'Dirección de Gestión Servicios de Salud Nivel Desconcentrado',
              unidades: []
            },
            {
              name: 'Dirección de Establecimientos de Salud de Primer Nivel',
              unidades: ['Unidad de Planificación Municipal en Salud']
            }
          ]
        },
        {
          id: 'sm_infraestructura_publica',
          name: 'Secretaría Municipal de Infraestructura Pública',
          code: 'SMIP',
          color: '#690BB2',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección de Proyectos Municipales',
              unidades: ['Unidad de Proyectos Municipales', 'Unidad de Proyectos Estratégicos']
            },
            {
              name: 'Dirección de Supervisión de Obras',
              unidades: ['Unidad de Supervisión de Obras Municipales', 'Unidad de Supervisión de Obras Estratégicas', 'Unidad de Cierre de Proyectos']
            },
            {
              name: 'Dirección de Fiscalización de Obras',
              unidades: ['Unidad de Fiscalización de Proyectos Estratégicos', 'Unidad de Fiscalización de Proyectos Municipales']
            },
            {
              name: 'Dirección de Obras Municipales',
              unidades: ['Unidad de Infraestructura Vial', 'Unidad de Infraestructura Municipal', 'Unidad de Pavimentos', 'Unidad de Mantenimiento y Bacheo', 'Unidad de Administración de Maquinarias']
            },
            {
              name: 'Dirección de Alumbrado Público',
              unidades: ['Unidad de Programas y Proyectos de Alumbrado Público', 'Unidad Operativa de Alumbrado Público']
            }
          ]
        },
        {
          id: 'sm_agua_medioambiente_riesgos',
          name: 'Secretaría Municipal de Agua, Saneamiento, Gestión Ambiental y Riesgos',
          code: 'SMASGAR',
          color: '#008F89',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección de Gestión Integral de Residuos',
              unidades: ['Unidad de Gestión de Residuos', 'Unidad de Seguimiento y Control']
            },
            {
              name: 'Dirección de Saneamiento Básico, Recursos Hídricos y Control Ambiental',
              unidades: ['Unidad de Saneamiento Básico', 'Unidad de Recursos Hídricos y Drenaje Pluvial', 'Unidad de Control y Monitoreo Ambiental', 'Unidad de Prevención y Calidad Ambiental']
            },
            {
              name: 'Dirección de Gestión de Riesgos',
              unidades: ['Unidad de Prevención de Riesgos', 'Centro de Operaciones de Emergencia (COE)']
            },
            {
              name: 'Dirección de Forestación y Áreas Protegidas',
              unidades: ['Unidad de Áreas Verdes, Protegidas y Bofedales', 'Unidad de Forestación']
            }
          ]
        },
        {
          id: 'sm_desarrollo_economico',
          name: 'Secretaría Municipal de Desarrollo Económico',
          code: 'SMDE',
          color: '#F5B400',
          tipo: 'CENTRAL' as const,
          direcciones: [
            {
              name: 'Dirección de Desarrollo Productivo Artesanal',
              unidades: ['Unidad de Promoción Artesanal', 'Unidad de Desarrollo Productivo Artesanal']
            },
            {
              name: 'Dirección de Agropecuaria y Seguridad Alimentaria',
              unidades: ['Unidad de Fortalecimiento Agropecuario', 'Unidad de Gestión de Proyectos Agropecuarios']
            },
            {
              name: 'Dirección de Desarrollo Productivo de Pequeñas y Medianas Empresas',
              unidades: ['Unidad de Competitividad y Productividad', 'Unidad de Innovación y Emprendimiento']
            },
            {
              name: 'Dirección de Servicios Municipales e Iniciativas Económicas',
              unidades: ['Unidad de Administración de Servicios Municipales', 'Unidad de Iniciativas Económicas']
            },
            {
              name: 'Dirección de Ferias y Mercados',
              unidades: ['Unidad de Ferias', 'Unidad de Mercados']
            }
          ]
        }
      ]
    },
    {
      id: 'subalcaldias_distritales',
      titulo: 'Subalcaldías Distritales (Distritos 1 al 14)',
      entidades: Array.from({ length: 14 }, (_, i) => {
        const distNum = i + 1;
        const esRural = [9, 10, 11, 13].includes(distNum);
        return {
          id: `subalcaldia_d${distNum}`,
          name: `Subalcaldía Distrito Municipal - ${distNum} (${esRural ? 'Distrito Rural' : 'Distrito Urbano'})`,
          code: `SDM-${distNum}`,
          color: esRural ? '#008F89' : '#4B008F',
          tipo: 'SUBALCALDIA' as const,
          direcciones: [
            {
              name: `Estructura Operativa Distrito ${distNum}`,
              unidades: [
                'Unidad de Infraestructura Pública',
                'Unidad de Desarrollo Humano',
                'Asesoría Jurídica Distrital',
                'Unidad de Finanzas y Administración'
              ]
            }
          ]
        };
      })
    },
    {
      id: 'entidades_desconcentradas_salud',
      titulo: 'Hospitales Municipales y Redes de Salud (Nivel Desconcentrado)',
      entidades: [
        { id: 'hosp_holandes', name: 'Hospital Municipal Boliviano Holandés', code: 'HMBH', color: '#008F89', tipo: 'DESCONCENTRADO' as const },
        { id: 'hosp_los_andes', name: 'Hospital Municipal Los Andes', code: 'HMLA', color: '#008F89', tipo: 'DESCONCENTRADO' as const },
        { id: 'hosp_corea', name: 'Hospital Municipal Modelo Corea', code: 'HMMC', color: '#008F89', tipo: 'DESCONCENTRADO' as const },
        { id: 'hosp_qullan_uta', name: 'Hospital Municipal Qullañ Uta', code: 'HMQU', color: '#008F89', tipo: 'DESCONCENTRADO' as const },
        { id: 'hosp_japones', name: 'Hospital Municipal Modelo Boliviano Japonés', code: 'HMMBJ', color: '#008F89', tipo: 'DESCONCENTRADO' as const },
        { id: 'lab_oxigeno', name: 'Laboratorio Industrial de Oxígeno Medicinal – GAMEA', code: 'LIOM', color: '#008F89', tipo: 'DESCONCENTRADO' as const },
        { id: 'red_corea', name: 'Red de Salud Municipal Corea', code: 'RSM-COR', color: '#008F89', tipo: 'DESCONCENTRADO' as const },
        { id: 'red_los_andes', name: 'Red de Salud Municipal Los Andes', code: 'RSM-AND', color: '#008F89', tipo: 'DESCONCENTRADO' as const },
        { id: 'red_holandes', name: 'Red de Salud Municipal Holandés', code: 'RSM-HOL', color: '#008F89', tipo: 'DESCONCENTRADO' as const },
        { id: 'red_lotes', name: 'Red de Salud Municipal Lotes y Servicios', code: 'RSM-LOT', color: '#008F89', tipo: 'DESCONCENTRADO' as const },
        { id: 'red_senkata', name: 'Red de Salud Municipal Senkata', code: 'RSM-SEN', color: '#008F89', tipo: 'DESCONCENTRADO' as const }
      ]
    },
    {
      id: 'entidades_descentralizadas',
      titulo: 'Entidades Municipales Descentralizadas',
      entidades: [
        { id: 'terminal_metropolitana', name: 'Terminal Metropolitana El Alto', code: 'TMEA', color: '#F5B400', tipo: 'DESCENTRALIZADO' as const },
        { id: 'bus_municipal', name: 'Empresa Municipal de Transporte Público – Bus Municipal', code: 'EBUS', color: '#F5007B', tipo: 'DESCENTRALIZADO' as const }
      ]
    }
  ]
};

// Lista plana combinada de todas las entidades oficiales para selectores y filtros
export const SECRETARIAS_MUNICIPALES = [
  // 1. Ejecutivo y Gestión Central
  { id: 'despacho_alcalde', name: 'Despacho del Alcalde', code: 'DESP-ALC', color: '#4B008F', category: 'Nivel Ejecutivo' },
  { id: 'comunicacion', name: 'Dirección de Comunicación (DIRCOM)', code: 'DIRCOM', color: '#F5007B', category: 'Gestión Institucional' },
  { id: 'sm_gestion_institucional', name: 'Secretaría Municipal de Gestión Institucional', code: 'SMGI', color: '#690BB2', category: 'Gestión Institucional' },
  
  // 2. Secretarías Municipales Sustantivas
  { id: 'sm_administracion_finanzas', name: 'Secretaría Municipal de Administración y Finanzas', code: 'SMAF', color: '#4B008F', category: 'Secretaría Municipal' },
  { id: 'sm_movilidad_urbana', name: 'Secretaría Municipal de Movilidad Urbana', code: 'SMMU', color: '#008F89', category: 'Secretaría Municipal' },
  { id: 'sm_educacion_cultura', name: 'Secretaría Municipal de Educación y Cultura', code: 'SMEC', color: '#F5B400', category: 'Secretaría Municipal' },
  { id: 'sm_desarrollo_humano', name: 'Secretaría Municipal de Desarrollo Humano y Social Integral', code: 'SMDHSI', color: '#F5007B', category: 'Secretaría Municipal' },
  { id: 'sm_seguridad_ciudadana', name: 'Secretaría Municipal de Seguridad Ciudadana', code: 'SMSC', color: '#4B008F', category: 'Secretaría Municipal' },
  { id: 'sm_salud', name: 'Secretaría Municipal de Salud', code: 'SMS', color: '#008F89', category: 'Secretaría Municipal' },
  { id: 'sm_infraestructura_publica', name: 'Secretaría Municipal de Infraestructura Pública', code: 'SMIP', color: '#690BB2', category: 'Secretaría Municipal' },
  { id: 'sm_agua_medioambiente_riesgos', name: 'Secretaría Municipal de Agua, Saneamiento, Gestión Ambiental y Riesgos', code: 'SMASGAR', color: '#008F89', category: 'Secretaría Municipal' },
  { id: 'sm_desarrollo_economico', name: 'Secretaría Municipal de Desarrollo Económico', code: 'SMDE', color: '#F5B400', category: 'Secretaría Municipal' },

  // 3. Subalcaldías Distritales
  ...Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    const esRural = [9, 10, 11, 13].includes(num);
    return {
      id: `subalcaldia_d${num}`,
      name: `Subalcaldía Distrito Municipal - ${num}`,
      code: `SDM-${num}`,
      color: esRural ? '#008F89' : '#4B008F',
      category: 'Subalcaldías Distritales'
    };
  }),

  // 4. Hospitales Municipales
  { id: 'hosp_holandes', name: 'Hospital Municipal Boliviano Holandés', code: 'HMBH', color: '#008F89', category: 'Hospitales Municipales' },
  { id: 'hosp_los_andes', name: 'Hospital Municipal Los Andes', code: 'HMLA', color: '#008F89', category: 'Hospitales Municipales' },
  { id: 'hosp_corea', name: 'Hospital Municipal Modelo Corea', code: 'HMMC', color: '#008F89', category: 'Hospitales Municipales' },
  { id: 'hosp_qullan_uta', name: 'Hospital Municipal Qullañ Uta', code: 'HMQU', color: '#008F89', category: 'Hospitales Municipales' },
  { id: 'hosp_japones', name: 'Hospital Municipal Modelo Boliviano Japonés', code: 'HMMBJ', color: '#008F89', category: 'Hospitales Municipales' },

  // 5. Entidades Descentralizadas
  { id: 'terminal_metropolitana', name: 'Terminal Metropolitana El Alto', code: 'TMEA', color: '#F5B400', category: 'Entidades Descentralizadas' },
  { id: 'bus_municipal', name: 'Bus Municipal de El Alto', code: 'EBUS', color: '#F5007B', category: 'Entidades Descentralizadas' }
];

export const BRAND_MODULES_16 = [
  { id: 1, title: 'Presentación de Marca', category: 'Identidad', desc: 'Introducción a la identidad oficial de la metrópoli alteña.' },
  { id: 2, title: 'Estructura Organizacional (D.M. 200)', category: 'Gobernanza', desc: 'Organigrama oficial del Órgano Ejecutivo aprobado con Decreto Municipal N° 200.' },
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
