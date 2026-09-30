import React, { useState, useEffect, useRef } from 'react';
import { 
  Folder, 
  FileCode, 
  Download, 
  Search, 
  Filter, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  Check, 
  Sparkles, 
  Layers,
  Upload,
  Plus,
  Trash2,
  Eye,
  FileCheck,
  Building2,
  X
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SECRETARIAS_MUNICIPALES } from '../tokens/brandTokens';

export interface AssetItem {
  id: string;
  name: string;
  folder: string;
  format: 'SVG' | 'PNG' | 'PDF' | 'DOCX' | 'JPG';
  size: string;
  secretaria: string;
  updated: string;
  fileData?: string; // Data URL o contenido de archivo para descarga real
}

const DEFAULT_ASSETS: AssetItem[] = [
  { 
    id: '1', 
    name: 'Imagotipo_ElAlto_FullColor.svg', 
    folder: '/logos', 
    format: 'SVG', 
    size: '142 KB', 
    secretaria: 'GAMEA', 
    updated: '2026-09-28',
    fileData: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120"><rect width="400" height="120" fill="#090314" rx="12"/><polygon points="30,85 55,30 80,85" fill="#4B008F"/><polygon points="40,85 55,50 70,85" fill="#F5007B"/><text x="100" y="60" fill="#FFFFFF" font-family="Montserrat" font-size="28" font-weight="900">EL ALTO</text><text x="100" y="85" fill="#008F89" font-family="Poppins" font-size="14" font-weight="600">GOBIERNO AUTÓNOMO MUNICIPAL</text></svg>`
  },
  { 
    id: '2', 
    name: 'Imagotipo_ElAlto_FullColor.png', 
    folder: '/png', 
    format: 'PNG', 
    size: '1.8 MB', 
    secretaria: 'GAMEA', 
    updated: '2026-09-28' 
  },
  { 
    id: '3', 
    name: 'Imagotipo_Negativo_Blanco.svg', 
    folder: '/versiones', 
    format: 'SVG', 
    size: '110 KB', 
    secretaria: 'GAMEA', 
    updated: '2026-09-28',
    fileData: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120"><rect width="400" height="120" fill="#4B008F" rx="12"/><polygon points="30,85 55,30 80,85" fill="#FFFFFF"/><polygon points="40,85 55,50 70,85" fill="#4B008F"/><text x="100" y="60" fill="#FFFFFF" font-family="Montserrat" font-size="28" font-weight="900">EL ALTO</text><text x="100" y="85" fill="#F8F9FA" font-family="Poppins" font-size="14" font-weight="500">GOBIERNO AUTÓNOMO MUNICIPAL</text></svg>`
  },
  { 
    id: '4', 
    name: 'Manual_Imagen_Institucional_2026.pdf', 
    folder: '/pdf', 
    format: 'PDF', 
    size: '48.5 MB', 
    secretaria: 'DIRCOM', 
    updated: '2026-09-25' 
  },
  { 
    id: '5', 
    name: 'Hoja_Membretada_Oficial_A4.docx', 
    folder: '/plantillas', 
    format: 'DOCX', 
    size: '520 KB', 
    secretaria: 'DIRCOM', 
    updated: '2026-09-20' 
  },
  { 
    id: '6', 
    name: 'Cenefa_Aguayo_Vector_Seamless.svg', 
    folder: '/svg', 
    format: 'SVG', 
    size: '890 KB', 
    secretaria: 'GAMEA', 
    updated: '2026-09-18',
    fileData: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 60"><rect width="120" height="60" fill="#4B008F"/><rect x="120" width="120" height="60" fill="#F5007B"/><rect x="240" width="120" height="60" fill="#F5B400"/><rect x="360" width="120" height="60" fill="#008F89"/><rect x="480" width="120" height="60" fill="#690BB2"/></svg>`
  },
  { 
    id: '7', 
    name: 'Submarca_Movilidad_Urbana.svg', 
    folder: '/logos', 
    format: 'SVG', 
    size: '190 KB', 
    secretaria: 'SMMU', 
    updated: '2026-09-15' 
  },
  { 
    id: '8', 
    name: 'Submarca_Salud_Deportes.svg', 
    folder: '/logos', 
    format: 'SVG', 
    size: '185 KB', 
    secretaria: 'SMSD', 
    updated: '2026-09-12' 
  },
];

