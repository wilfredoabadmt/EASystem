import React, { useState } from 'react';
import { 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  Info, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Copy, 
  Check 
} from 'lucide-react';

interface ColorItem {
  name: string;
  hex: string;
  category: string;
}

const OFFICIAL_COLORS: ColorItem[] = [
  { name: 'Púrpura Alteño', hex: '#4B008F', category: 'Principal' },
  { name: 'Rosa Rebelde', hex: '#F5007B', category: 'Secundario' },
  { name: 'Turquesa Integración', hex: '#008F89', category: 'Complementario' },
  { name: 'Oro Cultura', hex: '#F5B400', category: 'Acento' },
  { name: 'Púrpura Profundo', hex: '#690BB2', category: 'Soporte' },
  { name: 'Blanco Institucional', hex: '#FFFFFF', category: 'Base Clara' },
  { name: 'Fondo Nocturno', hex: '#090314', category: 'Base Oscura' }
];

// Algoritmo matemático oficial W3C WCAG 2.1 para Luminancia Relativa
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const sRGB = [r, g, b].map(val => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

// Cálculo del ratio de contraste (L1 + 0.05) / (L2 + 0.05)
export function calculateContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (brighter + 0.05) / (darker + 0.05);
}

export const AccessibilityContrastMatrix: React.FC = () => {
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#4B008F');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [copied, setCopied] = useState(false);

  const ratio = calculateContrastRatio(textColor, bgColor);
  const roundedRatio = Math.round(ratio * 10) / 10;

  // Criterios de Aceptación WCAG 2.1
  const passesNormalAA = ratio >= 4.5;
  const passesNormalAAA = ratio >= 7.0;
  const passesLargeAA = ratio >= 3.0;
  const passesLargeAAA = ratio >= 4.5;
  const passesUI = ratio >= 3.0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Encabezado */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(0, 143, 137, 0.2), rgba(75, 0, 143, 0.3))',
        border: '1px solid var(--ea-teal)',
        borderRadius: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '12px',
            borderRadius: '12px',
            background: 'var(--ea-teal)',
            color: '#FFFFFF'
          }}>
            <Eye size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                Matriz de Accesibilidad y Contraste WCAG 2.1 AA / AAA
              </h3>
              <span className="ea-badge ea-badge-teal" style={{ fontSize: '0.65rem' }}>
                ESTÁNDAR CITY OF LA / USWDS
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', color: 'var(--ea-text-muted)', fontSize: '0.85rem' }}>
              Garantiza que toda pieza gráfica, portal web y documento emitido por las secretarías sea 100% legible para toda la ciudadanía alteña.
            </p>
          </div>
        </div>
      </div>

      {/* Probador Interactivo en Vivo */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* Panel de Controles del Probador */}
        <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="var(--ea-gold)" />
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Calculadora de Contraste en Vivo</h4>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>COLOR DE TEXTO:</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                style={{ width: '40px', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'transparent' }}
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                style={{ flex: 1, padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--ea-border)', borderRadius: '8px', color: '#FFF', fontFamily: 'monospace' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>COLOR DE FONDO:</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ width: '40px', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'transparent' }}
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ flex: 1, padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--ea-border)', borderRadius: '8px', color: '#FFF', fontFamily: 'monospace' }}
              />
            </div>
          </div>

          {/* Presets Rápidos de la Paleta Oficial */}
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ea-text-muted)', marginBottom: '6px', display: 'block' }}>
              COMBINACIONES OFICIALES FRECUENTES:
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { label: 'Blanco s/ Púrpura', text: '#FFFFFF', bg: '#4B008F' },
                { label: 'Oro s/ Púrpura', text: '#F5B400', bg: '#4B008F' },
                { label: 'Blanco s/ Turquesa', text: '#FFFFFF', bg: '#008F89' },
                { label: 'Púrpura s/ Blanco', text: '#4B008F', bg: '#FFFFFF' },
                { label: 'Rosa s/ Fondo', text: '#F5007B', bg: '#090314' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTextColor(preset.text);
                    setBgColor(preset.bg);
                  }}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--ea-border)',
                    color: '#FFF',
                    cursor: 'pointer'
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Previsualización y Diagnóstico */}
        <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Previsualización y Diagnóstico</h4>
            <div style={{
              fontSize: '1.3rem',
              fontWeight: 900,
              color: passesNormalAA ? 'var(--ea-teal)' : '#EF4444'
            }}>
              {roundedRatio}:1
            </div>
          </div>

          {/* Caja de muestra real */}
          <div style={{
            backgroundColor: bgColor,
            color: textColor,
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            minHeight: '130px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', fontWeight: 800 }}>
              Gobierno Autónomo Municipal de El Alto
            </h4>
            <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.4' }}>
              "El Corazón de la Metrópoli en la Era Digital" — Texto de prueba para verificación de contraste en pantallas y afiches impresos.
            </p>
          </div>

          {/* Tabla de Calificaciones WCAG */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{
              background: passesNormalAA ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${passesNormalAA ? '#10B981' : '#EF4444'}`,
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--ea-text-muted)' }}>Texto Normal</div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', marginTop: '2px', color: passesNormalAA ? '#10B981' : '#EF4444' }}>
                {passesNormalAAA ? 'AAA Pass' : passesNormalAA ? 'AA Pass' : 'Falla (<4.5:1)'}
              </div>
            </div>

            <div style={{
              background: passesLargeAA ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${passesLargeAA ? '#10B981' : '#EF4444'}`,
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--ea-text-muted)' }}>Texto Titulares</div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', marginTop: '2px', color: passesLargeAA ? '#10B981' : '#EF4444' }}>
                {passesLargeAAA ? 'AAA Pass' : passesLargeAA ? 'AA Pass' : 'Falla (<3.0:1)'}
              </div>
            </div>

            <div style={{
              background: passesUI ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${passesUI ? '#10B981' : '#EF4444'}`,
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--ea-text-muted)' }}>Iconos & Bordes</div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', marginTop: '2px', color: passesUI ? '#10B981' : '#EF4444' }}>
                {passesUI ? 'Cumple (≥3:1)' : 'Falla (<3:1)'}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Matriz Completa de Contraste entre Colores Oficiales */}
      <div className="ea-card" style={{ padding: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 800 }}>
          Matriz Oficial de Combinaciones Institucionales
        </h4>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ea-border)', textAlign: 'center' }}>
                <th style={{ padding: '10px', textAlign: 'left', color: 'var(--ea-text-muted)' }}>TEXTO \ FONDO</th>
                {OFFICIAL_COLORS.map((bg, idx) => (
                  <th key={idx} style={{ padding: '10px', color: '#FFF' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '14px', height: '14px', borderRadius: '3px', background: bg.hex, border: '1px solid rgba(255,255,255,0.3)' }} />
                      <span style={{ fontSize: '0.65rem' }}>{bg.name.split(' ')[0]}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OFFICIAL_COLORS.map((text, rowIdx) => (
                <tr key={rowIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '14px', height: '14px', borderRadius: '3px', background: text.hex, border: '1px solid rgba(255,255,255,0.3)' }} />
                    <span>{text.name}</span>
                  </td>
                  {OFFICIAL_COLORS.map((bg, colIdx) => {
                    if (text.hex === bg.hex) {
                      return (
                        <td key={colIdx} style={{ padding: '10px', textAlign: 'center', color: '#4B5563' }}>
                          —
                        </td>
                      );
                    }
                    const r = calculateContrastRatio(text.hex, bg.hex);
                    const rounded = Math.round(r * 10) / 10;
                    const passes = r >= 4.5;
                    const passesAAA = r >= 7.0;

                    return (
                      <td key={colIdx} style={{ padding: '8px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          background: passes ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.12)',
                          color: passes ? '#10B981' : '#EF4444',
                          border: `1px solid ${passes ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.2)'}`
                        }}>
                          {rounded}:1 {passesAAA ? '★★★' : passes ? '★★' : '✖'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
