import React, { useState, useEffect, useRef } from 'react';
import { dbService } from '../services/dbService';
import { Camera, RefreshCw } from 'lucide-react';

interface LogoProps {
  size?: number;
  variant?: 'color' | 'white' | 'monochrome';
  subbrand?: string;
  className?: string;
  allowUpload?: boolean;
  hideText?: boolean;
}

export const BrandLogo: React.FC<LogoProps> = ({
  size = 48,
  variant = 'color',
  subbrand,
  className = '',
  allowUpload = false,
  hideText = false
}) => {
  const [customLogo, setCustomLogo] = useState<string | null>(() => dbService.getMasterLogo());
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setCustomLogo(dbService.getMasterLogo());
    };
    window.addEventListener('ea_master_logo_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ea_master_logo_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        dbService.setMasterLogo(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const isWhite = variant === 'white';
  const primaryColor = isWhite ? '#FFFFFF' : '#4B008F';
  const secondaryColor = isWhite ? '#E0E0E0' : '#F5007B';
  const tealColor = isWhite ? '#B2DFDB' : '#008F89';
  const goldColor = isWhite ? '#FFF9C4' : '#F5B400';

  return (
    <div 
      className={`flex items-center gap-3 ${className}`} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '12px',
        position: 'relative',
        cursor: allowUpload ? 'pointer' : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (allowUpload) {
          fileInputRef.current?.click();
        }
      }}
      title={allowUpload ? 'Haz clic para cambiar el logotipo oficial' : undefined}
    >
      {allowUpload && (
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*,.svg" 
          style={{ display: 'none' }} 
        />
      )}

      {/* Símbolo / Imagotipo: Puede ser la imagen subida o el SVG predeterminado */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {customLogo ? (
          <img 
            src={customLogo} 
            alt="Logotipo Oficial El Alto" 
            style={{ 
              height: `${size}px`, 
              maxWidth: hideText ? `${size * 3.5}px` : `${size * 1.5}px`, 
              objectFit: 'contain',
              flexShrink: 0,
              filter: isWhite ? 'brightness(0) invert(1)' : 'drop-shadow(0 4px 12px rgba(75, 0, 143, 0.4))',
              borderRadius: '8px'
            }} 
          />
        ) : (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 120 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0, filter: isWhite ? 'none' : 'drop-shadow(0 4px 12px rgba(75, 0, 143, 0.4))' }}
          >
            {/* Fondo geométrico Cholet / Andino */}
            <rect x="10" y="10" width="100" height="100" rx="24" fill={primaryColor} />
            
            {/* Líneas dinámicas del Aguayo / Pirámide de El Alto */}
            <path d="M30 92L60 32L90 92H30Z" fill={secondaryColor} opacity="0.95" />
            <path d="M44 92L60 60L76 92H44Z" fill={goldColor} />
            
            {/* Núcleo de Tecnología y Conectividad */}
            <circle cx="60" cy="46" r="8" fill={tealColor} />
            
            {/* Tejido de precisión superior */}
            <path d="M60 22L66 32H54L60 22Z" fill="#FFFFFF" />
          </svg>
        )}

        {/* Indicador de cambio de logo al pasar el cursor si allowUpload está activo */}
        {allowUpload && isHovered && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(245, 0, 123, 0.75)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            backdropFilter: 'blur(2px)'
          }}>
            <Camera size={Math.max(16, size * 0.4)} />
          </div>
        )}
      </div>
      
      {/* Texto Institucional Descriptivo */}
      {!hideText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ 
            fontFamily: "'Montserrat', sans-serif", 
            fontWeight: 900, 
            fontSize: `${size * 0.42}px`, 
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: isWhite ? '#FFFFFF' : '#FFFFFF',
            textTransform: 'uppercase'
          }}>
            EL ALTO
          </div>
          <div style={{ 
            fontFamily: "'Poppins', sans-serif", 
            fontWeight: 600, 
            fontSize: `${Math.max(10, size * 0.17)}px`, 
            letterSpacing: '0.12em',
            color: isWhite ? '#D1C4E9' : '#F5007B',
            textTransform: 'uppercase',
            marginTop: '2px'
          }}>
            {subbrand ? subbrand : 'Corazón de la Metrópoli'}
          </div>
        </div>
      )}
    </div>
  );
};
