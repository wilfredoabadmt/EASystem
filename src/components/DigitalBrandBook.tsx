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
  Sparkles
} from 'lucide-react';
import { BRAND_MODULES_16, BRAND_TOKENS } from '../tokens/brandTokens';
import { BrandLogo } from './BrandLogo';

export const DigitalBrandBook: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [safeAreaMultiplier, setSafeAreaMultiplier] = useState<number>(2);
  const [selectedVersion, setSelectedVersion] = useState<'color' | 'white'>('color');

  const activeModule = BRAND_MODULES_16.find(m => m.id === activeModuleId) || BRAND_MODULES_16[0];

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
        {/* Module Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid var(--ea-border)' }}>
          <div>
            <div className="ea-badge ea-badge-teal" style={{ marginBottom: '8px' }}>
              Módulo {String(activeModule.id).padStart(2, '0')} — {activeModule.category}
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{activeModule.title}</h2>
            <p style={{ color: 'var(--ea-text-muted)', marginTop: '4px' }}>{activeModule.desc}</p>
          </div>

          <button className="ea-btn ea-btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            <Download size={16} />
            <span>Descargar Módulo (PDF/Vector)</span>
          </button>
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
