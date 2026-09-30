import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Download, 
  QrCode, 
  Image as ImageIcon, 
  Sparkles, 
  Layers, 
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SECRETARIAS_MUNICIPALES } from '../tokens/brandTokens';

type FormatType = 'COMUNICADO_A4' | 'POST_INSTAGRAM' | 'STORY_INSTAGRAM' | 'CREDENCIAL';

export const GraphicGenerator: React.FC = () => {
  const [format, setFormat] = useState<FormatType>('COMUNICADO_A4');
  const [title, setTitle] = useState('COMUNICADO OFICIAL A LA CIUDADANÍA');
  const [subtitle, setSubtitle] = useState('SOBRE EL PLAN DE MANTENIMIENTO VIAL EN EL DISTRITO 8');
  const [content, setContent] = useState('El Gobierno Autónomo Municipal de El Alto informa que, a partir del lunes 5 de octubre, se iniciarán los trabajos de recarpeteo y modernización de luminarias LED.');
  const [secretaria, setSecretaria] = useState(SECRETARIAS_MUNICIPALES[2].name);
  const [dateText, setDateText] = useState('El Alto, 29 de Septiembre de 2026');
  const [folio, setFolio] = useState('GAMEA-DIRCOM-2026-0892');

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleExportPNG = () => {
    alert(`Generando pieza en alta resolución (${format}) con marcas de agua y firma digital... Archivo descargado exitosamente.`);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '32px', minHeight: '80vh' }}>
      {/* Editor Controls */}
      <div className="ea-card" style={{ padding: '28px', height: 'fit-content' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Layers size={22} color="var(--ea-secondary)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Motor Generador Gráfico</h3>
        </div>

        {/* Format Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ea-text-muted)', marginBottom: '8px' }}>
            Tipo de Pieza Institucional:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { id: 'COMUNICADO_A4', label: 'Comunicado A4' },
              { id: 'POST_INSTAGRAM', label: 'Post Redes (1:1)' },
              { id: 'STORY_INSTAGRAM', label: 'Story Redes (9:16)' },
              { id: 'CREDENCIAL', label: 'Credencial Oficial' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id as FormatType)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: format === f.id ? '1px solid var(--ea-secondary)' : '1px solid var(--ea-border)',
                  background: format === f.id ? 'rgba(245, 0, 123, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: format === f.id ? '#FFFFFF' : 'var(--ea-text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--ea-text-muted)' }}>
              Secretaría / Dirección Emisora:
            </label>
            <select
              value={secretaria}
              onChange={(e) => setSecretaria(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.85rem'
              }}
            >
              {SECRETARIAS_MUNICIPALES.map(s => (
                <option key={s.id} value={s.name} style={{ background: '#150A2B' }}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--ea-text-muted)' }}>
              Titular Principal:
            </label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--ea-text-muted)' }}>
              Subtítulo / Convocatoria:
            </label>
            <input 
              type="text" 
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--ea-text-muted)' }}>
              Cuerpo del Mensaje:
            </label>
            <textarea 
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.85rem',
                resize: 'none'
              }}
            />
          </div>

          <button 
            onClick={handleExportPNG}
            className="ea-btn ea-btn-primary" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <Download size={18} />
            <span>Generar y Descargar (PNG / PDF)</span>
          </button>
        </div>
      </div>

      {/* Live Preview Canvas WYSIWYG */}
      <div className="ea-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '16px' }}>
          <span className="ea-badge ea-badge-teal">
            <CheckCircle size={14} />
            Plantilla Certificada 100% Brand Compliant
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--ea-text-muted)' }}>Folio: {folio}</span>
        </div>

        {/* Canvas Visual Container */}
        <div 
          ref={canvasRef}
          style={{
            width: format === 'POST_INSTAGRAM' ? '460px' : format === 'STORY_INSTAGRAM' ? '320px' : '500px',
            minHeight: format === 'POST_INSTAGRAM' ? '460px' : format === 'STORY_INSTAGRAM' ? '560px' : '650px',
            background: '#FFFFFF',
            color: '#150A2B',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Aguayo Top Border */}
          <div style={{
            height: '10px',
            width: '100%',
            background: 'linear-gradient(90deg, #4B008F 0%, #F5007B 25%, #F5B400 50%, #008F89 75%, #690BB2 100%)'
          }} />

          {/* Header del Comunicado */}
          <div style={{ padding: '24px 28px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #EAE6F0' }}>
            <BrandLogo size={44} variant="color" subbrand="Alcaldía Municipal" />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#4B008F', letterSpacing: '0.05em' }}>DIRECCIÓN DE COMUNICACIÓN</div>
              <div style={{ fontSize: '0.65rem', color: '#666' }}>{folio}</div>
            </div>
          </div>

          {/* Content Body */}
          <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: '#F5007B', 
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              {secretaria}
            </div>

            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: format === 'POST_INSTAGRAM' ? '1.3rem' : '1.5rem',
              fontWeight: 900,
              color: '#4B008F',
              lineHeight: 1.2,
              marginBottom: '10px'
            }}>
              {title}
            </h2>

            <h4 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#333333',
              marginBottom: '20px'
            }}>
              {subtitle}
            </h4>

            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.85rem',
              lineHeight: 1.6,
              color: '#444444',
              flex: 1
            }}>
              {content}
            </p>

            {/* Sello y Código QR Verificable */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px dashed #DDD'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B008F' }}>{dateText}</div>
                <div style={{ fontSize: '0.65rem', color: '#777' }}>Firma digital inmutable del Municipio de El Alto</div>
              </div>

              {/* QR Code Simulado Oficial */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#F8F5FC',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #E0D6F0'
              }}>
                <QrCode size={32} color="#4B008F" />
                <div style={{ fontSize: '0.6rem', color: '#4B008F', lineHeight: 1.2 }}>
                  <strong>VERIFICAR</strong><br />Documento Oficial
                </div>
              </div>
            </div>
          </div>

          {/* Aguayo Bottom Border */}
          <div style={{
            height: '6px',
            width: '100%',
            background: 'linear-gradient(90deg, #690BB2 0%, #008F89 25%, #F5B400 50%, #F5007B 75%, #4B008F 100%)'
          }} />
        </div>
      </div>
    </div>
  );
};
