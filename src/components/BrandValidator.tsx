import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Upload, 
  Scan, 
  ShieldCheck, 
  FileCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface AuditItem {
  name: string;
  passed: boolean;
  score: number;
  details: string;
}

export const BrandValidator: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [auditComplete, setAuditComplete] = useState(true);
  const [currentScore, setCurrentScore] = useState(100);

  const [audits, setAudits] = useState<AuditItem[]>([
    {
      name: 'Integridad Geométrica del Imagotipo',
      passed: true,
      score: 30,
      details: 'Sin distorsión de relación de aspecto (Delta = 0.0%). Proporciones vectoriales respetadas.'
    },
    {
      name: 'Cumplimiento Cromático Oficial (HEX)',
      passed: true,
      score: 30,
      details: 'Púrpura Alteño (#4B008F) y Rosa Rebelde (#F5007B) detectados con 100% de precisión cromática.'
    },
    {
      name: 'Área de Reserva y Retícula de Seguridad',
      passed: true,
      score: 25,
      details: 'Margen periférico superior a 2X respetado sin invasión de titulares ni elementos gráficos.'
    },
    {
      name: 'Jerarquía Tipográfica Institucional',
      passed: true,
      score: 15,
      details: 'Titulares en Gotham y cuerpo en Poppins verificados correctamente.'
    }
  ]);

  const simulateBadScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setCurrentScore(60);
      setAudits([
        {
          name: 'Integridad Geométrica del Imagotipo',
          passed: false,
          score: 10,
          details: 'ALERTA: Se detectó un estiramiento vertical del 14% en el isotipo de la pirámide andina.'
        },
        {
          name: 'Cumplimiento Cromático Oficial (HEX)',
          passed: false,
          score: 15,
          details: 'ALERTA: Se utilizó un tono azul (#0033AA) no perteneciente al Manual Institucional.'
        },
        {
          name: 'Área de Reserva y Retícula de Seguridad',
          passed: true,
          score: 25,
          details: 'Márgenes de seguridad respetados.'
        },
        {
          name: 'Jerarquía Tipográfica Institucional',
          passed: false,
          score: 10,
          details: 'ALERTA: Fuente Comic Sans detectada en cuerpo de texto. Reemplace por Poppins.'
        }
      ]);
    }, 1200);
  };

  const simulateGoodScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setCurrentScore(100);
      setAudits([
        {
          name: 'Integridad Geométrica del Imagotipo',
          passed: true,
          score: 30,
          details: 'Sin distorsión de relación de aspecto (Delta = 0.0%). Proporciones vectoriales respetadas.'
        },
        {
          name: 'Cumplimiento Cromático Oficial (HEX)',
          passed: true,
          score: 30,
          details: 'Púrpura Alteño (#4B008F) y Rosa Rebelde (#F5007B) detectados con 100% de precisión cromática.'
        },
        {
          name: 'Área de Reserva y Retícula de Seguridad',
          passed: true,
          score: 25,
          details: 'Margen periférico superior a 2X respetado sin invasión de titulares ni elementos gráficos.'
        },
        {
          name: 'Jerarquía Tipográfica Institucional',
          passed: true,
          score: 15,
          details: 'Titulares en Gotham y cuerpo en Poppins verificados correctamente.'
        }
      ]);
    }, 1000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '32px' }}>
      {/* Upload & Controls */}
      <div className="ea-card" style={{ padding: '32px' }}>
        <div className="ea-badge ea-badge-teal" style={{ marginBottom: '12px' }}>
          Computer Vision & Brand Intelligence
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
          Brand Validator
        </h2>
        <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Auditoría algorítmica para piezas gráficas generadas por imprentas, secretarías o agencias externas.
        </p>

        {/* Dropzone */}
        <div style={{
          border: '2px dashed var(--ea-border-active)',
          borderRadius: '16px',
          padding: '40px 20px',
          textAlign: 'center',
          background: 'rgba(75, 0, 143, 0.08)',
          marginBottom: '24px',
          cursor: 'pointer'
        }}>
          <Upload size={36} color="var(--ea-secondary)" style={{ margin: '0 auto 12px' }} />
          <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Arrastre su afiche o pieza aquí</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>
            Soporta PNG, JPG, SVG y PDF (Hasta 50MB)
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            onClick={simulateGoodScan}
            disabled={isScanning}
            className="ea-btn ea-btn-primary"
            style={{ width: '100%' }}
          >
            <Scan size={18} />
            <span>Auditar Afiche Aprobado (100%)</span>
          </button>

          <button 
            onClick={simulateBadScan}
            disabled={isScanning}
            className="ea-btn ea-btn-secondary"
            style={{ width: '100%' }}
          >
            <AlertTriangle size={18} color="#FF3366" />
            <span>Simular Detección de Errores</span>
          </button>
        </div>
      </div>

      {/* Results & Score Panel */}
      <div className="ea-card" style={{ padding: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Dictamen Técnico de Marca</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem' }}>
              Evaluación según el Manual de Imagen Institucional del GAMEA
            </p>
          </div>

          {/* Score Badge Circular */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: currentScore === 100 ? 'rgba(0, 143, 137, 0.15)' : 'rgba(255, 51, 102, 0.15)',
            border: `1px solid ${currentScore === 100 ? 'var(--ea-teal)' : '#FF3366'}`,
            padding: '12px 24px',
            borderRadius: '999px'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 900,
              fontFamily: "'Montserrat', sans-serif",
              color: currentScore === 100 ? 'var(--ea-teal)' : '#FF3366'
            }}>
              {isScanning ? '...' : `${currentScore}%`}
            </div>
            <div style={{ fontSize: '0.8rem', lineHeight: 1.2 }}>
              <strong>{currentScore === 100 ? 'MARCA APROBADA' : 'OBSERVADA'}</strong><br />
              <span style={{ color: 'var(--ea-text-muted)' }}>Índice Brand Score</span>
            </div>
          </div>
        </div>

        {/* Breakdown Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {audits.map((item, idx) => (
            <div 
              key={idx}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${item.passed ? 'rgba(0, 143, 137, 0.3)' : 'rgba(255, 51, 102, 0.3)'}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              {item.passed ? (
                <CheckCircle size={22} color="var(--ea-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
              ) : (
                <XCircle size={22} color="#FF3366" style={{ flexShrink: 0, marginTop: '2px' }} />
              )}
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{item.name}</h4>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: item.passed ? 'var(--ea-teal)' : '#FF3366' }}>
                    +{item.score} pts
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: item.passed ? 'var(--ea-text-muted)' : '#FF99B0' }}>
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
