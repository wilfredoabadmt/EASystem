import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Plus, 
  CheckCircle, 
  Download, 
  Copy, 
  Sparkles,
  GitBranch,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { SECRETARIAS_MUNICIPALES } from '../tokens/brandTokens';
import { BrandLogo } from './BrandLogo';

export const BrandArchitecture: React.FC = () => {
  const [selectedSec, setSelectedSec] = useState(SECRETARIAS_MUNICIPALES[0]);
  const [customDescriptor, setCustomDescriptor] = useState('');
  const [previewVariant, setPreviewVariant] = useState<'color' | 'white'>('color');

  // Estado del Árbol de Decisión (Queensland Gov Framework)
  const [step1EntityType, setStep1EntityType] = useState<'CENTRAL' | 'DESCENTRALIZADA' | 'CAMPANA' | 'EXTERNO'>('CENTRAL');
  const [step2Funding, setStep2Funding] = useState<'100_GAMEA' | 'MIXTO' | 'DONACION'>('100_GAMEA');

  const activeSubbrandText = customDescriptor || selectedSec.name;

  // Lógica de dictamen según Queensland Brand Framework
  const getArchitectureVerdict = () => {
    if (step1EntityType === 'CENTRAL') {
      return {
        level: 'Nivel 1: Marca Principal Institucional (GAMEA Central)',
        badgeColor: 'ea-badge-purple',
        rule: 'Uso obligatorio del Imagotipo Oficial Central en máxima prominencia. El descriptor de la secretaría debe subordinarse a la derecha o inferior con proporción 1:0.35.',
        escudoRatio: '100% de escala estándar',
        palette: 'Paleta completa autorizada (Púrpura, Rosa, Turquesa, Oro)',
        prohibited: 'Prohibido crear logotipos independientes o isotipos propios.'
      };
    } else if (step1EntityType === 'DESCENTRALIZADA') {
      return {
        level: 'Nivel 2: Marca Avalada Municipal (Con Autonomía Operativa)',
        badgeColor: 'ea-badge-teal',
        rule: 'La entidad (ej. Terminal Metropolitana, Buses Municipales) puede contar con identificador propio, pero debe incluir el endoso: "Una iniciativa del Gobierno Autónomo Municipal de El Alto".',
        escudoRatio: 'Mínimo 40% del área visual total',
        palette: 'Paleta propia derivada + Púrpura Alteño en barra de aval',
        prohibited: 'No omitir el sello institucional ni colocarlo en tamaño menor a 24mm.'
      };
    } else if (step1EntityType === 'CAMPANA') {
      return {
        level: 'Nivel 3: Campaña Temporal Subordinada',
        badgeColor: 'ea-badge-pink',
        rule: 'Las campañas (ej. "Vacunación Escolar", "Plan Asfalto 2026") tienen vigencia máxima de 12 meses. Deben usar la tipografía Gotham y cerrar siempre con el isotipo oficial.',
        escudoRatio: 'Posición fija en esquina superior derecha o inferior central',
        palette: 'Paleta de campaña aprobada previamente por DIRCOM',
        prohibited: 'No registrar la campaña como marca comercial ni desplazar la identidad municipal.'
      };
    } else {
      return {
        level: 'Nivel 4: Co-Branding & Alianza Estratégica (50/50)',
        badgeColor: 'ea-badge-gold',
        rule: 'Convenios bilaterales (con ministerios, embajadas o agencias de cooperación como AECID/PNUD). Se ubican en pie de página con línea divisoria neutral gris (1px) respetando paridad de tamaño.',
        escudoRatio: 'Proporción 1:1 con la marca aliada',
        palette: 'Espacio neutro blanco o negro con contraste WCAG AAA',
        prohibited: 'El logo del cooperante nunca debe superar en altura al Escudo/Logotipo de El Alto.'
      };
    }
  };

  const verdict = getArchitectureVerdict();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header del Módulo */}
      <div className="ea-card" style={{ padding: '32px' }}>
        <div className="ea-badge ea-badge-purple" style={{ marginBottom: '12px' }}>
          Gobernanza Cívica — Queensland Government & NYC Standards
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Módulo de Jerarquía y Arquitectura de Marca</h2>
        <p style={{ color: 'var(--ea-text-muted)', maxWidth: '850px', marginTop: '8px', lineHeight: 1.6 }}>
          Estructura jerárquica de la <strong>Marca Principal</strong> ("El Alto: Corazón de la Metrópoli") y su articulación formal con las Secretarías Municipales, Empresas Descentralizadas, Programas de Emergencia y Cooperantes Internacionales.
        </p>
      </div>

      {/* Árbol de Decisión Interactivo */}
      <div className="ea-card" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <GitBranch size={22} color="var(--ea-teal)" />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
            Guía Oficial de Decisión y Jerarquía de Marca
          </h3>
        </div>
        <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
          Responde a las preguntas oficiales para determinar automáticamente el nivel jerárquico de marca, el tamaño del escudo y las restricciones de co-branding aplicables.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Pregunta 1 */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', border: '1px solid var(--ea-border)' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '12px', color: '#FFFFFF' }}>
              1. ¿Qué tipo de entidad o iniciativa estás diseñando?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'CENTRAL', label: 'Secretaría o Dirección del GAMEA Central' },
                { id: 'DESCENTRALIZADA', label: 'Entidad Pública Descentralizada / Empresa Municipal' },
                { id: 'CAMPANA', label: 'Programa Especial / Campaña Temporal (< 12 meses)' },
                { id: 'EXTERNO', label: 'Convenio con Cooperación Internacional o Ministerios' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setStep1EntityType(opt.id as any)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: step1EntityType === opt.id ? '1px solid var(--ea-secondary)' : '1px solid var(--ea-border)',
                    background: step1EntityType === opt.id ? 'rgba(245, 0, 123, 0.15)' : 'rgba(255,255,255,0.02)',
                    color: step1EntityType === opt.id ? '#FFFFFF' : 'var(--ea-text-muted)',
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pregunta 2 */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', border: '1px solid var(--ea-border)' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '12px', color: '#FFFFFF' }}>
              2. ¿Cuál es la fuente de financiamiento principal?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: '100_GAMEA', label: '100% Recursos Propios del GAMEA / Coparticipación' },
                { id: 'MIXTO', label: 'Fondos Mixtos (Municipal + Alianza Privada)' },
                { id: 'DONACION', label: 'Donación / Crédito de Organismo Multilateral' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setStep2Funding(opt.id as any)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: step2Funding === opt.id ? '1px solid var(--ea-teal)' : '1px solid var(--ea-border)',
                    background: step2Funding === opt.id ? 'rgba(0, 143, 137, 0.15)' : 'rgba(255,255,255,0.02)',
                    color: step2Funding === opt.id ? '#FFFFFF' : 'var(--ea-text-muted)',
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dictamen Formal */}
        <div style={{
          padding: '24px',
          borderRadius: '16px',
          background: 'rgba(75, 0, 143, 0.12)',
          border: '1px solid rgba(75, 0, 143, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={24} color="var(--ea-secondary)" />
              <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#FFFFFF' }}>{verdict.level}</h4>
            </div>
            <span className={`ea-badge ${verdict.badgeColor}`} style={{ fontSize: '0.75rem' }}>
              Dictamen Oficial DIRCOM
            </span>
          </div>

          <p style={{ margin: 0, fontSize: '0.92rem', color: '#E2E8F0', lineHeight: 1.5 }}>
            {verdict.rule}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '6px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.8rem' }}>
              <div style={{ color: 'var(--ea-text-muted)', marginBottom: '4px' }}>Escala del Escudo:</div>
              <strong style={{ color: 'var(--ea-teal)' }}>{verdict.escudoRatio}</strong>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.8rem' }}>
              <div style={{ color: 'var(--ea-text-muted)', marginBottom: '4px' }}>Paleta Cromática:</div>
              <strong style={{ color: 'var(--ea-gold)' }}>{verdict.palette}</strong>
            </div>
            <div style={{ background: 'rgba(255, 51, 102, 0.08)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.8rem', border: '1px solid rgba(255, 51, 102, 0.2)' }}>
              <div style={{ color: '#FCA5A5', marginBottom: '4px' }}>Prohibición Crítica:</div>
              <strong style={{ color: '#FF3366' }}>{verdict.prohibited}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Generador de Submarcas y Previsualizador */}
      <div className="ea-grid-architecture">
        {/* Generador de Submarcas */}
        <div className="ea-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={20} color="var(--ea-secondary)" />
            <span>Generador de Identificadores Subordinados</span>
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--ea-text-muted)' }}>
              Seleccionar Secretaría Oficial:
            </label>
            <select 
              value={selectedSec.id}
              onChange={(e) => {
                const s = SECRETARIAS_MUNICIPALES.find(x => x.id === e.target.value);
                if (s) {
                  setSelectedSec(s);
                  setCustomDescriptor('');
                }
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.9rem'
              }}
            >
              {['Nivel Ejecutivo', 'Gestión Institucional', 'Secretaría Municipal', 'Subalcaldías Distritales', 'Hospitales Municipales', 'Entidades Descentralizadas'].map(cat => {
                const items = SECRETARIAS_MUNICIPALES.filter(s => (s as any).category === cat);
                if (items.length === 0) return null;
                return (
                  <optgroup key={cat} label={`── ${cat.toUpperCase()} ──`} style={{ background: '#090314', color: 'var(--ea-gold)' }}>
                    {items.map(s => (
                      <option key={s.id} value={s.id} style={{ background: '#150A2B', color: '#FFF' }}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--ea-text-muted)' }}>
              O Ingrese Programa Especial / Campaña Temporal:
            </label>
            <input 
              type="text" 
              placeholder="Ej: Plan de Asfalto Urbano 2026"
              value={customDescriptor}
              onChange={(e) => setCustomDescriptor(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button 
              onClick={() => setPreviewVariant('color')}
              className={`ea-btn ${previewVariant === 'color' ? 'ea-btn-primary' : 'ea-btn-secondary'}`}
              style={{ flex: 1, padding: '10px' }}
            >
              Versión Color
            </button>
            <button 
              onClick={() => setPreviewVariant('white')}
              className={`ea-btn ${previewVariant === 'white' ? 'ea-btn-primary' : 'ea-btn-secondary'}`}
              style={{ flex: 1, padding: '10px' }}
            >
              Versión Negativa
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => {
                const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 140" width="650" height="140">
                  <rect width="650" height="140" fill="${previewVariant === 'white' ? '#4B008F' : '#090314'}" rx="12"/>
                  <!-- Símbolo Andino Pirámide -->
                  <polygon points="30,105 65,35 100,105" fill="${previewVariant === 'white' ? '#FFFFFF' : '#4B008F'}"/>
                  <polygon points="45,105 65,60 85,105" fill="${previewVariant === 'white' ? '#4B008F' : '#F5007B'}"/>
                  <!-- Línea divisoria vertical -->
                  <line x1="260" y1="30" x2="260" y2="110" stroke="${previewVariant === 'white' ? 'rgba(255,255,255,0.4)' : '#008F89'}" stroke-width="2"/>
                  <!-- Textos -->
                  <text x="120" y="70" fill="#FFFFFF" font-family="Montserrat, sans-serif" font-size="28" font-weight="900" letter-spacing="1">EL ALTO</text>
                  <text x="120" y="95" fill="${previewVariant === 'white' ? '#FFAAD4' : '#F5007B'}" font-family="Poppins, sans-serif" font-size="11" font-weight="700" letter-spacing="2">GOBIERNO AUTÓNOMO MUNICIPAL</text>
                  <text x="280" y="65" fill="${previewVariant === 'white' ? '#FFFFFF' : '#65F0EB'}" font-family="Montserrat, sans-serif" font-size="16" font-weight="700">${activeSubbrandText}</text>
                  <text x="280" y="88" fill="${previewVariant === 'white' ? 'rgba(255,255,255,0.7)' : '#9CA3AF'}" font-family="Poppins, sans-serif" font-size="11">Identificador Avalado • DIRCOM</text>
                </svg>`;
                const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Submarca_${activeSubbrandText.replace(/[^a-zA-Z0-9]/g, '_')}_${previewVariant}.svg`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="ea-btn ea-btn-teal" 
              style={{ flex: 1 }}
              title="Descargar logotipo oficial en formato vectorial SVG"
            >
              <Download size={16} />
              <span>Descargar Vectorial (SVG)</span>
            </button>
            
            <button 
              onClick={() => {
                const canvas = document.createElement('canvas');
                canvas.width = 1200;
                canvas.height = 360;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.fillStyle = previewVariant === 'white' ? '#4B008F' : '#090314';
                  ctx.fillRect(0, 0, 1200, 360);
                  
                  // Triángulo andino
                  ctx.fillStyle = previewVariant === 'white' ? '#FFFFFF' : '#F5007B';
                  ctx.beginPath();
                  ctx.moveTo(80, 260);
                  ctx.lineTo(140, 100);
                  ctx.lineTo(200, 260);
                  ctx.fill();

                  // Textos en alta resolución
                  ctx.fillStyle = '#FFFFFF';
                  ctx.font = 'bold 52px Montserrat, sans-serif';
                  ctx.fillText('EL ALTO', 240, 180);
                  ctx.font = 'bold 22px Poppins, sans-serif';
                  ctx.fillStyle = previewVariant === 'white' ? '#FFAAD4' : '#008F89';
                  ctx.fillText('GOBIERNO AUTÓNOMO MUNICIPAL', 240, 230);

                  // Línea divisoria
                  ctx.strokeStyle = '#008F89';
                  ctx.lineWidth = 4;
                  ctx.beginPath();
                  ctx.moveTo(680, 80);
                  ctx.lineTo(680, 280);
                  ctx.stroke();

                  // Submarca
                  ctx.fillStyle = '#FFFFFF';
                  ctx.font = 'bold 36px Montserrat, sans-serif';
                  ctx.fillText(activeSubbrandText, 720, 180);
                  ctx.fillStyle = '#9CA3AF';
                  ctx.font = '22px Poppins, sans-serif';
                  ctx.fillText('Identificador Oficial Aprobado', 720, 230);
                }
                const a = document.createElement('a');
                a.href = canvas.toDataURL('image/png');
                a.download = `Submarca_${activeSubbrandText.replace(/[^a-zA-Z0-9]/g, '_')}_300dpi.png`;
                a.click();
              }}
              className="ea-btn ea-btn-secondary" 
              style={{ flex: 1 }}
              title="Descargar en alta resolución para impresión"
            >
              <Download size={16} />
              <span>Descargar Imagen Alta Calidad (PNG)</span>
            </button>
          </div>
        </div>

        {/* Previsualizador en Vivo */}
        <div className="ea-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} color="var(--ea-teal)" />
            <span>Resultado de Marca Avalada (100% Legal)</span>
          </h3>

          <div style={{
            flex: 1,
            minHeight: '220px',
            borderRadius: '16px',
            background: previewVariant === 'white' ? 'var(--ea-primary)' : 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            border: '1px dashed var(--ea-border)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)'
          }}>
            <BrandLogo 
              size={56} 
              variant={previewVariant} 
              subbrand={activeSubbrandText} 
            />
          </div>

          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            fontSize: '0.85rem',
            color: 'var(--ea-text-muted)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span>Jerarquía Primaria:</span>
              <strong style={{ color: '#FFFFFF' }}>El Alto (Marca Principal - GAMEA)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span>Entidad Avalada:</span>
              <strong style={{ color: 'var(--ea-secondary)' }}>{activeSubbrandText}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tipografía Descriptiva:</span>
              <strong style={{ color: 'var(--ea-teal)' }}>Gotham Medium (Espaciado +0.12em)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
