import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, Lock, Globe2, Building } from 'lucide-react';

export const OfficialGovBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      background: '#090412',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      fontSize: '0.72rem',
      color: '#9CA3AF',
      zIndex: 100,
      position: 'relative'
    }}>
      {/* Barra compacta superior */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '6px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Escudo / Sello miniatura */}
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'var(--ea-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.55rem',
            fontWeight: 800,
            color: 'var(--ea-gold)'
          }}>
            ★
          </div>
          <span>
            Un sitio oficial del <strong>Gobierno Autónomo Municipal de El Alto</strong> — Dirección de Comunicación
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--ea-teal)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.72rem'
          }}
        >
          <span>Así es como puedes verificar que es oficial</span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Panel desplegable con estándares USWDS / GOV.UK adaptados a Bolivia */}
      {isOpen && (
        <div style={{
          background: 'rgba(13, 7, 24, 0.98)',
          borderTop: '1px solid var(--ea-border)',
          padding: '18px 24px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            maxWidth: '1600px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            
            {/* Verificación 1: Dominio .gob.bo */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                padding: '10px',
                background: 'rgba(0, 143, 137, 0.15)',
                borderRadius: '10px',
                color: 'var(--ea-teal)',
                flexShrink: 0
              }}>
                <Globe2 size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.8rem', marginBottom: '3px' }}>
                  Los sitios web oficiales usan dominios .gob.bo
                </div>
                <p style={{ margin: 0, lineHeight: 1.4, fontSize: '0.72rem', color: '#9CA3AF' }}>
                  El dominio <code>.gob.bo</code> pertenece exclusivamente a entidades gubernamentales autorizadas del Estado Plurinacional de Bolivia. Antes de compartir datos institucionales, verifica que la URL pertenezca al Gobierno Municipal de El Alto.
                </p>
              </div>
            </div>

            {/* Verificación 2: Conexión HTTPS segura y cifrada */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                padding: '10px',
                background: 'rgba(245, 180, 0, 0.15)',
                borderRadius: '10px',
                color: 'var(--ea-gold)',
                flexShrink: 0
              }}>
                <Lock size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.8rem', marginBottom: '3px' }}>
                  Los sitios web oficiales seguros usan HTTPS
                </div>
                <p style={{ margin: 0, lineHeight: 1.4, fontSize: '0.72rem', color: '#9CA3AF' }}>
                  El candado junto a la URL indica que tu conexión está cifrada con TLS 1.3 de extremo a extremo. Toda la información y documentos descargados están protegidos contra alteraciones o suplantaciones.
                </p>
              </div>
            </div>

            {/* Verificación 3: Soberanía Digital y Self-Hosting */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                padding: '10px',
                background: 'rgba(75, 0, 143, 0.25)',
                borderRadius: '10px',
                color: 'var(--ea-secondary)',
                flexShrink: 0
              }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.8rem', marginBottom: '3px' }}>
                  Soberanía y Seguridad Institucional
                </div>
                <p style={{ margin: 0, lineHeight: 1.4, fontSize: '0.72rem', color: '#9CA3AF' }}>
                  EASystem opera bajo servidores institucionales seguros del Gobierno Municipal, con verificación de autenticidad para cada logotipo, afiche y documento emitido por las secretarías.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
