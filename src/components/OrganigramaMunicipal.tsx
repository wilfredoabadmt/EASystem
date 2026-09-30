import React, { useState } from 'react';
import { 
  Building2, 
  GitBranch, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Shield, 
  FileText, 
  ArrowRight,
  Layers,
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import { ESTRUCTURA_ORGANIZACIONAL_2026 } from '../tokens/brandTokens';

interface OrganigramaProps {
  onSelectEntity?: (entity: { name: string; code: string }) => void;
  onNavigateTab?: (tab: string) => void;
}

export const OrganigramaMunicipal: React.FC<OrganigramaProps> = ({ onSelectEntity, onNavigateTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'TODOS' | 'EJECUTIVO' | 'SECRETARIAS' | 'SUBALCALDIAS' | 'SALUD_DESCENTRALIZADOS'>('TODOS');
  const [expandedEntidades, setExpandedEntidades] = useState<Record<string, boolean>>({
    'despacho_alcalde': true,
    'sm_gestion_institucional': true,
    'sm_administracion_finanzas': false,
    'sm_movilidad_urbana': false,
    'sm_educacion_cultura': false,
    'sm_desarrollo_humano': false,
    'sm_seguridad_ciudadana': false,
    'sm_salud': false,
    'sm_infraestructura_publica': false,
    'sm_agua_medioambiente_riesgos': false,
    'sm_desarrollo_economico': false
  });

  const toggleExpand = (id: string) => {
    setExpandedEntidades(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    ESTRUCTURA_ORGANIZACIONAL_2026.niveles.forEach(n => {
      n.entidades.forEach(e => {
        allExpanded[e.id] = true;
      });
    });
    setExpandedEntidades(allExpanded);
  };

  const collapseAll = () => {
    setExpandedEntidades({});
  };

  // Filtrado de niveles y entidades
  const nivelesFiltrados = ESTRUCTURA_ORGANIZACIONAL_2026.niveles.map(nivel => {
    // Filtro por tab
    if (activeFilter === 'EJECUTIVO' && nivel.id !== 'nivel_ejecutivo') return null;
    if (activeFilter === 'SECRETARIAS' && nivel.id !== 'secretarias_municipales') return null;
    if (activeFilter === 'SUBALCALDIAS' && nivel.id !== 'subalcaldias_distritales') return null;
    if (activeFilter === 'SALUD_DESCENTRALIZADOS' && !['entidades_desconcentradas_salud', 'entidades_descentralizadas'].includes(nivel.id)) return null;

    // Filtro por texto de búsqueda
    const entidadesFiltradas = nivel.entidades.filter(e => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      const matchName = e.name.toLowerCase().includes(term);
      const matchCode = e.code.toLowerCase().includes(term);
      const matchDirecciones = e.direcciones?.some(d => 
        d.name.toLowerCase().includes(term) || d.unidades?.some(u => u.toLowerCase().includes(term))
      );
      return matchName || matchCode || matchDirecciones;
    });

    if (entidadesFiltradas.length === 0) return null;

    return {
      ...nivel,
      entidades: entidadesFiltradas
    };
  }).filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner Principal del Organigrama */}
      <div className="ea-card" style={{
        padding: '28px 32px',
        background: 'linear-gradient(135deg, rgba(75, 0, 143, 0.4) 0%, rgba(245, 0, 123, 0.15) 100%)',
        border: '1px solid rgba(245, 0, 123, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="ea-badge ea-badge-purple">Estructura Organizacional Oficial</span>
            <span className="ea-badge ea-badge-gold">Aprobado con D.M. N° 200</span>
            <span className="ea-badge ea-badge-teal">Gestión 2026</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>
            Órgano Ejecutivo del Gobierno Autónomo Municipal de El Alto
          </h2>
          <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem', margin: '6px 0 0 0', maxWidth: '850px' }}>
            Nómina institucional oficial vigente. Todos los logotipos, submárgenes, hojas membretadas, sellos y credenciales de este sistema se adaptan automáticamente a estas secretarías, direcciones y distritos.
          </p>
        </div>

        {/* Leyenda Oficial D.M. 200 */}
        <div style={{
          background: 'rgba(0,0,0,0.5)',
          padding: '12px 18px',
          borderRadius: '12px',
          border: '1px solid var(--ea-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          fontSize: '0.75rem'
        }}>
          <div style={{ fontWeight: 800, color: '#FFFFFF', marginBottom: '2px' }}>Tipología de Funciones (D.M. 200):</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#3B82F6', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.65rem' }}>A</span>
            <span style={{ color: '#D1D5DB' }}>Funciones Administrativas</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#F59E0B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.65rem' }}>S</span>
            <span style={{ color: '#D1D5DB' }}>Funciones Sustantivas</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#8B5CF6', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.65rem' }}>C</span>
            <span style={{ color: '#D1D5DB' }}>Asesoramiento y Control</span>
          </div>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda Rápida */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'TODOS', label: 'Toda la Estructura (D.M. 200)' },
            { id: 'EJECUTIVO', label: 'Despacho & Gestión' },
            { id: 'SECRETARIAS', label: '9 Secretarías Municipales' },
            { id: 'SUBALCALDIAS', label: '14 Subalcaldías Distritales' },
            { id: 'SALUD_DESCENTRALIZADOS', label: 'Hospitales & Descentralizados' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`ea-btn ${activeFilter === tab.id ? 'ea-btn-primary' : 'ea-btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '8px 14px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', top: '10px', left: '12px', color: 'var(--ea-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Buscar secretaría, dirección o unidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFF',
                fontSize: '0.82rem'
              }}
            />
          </div>

          <button
            onClick={expandAll}
            className="ea-btn ea-btn-secondary"
            style={{ fontSize: '0.75rem', padding: '8px 12px' }}
            title="Desplegar todas las direcciones y unidades"
          >
            Expandir Todo
          </button>
          <button
            onClick={collapseAll}
            className="ea-btn ea-btn-secondary"
            style={{ fontSize: '0.75rem', padding: '8px 12px' }}
            title="Colapsar todas"
          >
            Contraer
          </button>
        </div>
      </div>

      {/* Visualización Jerárquica del Organigrama */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {nivelesFiltrados.map((nivel: any) => (
          <div key={nivel.id} className="ea-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--ea-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GitBranch size={20} color="var(--ea-teal)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{nivel.titulo}</h3>
              </div>
              <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.75rem' }}>
                {nivel.entidades.length} Entidades Oficiales
              </span>
            </div>

            {/* Grid de Entidades de este Nivel */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '16px'
            }}>
              {nivel.entidades.map((entidad: any) => {
                const isExpanded = Boolean(expandedEntidades[entidad.id]);
                const totalDirecciones = entidad.direcciones?.length || 0;
                const totalUnidades = entidad.direcciones?.reduce((acc: number, d: any) => acc + (d.unidades?.length || 0), 0) || 0;

                return (
                  <div 
                    key={entidad.id}
                    style={{
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: isExpanded ? `1px solid ${entidad.color || 'var(--ea-teal)'}` : '1px solid var(--ea-border)',
                      padding: '16px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      boxShadow: isExpanded ? '0 8px 24px rgba(0,0,0,0.5)' : undefined
                    }}
                  >
                    {/* Header de la Entidad */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span className="ea-badge" style={{
                          background: `${entidad.color}22`,
                          color: entidad.color || '#FFF',
                          border: `1px solid ${entidad.color}66`,
                          fontSize: '0.68rem',
                          fontWeight: 800
                        }}>
                          {entidad.code}
                        </span>

                        <span style={{ fontSize: '0.7rem', color: 'var(--ea-text-muted)' }}>
                          {entidad.tipo === 'SUBALCALDIA' 
                            ? 'Nivel Desconcentrado' 
                            : entidad.tipo === 'DESCONCENTRADO' 
                            ? 'Hospital / Red de Salud' 
                            : entidad.tipo === 'DESCENTRALIZADO'
                            ? 'Empresa Municipal'
                            : 'Nivel Central'}
                        </span>
                      </div>

                      <h4 style={{ margin: '4px 0 8px 0', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
                        {entidad.name}
                      </h4>

                      {/* Contador de Direcciones y Unidades */}
                      {totalDirecciones > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--ea-teal)', marginBottom: '12px' }}>
                          <span>{totalDirecciones} Direcciones</span>
                          <span>•</span>
                          <span>{totalUnidades} Unidades Dependientes</span>
                        </div>
                      )}
                    </div>

                    {/* Desglose de Direcciones y Unidades (Desplegable) */}
                    {totalDirecciones > 0 && isExpanded && (
                      <div style={{
                        marginTop: '12px',
                        paddingTop: '12px',
                        borderTop: '1px dashed rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        {entidad.direcciones.map((dir: any, dIdx: number) => (
                          <div key={dIdx} style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--ea-gold)', marginBottom: '6px' }}>
                              ↳ {dir.name}
                            </div>
                            {dir.unidades && dir.unidades.length > 0 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '14px' }}>
                                {dir.unidades.map((u: string, uIdx: number) => (
                                  <div key={uIdx} style={{ fontSize: '0.74rem', color: 'var(--ea-text-muted)' }}>
                                    • {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Botones de Acción de la Tarjeta */}
                    <div style={{
                      marginTop: '16px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}>
                      {totalDirecciones > 0 ? (
                        <button
                          onClick={() => toggleExpand(entidad.id)}
                          className="ea-btn ea-btn-secondary"
                          style={{ fontSize: '0.72rem', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          <span>{isExpanded ? 'Ocultar Estructura' : 'Ver Direcciones y Unidades'}</span>
                        </button>
                      ) : <div />}

                      <div style={{ display: 'flex', gap: '6px' }}>
                        {onNavigateTab && (
                          <button
                            onClick={() => onNavigateTab('LINEA_GRAFICA')}
                            className="ea-btn ea-btn-teal"
                            style={{ fontSize: '0.72rem', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                            title="Ver credenciales, notas y afiches adaptados para esta entidad"
                          >
                            <span>Materiales</span>
                            <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
