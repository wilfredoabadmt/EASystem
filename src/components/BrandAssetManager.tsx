import React, { useState } from 'react';
import { 
  Folder, 
  FileCode, 
  Download, 
  Search, 
  Filter, 
  Image, 
  FileText, 
  Video, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AssetItem {
  id: string;
  name: string;
  folder: string;
  format: 'SVG' | 'PNG' | 'PDF' | 'DOCX';
  size: string;
  secretaria: string;
  updated: string;
}

export const BrandAssetManager: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const assets: AssetItem[] = [
    { id: '1', name: 'Imagotipo_ElAlto_FullColor.svg', folder: '/logos', format: 'SVG', size: '142 KB', secretaria: 'GAMEA', updated: '2026-09-28' },
    { id: '2', name: 'Imagotipo_ElAlto_FullColor.png', folder: '/png', format: 'PNG', size: '1.8 MB', secretaria: 'GAMEA', updated: '2026-09-28' },
    { id: '3', name: 'Imagotipo_Negativo_Blanco.svg', folder: '/versiones', format: 'SVG', size: '110 KB', secretaria: 'GAMEA', updated: '2026-09-28' },
    { id: '4', name: 'Manual_Imagen_Institucional_2026.pdf', folder: '/pdf', format: 'PDF', size: '48.5 MB', secretaria: 'DIRCOM', updated: '2026-09-25' },
    { id: '5', name: 'Hoja_Membretada_Oficial_A4.docx', folder: '/plantillas', format: 'DOCX', size: '520 KB', secretaria: 'DIRCOM', updated: '2026-09-20' },
    { id: '6', name: 'Cenefa_Aguayo_Vector_Seamless.svg', folder: '/svg', format: 'SVG', size: '890 KB', secretaria: 'GAMEA', updated: '2026-09-18' },
    { id: '7', name: 'Submarca_Movilidad_Urbana.svg', folder: '/logos', format: 'SVG', size: '190 KB', secretaria: 'SMMU', updated: '2026-09-15' },
    { id: '8', name: 'Submarca_Salud_Deportes.svg', folder: '/logos', format: 'SVG', size: '185 KB', secretaria: 'SMSD', updated: '2026-09-12' },
  ];

  const filtered = assets.filter(a => {
    const matchesFolder = selectedFolder === 'todos' || a.folder === selectedFolder;
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.secretaria.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
      {/* Folder Tree Sidebar */}
      <div className="ea-card" style={{ padding: '20px', height: 'fit-content' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Folder size={20} color="var(--ea-secondary)" />
          <span>Estructura BAM</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {folders.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFolder(f.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                border: selectedFolder === f.id ? '1px solid var(--ea-secondary)' : '1px solid transparent',
                background: selectedFolder === f.id ? 'rgba(245, 0, 123, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                color: selectedFolder === f.id ? '#FFFFFF' : 'var(--ea-text-muted)',
                fontSize: '0.85rem',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              <Folder size={16} color={selectedFolder === f.id ? 'var(--ea-secondary)' : 'var(--ea-text-muted)'} />
              <span>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="ea-card" style={{ padding: '32px' }}>
        {/* Search Bar & Stats */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', gap: '20px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
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

          <button className="ea-btn ea-btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            <Download size={16} />
            <span>Descargar Todo (.ZIP)</span>
          </button>
        </div>

        {/* Assets Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
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
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(75, 0, 143, 0.3)',
                  border: '1px solid var(--ea-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ea-secondary)',
                  fontWeight: 800,
                  fontSize: '0.75rem'
                }}>
                  {item.format}
                </div>

                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '2px' }}>{item.name}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>
                    <span>{item.size}</span> • <span style={{ color: 'var(--ea-teal)' }}>{item.secretaria}</span> • <span>{item.updated}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => alert(`Descargando ${item.name} certificado por GAMEA...`)}
                className="ea-btn ea-btn-secondary" 
                style={{ padding: '8px 12px' }}
              >
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
