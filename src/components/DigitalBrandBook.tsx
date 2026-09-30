import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Eye, 
  Check, 
  X, 
  Info, 
  Sliders, 
  Maximize2, 
  Copy,
  Layers,
  Sparkles,
  Palette,
  Type
} from 'lucide-react';
import { BRAND_MODULES_16, BRAND_TOKENS } from '../tokens/brandTokens';
import { BrandLogo } from './BrandLogo';
import { AccessibilityContrastMatrix } from './AccessibilityContrastMatrix';
import { W3CTokenExporter } from './W3CTokenExporter';
import { PlainLanguageVoiceGuide } from './PlainLanguageVoiceGuide';

export const DigitalBrandBook: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [safeAreaMultiplier, setSafeAreaMultiplier] = useState<number>(2);
  const [selectedVersion, setSelectedVersion] = useState<'color' | 'white'>('color');

  const activeModule = BRAND_MODULES_16.find(m => m.id === activeModuleId) || BRAND_MODULES_16[0];

  const generateEditorialHTML = () => {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>MÓDULO ${String(activeModule.id).padStart(2, '0')}: ${activeModule.title} — Manual de Imagen Institucional GAMEA</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');
    
    @page {
      size: A4;
      margin: 12mm 15mm 15mm 15mm;
    }

    * { box-sizing: border-box; }
    body {
      font-family: 'Poppins', -apple-system, sans-serif;
      margin: 0;
      padding: 30px 20px;
      background: #0B0517;
      color: #1F2937;
      line-height: 1.6;
    }

    .toolbar {
      position: sticky;
      top: 10px;
      max-width: 820px;
      margin: 0 auto 24px auto;
      background: #150A2B;
      border: 1px solid rgba(245, 0, 123, 0.4);
      color: #FFF;
      padding: 14px 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justifyContent: space-between;
      box-shadow: 0 12px 36px rgba(0,0,0,0.6);
      z-index: 100;
    }

    .btn-print {
      background: #F5007B;
      color: #FFF;
      border: none;
      padding: 10px 22px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }
    .btn-print:hover { background: #FF1A8C; transform: translateY(-1px); }

    .document-page {
      max-width: 820px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 16px;
      padding: 48px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      position: relative;
    }

    .aguayo-bar {
      height: 8px;
      width: 100%;
      background: linear-gradient(90deg, #4B008F 0%, #F5007B 25%, #F5B400 50%, #008F89 75%, #690BB2 100%);
      border-radius: 4px;
      margin-bottom: 24px;
    }

    .header-table {
      width: 100%;
      border-bottom: 2px solid #4B008F;
      padding-bottom: 20px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justifyContent: space-between;
    }

    .doc-meta {
      font-size: 11px;
      color: #6B7280;
      text-align: right;
      line-height: 1.5;
    }

    .doc-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 26px;
      font-weight: 900;
      color: #4B008F;
      margin: 6px 0;
    }

    .doc-category {
      display: inline-block;
      background: #F3E8FF;
      color: #6B21A8;
      font-size: 11px;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .section-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 800;
      color: #111827;
      border-left: 4px solid #F5007B;
      padding-left: 12px;
      margin: 22px 0 10px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .palette-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin: 16px 0;
    }

    .color-swatch {
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      overflow: hidden;
      font-size: 10.5px;
    }

    .swatch-color { height: 45px; width: 100%; }
    .swatch-info { padding: 8px; background: #FAFAFA; }
    .swatch-name { font-weight: 700; color: #111; }
    .swatch-hex { font-family: monospace; color: #6B21A8; font-weight: 700; font-size: 11px; }

    .rule-box {
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 10px;
      padding: 16px 20px;
      margin: 14px 0;
      font-size: 13px;
    }

    .footer {
      margin-top: 36px;
      padding-top: 14px;
      border-top: 1px solid #E5E7EB;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10.5px;
      color: #9CA3AF;
    }

    @media print {
      body { background: #FFF !important; padding: 0 !important; }
      .toolbar { display: none !important; }
      .document-page { border: none !important; box-shadow: none !important; padding: 0 !important; width: 100% !important; max-width: 100% !important; }
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  </style>
</head>
<body>

  <div class="toolbar">
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="background: #4B008F; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 12px;">GAMEA</span>
      <div style="font-size: 13px; font-weight: 600;">
        Ficha Técnica Oficial · Módulo ${String(activeModule.id).padStart(2, '0')}: ${activeModule.title}
      </div>
    </div>
    <button class="btn-print" onclick="window.print()">
      🖨 Guardar en PDF / Imprimir Ficha
    </button>
  </div>

  <div class="document-page">
    <div class="aguayo-bar"></div>

    <div class="header-table">
      <div>
        <span class="doc-category">MÓDULO ${String(activeModule.id).padStart(2, '0')} — ${activeModule.category}</span>
        <h1 class="doc-title">${activeModule.title}</h1>
        <div style="font-size: 13px; color: #4B5563; font-weight: 600;">
          Gobierno Autónomo Municipal de El Alto · Dirección de Comunicación (DIRCOM)
        </div>
      </div>
      <div class="doc-meta">
        <div><strong>FICHA TÉCNICA OFICIAL</strong></div>
        <div>Código: FT-GAMEA-${String(activeModule.id).padStart(2, '0')}-2026</div>
        <div>Vigencia: Gestión 2026</div>
      </div>
    </div>

    <div class="section-title">1. Resumen y Objeto de la Especificación</div>
    <p style="font-size: 13.5px; color: #374151; margin: 4px 0 16px 0;">
      ${activeModule.desc}
    </p>

    <div class="section-title">2. Normas de Aplicación Innegociables</div>
    <div class="rule-box">
      <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
        <li><strong>Soberanía Visual:</strong> Este módulo rige de forma inmutable para todas las Secretarías, Direcciones Desconcentradas y Empresas Públicas Municipales de El Alto.</li>
        <li><strong>Prohibición de Alteración:</strong> Queda terminantemente prohibido estirar, deformar o alterar los colores de la marca institucional.</li>
        <li><strong>Fuente de Activos:</strong> Los archivos vectoriales maestros oficiales (.SVG) deben descargarse exclusivamente desde el sistema digital EASystem (Biblioteca BAM).</li>
        <li><strong>Supervisión DIRCOM:</strong> Cualquier aplicación especial o no contemplada en este documento debe remitirse para dictamen técnico formal de la Dirección de Comunicación Institucional.</li>
      </ul>
    </div>

    <div class="section-title">3. Códigos Cromáticos Oficiales</div>
    <div class="palette-grid">
      <div class="color-swatch">
        <div class="swatch-color" style="background: #4B008F;"></div>
        <div class="swatch-info">
          <div class="swatch-name">Púrpura Alteño</div>
          <div class="swatch-hex">HEX #4B008F</div>
          <div>RGB 75, 0, 143</div>
          <div>Pantone 2685 C</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="swatch-color" style="background: #F5007B;"></div>
        <div class="swatch-info">
          <div class="swatch-name">Rosa Rebelde</div>
          <div class="swatch-hex">HEX #F5007B</div>
          <div>RGB 245, 0, 123</div>
          <div>Pantone 219 C</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="swatch-color" style="background: #008F89;"></div>
        <div class="swatch-info">
          <div class="swatch-name">Turquesa Futuro</div>
          <div class="swatch-hex">HEX #008F89</div>
          <div>RGB 0, 143, 137</div>
          <div>Pantone 7716 C</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="swatch-color" style="background: #F5B400;"></div>
        <div class="swatch-info">
          <div class="swatch-name">Oro Andino</div>
          <div class="swatch-hex">HEX #F5B400</div>
          <div>RGB 245, 180, 0</div>
          <div>Pantone 1235 C</div>
        </div>
      </div>
    </div>

    <div class="section-title">4. Certificación y Trazabilidad Municipal</div>
    <div style="display: flex; justify-content: space-between; align-items: center; background: #FAF5FF; border: 1px solid #E9D5FF; padding: 14px 20px; border-radius: 10px; margin-top: 10px;">
      <div>
        <div style="font-weight: 800; font-size: 13px; color: #6B21A8;">CERTIFICACIÓN DIGITAL DE MARCA — GAMEA</div>
        <div style="font-size: 11px; color: #6B7280; margin-top: 2px;">
          Ficha oficial emitida bajo el estándar cívico EASystem v1.0.0. Válido ante auditoría de gestión pública.
        </div>
      </div>
      <div style="text-align: right; font-size: 10.5px; color: #4B008F; font-family: monospace; font-weight: 700;">
        [ SELLO DIGITAL DIRCOM ]<br />EL ALTO DE PIE
      </div>
    </div>

    <div class="footer">
      <div>© 2026 Gobierno Autónomo Municipal de El Alto · Jach'a Uta</div>
      <div>"El Corazón de la Metrópoli"</div>
    </div>
  </div>

</body>
</html>`;
  };

  // Abrir ventana directa lista para Imprimir / Guardar en PDF A4
  const handleOpenPrintPreview = () => {
    const html = generateEditorialHTML();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
    }
  };

  // Descargar archivo editorial HTML de alta fidelidad
  const handleDownloadEditorialHTML = () => {
    const filename = `Ficha_Oficial_GAMEA_Modulo_${String(activeModule.id).padStart(2, '0')}_${activeModule.title.replace(/\s+/g, '_')}.html`;
    const blob = new Blob([generateEditorialHTML()], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', minHeight: '80vh' }}>
      {/* Sidebar de los 16 módulos */}
      <div className="ea-card" style={{ padding: '20px', height: 'fit-content' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--ea-border)' }}>
          <BookOpen size={20} color="var(--ea-secondary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Digital Brand Book</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '6px' }}>
          {BRAND_MODULES_16.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModuleId(m.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                border: activeModuleId === m.id ? '1px solid var(--ea-secondary)' : '1px solid transparent',
                background: activeModuleId === m.id ? 'rgba(245, 0, 123, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                color: activeModuleId === m.id ? '#FFFFFF' : 'var(--ea-text-muted)',
                textAlign: 'left',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  fontWeight: 800, 
                  color: activeModuleId === m.id ? 'var(--ea-secondary)' : 'var(--ea-text-muted)', 
                  width: '20px' 
                }}>
                  {String(m.id).padStart(2, '0')}
                </span>
                <span>{m.title}</span>
              </div>
              <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.65rem' }}>{m.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ea-card" style={{ padding: '36px' }}>
        {/* Module Header con opciones de Ficha Oficial / PDF */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid var(--ea-border)', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="ea-badge ea-badge-teal" style={{ marginBottom: '8px' }}>
              Módulo {String(activeModule.id).padStart(2, '0')} — {activeModule.category}
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{activeModule.title}</h2>
            <p style={{ color: 'var(--ea-text-muted)', marginTop: '4px' }}>{activeModule.desc}</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleOpenPrintPreview}
              className="ea-btn ea-btn-primary" 
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
              title="Abre la Ficha Técnica Editorial para Imprimir o Guardar en PDF A4"
            >
              <span>🖨 Imprimir / Guardar en PDF</span>
            </button>

            <button 
              onClick={handleDownloadEditorialHTML}
              className="ea-btn ea-btn-secondary" 
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
              title="Descargar Ficha Editorial completa en formato HTML"
            >
              <Download size={16} />
              <span>Descargar Ficha Oficial</span>
            </button>
          </div>
        </div>

        {/* Dynamic Sandbox Depending on Module */}
        {activeModule.id === 5 || activeModule.id === 6 ? (
          /* Módulo Aguayo y Patrones Textiles */
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Trama y Geometría del Aguayo Alteño</h3>
            <div style={{
              height: '140px',
              borderRadius: '16px',
              background: 'linear-gradient(90deg, #4B008F 0%, #F5007B 25%, #F5B400 50%, #008F89 75%, #690BB2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 8px)'
              }} />
              <div style={{
                background: 'rgba(9, 3, 20, 0.85)',
                padding: '12px 28px',
                borderRadius: '999px',
                backdropFilter: 'blur(8px)',
                fontWeight: 700,
                fontSize: '1.1rem',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                Patrón Textil Andino Oficial
              </div>
            </div>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.95rem' }}>
              Este patrón no debe fragmentarse ni utilizarse como fondo pleno que reste legibilidad. Es exclusivo para cenefas, cintas de credencial, bordes de diplomas y encabezados oficiales.
            </p>
          </div>
        ) : activeModule.id === 7 || activeModule.id === 8 || activeModule.id === 9 ? (
          /* Módulo Imagotipo, Retícula y Área Segura Sandbox */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setSelectedVersion('color')}
                  className={`ea-btn ${selectedVersion === 'color' ? 'ea-btn-primary' : 'ea-btn-secondary'}`}
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Versión Cromática
                </button>
                <button 
                  onClick={() => setSelectedVersion('white')}
                  className={`ea-btn ${selectedVersion === 'white' ? 'ea-btn-primary' : 'ea-btn-secondary'}`}
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Versión Negativa
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
                <span>Área Segura: <strong>{safeAreaMultiplier}X</strong></span>
                <input 
                  type="range" 
                  min="1" 
                  max="4" 
                  value={safeAreaMultiplier} 
                  onChange={(e) => setSafeAreaMultiplier(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Interactive Grid Sandbox */}
            <div style={{
              height: '320px',
              borderRadius: '16px',
              background: selectedVersion === 'white' ? 'var(--ea-primary)' : 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              border: '1px solid var(--ea-border)',
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}>
              {/* Box de área segura interactiva */}
              <div style={{
                padding: `${safeAreaMultiplier * 20}px`,
                border: '1px dashed var(--ea-teal)',
                borderRadius: '8px',
                background: 'rgba(0, 143, 137, 0.08)',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '12px',
                  background: 'var(--ea-teal)',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}>
                  Área de Reserva {safeAreaMultiplier}X
                </span>
                <BrandLogo size={64} variant={selectedVersion} />
              </div>
            </div>
          </div>
        ) : activeModule.id === 10 ? (
          /* Módulo Usos Incorrectos */
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Prohibiciones de Marca Innegociables</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div className="ea-card" style={{ border: '1px solid rgba(255, 51, 102, 0.4)', textAlign: 'center', padding: '24px' }}>
                <div style={{ color: '#FF3366', marginBottom: '8px' }}><X size={32} /></div>
                <h4 style={{ color: '#FF3366', fontSize: '1rem', marginBottom: '8px' }}>Deformación de Proporción</h4>
                <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.85rem' }}>
                  Prohibido estirar o aplastar el imagotipo de forma vertical u horizontal.
                </p>
              </div>

              <div className="ea-card" style={{ border: '1px solid rgba(255, 51, 102, 0.4)', textAlign: 'center', padding: '24px' }}>
                <div style={{ color: '#FF3366', marginBottom: '8px' }}><X size={32} /></div>
                <h4 style={{ color: '#FF3366', fontSize: '1rem', marginBottom: '8px' }}>Alteración de Paleta</h4>
                <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.85rem' }}>
                  Prohibido cambiar los colores institucionales a verde limón, azul o tonos no oficiales.
                </p>
              </div>

              <div className="ea-card" style={{ border: '1px solid rgba(255, 51, 102, 0.4)', textAlign: 'center', padding: '24px' }}>
                <div style={{ color: '#FF3366', marginBottom: '8px' }}><X size={32} /></div>
                <h4 style={{ color: '#FF3366', fontSize: '1rem', marginBottom: '8px' }}>Invasión de Margen</h4>
                <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.85rem' }}>
                  Prohibido superponer textos o fotografías a menos del área de seguridad 2X.
                </p>
              </div>
            </div>
          </div>
        ) : activeModule.id === 11 ? (
          /* Módulo 11: Paleta Cromática, Accesibilidad WCAG 2.1 y W3C Tokens */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Paleta Cromática Oficial del GAMEA</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                {[
                  { name: 'Púrpura Alteño', hex: '#4B008F', role: 'Primario Institucional', rgb: 'RGB 75, 0, 143' },
                  { name: 'Rosa Rebelde', hex: '#F5007B', role: 'Secundario Dinámico', rgb: 'RGB 245, 0, 123' },
                  { name: 'Turquesa Futuro', hex: '#008F89', role: 'Tecnología & Integración', rgb: 'RGB 0, 143, 137' },
                  { name: 'Oro Andino', hex: '#F5B400', role: 'Cultura & Economía', rgb: 'RGB 245, 180, 0' },
                  { name: 'Púrpura Profundo', hex: '#690BB2', role: 'Contraste & Sombras', rgb: 'RGB 105, 11, 178' },
                ].map(c => (
                  <div key={c.hex} style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid var(--ea-border)',
                    background: 'rgba(0,0,0,0.3)'
                  }}>
                    <div style={{ height: '90px', background: c.hex }} />
                    <div style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#FFFFFF' }}>{c.name}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--ea-secondary)', marginTop: '4px' }}>{c.hex}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--ea-text-muted)', marginTop: '2px' }}>{c.rgb}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ea-teal)', marginTop: '6px' }}>{c.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matriz WCAG 2.1 Contrast Matrix (City of LA / USWDS) */}
            <AccessibilityContrastMatrix />

            {/* Exportador de Tokens W3C / Figma Tokens Studio (MyDS) */}
            <W3CTokenExporter />
          </div>
        ) : activeModule.id === 12 ? (
          /* Módulo 12: Tipografía y Guía de Lenguaje Ciudadano (GOV.UK / SF.gov) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Fuentes Tipográficas Oficiales</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="ea-card" style={{ padding: '24px' }}>
                  <div className="ea-badge ea-badge-purple" style={{ marginBottom: '8px' }}>Titulares & Logotipos</div>
                  <h4 style={{ fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, margin: '8px 0' }}>
                    Montserrat / Gotham
                  </h4>
                  <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.85rem' }}>
                    Uso exclusivo para titulares principales, identificadores de secretaría, gigantografías y portadas. Pesos autorizados: Bold (700) y Black (900).
                  </p>
                </div>
                <div className="ea-card" style={{ padding: '24px' }}>
                  <div className="ea-badge ea-badge-teal" style={{ marginBottom: '8px' }}>Cuerpo de Texto & Digital</div>
                  <h4 style={{ fontSize: '1.4rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600, margin: '8px 0' }}>
                    Poppins / Roboto
                  </h4>
                  <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.85rem' }}>
                    Optimizada para pantallas digitales, párrafos largos, formularios y decretos. Pesos autorizados: Regular (400) y Medium (500).
                  </p>
                </div>
              </div>
            </div>

            {/* Guía de Lenguaje Ciudadano y Cosmovisión Aymara */}
            <PlainLanguageVoiceGuide />
          </div>
        ) : (
          /* Módulo Informativo Estándar */
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Especificación Oficial</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '24px' }}>
              Este módulo forma parte de la gobernanza visual del GAMEA. Toda entidad, consultora, contratista o medio debe respetar íntegramente las pautas descritas en esta sección para evitar observaciones de auditoría institucional.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="ea-card" style={{ flex: 1 }}>
                <h4 style={{ color: 'var(--ea-teal)', marginBottom: '8px' }}>Uso Correcto</h4>
                <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.85rem' }}>
                  Aplicar siempre los activos oficiales vectoriales descargados desde la biblioteca digital BAM.
                </p>
              </div>
              <div className="ea-card" style={{ flex: 1 }}>
                <h4 style={{ color: 'var(--ea-secondary)', marginBottom: '8px' }}>Supervisión DirCom</h4>
                <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.85rem' }}>
                  Cualquier caso no contemplado debe remitirse para dictamen técnico formal de la Dirección de Comunicación.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
