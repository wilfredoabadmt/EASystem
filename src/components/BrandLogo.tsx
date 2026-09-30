import React from 'react';

interface LogoProps {
  size?: number;
  variant?: 'color' | 'white' | 'monochrome';
  subbrand?: string;
  className?: string;
}

export const BrandLogo: React.FC<LogoProps> = ({
  size = 48,
  variant = 'color',
  subbrand,
  className = ''
}) => {
  const isWhite = variant === 'white';
  const primaryColor = isWhite ? '#FFFFFF' : '#4B008F';
  const secondaryColor = isWhite ? '#E0E0E0' : '#F5007B';
  const tealColor = isWhite ? '#B2DFDB' : '#008F89';
  const goldColor = isWhite ? '#FFF9C4' : '#F5B400';

  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
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
          fontSize: `${size * 0.17}px`, 
          letterSpacing: '0.12em',
          color: isWhite ? '#D1C4E9' : '#F5007B',
          textTransform: 'uppercase',
          marginTop: '2px'
        }}>
          {subbrand ? subbrand : 'Corazón de la Metrópoli'}
        </div>
      </div>
    </div>
  );
};
