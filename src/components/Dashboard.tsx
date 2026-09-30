import React from 'react';
import { 
  Users, 
  FileText, 
  Download, 
  Megaphone, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle,
  Activity,
  Calendar,
  AlertCircle,
  Folder,
  Palette,
  Sliders,
  Scan,
  Bot,
  ArrowRight,
  Upload
} from 'lucide-react';
import { UserProfile } from './LoginPage';

interface DashboardProps {
  user: UserProfile;
  onNavigate?: (tab: 'DASHBOARD' | 'LINEA_GRAFICA' | 'BRAND_BOOK' | 'ARCHITECTURE' | 'GENERATOR' | 'VALIDATOR' | 'BAM' | 'ALTO_IA') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome Banner */}
      <div className="ea-card" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(75, 0, 143, 0.4) 0%, rgba(245, 0, 123, 0.15) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div className="ea-badge ea-badge-purple" style={{ marginBottom: '8px' }}>
            Panel de Control Institucional
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Bienvenido, {user.name}</h2>
          <p style={{ color: 'var(--ea-text-muted)', marginTop: '4px' }}>
            {user.secretaria} — Rol: <strong style={{ color: 'var(--ea-secondary)' }}>{user.role}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            padding: '12px 20px',
            borderRadius: '12px',
            border: '1px solid var(--ea-border)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ea-teal)' }}>100%</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--ea-text-muted)' }}>Índice de Marca</div>
          </div>
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            padding: '12px 20px',
            borderRadius: '12px',
            border: '1px solid var(--ea-border)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ea-gold)' }}>LGO-2026</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--ea-text-muted)' }}>Línea Institucional</div>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas del Sistema (Navegación 100% Funcional) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { 
            tab: 'BAM', 
            label: 'Biblioteca de Archivos', 
            desc: 'Sube tus logotipos, afiches y archivos de diseño', 
            icon: Upload, 
            color: '#FB923C'
          },
          { 
            tab: 'LINEA_GRAFICA', 
            label: 'Línea Gráfica & Materiales', 
            desc: 'Gestión de línea maestra y adaptación a credenciales, notas y afiches', 
            icon: Palette, 
            color: '#F43F5E'
          },
          { 
            tab: 'GENERATOR', 
            label: 'Generador de Piezas & Prensa', 
            desc: 'Crea comunicados oficiales, afiches y noticias para elalto.gob.bo', 
            icon: Sliders, 
            color: '#34D399'
          },
          { 
            tab: 'VALIDATOR', 
            label: 'Validador de Diseños Oficiales', 
            desc: 'Revisa que tus diseños cumplan con la normativa municipal', 
            icon: Scan, 
            color: '#FBBF24'
          },
          { 
            tab: 'ALTO_IA', 
            label: 'Asistente Inteligente Alto IA', 
            desc: 'Consultas y redacción de textos institucionales con Inteligencia Artificial', 
            icon: Bot, 
            color: '#EC4899'
          }
        ].map((action, idx) => {
          const Icon = action.icon;
          return (
            <div 
              key={idx} 
              className="ea-card" 
              style={{ 
                padding: '22px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                borderRadius: '14px'
              }}
              onClick={() => onNavigate && onNavigate(action.tab as any)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: `${action.color}22`,
                    border: `1.5px solid ${action.color}66`,
                    color: action.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 16px ${action.color}33`,
                    flexShrink: 0
                  }}>
                    <Icon size={22} strokeWidth={2.3} />
                  </div>
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800 }}>{action.label}</h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ea-text-muted)', lineHeight: 1.5 }}>{action.desc}</p>
              </div>

              <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: action.color, fontWeight: 700 }}>
                <span>Abrir módulo</span>
                <ArrowRight size={15} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 5 Main KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Usuarios Activos', val: '248', icon: Users, color: 'var(--ea-teal)' },
          { label: 'Solicitudes en Curso', val: '14', icon: Activity, color: 'var(--ea-gold)' },
          { label: 'Diseños Generados', val: '1.892', icon: FileText, color: 'var(--ea-secondary)' },
          { label: 'Descargas Totales', val: '5.430', icon: Download, color: 'var(--ea-primary)' },
          { label: 'Campañas Activas', val: '6', icon: Megaphone, color: '#65F0EB' },
        ].map((kpi, idx) => (
          <div key={idx} className="ea-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ea-text-muted)', fontWeight: 600 }}>{kpi.label}</span>
              <kpi.icon size={20} color={kpi.color} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}>
              {kpi.val}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ea-teal)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={12} />
              <span>+18% este mes</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="ea-grid-dashboard">
        {/* Uso por Secretaría */}
        <div className="ea-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>
            Generación de Material por Secretaría
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'Secretaría de Salud y Deportes', percent: 84, color: 'var(--ea-teal)' },
              { name: 'Secretaría de Movilidad Urbana', percent: 68, color: 'var(--ea-secondary)' },
              { name: 'Secretaría de Educación y Cultura', percent: 55, color: 'var(--ea-gold)' },
              { name: 'Secretaría de Infraestructura Pública', percent: 42, color: 'var(--ea-purple-deep)' },
              { name: 'Seguridad Ciudadana', percent: 35, color: '#65F0EB' }
            ].map((bar, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span>{bar.name}</span>
                  <strong>{bar.percent}% ({Math.round(bar.percent * 18)} piezas)</strong>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${bar.percent}%`, height: '100%', background: bar.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bitácora Reciente */}
        <div className="ea-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>
            Bitácora de Auditoría
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { action: 'Comunicado emitido', user: 'Lic. Claudia Mamani', time: 'Hace 8 min' },
              { action: 'Descarga Imagotipo SVG', user: 'Álvaro Quispe', time: 'Hace 24 min' },
              { action: 'Brand Score 100% aprobado', user: 'Dra. Elena Condori', time: 'Hace 1 hora' },
              { action: 'Submarca actualizada', user: 'Ing. Rodrigo Mendoza', time: 'Hace 3 horas' },
            ].map((log, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.85rem' }}>
                <CheckCircle size={16} color="var(--ea-teal)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{log.action}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>{log.user} • {log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
