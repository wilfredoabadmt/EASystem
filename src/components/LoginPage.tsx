import React, { useState } from 'react';
import { Shield, Key, UserCheck, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export type UserRole = 'ADMINISTRADOR' | 'DIRECTOR_COMUNICACION' | 'DISENADOR' | 'USUARIO_MUNICIPAL' | 'AUDITOR';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  secretaria: string;
}

interface LoginProps {
  onLoginSuccess: (user: UserProfile) => void;
  onBackToLanding: () => void;
}

export const PRESET_USERS: Record<UserRole, UserProfile> = {
  ADMINISTRADOR: {
    name: 'Ing. Rodrigo Mendoza',
    email: 'admin.sistemas@elalto.gob.bo',
    role: 'ADMINISTRADOR',
    secretaria: 'Dirección de Tecnologías y Sistemas'
  },
  DIRECTOR_COMUNICACION: {
    name: 'Lic. Claudia Mamani',
    email: 'dircom@elalto.gob.bo',
    role: 'DIRECTOR_COMUNICACION',
    secretaria: 'Dirección de Comunicación Institucional'
  },
  DISENADOR: {
    name: 'Álvaro Quispe',
    email: 'diseno.grafico@elalto.gob.bo',
    role: 'DISENADOR',
    secretaria: 'Unidad de Arte & Diseño Gráfico'
  },
  USUARIO_MUNICIPAL: {
    name: 'Dra. Elena Condori',
    email: 'movilidad.urbana@elalto.gob.bo',
    role: 'USUARIO_MUNICIPAL',
    secretaria: 'Secretaría Municipal de Movilidad Urbana'
  },
  AUDITOR: {
    name: 'Lic. Marcelo Flores',
    email: 'control.interno@elalto.gob.bo',
    role: 'AUDITOR',
    secretaria: 'Unidad de Auditoría y Control Interno'
  }
};

export const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('DIRECTOR_COMUNICACION');
  const [email, setEmail] = useState(PRESET_USERS.DIRECTOR_COMUNICACION.email);
  const [password, setPassword] = useState('••••••••••••');
  const [twoFactor, setTwoFactor] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(PRESET_USERS[role].email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(PRESET_USERS[selectedRole]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px',
      position: 'relative'
    }}>
      <div className="ea-aguayo-bar" style={{ position: 'absolute', top: 0, left: 0 }} />

      <button 
        onClick={onBackToLanding}
        className="ea-btn ea-btn-secondary"
        style={{ position: 'absolute', top: '24px', left: '32px' }}
      >
        <ArrowLeft size={16} />
        <span>Volver al Portal Público</span>
      </button>

      <div style={{
        width: '100%',
        maxWidth: '520px',
        background: 'var(--ea-bg-card)',
        backdropFilter: 'blur(24px)',
        border: '1px solid var(--ea-border)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(75, 0, 143, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', marginBottom: '16px' }}>
            <BrandLogo size={52} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Brand Manager</h2>
          <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Acceso seguro institucional para funcionarios y diseñadores
          </p>
        </div>

        {/* Roles Presets Selector */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ea-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Selecciona tu Rol de Acceso (Entorno Seguro):
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {(Object.keys(PRESET_USERS) as UserRole[]).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelect(role)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: selectedRole === role ? '1px solid var(--ea-secondary)' : '1px solid var(--ea-border)',
                  background: selectedRole === role ? 'rgba(245, 0, 123, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedRole === role ? '#FFFFFF' : 'var(--ea-text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {role.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 500 }}>
              Correo Institucional (@elalto.gob.bo)
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 500 }}>
              Contraseña de Acceso
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--ea-text-muted)' }}>
              <input 
                type="checkbox" 
                checked={twoFactor} 
                onChange={(e) => setTwoFactor(e.target.checked)} 
              />
              <span>Doble Factor (TOTP) Activo</span>
            </label>
            <a href="#recuperar" style={{ color: 'var(--ea-teal)', textDecoration: 'none' }}>¿Olvidó contraseña?</a>
          </div>

          <button 
            type="submit" 
            className="ea-btn ea-btn-primary" 
            style={{ width: '100%', padding: '14px', marginTop: '8px' }}
          >
            <Lock size={18} />
            <span>Autenticar y Entrar</span>
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          padding: '12px 16px',
          background: 'rgba(75, 0, 143, 0.2)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.75rem',
          color: 'var(--ea-text-muted)'
        }}>
          <Shield size={20} color="var(--ea-teal)" style={{ flexShrink: 0 }} />
          <span>Acceso cifrado bajo estándares gubernamentales. Toda actividad se registra en la bitácora inmutable.</span>
        </div>
      </div>
    </div>
  );
};