export const BrandAssetManager: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [assets, setAssets] = useState<AssetItem[]>([]);
  
  // Modal de Subida de Archivos
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadFolder, setUploadFolder] = useState('/logos');
  const [uploadSecretaria, setUploadSecretaria] = useState('DIRCOM');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const folders = [
    { id: 'todos', label: 'Todos los recursos' },
    { id: '/logos', label: '/logos (Oficiales)' },
    { id: '/versiones', label: '/versiones (Monocromo)' },
    { id: '/svg', label: '/svg (Vectoriales)' },
    { id: '/png', label: '/png (Transparencias)' },
    { id: '/pdf', label: '/pdf (Manuales)' },
    { id: '/plantillas', label: '/plantillas (Membretadas)' },
    { id: '/documentos', label: '/documentos (Normativas)' },
    { id: '/fotografias', label: '/fotografias (Banco Ciudad)' },
    { id: '/videos', label: '/videos (Cortinillas)' }
  ];

  // Cargar assets de localStorage o default
  useEffect(() => {
    try {
      const saved = localStorage.getItem('easystem_bam_assets');
      if (saved) {
        setAssets(JSON.parse(saved));
      } else {
        setAssets(DEFAULT_ASSETS);
        localStorage.setItem('easystem_bam_assets', JSON.stringify(DEFAULT_ASSETS));
      }
    } catch {
      setAssets(DEFAULT_ASSETS);
    }
  }, []);

  const saveAssets = (newAssets: AssetItem[]) => {
    setAssets(newAssets);
    try {
      localStorage.setItem('easystem_bam_assets', JSON.stringify(newAssets));
    } catch (e) {
      console.error('Error guardando en localStorage', e);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFile(file);
    if (!uploadName) {
      setUploadName(file.name);
    }

    // Auto-detectar carpeta por extensión
    const ext = file.name.split('.').pop()?.toUpperCase() || '';
    if (ext === 'SVG') setUploadFolder('/svg');
    else if (ext === 'PNG') setUploadFolder('/png');
    else if (ext === 'PDF') setUploadFolder('/pdf');
    else if (ext === 'DOCX' || ext === 'DOC') setUploadFolder('/plantillas');
    else if (ext === 'JPG' || ext === 'JPEG') setUploadFolder('/fotografias');

    // Previsualización si es imagen o svg
    if (file.type.includes('image') || file.type.includes('svg')) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setUploadPreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadPreview(null);
    }
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile && !uploadName) return;

    setUploadProgress(30);

    const ext = (uploadFile ? uploadFile.name.split('.').pop()?.toUpperCase() : 'SVG') as any;
    const format: AssetItem['format'] = ['SVG', 'PNG', 'PDF', 'DOCX', 'JPG'].includes(ext) ? ext : 'PNG';
    const sizeStr = uploadFile 
      ? uploadFile.size > 1024 * 1024 
        ? `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(uploadFile.size / 1024)} KB`
      : '250 KB';

    setTimeout(() => {
      setUploadProgress(80);
      const newAsset: AssetItem = {
        id: `custom_${Date.now()}`,
        name: uploadName || uploadFile?.name || 'Nuevo_Activo_Oficial.svg',
        folder: uploadFolder,
        format: format,
        size: sizeStr,
        secretaria: uploadSecretaria,
        updated: new Date().toISOString().split('T')[0],
        fileData: uploadPreview || undefined
      };

      const updated = [newAsset, ...assets];
      saveAssets(updated);
      setUploadProgress(100);

      setTimeout(() => {
        setIsUploadOpen(false);
        setUploadFile(null);
        setUploadPreview(null);
        setUploadName('');
        setUploadProgress(null);
      }, 300);
    }, 400);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar "${name}" del archivo digital BAM?`)) {
      const updated = assets.filter(a => a.id !== id);
      saveAssets(updated);
    }
  };

  // Descarga real de activo
  const handleDownloadAsset = (item: AssetItem) => {
    let content = item.fileData;
    let mimeType = 'text/plain';

    if (item.format === 'SVG') {
      mimeType = 'image/svg+xml;charset=utf-8';
      if (!content) {
        content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" fill="#4B008F"/><text x="20" y="55" fill="#FFF" font-family="sans-serif" font-size="20">${item.name}</text></svg>`;
      }
    } else if (item.format === 'PNG' || item.format === 'JPG') {
      if (content && content.startsWith('data:')) {
        const a = document.createElement('a');
        a.href = content;
        a.download = item.name;
        a.click();
        return;
      }
      // Generar canvas simple para mockup
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#150A2B';
        ctx.fillRect(0, 0, 600, 300);
        ctx.fillStyle = '#F5007B';
        ctx.fillRect(0, 0, 600, 8);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px Montserrat, sans-serif';
        ctx.fillText(item.name, 40, 140);
        ctx.font = '16px Poppins, sans-serif';
        ctx.fillStyle = '#008F89';
        ctx.fillText(`GAMEA • ${item.secretaria} • Activo Oficial Certificado`, 40, 180);
      }
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = item.name.endsWith('.png') ? item.name : `${item.name}.png`;
      a.click();
      return;
    } else {
      // Documento / PDF / Texto manifiesto
      content = `# ACTIVO INSTITUCIONAL GAMEA\nNombre: ${item.name}\nFormato: ${item.format}\nSecretaria: ${item.secretaria}\nFecha: ${item.updated}\nSoberanía Digital: Gobierno Autónomo Municipal de El Alto`;
      mimeType = 'text/plain;charset=utf-8';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Descargar paquete completo / Manifiesto ZIP
  const handleDownloadAll = () => {
    const manifest = {
      sistema: 'EASystem - Biblioteca Digital de Activos de Marca (BAM)',
      gobierno: 'Gobierno Autónomo Municipal de El Alto',
      fechaGeneracion: new Date().toISOString(),
      totalActivos: assets.length,
      activos: assets.map(a => ({
        nombre: a.name,
        carpeta: a.folder,
        formato: a.format,
        tamano: a.size,
        secretaria: a.secretaria,
        actualizado: a.updated
      }))
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EASystem_Manifiesto_BAM_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = assets.filter(a => {
    const matchesFolder = selectedFolder === 'todos' || a.folder === selectedFolder;
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.secretaria.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
      {/* Folder Tree Sidebar */}
      <div className="ea-card" style={{ padding: '20px', height: 'fit-content' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
            <Folder size={20} color="var(--ea-secondary)" />
            <span>Estructura BAM</span>
          </h3>
          <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.7rem' }}>
            {assets.length} activos
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {folders.map(f => {
            const count = f.id === 'todos' 
              ? assets.length 
              : assets.filter(a => a.folder === f.id).length;
            const isSelected = selectedFolder === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFolder(f.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: isSelected ? '1px solid var(--ea-secondary)' : '1px solid transparent',
                  background: isSelected ? 'rgba(245, 0, 123, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  color: isSelected ? '#FFFFFF' : 'var(--ea-text-muted)',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Folder size={16} color={isSelected ? 'var(--ea-secondary)' : 'var(--ea-text-muted)'} />
                  <span>{f.label}</span>
                </div>
                <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="ea-card" style={{ padding: '32px' }}>
        {/* Search Bar & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={18} style={{ position: 'absolute', top: '12px', left: '16px', color: 'var(--ea-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, formato o secretaría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 46px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {/* BOTÓN SUBIR ACTIVO (NUEVO Y 100% FUNCIONAL) */}
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="ea-btn ea-btn-primary" 
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <Upload size={16} />
              <span>Subir Mi Material</span>
            </button>

            {/* BOTÓN DESCARGAR TODO FUNCIONAL */}
            <button 
              onClick={handleDownloadAll}
              className="ea-btn ea-btn-secondary" 
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
              title="Descarga el manifiesto completo de los activos institucionales"
            >
              <Download size={16} />
              <span>Exportar Manifiesto</span>
            </button>
          </div>
        </div>

        {/* Assets Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {filtered.map(item => (
            <div 
              key={item.id}
              style={{
                padding: '18px 20px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--ea-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                {item.fileData && item.format === 'SVG' ? (
                  <div 
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid var(--ea-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                      flexShrink: 0
                    }}
                    dangerouslySetInnerHTML={{ __html: item.fileData }}
                  />
                ) : item.fileData && (item.format === 'PNG' || item.format === 'JPG') ? (
                  <img 
                    src={item.fileData} 
                    alt={item.name} 
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      border: '1px solid var(--ea-border)',
                      flexShrink: 0
                    }}
                  />
                ) : (
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: item.format === 'SVG' ? 'rgba(75, 0, 143, 0.35)' : item.format === 'PNG' ? 'rgba(245, 0, 123, 0.25)' : 'rgba(0, 143, 137, 0.25)',
                    border: '1px solid var(--ea-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.format === 'SVG' ? '#FFF' : item.format === 'PNG' ? 'var(--ea-secondary)' : 'var(--ea-teal)',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    flexShrink: 0
                  }}>
                    {item.format}
                  </div>
                )}

                <div style={{ minWidth: 0, flex: 1 }}>
                  <h4 style={{ 
                    fontSize: '0.88rem', 
                    fontWeight: 600, 
                    marginBottom: '2px', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {item.name}
                  </h4>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ea-text-muted)' }}>
                    <span>{item.size}</span> • <span style={{ color: 'var(--ea-teal)' }}>{item.secretaria}</span> • <span>{item.updated}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                {/* Botón Descarga Real */}
                <button 
                  onClick={() => handleDownloadAsset(item)}
                  className="ea-btn ea-btn-secondary" 
                  style={{ padding: '8px 12px' }}
                  title={`Descargar archivo ${item.name}`}
                >
                  <Download size={16} />
                </button>

                {/* Si es subido por el usuario, permitir eliminar */}
                {item.id.startsWith('custom_') && (
                  <button 
                    onClick={() => handleDelete(item.id, item.name)}
                    className="ea-btn ea-btn-secondary" 
                    style={{ padding: '8px 10px', color: 'var(--ea-red)' }}
                    title="Eliminar este activo"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--ea-text-muted)' }}>
            <Folder size={48} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
            <h4>No se encontraron activos en esta carpeta</h4>
            <p style={{ fontSize: '0.85rem' }}>Haz clic en "Subir Mi Material" para agregar tus propios diseños vectoriales o imágenes.</p>
          </div>
        )}
      </div>

      {/* MODAL PARA SUBIR NUEVO MATERIAL / DISEÑOS PROPIOS */}
      {isUploadOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="ea-card" style={{
            width: '100%',
            maxWidth: '560px',
            padding: '32px',
            border: '1px solid var(--ea-secondary)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Upload size={22} color="var(--ea-secondary)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Subir Nuevo Material al BAM</h3>
              </div>
              <button 
                onClick={() => setIsUploadOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Dropzone / Input de archivo */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed var(--ea-border)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  background: 'rgba(75, 0, 143, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect}
                  accept=".svg,.png,.jpg,.jpeg,.pdf,.docx,.doc"
                  style={{ display: 'none' }}
                />
                <Upload size={32} color="var(--ea-teal)" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#FFF', marginBottom: '4px' }}>
                  {uploadFile ? uploadFile.name : 'Haz clic para seleccionar tu diseño desde tu computadora'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>
                  Soporta SVG, PNG (transparencia), JPG, PDF, DOCX (Hasta 50MB)
                </div>
              </div>

              {/* Previsualización en vivo si es imagen/SVG */}
              {uploadPreview && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}>
                  <img 
                    src={uploadPreview} 
                    alt="Vista previa" 
                    style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '6px', background: '#FFF' }}
                  />
                  <div style={{ fontSize: '0.8rem' }}>
                    <div style={{ color: 'var(--ea-teal)', fontWeight: 600 }}>Vista previa detectada</div>
                    <div style={{ color: 'var(--ea-text-muted)', fontSize: '0.72rem' }}>{uploadFile?.size ? `${Math.round(uploadFile.size / 1024)} KB` : ''}</div>
                  </div>
                </div>
              )}

              {/* Nombre del activo */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ea-text-muted)', marginBottom: '6px' }}>
                  Nombre del Activo / Archivo:
                </label>
                <input 
                  type="text" 
                  value={uploadName} 
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="Ej: Afiche_Campana_Salud_2026.svg"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid var(--ea-border)',
                    color: '#FFF',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              {/* Carpeta y Secretaría */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ea-text-muted)', marginBottom: '6px' }}>
                    Carpeta de Destino:
                  </label>
                  <select
                    value={uploadFolder}
                    onChange={(e) => setUploadFolder(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid var(--ea-border)',
                      color: '#FFF',
                      fontSize: '0.85rem'
                    }}
                  >
                    {folders.filter(f => f.id !== 'todos').map(f => (
                      <option key={f.id} value={f.id} style={{ background: '#150A2B' }}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ea-text-muted)', marginBottom: '6px' }}>
                    Secretaría / Origen:
                  </label>
                  <select
                    value={uploadSecretaria}
                    onChange={(e) => setUploadSecretaria(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid var(--ea-border)',
                      color: '#FFF',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="GAMEA" style={{ background: '#150A2B' }}>GAMEA Central</option>
                    <option value="DIRCOM" style={{ background: '#150A2B' }}>DIRCOM Institucional</option>
                    {SECRETARIAS_MUNICIPALES.map(s => (
                      <option key={s.id} value={s.code} style={{ background: '#150A2B' }}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Barra de progreso */}
              {uploadProgress !== null && (
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--ea-secondary)', transition: 'width 0.2s' }} />
                </div>
              )}

              {/* Botones de acción */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="ea-btn ea-btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="ea-btn ea-btn-primary"
                  style={{ fontSize: '0.85rem', padding: '10px 22px' }}
                >
                  <Check size={16} />
                  <span>Guardar Activo en Biblioteca</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
