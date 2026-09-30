import React, { useState, useEffect } from 'react';
import { 
  dbService, 
  LineaGrafica, 
  Secretaria, 
  FuncionarioPersonal, 
  AuditLog,
  DEFAULT_LINEA_OFICIAL 
} from '../services/dbService';
import { MaterialesPersonalAdaptados } from './MaterialesPersonalAdaptados';
import { 
  Palette, 
  Database, 
  PlusCircle, 
  Check, 
  Trash2, 
  Edit3, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  History, 
  RefreshCw, 
  Upload, 
  FileCode, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Info
} from 'lucide-react';

interface Props {
  userRole?: string;
}

export const LineaGraficaManager: React.FC<Props> = () => {
  const [lineas, setLineas] = useState<LineaGrafica[]>([]);
  const [lineaActiva, setLineaActiva] = useState<LineaGrafica>(DEFAULT_LINEA_OFICIAL);
  const [secretarias, setSecretarias] = useState<Secretaria[]>([]);
  const [funcionarios, setFuncionarios] = useState<FuncionarioPersonal[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  
  // Vistas: 'CATALOGO' | 'MATERIALES' | 'AUDITORIA'
  const [currentView, setCurrentView] = useState<'CATALOGO' | 'MATERIALES' | 'AUDITORIA'>('CATALOGO');
  
  // Estado modal formulario
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLinea, setEditingLinea] = useState<Partial<LineaGrafica> | null>(null);

  // Mensaje toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const reloadData = () => {
    const all = dbService.getLineasGraficas();
    const active = dbService.getLineaActiva();
    setLineas(all);
    setLineaActiva(active);
    setSecretarias(dbService.getSecretarias());
    setFuncionarios(dbService.getFuncionarios());
    setAuditLogs(dbService.getAuditLogs());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingLinea({
      codigo: `LGO-${new Date().getFullYear()}-0${lineas.length + 1}`,
      nombre: 'Nueva Línea Institucional GAMEA',
      descripcion: 'Línea gráfica original para adaptación municipal.',
      yearVigencia: new Date().getFullYear(),
      isActiva: false,
      estado: 'BORRADOR',
      colorPrimary: '#4B008F',
      colorSecondary: '#F5007B',
      colorTeal: '#008F89',
      colorGold: '#F5B400',
      colorDark: '#090314',
      colorSurface: '#1A0E2E',
      fontHeadings: 'Gotham, Montserrat, sans-serif',
      fontBody: 'Poppins, Inter, sans-serif',
      slogan: 'El Corazón de la Metrópoli',
      subSlogan: 'Ciudad de Oportunidades y Trabajo',
      logoSubbrandText: 'Gobierno Autónomo Municipal de El Alto',
      logoSvg: DEFAULT_LINEA_OFICIAL.logoSvg,
      aguayoPatternType: 'geometric_classic',
      aguayoColors: ['#4B008F', '#F5007B', '#008F89', '#F5B400', '#690BB2']
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (linea: LineaGrafica) => {
    setEditingLinea({ ...linea });
    setIsModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLinea) return;

    try {
      dbService.saveLineaGrafica(editingLinea);
      reloadData();
      setIsModalOpen(false);
      setEditingLinea(null);
      showToast('Línea gráfica guardada y sincronizada exitosamente en el sistema municipal.', 'success');
    } catch (err: any) {
      showToast(`Error al guardar: ${err.message}`, 'error');
    }
  };

  const handleActivate = (id: string) => {
    const success = dbService.setLineaActiva(id);
    if (success) {
      reloadData();
      showToast('¡Línea Maestra activada! Todos los materiales del personal se han re-adaptado automáticamente.', 'success');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar esta línea gráfica del sistema municipal?')) {
      const res = dbService.deleteLineaGrafica(id);
      if (res.success) {
        reloadData();
        showToast(res.message, 'success');
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('¿Restablecer las líneas gráficas originales del Gobierno Autónomo Municipal de El Alto?')) {
      dbService.resetToDefaults();
      reloadData();
      showToast('Base de datos restablecida a los valores oficiales de GAMEA.', 'info');
    }
  };

  const dbInfo = dbService.getDatabaseInfo();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          padding: '14px 20px',
          borderRadius: '10px',
          background: toastMessage.type === 'success' ? '#065F46' : toastMessage.type === 'error' ? '#991B1B' : '#1E40AF',
          color: '#FFF',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.85rem',
          fontWeight: 600,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {toastMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Header & DB Status Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        padding: '24px 28px',
        background: 'rgba(26, 14, 46, 0.7)',
        border: '1px solid var(--ea-border)',
        borderRadius: '16px',
        backdropFilter: 'blur(16px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '14px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, var(--ea-primary), var(--ea-secondary))',
            boxShadow: '0 6px 18px rgba(75,0,143,0.4)',
            color: '#FFFFFF'
          }}>
            <Palette size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>
                Gobernanza de Línea Gráfica Original & Materiales
              </h2>
              <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.7rem' }}>
                SISTEMA CENTRAL ACTIVO
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', color: 'var(--ea-text-muted)', fontSize: '0.85rem' }}>
              Carga la línea gráfica original de El Alto y adáptala automáticamente a todo el kit de material que usa el personal municipal.
            </p>
          </div>
        </div>

        {/* Indicador de Estado del Sistema */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(0, 143, 137, 0.3)',
          padding: '10px 18px',
          borderRadius: '12px'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            boxShadow: '0 0 10px #10B981'
          }} />
          <div style={{ fontSize: '0.75rem' }}>
            <div style={{ fontWeight: 700, color: '#10B981' }}>Registro Central del Municipio</div>
            <div style={{ color: 'var(--ea-text-muted)' }}>Base Oficial: <strong>GAMEA Central</strong> · Módulos: {dbInfo.tablesCount} · Registros: {dbInfo.recordsCount}</div>
          </div>
          <button 
            onClick={reloadData} 
            title="Sincronizar base de datos" 
            style={{ background: 'transparent', border: 'none', color: 'var(--ea-text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs & Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setCurrentView('CATALOGO')}
            className={`ea-btn ${currentView === 'CATALOGO' ? 'ea-btn-primary' : 'ea-btn-secondary'}`}
            style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Layers size={16} />
            <span>1. Catálogo Líneas Gráficas ({lineas.length})</span>
          </button>

          <button
            onClick={() => setCurrentView('MATERIALES')}
            className={`ea-btn ${currentView === 'MATERIALES' ? 'ea-btn-primary' : 'ea-btn-secondary'}`}
            style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}
          >
            <Sparkles size={16} />
            <span>2. Materiales Adaptados del Personal</span>
            <span style={{
              background: 'var(--ea-secondary)',
              color: '#FFF',
              borderRadius: '10px',
              padding: '1px 6px',
              fontSize: '0.65rem',
              fontWeight: 800
            }}>
              8 Kits
            </span>
          </button>

          <button
            onClick={() => setCurrentView('AUDITORIA')}
            className={`ea-btn ${currentView === 'AUDITORIA' ? 'ea-btn-primary' : 'ea-btn-secondary'}`}
            style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <History size={16} />
            <span>3. Historial de Auditoría y Cambios</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleResetDefaults}
            className="ea-btn ea-btn-secondary"
            style={{ fontSize: '0.8rem', padding: '8px 14px' }}
            title="Restablecer diseños originales"
          >
            Restablecer Diseños Predeterminados
          </button>

          <button
            onClick={handleOpenCreate}
            className="ea-btn ea-btn-primary"
            style={{ fontSize: '0.85rem', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <PlusCircle size={18} />
            <span>Subir / Registrar Línea Original</span>
          </button>
        </div>

      </div>

      {/* ----------------------------------------------------------------- */}
      {/* VISTA 1: CATÁLOGO Y CRUD DE LÍNEAS GRÁFICAS                       */}
      {/* ----------------------------------------------------------------- */}
      {currentView === 'CATALOGO' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '24px'
          }}>
            {lineas.map(linea => {
              const isActiva = linea.isActiva && linea.estado === 'ACTIVA';

              return (
                <div 
                  key={linea.id}
                  className="ea-card"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    position: 'relative',
                    borderColor: isActiva ? 'var(--ea-gold)' : 'var(--ea-border)',
                    boxShadow: isActiva ? '0 8px 32px rgba(245, 180, 0, 0.15)' : 'none'
                  }}
                >
                  {/* Aguayo Decorativo en la tarjeta */}
                  <div style={{
                    height: '4px',
                    width: '100%',
                    display: 'flex',
                    overflow: 'hidden',
                    borderRadius: '2px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0
                  }}>
                    {(linea.aguayoColors || ['#4B008F', '#F5007B', '#008F89']).map((c, i) => (
                      <div key={i} style={{ flex: 1, backgroundColor: c }} />
                    ))}
                  </div>

                  {/* Header de la tarjeta */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', marginTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div 
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '12px',
                          background: 'rgba(0,0,0,0.5)',
                          border: `1px solid ${linea.colorGold}`,
                          padding: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        dangerouslySetInnerHTML={{ __html: linea.logoSvg }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>
                            {linea.codigo}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--ea-teal)', fontWeight: 600 }}>
                            Vigencia: {linea.yearVigencia}
                          </span>
                        </div>
                        <h3 style={{ margin: '4px 0', fontSize: '1.15rem', fontWeight: 800 }}>
                          {linea.nombre}
                        </h3>
                      </div>
                    </div>

                    {isActiva ? (
                      <span className="ea-badge ea-badge-gold" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Check size={12} /> ACTIVA MAESTRA
                      </span>
                    ) : (
                      <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.7rem' }}>
                        {linea.estado}
                      </span>
                    )}
                  </div>

                  {/* Descripción y Slogans */}
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ea-text-muted)', lineHeight: '1.4' }}>
                    {linea.descripcion}
                  </p>

                  <div style={{
                    background: 'rgba(0,0,0,0.25)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    borderLeft: `3px solid ${linea.colorSecondary}`
                  }}>
                    <div>Slogan: <strong style={{ color: linea.colorGold }}>"{linea.slogan}"</strong></div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)', marginTop: '2px' }}>
                      Sub: {linea.subSlogan || 'Gestión Municipal El Alto'}
                    </div>
                  </div>

                  {/* Desglose de Paleta Cromática */}
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ea-text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Colores Oficiales Registrados:
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Primario', val: linea.colorPrimary },
                        { label: 'Secundario', val: linea.colorSecondary },
                        { label: 'Turquesa', val: linea.colorTeal },
                        { label: 'Oro', val: linea.colorGold },
                        { label: 'Fondo', val: linea.colorSurface }
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '6px' }}>
                          <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: item.val, display: 'inline-block', border: '1px solid rgba(255,255,255,0.3)' }} />
                          <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Acciones de la Tarjeta */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--ea-border)',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {!isActiva && (
                        <button
                          onClick={() => handleActivate(linea.id)}
                          className="ea-btn ea-btn-primary"
                          style={{ fontSize: '0.75rem', padding: '6px 12px', background: 'var(--ea-teal)' }}
                          title="Establecer como línea maestra para todo el municipio"
                        >
                          <Check size={14} /> Activar como Maestra
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          setLineaActiva(linea);
                          setCurrentView('MATERIALES');
                        }}
                        className="ea-btn ea-btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                      >
                        Ver Materiales <ArrowRight size={12} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleOpenEdit(linea)}
                        className="ea-btn ea-btn-secondary"
                        style={{ padding: '6px 10px' }}
                        title="Editar parámetros"
                      >
                        <Edit3 size={14} />
                      </button>

                      {!isActiva && (
                        <button
                          onClick={() => handleDelete(linea.id)}
                          className="ea-btn ea-btn-secondary"
                          style={{ padding: '6px 10px', color: '#EF4444' }}
                          title="Eliminar del Sistema"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* VISTA 2: MATERIALES ADAPTADOS PARA EL PERSONAL                    */}
      {/* ----------------------------------------------------------------- */}
      {currentView === 'MATERIALES' && (
        <MaterialesPersonalAdaptados 
          lineaActiva={lineaActiva}
          secretarias={secretarias}
          funcionarios={funcionarios}
        />
      )}

      {/* ----------------------------------------------------------------- */}
      {/* VISTA 3: TRAZABILIDAD & AUDITORÍA ENCRIPTADA                      */}
      {/* ----------------------------------------------------------------- */}
      {currentView === 'AUDITORIA' && (
        <div className="ea-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={24} color="var(--ea-teal)" />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                  Historial de Modificaciones y Auditoría Oficial
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--ea-text-muted)' }}>
                  Registro de auditoría inmutable del Gobierno Autónomo Municipal de El Alto. Cada edición queda registrada con fecha, hora y usuario responsable.
                </span>
              </div>
            </div>
            <span className="ea-badge ea-badge-teal">
              INTEGRIDAD VERIFICADA
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ea-border)', textAlign: 'left', color: 'var(--ea-text-muted)' }}>
                  <th style={{ padding: '10px' }}>FECHA Y HORA</th>
                  <th style={{ padding: '10px' }}>USUARIO / AUTORIDAD</th>
                  <th style={{ padding: '10px' }}>ACCIÓN</th>
                  <th style={{ padding: '10px' }}>RECURSO</th>
                  <th style={{ padding: '10px' }}>CÓDIGO PREVIO</th>
                  <th style={{ padding: '10px' }}>CÓDIGO DE AUTENTICIDAD</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', color: 'var(--ea-text-muted)' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td style={{ padding: '10px', fontWeight: 700 }}>
                      {log.userName}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.65rem' }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: '10px', color: 'var(--ea-gold)' }}>
                      {log.resourceType}:{log.resourceId.substring(0, 12)}...
                    </td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: 'var(--ea-text-muted)', fontSize: '0.7rem' }}>
                      {log.previousHash.substring(0, 16)}...
                    </td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: 'var(--ea-teal)', fontWeight: 700, fontSize: '0.7rem' }}>
                      {log.recordHash.substring(0, 20)}...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* MODAL: SUBIR / EDITAR LÍNEA GRÁFICA ORIGINAL                      */}
      {/* ----------------------------------------------------------------- */}
      {isModalOpen && editingLinea && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--ea-bg-card)',
            border: '1px solid var(--ea-border)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--ea-border)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', background: 'var(--ea-primary)', borderRadius: '10px', color: '#FFF' }}>
                  <Upload size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                    {editingLinea.id ? 'Editar Línea Gráfica Oficial' : 'Subir / Registrar Nueva Línea Gráfica Original'}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--ea-text-muted)' }}>
                    Los valores configurados aquí se adaptarán de inmediato a las credenciales, notas, comunicados y afiches del personal.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveForm} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Sección 1: Datos Generales */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>CÓDIGO DE IDENTIDAD:</label>
                  <input 
                    type="text" 
                    value={editingLinea.codigo || ''} 
                    onChange={e => setEditingLinea({ ...editingLinea, codigo: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--ea-border)', borderRadius: '8px', color: '#FFF', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>AÑO DE VIGENCIA:</label>
                  <input 
                    type="number" 
                    value={editingLinea.yearVigencia || 2026} 
                    onChange={e => setEditingLinea({ ...editingLinea, yearVigencia: parseInt(e.target.value) || 2026 })}
                    required
                    style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--ea-border)', borderRadius: '8px', color: '#FFF', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>ESTADO INICIAL:</label>
                  <select
                    value={editingLinea.estado || 'BORRADOR'}
                    onChange={e => setEditingLinea({ ...editingLinea, estado: e.target.value as any })}
                    style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--ea-border)', borderRadius: '8px', color: '#FFF', marginTop: '4px' }}
                  >
                    <option value="BORRADOR">BORRADOR</option>
                    <option value="ACTIVA">ACTIVA (Línea Maestra)</option>
                    <option value="ARCHIVADA">ARCHIVADA</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>NOMBRE DE LA LÍNEA GRÁFICA:</label>
                <input 
                  type="text" 
                  value={editingLinea.nombre || ''} 
                  onChange={e => setEditingLinea({ ...editingLinea, nombre: e.target.value })}
                  placeholder="Ej: Línea Oficial Bicentenario 2026"
                  required
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--ea-border)', borderRadius: '8px', color: '#FFF', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>DESCRIPCIÓN INSTITUCIONAL:</label>
                <textarea 
                  value={editingLinea.descripcion || ''} 
                  onChange={e => setEditingLinea({ ...editingLinea, descripcion: e.target.value })}
                  rows={2}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--ea-border)', borderRadius: '8px', color: '#FFF', marginTop: '4px' }}
                />
              </div>

              {/* Slogans */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>SLOGAN OFICIAL DE CIUDAD:</label>
                  <input 
                    type="text" 
                    value={editingLinea.slogan || ''} 
                    onChange={e => setEditingLinea({ ...editingLinea, slogan: e.target.value })}
                    placeholder="Ej: El Corazón de la Metrópoli"
                    style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--ea-border)', borderRadius: '8px', color: '#FFF', marginTop: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>SUB-SLOGAN INSTITUCIONAL:</label>
                  <input 
                    type="text" 
                    value={editingLinea.subSlogan || ''} 
                    onChange={e => setEditingLinea({ ...editingLinea, subSlogan: e.target.value })}
                    placeholder="Ej: Ciudad de Oportunidades y Trabajo"
                    style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--ea-border)', borderRadius: '8px', color: '#FFF', marginTop: '4px' }}
                  />
                </div>
              </div>

              {/* Paleta de Colores Oficiales */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--ea-border)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 700, color: 'var(--ea-gold)' }}>
                  Paleta Cromática Oficial (Tokens HEX)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
                  {[
                    { key: 'colorPrimary', label: 'Primario' },
                    { key: 'colorSecondary', label: 'Secundario' },
                    { key: 'colorTeal', label: 'Turquesa' },
                    { key: 'colorGold', label: 'Oro Andino' },
                    { key: 'colorSurface', label: 'Superficie' }
                  ].map(c => (
                    <div key={c.key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{c.label}:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="color" 
                          value={(editingLinea as any)[c.key] || '#4B008F'} 
                          onChange={e => setEditingLinea({ ...editingLinea, [c.key]: e.target.value })}
                          style={{ width: '36px', height: '36px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={(editingLinea as any)[c.key] || '#4B008F'} 
                          onChange={e => setEditingLinea({ ...editingLinea, [c.key]: e.target.value })}
                          style={{ width: '80px', padding: '6px', fontSize: '0.75rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--ea-border)', borderRadius: '4px', color: '#FFF' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Imagotipo Vectorial Maestro */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--ea-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--ea-teal)' }}>
                    Imagotipo Vectorial Maestro (Código SVG / Símbolo Oficial)
                  </h4>
                  <label 
                    className="ea-btn ea-btn-teal" 
                    style={{ fontSize: '0.75rem', padding: '6px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Upload size={14} />
                    <span>Cargar Archivo SVG / Imagen desde mi PC</span>
                    <input 
                      type="file" 
                      accept=".svg,image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        if (file.name.endsWith('.svg') || file.type.includes('svg')) {
                          reader.onload = (loadEvent) => {
                            const svgText = loadEvent.target?.result as string;
                            setEditingLinea(prev => prev ? { ...prev, logoSvg: svgText } : null);
                            showToast(`Archivo SVG cargado: ${file.name}`);
                          };
                          reader.readAsText(file);
                        } else {
                          reader.onload = (loadEvent) => {
                            const dataUrl = loadEvent.target?.result as string;
                            const wrappedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><image href="${dataUrl}" width="200" height="200"/></svg>`;
                            setEditingLinea(prev => prev ? { ...prev, logoSvg: wrappedSvg } : null);
                            showToast(`Imagen ${file.name} adaptada como imagotipo`);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <textarea 
                      value={editingLinea.logoSvg || ''} 
                      onChange={e => setEditingLinea({ ...editingLinea, logoSvg: e.target.value })}
                      rows={4}
                      placeholder="<svg viewBox='0 0 100 100' ...> ... </svg> o usa el botón 'Cargar Archivo SVG'"
                      style={{ width: '100%', padding: '10px', fontFamily: 'monospace', fontSize: '0.75rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--ea-border)', borderRadius: '8px', color: '#10B981' }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--ea-text-muted)', display: 'block', marginBottom: '4px' }}>Vista Previa</span>
                    <div 
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '10px',
                        background: '#090314',
                        border: '1px solid var(--ea-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px'
                      }}
                      dangerouslySetInnerHTML={{ __html: editingLinea.logoSvg || DEFAULT_LINEA_OFICIAL.logoSvg }}
                    />
                  </div>
                </div>
              </div>

              {/* Botón de envío */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--ea-border)', paddingTop: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input 
                    type="checkbox" 
                    checked={editingLinea.isActiva || false} 
                    onChange={e => setEditingLinea({ ...editingLinea, isActiva: e.target.checked, estado: e.target.checked ? 'ACTIVA' : editingLinea.estado })}
                  />
                  <span>Establecer inmediatamente como Línea Maestra Activa</span>
                </label>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="ea-btn ea-btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="ea-btn ea-btn-primary"
                    style={{ padding: '10px 24px', fontWeight: 800 }}
                  >
                    Guardar en el Sistema Oficial
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
