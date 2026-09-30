import React, { useState, useEffect } from 'react';
import { 
  LineaGrafica, 
  Secretaria, 
  FuncionarioPersonal, 
  MaterialCatalogo,
  DEFAULT_MATERIALES_CATALOGO 
} from '../services/dbService';
import { 
  UserCheck, 
  FileText, 
  AlertTriangle, 
  Building2, 
  QrCode, 
  Download, 
  Printer, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Layers, 
  Mail, 
  Image as ImageIcon,
  FolderKanban,
  Upload,
  RotateCcw,
  Camera,
  Check
} from 'lucide-react';

interface Props {
  lineaActiva: LineaGrafica;
  secretarias: Secretaria[];
  funcionarios: FuncionarioPersonal[];
}

export const MaterialesPersonalAdaptados: React.FC<Props> = ({
  lineaActiva,
  secretarias,
  funcionarios
}) => {
  const [selectedSecId, setSelectedSecId] = useState<string>(secretarias[0]?.id || '');
  const [selectedFuncId, setSelectedFuncId] = useState<string>(funcionarios[0]?.id || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  
  // Estado de Diseños Personalizados Subidos por el Usuario (persistencia en localStorage)
  const [customDesigns, setCustomDesigns] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('easystem_custom_material_designs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentSec = secretarias.find(s => s.id === selectedSecId) || secretarias[0];
  const currentFunc = funcionarios.find(f => f.id === selectedFuncId) || funcionarios[0];

  const categories = ['TODOS', 'IDENTIFICACION', 'PAPELERIA', 'PRENSA', 'DIGITAL', 'EVENTOS'];

  const filteredMaterials = selectedCategory === 'TODOS' 
    ? DEFAULT_MATERIALES_CATALOGO 
    : DEFAULT_MATERIALES_CATALOGO.filter(m => m.categoria === selectedCategory);

  // Subir diseño propio para una pieza específica
  const handleUploadDesign = (materialTipo: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const updated = { ...customDesigns, [materialTipo]: dataUrl };
      setCustomDesigns(updated);
      try {
        localStorage.setItem('easystem_custom_material_designs', JSON.stringify(updated));
      } catch (err) {
        console.error('Error guardando diseño en localStorage', err);
      }
    };
    reader.readAsDataURL(file);
  };

  // Restaurar maqueta automática del sistema
  const handleRemoveCustomDesign = (materialTipo: string) => {
    const updated = { ...customDesigns };
    delete updated[materialTipo];
    setCustomDesigns(updated);
    try {
      localStorage.setItem('easystem_custom_material_designs', JSON.stringify(updated));
    } catch (err) {
      console.error('Error actualizando localStorage', err);
    }
  };

  // Helper para renderizar el logo SVG de la línea activa de forma segura
  const renderLogo = (size: number = 44) => {
    return (
      <div 
        style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: lineaActiva.logoSvg }}
      />
    );
  };

  // Helper para renderizar barra de aguayo según la línea activa
  const renderAguayoBar = (height: number = 8) => {
    const colors = lineaActiva.aguayoColors || ['#4B008F', '#F5007B', '#008F89', '#F5B400', '#690BB2'];
    return (
      <div style={{
        height: `${height}px`,
        width: '100%',
        display: 'flex',
        overflow: 'hidden'
      }}>
        {colors.map((c, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: c }} />
        ))}
      </div>
    );
  };

  const handleDownload = (materialNombre: string, materialTipo?: string) => {
    // Si el usuario subió su propio diseño para esta pieza, descargar su imagen directamente
    if (materialTipo && customDesigns[materialTipo]) {
      const a = document.createElement('a');
      a.href = customDesigns[materialTipo];
      a.download = `Mi_Diseno_${materialTipo}_${currentSec.sigla}.png`;
      a.click();
      return;
    }

    const sanitizedName = materialNombre.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${sanitizedName}_${currentSec.codigo}_${lineaActiva.codigo}.html`;
    
    const fileHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${materialNombre} - ${currentSec.nombre} - GAMEA</title>
  <style>
    body { font-family: 'Montserrat', sans-serif; margin: 0; padding: 40px; background: #0B0517; color: #FFF; }
    .card { max-width: 600px; margin: 0 auto; border: 2px solid ${lineaActiva.colorPrimary}; border-radius: 16px; padding: 32px; background: #150A2B; }
    .aguayo { height: 8px; width: 100%; display: flex; margin-bottom: 24px; border-radius: 4px; overflow: hidden; }
    .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 20px; }
    .title { font-size: 20px; font-weight: 800; color: ${lineaActiva.colorSecondary}; }
    .sec { font-size: 14px; color: ${lineaActiva.colorTeal}; font-weight: 600; }
    .meta { font-size: 12px; color: #9CA3AF; margin-top: 16px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="aguayo">
      <div style="flex:1;background:${lineaActiva.colorPrimary}"></div>
      <div style="flex:1;background:${lineaActiva.colorSecondary}"></div>
      <div style="flex:1;background:${lineaActiva.colorGold}"></div>
      <div style="flex:1;background:${lineaActiva.colorTeal}"></div>
    </div>
    <div class="header">
      <div>
        <div class="title">${materialNombre}</div>
        <div class="sec">${currentSec.nombre} (${currentSec.codigo})</div>
      </div>
      <div>${lineaActiva.logoSvg}</div>
    </div>
    <div class="meta">
      <p><strong>Línea Maestra Aplicada:</strong> ${lineaActiva.nombre} (${lineaActiva.codigo})</p>
      <p><strong>Funcionario Asignado:</strong> ${currentFunc?.nombreCompleto || 'Personal Municipal'} (${currentFunc?.cargo || 'Funcionario'})</p>
      <p><strong>Slogan:</strong> "${lineaActiva.slogan}"</p>
      <p><strong>Certificación:</strong> Pieza autorizada por la Dirección de Comunicación (DIRCOM) - GAMEA.</p>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([fileHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper para renderizar los controles de cabecera de cada tarjeta (Subir Mi Diseño / Restaurar)
  const renderCardUploadControls = (tipo: string, label: string) => {
    const hasCustom = Boolean(customDesigns[tipo]);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <label 
          className={`ea-btn ${hasCustom ? 'ea-btn-primary' : 'ea-btn-teal'}`} 
          style={{ fontSize: '0.72rem', padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          title={`Subir archivo de imagen propio para ${label}`}
        >
          <Camera size={13} />
          <span>{hasCustom ? 'Cambiar Arte' : 'Subir Mi Diseño'}</span>
          <input 
            type="file" 
            accept="image/*,.svg" 
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUploadDesign(tipo, file);
            }}
          />
        </label>

        {hasCustom && (
          <button
            onClick={() => handleRemoveCustomDesign(tipo)}
            className="ea-btn ea-btn-secondary"
            style={{ padding: '4px 8px', fontSize: '0.72rem', color: 'var(--ea-text-muted)' }}
            title="Restaurar maqueta automática del sistema"
          >
            <RotateCcw size={12} />
          </button>
        )}
      </div>
    );
  };

  // Helper para renderizar el contenido visual de la tarjeta (Si hay diseño propio, lo muestra en grande)
  const renderMaterialVisual = (tipo: string, defaultMockup: React.ReactNode, title: string) => {
    if (customDesigns[tipo]) {
      return (
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          border: `2px solid var(--ea-teal)`,
          minHeight: '300px',
          maxHeight: '420px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090314',
          boxShadow: '0 8px 30px rgba(0,0,0,0.7)'
        }}>
          <img 
            src={customDesigns[tipo]} 
            alt={`Diseño propio de ${title}`} 
            style={{ width: '100%', height: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(9, 3, 20, 0.9)',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.68rem',
            color: 'var(--ea-teal)',
            fontWeight: 700,
            border: '1px solid var(--ea-teal)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Check size={12} />
            <span>Tu Diseño Personalizado</span>
          </div>
        </div>
      );
    }
    return defaultMockup;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Banner de Sincronización y Propagación Automática */}
      <div style={{
        background: `linear-gradient(135deg, ${lineaActiva.colorPrimary}33, ${lineaActiva.colorSecondary}22)`,
        border: `1px solid ${lineaActiva.colorSecondary}66`,
        borderRadius: '16px',
        padding: '24px 28px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          {renderAguayoBar(5)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', zIndex: 1 }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '14px',
            background: 'rgba(0,0,0,0.5)',
            border: `1px solid ${lineaActiva.colorGold}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px'
          }}>
            {renderLogo(48)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="ea-badge ea-badge-gold" style={{ fontSize: '0.7rem' }}>
                LÍNEA INSTITUCIONAL VIGENTE
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ea-text-muted)' }}>
                {lineaActiva.codigo}
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0' }}>
              {lineaActiva.nombre}
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ea-text-muted)' }}>
              Eslogan: <strong style={{ color: lineaActiva.colorGold }}>"{lineaActiva.slogan}"</strong> · Todos los materiales del personal abajo se encuentran adaptados automáticamente a esta identidad.
            </p>
          </div>
        </div>

        {/* Muestrario de Colores Activos */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ea-text-muted)' }}>Paleta Activa:</span>
          {[
            { label: 'Primario', color: lineaActiva.colorPrimary },
            { label: 'Secundario', color: lineaActiva.colorSecondary },
            { label: 'Teal', color: lineaActiva.colorTeal },
            { label: 'Oro', color: lineaActiva.colorGold }
          ].map((c, i) => (
            <div 
              key={i} 
              title={`${c.label}: ${c.color}`} 
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: c.color,
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
              }} 
            />
          ))}
        </div>
      </div>

      {/* GUÍA DE CÓMO SUBIR TUS PROPIOS DISEÑOS */}
      <div style={{
        background: 'rgba(0, 143, 137, 0.12)',
        border: '1px solid rgba(0, 143, 137, 0.35)',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={22} color="var(--ea-teal)" />
          <div style={{ fontSize: '0.85rem' }}>
            <strong style={{ color: '#FFF' }}>¿Cómo cambiar estos diseños por los tuyos?</strong>
            <span style={{ color: 'var(--ea-text-muted)', marginLeft: '6px' }}>
              Haz clic en el botón verde <strong>"Subir Mi Diseño"</strong> en cualquiera de las 8 tarjetas de abajo para cargar tu imagen (PNG, JPG o SVG) y ver tu arte propio en esa misma pieza inmediatamente.
            </span>
          </div>
        </div>

        {Object.keys(customDesigns).length > 0 && (
          <button
            onClick={() => {
              if (confirm('¿Restaurar todas las piezas a las maquetas automáticas del sistema?')) {
                setCustomDesigns({});
                localStorage.removeItem('easystem_custom_material_designs');
              }
            }}
            className="ea-btn ea-btn-secondary"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            <RotateCcw size={12} />
            <span>Restaurar Maquetas del Sistema ({Object.keys(customDesigns).length} modificadas)</span>
          </button>
        )}
      </div>

      {/* Controles de Selección de Personal y Secretaría */}
      <div className="ea-card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
            {/* Selector Secretaría */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)', textTransform: 'uppercase' }}>
                Secretaría / Dirección Municipal:
              </label>
              <select
                value={selectedSecId}
                onChange={(e) => setSelectedSecId(e.target.value)}
                style={{
                  background: 'var(--ea-bg-card)',
                  color: '#FFFFFF',
                  border: '1px solid var(--ea-border)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  minWidth: '320px',
                  cursor: 'pointer'
                }}
              >
                {secretarias.map(sec => (
                  <option key={sec.id} value={sec.id}>
                    {sec.sigla} — {sec.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector Funcionario */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ea-text-muted)', textTransform: 'uppercase' }}>
                Funcionario del Personal:
              </label>
              <select
                value={selectedFuncId}
                onChange={(e) => setSelectedFuncId(e.target.value)}
                style={{
                  background: 'var(--ea-bg-card)',
                  color: '#FFFFFF',
                  border: '1px solid var(--ea-border)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  minWidth: '300px',
                  cursor: 'pointer'
                }}
              >
                {funcionarios.map(func => (
                  <option key={func.id} value={func.id}>
                    {func.nombreCompleto} ({func.cargo})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtro por Categorías */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border: selectedCategory === cat ? '1px solid var(--ea-secondary)' : '1px solid var(--ea-border)',
                  background: selectedCategory === cat ? 'rgba(245, 0, 123, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--ea-text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Grid de los 8 Materiales Adaptados con Subida Propia Habilitada */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px'
      }}>

        {/* 1. CREDENCIAL DE PERSONAL */}
        {filteredMaterials.some(m => m.tipo === 'CREDENCIAL') && (
          <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: `${lineaActiva.colorPrimary}33`, borderRadius: '8px', color: lineaActiva.colorGold }}>
                  <UserCheck size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Credencial Institucional</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Fotocheck PVC · 54 x 86 mm</span>
                </div>
              </div>

              {/* Botón Subir Mi Diseño para Credencial */}
              {renderCardUploadControls('CREDENCIAL', 'Credencial')}
            </div>

            {/* MOCKUP VISUAL O DISEÑO PROPIO */}
            {renderMaterialVisual('CREDENCIAL', (
              <div style={{
                background: '#FFFFFF',
                color: '#1A1A1A',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                border: `2px solid ${lineaActiva.colorPrimary}`,
                width: '100%',
                maxWidth: '280px',
                margin: '0 auto',
                position: 'relative'
              }}>
                <div style={{ background: lineaActiva.colorPrimary, padding: '12px 10px', textAlign: 'center', color: '#FFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    {renderLogo(24)}
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                      GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO
                    </span>
                  </div>
                  <div style={{ fontSize: '0.55rem', opacity: 0.85, marginTop: '2px' }}>
                    {currentSec.sigla} — {currentSec.nombre.substring(0, 32)}
                  </div>
                </div>
                {renderAguayoBar(4)}

                <div style={{ padding: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src={currentFunc.avatarUrl} 
                    alt={currentFunc.nombreCompleto}
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `3px solid ${lineaActiva.colorSecondary}`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: lineaActiva.colorPrimary }}>
                      {currentFunc.nombreCompleto}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginTop: '2px' }}>
                      {currentFunc.cargo}
                    </div>
                  </div>

                  <div style={{
                    background: '#F3F4F6',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    width: '100%',
                    fontSize: '0.65rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#374151'
                  }}>
                    <span>CI: <strong>{currentFunc.ci}</strong></span>
                    <span>MATRÍCULA: <strong>{currentFunc.matricula}</strong></span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
                    <div style={{ background: '#000', padding: '4px', borderRadius: '4px', display: 'flex' }}>
                      <QrCode size={40} color="#FFF" />
                    </div>
                    <div style={{ textAlign: 'left', fontSize: '0.6rem', color: '#6B7280' }}>
                      <div>Vigencia: <strong>{lineaActiva.yearVigencia}</strong></div>
                      <div>Verificación QR Oficial</div>
                      <div style={{ color: lineaActiva.colorSecondary, fontWeight: 700 }}>GAMEA DIGITAL</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#111827', color: '#9CA3AF', fontSize: '0.55rem', padding: '6px', textAlign: 'center' }}>
                  {lineaActiva.slogan}
                </div>
              </div>
            ), 'Credencial')}

            {/* Acciones */}
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button 
                onClick={() => handleDownload('Credencial de Personal', 'CREDENCIAL')}
                className="ea-btn ea-btn-primary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: lineaActiva.colorPrimary }}
              >
                <Download size={14} /> Descargar PVC
              </button>
              <button 
                onClick={handlePrint}
                className="ea-btn ea-btn-secondary" 
                style={{ padding: '8px 12px' }}
                title="Imprimir"
              >
                <Printer size={14} />
              </button>
            </div>
          </div>
        )}

        {/* 2. HOJA MEMBRETADA OFICIAL A4 */}
        {filteredMaterials.some(m => m.tipo === 'HOJA_MEMBRETADA') && (
          <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: `${lineaActiva.colorTeal}33`, borderRadius: '8px', color: lineaActiva.colorTeal }}>
                  <FileText size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Hoja Membretada Oficial</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Correspondencia A4 · Despacho</span>
                </div>
              </div>

              {renderCardUploadControls('HOJA_MEMBRETADA', 'Hoja Membretada')}
            </div>

            {/* MOCKUP VISUAL HOJA MEMBRETADA O DISEÑO PROPIO */}
            {renderMaterialVisual('HOJA_MEMBRETADA', (
              <div style={{
                background: '#FFFFFF',
                color: '#1F2937',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                border: '1px solid #E5E7EB',
                fontSize: '0.65rem',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `2px solid ${lineaActiva.colorPrimary}`, paddingBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {renderLogo(36)}
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.7rem', color: lineaActiva.colorPrimary }}>
                        GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO
                      </div>
                      <div style={{ fontSize: '0.6rem', color: '#4B5563', fontWeight: 600 }}>
                        {currentSec.nombre.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.55rem', color: '#6B7280' }}>
                    <div>CÓDIGO: <strong>OF-GAMEA-{lineaActiva.yearVigencia}-0892</strong></div>
                    <div>FECHA: <strong>29 de Septiembre de {lineaActiva.yearVigencia}</strong></div>
                  </div>
                </div>

                {renderAguayoBar(3)}

                <div style={{ padding: '12px 6px', flex: 1, color: '#374151', lineHeight: '1.4' }}>
                  <div style={{ fontWeight: 700, color: lineaActiva.colorPrimary, marginBottom: '6px' }}>
                    DE: {currentFunc.nombreCompleto} — {currentFunc.cargo}
                  </div>
                  <div style={{ fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                    REF: NOTA OFICIAL DE DESPACHO INSTITUCIONAL
                  </div>
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.6rem' }}>
                    Por medio de la presente, se hace constar que los proyectos correspondientes al ejercicio {lineaActiva.yearVigencia} se rigen bajo los principios de modernización, transparencia y soberanía de la ciudad de El Alto.
                  </p>
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.6rem' }}>
                    Toda la documentación emitida por esta unidad cuenta con respaldo y firma autorizada según la normativa vigente del GAMEA.
                  </p>

                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.05,
                    pointerEvents: 'none'
                  }}>
                    {renderLogo(180)}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: '#9CA3AF' }}>
                  <div>
                    Casa Municipal Jach'a Uta · Av. Costanera · El Alto, Bolivia
                  </div>
                  <div style={{ fontWeight: 700, color: lineaActiva.colorPrimary }}>
                    {lineaActiva.slogan}
                  </div>
                </div>
              </div>
            ), 'Hoja Membretada')}

            {/* Acciones */}
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button 
                onClick={() => handleDownload('Hoja Membretada A4', 'HOJA_MEMBRETADA')}
                className="ea-btn ea-btn-primary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: lineaActiva.colorTeal }}
              >
                <Download size={14} /> Descargar PDF Membretado
              </button>
              <button 
                onClick={handlePrint}
                className="ea-btn ea-btn-secondary" 
                style={{ padding: '8px 12px' }}
                title="Imprimir"
              >
                <Printer size={14} />
              </button>
            </div>
          </div>
        )}

        {/* 3. COMUNICADO OFICIAL DE PRENSA CON QR */}
        {filteredMaterials.some(m => m.tipo === 'COMUNICADO_PRENSA') && (
          <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: `${lineaActiva.colorSecondary}33`, borderRadius: '8px', color: lineaActiva.colorSecondary }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Comunicado Oficial con QR</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Prensa & Redes · Verificación QR</span>
                </div>
              </div>

              {renderCardUploadControls('COMUNICADO_PRENSA', 'Comunicado')}
            </div>

            {/* MOCKUP COMUNICADO O DISEÑO PROPIO */}
            {renderMaterialVisual('COMUNICADO_PRENSA', (
              <div style={{
                background: '#0D071E',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '16px',
                border: `2px solid ${lineaActiva.colorSecondary}`,
                fontSize: '0.65rem',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
              }}>
                {renderAguayoBar(5)}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {renderLogo(32)}
                    <span style={{ fontWeight: 800, fontSize: '0.7rem', color: lineaActiva.colorGold }}>
                      GAMEA OFICIAL
                    </span>
                  </div>
                  <div style={{
                    background: lineaActiva.colorSecondary,
                    color: '#FFFFFF',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontWeight: 800,
                    fontSize: '0.6rem'
                  }}>
                    COMUNICADO URGENTE
                  </div>
                </div>

                <div style={{ textAlign: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <h5 style={{ margin: '0 0 6px 0', fontSize: '0.9rem', fontWeight: 900, color: '#FFFFFF' }}>
                    MEDIDAS PREVENTIVAS EN EL MUNICIPIO
                  </h5>
                  <span style={{ fontSize: '0.6rem', color: lineaActiva.colorTeal }}>
                    Emitido por: {currentSec.nombre}
                  </span>
                </div>

                <div style={{ padding: '12px 0', flex: 1, fontSize: '0.6rem', color: '#D1D5DB', lineHeight: '1.4' }}>
                  El Gobierno Autónomo Municipal de El Alto comunica a la población en general que los servicios de atención continuarán con absoluta normalidad en todas las dependencias distritales.
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '6px',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 'auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#FFF', padding: '3px', borderRadius: '4px' }}>
                      <QrCode size={32} color="#000" />
                    </div>
                    <div style={{ fontSize: '0.55rem', color: '#9CA3AF' }}>
                      <div>Escanea para validar autenticidad</div>
                      <div style={{ color: lineaActiva.colorGold, fontWeight: 700 }}>gamea.gob.bo/valida</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.55rem', color: '#9CA3AF' }}>
                    <div>{lineaActiva.slogan}</div>
                    <div style={{ color: lineaActiva.colorSecondary }}>Gestión Municipal {lineaActiva.yearVigencia}</div>
                  </div>
                </div>
              </div>
            ), 'Comunicado')}

            {/* Acciones */}
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button 
                onClick={() => handleDownload('Comunicado Oficial con QR', 'COMUNICADO_PRENSA')}
                className="ea-btn ea-btn-primary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: lineaActiva.colorSecondary }}
              >
                <Download size={14} /> Exportar PNG Prensa
              </button>
              <button 
                onClick={handlePrint}
                className="ea-btn ea-btn-secondary" 
                style={{ padding: '8px 12px' }}
                title="Imprimir"
              >
                <Printer size={14} />
              </button>
            </div>
          </div>
        )}

        {/* 4. MEMORÁNDUM INTERNO */}
        {filteredMaterials.some(m => m.tipo === 'MEMORANDUM') && (
          <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: `${lineaActiva.colorGold}33`, borderRadius: '8px', color: lineaActiva.colorGold }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Memorándum Interno</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Gestión Interna · Carta</span>
                </div>
              </div>

              {renderCardUploadControls('MEMORANDUM', 'Memorándum')}
            </div>

            {/* MOCKUP MEMO O DISEÑO PROPIO */}
            {renderMaterialVisual('MEMORANDUM', (
              <div style={{
                background: '#FFFFFF',
                color: '#111827',
                borderRadius: '8px',
                padding: '16px',
                border: `2px solid ${lineaActiva.colorGold}`,
                fontSize: '0.65rem',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ textAlign: 'center', borderBottom: `2px solid ${lineaActiva.colorPrimary}`, paddingBottom: '8px' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.8rem', color: lineaActiva.colorPrimary }}>
                    MEMORÁNDUM INSTITUCIONAL
                  </div>
                  <div style={{ fontSize: '0.6rem', color: '#6B7280' }}>
                    {currentSec.nombre.toUpperCase()}
                  </div>
                </div>

                <div style={{ padding: '10px 0', borderBottom: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div><strong>A:</strong> Personal y Jefaturas de Unidad</div>
                  <div><strong>DE:</strong> {currentFunc.nombreCompleto} ({currentFunc.cargo})</div>
                  <div><strong>REF:</strong> Cumplimiento de Lineamientos de Marca {lineaActiva.yearVigencia}</div>
                  <div><strong>FECHA:</strong> 29 de Septiembre de {lineaActiva.yearVigencia}</div>
                </div>

                <div style={{ padding: '12px 0', flex: 1, fontSize: '0.6rem', color: '#374151', lineHeight: '1.4' }}>
                  Por medio del presente memorándum, se instruye a todo el personal dependiente dar estricto cumplimiento al uso de la nueva <strong>{lineaActiva.nombre}</strong> en todo trámite, oficio y material de difusión.
                </div>

                <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '16px' }}>
                  <div style={{ width: '120px', borderTop: '1px dashed #4B5563', margin: '0 auto 4px auto' }} />
                  <div style={{ fontWeight: 700, fontSize: '0.65rem', color: lineaActiva.colorPrimary }}>{currentFunc.nombreCompleto}</div>
                  <div style={{ fontSize: '0.55rem', color: '#6B7280' }}>{currentFunc.cargo}</div>
                </div>
              </div>
            ), 'Memorándum')}

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button 
                onClick={() => handleDownload('Memorándum Interno', 'MEMORANDUM')}
                className="ea-btn ea-btn-primary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: lineaActiva.colorGold, color: '#000' }}
              >
                <Download size={14} /> Descargar Memo Oficial
              </button>
              <button onClick={handlePrint} className="ea-btn ea-btn-secondary" style={{ padding: '8px 12px' }}>
                <Printer size={14} />
              </button>
            </div>
          </div>
        )}

        {/* 5. AFICHE INSTITUCIONAL A3 */}
        {filteredMaterials.some(m => m.tipo === 'AFICHE_CONVOCATORIA') && (
          <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: `${lineaActiva.colorPrimary}33`, borderRadius: '8px', color: lineaActiva.colorSecondary }}>
                  <Layers size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Afiche Convocatoria A3</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Eventos & Ferias Distritales</span>
                </div>
              </div>

              {renderCardUploadControls('AFICHE_CONVOCATORIA', 'Afiche A3')}
            </div>

            {/* MOCKUP AFICHE O DISEÑO PROPIO */}
            {renderMaterialVisual('AFICHE_CONVOCATORIA', (
              <div style={{
                background: `linear-gradient(180deg, ${lineaActiva.colorPrimary} 0%, #0A0314 100%)`,
                borderRadius: '8px',
                padding: '16px',
                border: `1px solid ${lineaActiva.colorGold}`,
                fontSize: '0.65rem',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                color: '#FFF',
                textAlign: 'center',
                position: 'relative'
              }}>
                {renderAguayoBar(4)}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '8px 0' }}>
                  {renderLogo(28)}
                  <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>GAMEA</span>
                </div>

                <div style={{ margin: '14px 0' }}>
                  <span style={{ fontSize: '0.6rem', color: lineaActiva.colorGold, fontWeight: 700, letterSpacing: '1px' }}>
                    GRAN CONVOCATORIA CIUDADANA
                  </span>
                  <h4 style={{ margin: '4px 0', fontSize: '1.05rem', fontWeight: 900 }}>
                    FERIA MUNICIPAL DE EMPRENDIMIENTO
                  </h4>
                  <div style={{ fontSize: '0.6rem', color: '#D1D5DB' }}>
                    Organiza: {currentSec.nombre}
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '8px',
                  padding: '10px',
                  margin: 'auto 0 10px 0',
                  fontSize: '0.6rem'
                }}>
                  <div style={{ color: lineaActiva.colorSecondary, fontWeight: 800 }}>¡PARTICIPACIÓN GRATUITA!</div>
                  <div style={{ marginTop: '2px' }}>Lugar: Explanada Jach'a Uta · 09:00 AM</div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px', fontSize: '0.55rem', color: '#9CA3AF' }}>
                  {lineaActiva.slogan} — El Alto de Pie
                </div>
              </div>
            ), 'Afiche A3')}

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button 
                onClick={() => handleDownload('Afiche Convocatoria A3', 'AFICHE_CONVOCATORIA')}
                className="ea-btn ea-btn-primary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: lineaActiva.colorPrimary }}
              >
                <Download size={14} /> Exportar A3 Imprenta
              </button>
            </div>
          </div>
        )}

        {/* 6. PLANTILLA POST REDES 1080x1080 */}
        {filteredMaterials.some(m => m.tipo === 'POST_REDES_1080') && (
          <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: `${lineaActiva.colorSecondary}33`, borderRadius: '8px', color: lineaActiva.colorSecondary }}>
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Post Redes Sociales (1:1)</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Instagram & Facebook · 1080px</span>
                </div>
              </div>

              {renderCardUploadControls('POST_REDES_1080', 'Post Redes')}
            </div>

            {/* MOCKUP POST O DISEÑO PROPIO */}
            {renderMaterialVisual('POST_REDES_1080', (
              <div style={{
                aspectRatio: '1/1',
                background: `radial-gradient(circle at top right, ${lineaActiva.colorSecondary}44, ${lineaActiva.colorPrimary} 80%)`,
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#FFF',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {renderLogo(32)}
                    <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>GAMEA</span>
                  </div>
                  <span style={{ fontSize: '0.6rem', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '4px' }}>
                    {currentSec.sigla}
                  </span>
                </div>

                <div>
                  <span className="ea-badge ea-badge-gold" style={{ fontSize: '0.6rem', marginBottom: '6px' }}>
                    GESTIÓN MUNICIPAL
                  </span>
                  <h4 style={{ margin: '4px 0', fontSize: '1.1rem', fontWeight: 900, lineHeight: '1.2' }}>
                    Obras que transforman la calidad de vida en El Alto
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.65rem', color: '#E5E7EB' }}>
                    Trabajo permanente desde la {currentSec.nombre}.
                  </p>
                </div>

                <div>
                  {renderAguayoBar(4)}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: '#D1D5DB', marginTop: '6px' }}>
                    <span>#ElAltoDePie</span>
                    <span>{lineaActiva.slogan}</span>
                  </div>
                </div>
              </div>
            ), 'Post Redes')}

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button 
                onClick={() => handleDownload('Post Redes 1080x1080', 'POST_REDES_1080')}
                className="ea-btn ea-btn-primary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: lineaActiva.colorSecondary }}
              >
                <Download size={14} /> Descargar PNG 1080px
              </button>
            </div>
          </div>
        )}

        {/* 7. FIRMA DE CORREO INSTITUCIONAL */}
        {filteredMaterials.some(m => m.tipo === 'FIRMA_CORREO') && (
          <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: `${lineaActiva.colorTeal}33`, borderRadius: '8px', color: lineaActiva.colorTeal }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Firma de Correo Electrónico</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Outlook / Webmail · HTML</span>
                </div>
              </div>

              {renderCardUploadControls('FIRMA_CORREO', 'Firma de Correo')}
            </div>

            {/* MOCKUP FIRMA O DISEÑO PROPIO */}
            {renderMaterialVisual('FIRMA_CORREO', (
              <div style={{
                background: '#FFFFFF',
                color: '#1F2937',
                borderRadius: '8px',
                padding: '16px',
                border: `1px solid #E5E7EB`,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {renderLogo(44)}
                  <div style={{ borderLeft: `2px solid ${lineaActiva.colorPrimary}`, paddingLeft: '12px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: lineaActiva.colorPrimary }}>
                      {currentFunc.nombreCompleto}
                    </div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#4B5563' }}>
                      {currentFunc.cargo}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: lineaActiva.colorSecondary, fontWeight: 700 }}>
                      {currentSec.nombre}
                    </div>
                  </div>
                </div>

                {renderAguayoBar(3)}

                <div style={{ fontSize: '0.6rem', color: '#6B7280', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div>📧 {currentFunc.email} · 📱 {currentFunc.telefono}</div>
                  <div>🏛️ {currentSec.edificio} · El Alto, Bolivia</div>
                  <div style={{ color: lineaActiva.colorPrimary, fontWeight: 700, marginTop: '2px' }}>
                    www.elalto.gob.bo · "{lineaActiva.slogan}"
                  </div>
                </div>
              </div>
            ), 'Firma de Correo')}

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`--\n${currentFunc.nombreCompleto}\n${currentFunc.cargo}\n${currentSec.nombre}\n${currentFunc.email} | ${currentFunc.telefono}\nGobierno Autónomo Municipal de El Alto`);
                  alert('Firma copiada al portapapeles en formato texto/HTML');
                }}
                className="ea-btn ea-btn-primary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: lineaActiva.colorTeal }}
              >
                <Share2 size={14} /> Copiar Firma HTML
              </button>
            </div>
          </div>
        )}

        {/* 8. CARÁTULA DE EXPEDIENTE / PROYECTOS */}
        {filteredMaterials.some(m => m.tipo === 'CARATULA_EXPEDIENTE') && (
          <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: `${lineaActiva.colorPrimary}33`, borderRadius: '8px', color: lineaActiva.colorGold }}>
                  <FolderKanban size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Carátula de Expedientes</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Proyectos & Obras Públicas</span>
                </div>
              </div>

              {renderCardUploadControls('CARATULA_EXPEDIENTE', 'Carátula de Expedientes')}
            </div>

            {/* MOCKUP CARATULA O DISEÑO PROPIO */}
            {renderMaterialVisual('CARATULA_EXPEDIENTE', (
              <div style={{
                background: '#FFFFFF',
                color: '#111827',
                borderRadius: '8px',
                padding: '16px',
                border: `2px solid ${lineaActiva.colorPrimary}`,
                minHeight: '240px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {renderLogo(36)}
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: lineaActiva.colorPrimary }}>
                      {currentSec.sigla}
                    </span>
                  </div>
                  {renderAguayoBar(4)}
                </div>

                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ fontSize: '0.65rem', color: '#6B7280', fontWeight: 700 }}>CARPETA OFICIAL DE PROYECTO</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: lineaActiva.colorPrimary, marginTop: '4px' }}>
                    CONSTRUCCIÓN PASO A DESNIVEL CRUCE VILLA ADELA
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#374151', marginTop: '4px' }}>
                    Supervisión: {currentSec.nombre}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: '#9CA3AF' }}>
                  <span>EXP: GAMEA-{lineaActiva.yearVigencia}-4409</span>
                  <span>{lineaActiva.slogan}</span>
                </div>
              </div>
            ), 'Carátula')}

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button 
                onClick={() => handleDownload('Carátula de Carpeta Oficial', 'CARATULA_EXPEDIENTE')}
                className="ea-btn ea-btn-primary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: lineaActiva.colorPrimary }}
              >
                <Download size={14} /> Descargar Carátula A4
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
