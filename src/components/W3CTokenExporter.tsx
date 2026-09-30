import React, { useState } from 'react';
import { 
  Code, 
  Copy, 
  Check, 
  Download, 
  FileJson, 
  Layers, 
  Sparkles,
  Terminal
} from 'lucide-react';
import { BRAND_TOKENS } from '../tokens/brandTokens';

export const W3CTokenExporter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeFormat, setActiveFormat] = useState<'W3C_DTCG' | 'CSS_VARS' | 'TAILWIND'>('W3C_DTCG');

  // Estructura oficial según la W3C Design Tokens Community Group (DTCG)
  const dtcgTokens = {
    $name: "EASystem Municipal Design Tokens",
    $version: "2.1.0",
    $author: "Gobierno Autónomo Municipal de El Alto (GAMEA)",
    color: {
      brand: {
        primary: {
          $value: BRAND_TOKENS.colors.primaryPurple,
          $type: "color",
          $description: "Púrpura Alteño: Institucionalidad, Liderazgo y Soberanía"
        },
        secondary: {
          $value: BRAND_TOKENS.colors.secondaryPink,
          $type: "color",
          $description: "Rosa Rebelde: Juventud, Fuerza y Dinamismo"
        },
        teal: {
          $value: BRAND_TOKENS.colors.tealFuture,
          $type: "color",
          $description: "Turquesa Integración: Modernidad y Futuro Tecnológico"
        },
        gold: {
          $value: BRAND_TOKENS.colors.goldCulture,
          $type: "color",
          $description: "Oro Andino: Riqueza Cultural y Economía Popular"
        },
        purpleDeep: {
          $value: BRAND_TOKENS.colors.purpleDeep,
          $type: "color",
          $description: "Púrpura Profundo: Soporte tipográfico y contraste"
        }
      },
      surface: {
        dark: { $value: BRAND_TOKENS.colors.bgDark, $type: "color" },
        card: { $value: BRAND_TOKENS.colors.bgCard, $type: "color" },
        elevated: { $value: BRAND_TOKENS.colors.bgElevated, $type: "color" }
      }
    },
    typography: {
      fontFamily: {
        heading: { $value: "Montserrat, sans-serif", $type: "fontFamily" },
        body: { $value: "Poppins, sans-serif", $type: "fontFamily" }
      }
    },
    dimension: {
      radius: {
        sm: { $value: "6px", $type: "dimension" },
        md: { $value: "12px", $type: "dimension" },
        lg: { $value: "20px", $type: "dimension" },
        full: { $value: "9999px", $type: "dimension" }
      }
    }
  };

  const cssVariables = `:root {
  /* EASystem Design Tokens - GAMEA El Alto */
  --ea-primary: ${BRAND_TOKENS.colors.primaryPurple};
  --ea-secondary: ${BRAND_TOKENS.colors.secondaryPink};
  --ea-teal: ${BRAND_TOKENS.colors.tealFuture};
  --ea-gold: ${BRAND_TOKENS.colors.goldCulture};
  --ea-purple-deep: ${BRAND_TOKENS.colors.purpleDeep};
  
  --ea-bg-dark: ${BRAND_TOKENS.colors.bgDark};
  --ea-bg-card: ${BRAND_TOKENS.colors.bgCard};
  --ea-bg-elevated: ${BRAND_TOKENS.colors.bgElevated};

  --ea-font-heading: 'Montserrat', sans-serif;
  --ea-font-body: 'Poppins', sans-serif;
}`;

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'ea-purple': '${BRAND_TOKENS.colors.primaryPurple}',
        'ea-pink': '${BRAND_TOKENS.colors.secondaryPink}',
        'ea-teal': '${BRAND_TOKENS.colors.tealFuture}',
        'ea-gold': '${BRAND_TOKENS.colors.goldCulture}',
        'ea-purple-deep': '${BRAND_TOKENS.colors.purpleDeep}',
        'ea-dark': '${BRAND_TOKENS.colors.bgDark}',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      }
    }
  }
};`;

  const getActiveCode = () => {
    switch (activeFormat) {
      case 'W3C_DTCG':
        return JSON.stringify(dtcgTokens, null, 2);
      case 'CSS_VARS':
        return cssVariables;
      case 'TAILWIND':
        return tailwindConfig;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeFormat === 'W3C_DTCG' 
      ? 'easystem-tokens.json' 
      : activeFormat === 'CSS_VARS' 
        ? 'easystem-tokens.css' 
        : 'tailwind.easystem.config.js';
    const blob = new Blob([getActiveCode()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ea-card" style={{ padding: '28px', marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="ea-badge ea-badge-teal" style={{ marginBottom: '8px' }}>
            Estándar Internacional para Equipos de Diseño y Desarrollo
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
            Exportador de Colores y Estilos Institucionales
          </h3>
          <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
            Exporta los colores y tipografías oficiales para que diseñadores y desarrolladores web los usen en sus programas.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleCopy}
            className="ea-btn ea-btn-secondary"
            style={{ fontSize: '0.82rem', padding: '8px 16px' }}
          >
            {copied ? <Check size={14} color="var(--ea-teal)" /> : <Copy size={14} />}
            <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="ea-btn ea-btn-primary"
            style={{ fontSize: '0.82rem', padding: '8px 16px' }}
          >
            <Download size={14} />
            <span>Descargar Archivo</span>
          </button>
        </div>
      </div>

      {/* Tabs de Formato */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {[
          { id: 'W3C_DTCG', label: 'Formato Universal (JSON / Figma)', icon: FileJson },
          { id: 'CSS_VARS', label: 'Variables Web (CSS)', icon: Code },
          { id: 'TAILWIND', label: 'Configuración Web (Tailwind)', icon: Terminal },
        ].map(fmt => {
          const Icon = fmt.icon;
          const isActive = activeFormat === fmt.id;
          return (
            <button
              key={fmt.id}
              onClick={() => setActiveFormat(fmt.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: isActive ? '1px solid var(--ea-teal)' : '1px solid var(--ea-border)',
                background: isActive ? 'rgba(0, 143, 137, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                color: isActive ? '#FFFFFF' : 'var(--ea-text-muted)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Icon size={14} color={isActive ? 'var(--ea-teal)' : undefined} />
              <span>{fmt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Visor de Código */}
      <div style={{
        background: '#070210',
        borderRadius: '12px',
        border: '1px solid var(--ea-border)',
        padding: '16px',
        maxHeight: '320px',
        overflowY: 'auto',
        fontFamily: "'Fira Code', 'Consolas', monospace",
        fontSize: '0.82rem',
        color: '#E0E7FF',
        lineHeight: 1.6
      }}>
        <pre style={{ margin: 0 }}>
          {getActiveCode()}
        </pre>
      </div>
    </div>
  );
};
