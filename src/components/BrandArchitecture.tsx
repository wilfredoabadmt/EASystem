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
  ShieldCheck
} from 'lucide-react';
import { SECRETARIAS_MUNICIPALES } from '../tokens/brandTokens';
import { BrandLogo } from './BrandLogo';

export const BrandArchitecture: React.FC = () => {
  const [selectedSec, setSelectedSec] = useState(SECRETARIAS_MUNICIPALES[0]);
  const [customDescriptor, setCustomDescriptor] = useState('');
  const [previewVariant, setPreviewVariant] = useState<'color' | 'white'>('color');

  const activeSubbrandText = customDescriptor || selectedSec.name;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header del Módulo */}
      <div className="ea-card" style={{ padding: '32px' }}>
        <div className="ea-badge ea-badge-purple" style={{ marginBottom: '12px' }}>
          Modelo NYC Design System Adaptado a El Alto
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Módulo Brand Architecture</h2>
        <p style={{ color: 'var(--ea-text-muted)', maxWidth: '800px', marginTop: '8px' }}>
          Gobernanza de la <strong>Marca Madre</strong> ("El Alto: Corazón de la Metrópoli") y su relación jerárquica con las 12 Secretarías, Direcciones Operativas y Programas Especiales del Municipio.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Generador de Submarcas */}
        <div className="ea-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitBranch size={20} color="var(--ea-secondary)" />
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
              {SECRETARIAS_MUNICIPALES.map(s => (
                <option key={s.id} value={s.id} style={{ background: '#150A2B' }}>
                  {s.name} ({s.code})
                </option>
              ))}
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
            <button className="ea-btn ea-btn-teal" style={{ flex: 1 }}>
              <Download size={16} />
              <span>Descargar SVG Vector</span>
            </button>
            <button className="ea-btn ea-btn-secondary" style={{ flex: 1 }}>
              <Download size={16} />
              <span>Descargar PNG 300DPI</span>
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
              <strong style={{ color: '#FFFFFF' }}>El Alto (Masterbrand)</strong>
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
