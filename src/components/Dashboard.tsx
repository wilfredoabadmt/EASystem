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
  AlertCircle
} from 'lucide-react';
import { UserProfile } from './LoginPage';

interface DashboardProps {
  user: UserProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome Banner */}
      <div className="ea-card" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(75, 0, 143, 0.4) 0%, rgba(245, 0, 123, 0.15) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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
            <div style={{ fontSize: '0.7rem', color: 'var(--ea-text-muted)' }}>Línea Maestra BD</div>
          </div>
        </div>
      </div>

      {/* 5 Main KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
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
