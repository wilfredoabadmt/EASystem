import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Download, 
  QrCode, 
  Image as ImageIcon, 
  Sparkles, 
  Layers, 
  CheckCircle,
  RefreshCw,
  Copy,
  Check,
  Globe,
  Code,
  ExternalLink,
  BookOpen,
  Quote,
  List,
  Eye
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SECRETARIAS_MUNICIPALES } from '../tokens/brandTokens';

type FormatType = 'COMUNICADO_A4' | 'POST_INSTAGRAM' | 'STORY_INSTAGRAM' | 'AFICHE_PRENSA' | 'POST_WORDPRESS';
type WordPressPreviewTab = 'PREVIEW' | 'HTML' | 'GUIDE';

export const GraphicGenerator: React.FC = () => {
  const [format, setFormat] = useState<FormatType>('POST_WORDPRESS');
  const [title, setTitle] = useState('COMUNICADO OFICIAL A LA CIUDADANÍA: PLAN INTEGRAL DE MANTENIMIENTO VIAL');
  const [subtitle, setSubtitle] = useState('La Alcaldía inicia la intervención integral de avenidas troncales y modernización de luminarias LED');
  const [content, setContent] = useState(`El Gobierno Autónomo Municipal de El Alto (GAMEA), a través de sus brigadas operativas de emergencia y cuadrillas viales, informa a toda la población que se inician los trabajos de mantenimiento preventivo y correctivo en las principales arterias de la urbe alteña.\n\nEstas labores comprenden el bacheo profundo, recarpetado con mezcla asfáltica en caliente y la nivelación de tapas de cámaras de inspección, con el propósito de optimizar el flujo del transporte público y privado, garantizando condiciones de seguridad vial para transportistas, comerciantes y transeúntes.`);
  const [category, setCategory] = useState('OBRAS Y VIALIDAD');
  const [quote, setQuote] = useState('Nuestra prioridad es devolver la dignidad a las familias alteñas con obras duraderas y avenidas iluminadas y seguras para todos nuestros distritos.');
  const [keyPoints, setKeyPoints] = useState(`Intervención de más de 18.000 metros cuadrados de pavimento flexible y rígido.\nInstalación de 350 luminarias con tecnología LED de bajo consumo.\nDespliegue de maquinaria pesada y personal técnico en horarios nocturnos para evitar congestionamiento vehicular.\nCoordinación directa con juntas vecinales y organizaciones sociales de los 14 distritos.`);
  const [secretaria, setSecretaria] = useState(SECRETARIAS_MUNICIPALES[2]?.name || 'Secretaría Municipal de Infraestructura Pública');
  const [dateText, setDateText] = useState('El Alto, 30 de Septiembre de 2026');
  const [folio, setFolio] = useState('GAMEA-PRENSA-2026-0418');
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [wpTab, setWpTab] = useState<WordPressPreviewTab>('PREVIEW');

  const canvasRef = useRef<HTMLDivElement>(null);

  // Helper para generar el código HTML optimizado para WordPress Gutenberg / Clásico
  const generateWordPressHtml = (): string => {
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    const pointsList = keyPoints.split('\n').filter(p => p.trim().length > 0);

    return `<!-- ======================================================== -->
<!-- PUBLICACIÓN OFICIAL GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO -->
<!-- PORTAL DE NOTICIAS: elalto.gob.bo -->
<!-- FOLIO: ${folio} -->
<!-- ======================================================== -->

<!-- BANNER SUPERIOR DE IDENTIDAD AGUAYO -->
<div style="background: linear-gradient(90deg, #4B008F 0%, #F5007B 25%, #F5B400 50%, #008F89 75%, #690BB2 100%); height: 6px; border-radius: 4px; margin-bottom: 22px;"></div>

<!-- ENCABEZADO Y METADATOS PERIODÍSTICOS -->
<div style="font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-bottom: 16px; display: flex; align-items: center; flex-wrap: wrap; gap: 10px;">
  <span style="display: inline-block; background: #FAF5FF; color: #4B008F; border: 1px solid #D8B4FE; padding: 5px 14px; border-radius: 9999px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
    ${category}
  </span>
  <span style="color: #6B7280; font-size: 13px; font-family: 'Poppins', sans-serif;">
    📅 ${dateText} &nbsp;|&nbsp; 🏛️ <strong>${secretaria}</strong>
  </span>
</div>

<!-- TITULAR PRINCIPAL DE LA NOTICIA -->
<h2 style="font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 28px; font-weight: 800; color: #150A2B; line-height: 1.25; margin: 0 0 16px 0; letter-spacing: -0.01em;">
  ${title}
</h2>

<!-- BAJADA / EPÍGRAFE INFORMATIVO -->
<p style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 17px; font-weight: 600; color: #4B5563; line-height: 1.6; margin: 0 0 24px 0; border-left: 4px solid #F5007B; padding-left: 16px; background: rgba(245, 0, 123, 0.03); padding-top: 8px; padding-bottom: 8px; border-radius: 0 8px 8px 0;">
  ${subtitle}
</p>

<!-- CUERPO DE LA NOTICIA -->
<div style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; color: #2D3748; line-height: 1.8; margin-bottom: 24px;">
${paragraphs.map(p => `  <p style="margin: 0 0 16px 0;">${p.replace(/\n/g, '<br/>')}</p>`).join('\n')}
</div>

${quote.trim() ? `
<!-- DECLARACIÓN DESTACADA / CITA OFICIAL -->
<blockquote style="margin: 28px 0; padding: 22px 24px; background: #FAF5FF; border-left: 5px solid #4B008F; border-radius: 0 12px 12px 0; font-family: 'Montserrat', sans-serif;">
  <p style="font-size: 17px; font-style: italic; font-weight: 600; color: #4B008F; line-height: 1.6; margin: 0 0 10px 0;">
    “${quote}”
  </p>
  <cite style="display: block; font-size: 13px; font-weight: 700; color: #6B21A8; font-style: normal; text-transform: uppercase; letter-spacing: 0.5px;">
    — Declaración Oficial • Gobierno Autónomo Municipal de El Alto
  </cite>
</blockquote>
` : ''}

${pointsList.length > 0 ? `
<!-- RECUADRO DE DATOS Y ASPECTOS RELEVANTES -->
<div style="margin: 28px 0; padding: 22px 24px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; font-family: 'Poppins', sans-serif;">
  <h4 style="font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 800; color: #008F89; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 14px 0; display: flex; align-items: center; gap: 8px;">
    📌 Aspectos Relevantes de la Gestión:
  </h4>
  <ul style="margin: 0; padding-left: 20px; color: #334155; line-height: 1.7; font-size: 15px;">
${pointsList.map(pt => `    <li style="margin-bottom: 8px;">${pt}</li>`).join('\n')}
  </ul>
</div>
` : ''}

<!-- PIE INSTITUCIONAL DE VERIFICACIÓN Y FUENTE -->
<div style="margin-top: 36px; padding: 20px; background: #F9FAFB; border-radius: 10px; border: 1px solid #E5E7EB; font-family: 'Poppins', sans-serif; font-size: 13px; color: #6B7280; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
  <div>
    <strong style="color: #4B008F; font-size: 14px;">Gobierno Autónomo Municipal de El Alto</strong><br/>
    <strong>Emisor:</strong> ${secretaria} &nbsp;|&nbsp; <strong>Prensa:</strong> Dirección de Comunicación<br/>
    <strong>Portal Oficial:</strong> <a href="https://elalto.gob.bo" target="_blank" rel="noopener noreferrer" style="color: #008F89; text-decoration: none; font-weight: 700;">www.elalto.gob.bo</a>
  </div>
  <div style="text-align: right; font-size: 12px; color: #9CA3AF;">
    <span style="display: inline-block; background: #EEF2F6; padding: 3px 8px; border-radius: 4px; font-family: monospace; font-weight: 700; color: #475569;">${folio}</span><br/>
    <span>Documento Oficial Certificado</span>
  </div>
</div>

<!-- LÍNEA INFERIOR AGUAYO -->
<div style="background: linear-gradient(90deg, #690BB2 0%, #008F89 25%, #F5B400 50%, #F5007B 75%, #4B008F 100%); height: 4px; border-radius: 4px; margin-top: 10px;"></div>`;
  };

  // Copiado rico para pegar directo en Gutenberg (Ctrl + V)
  const handleCopyRichTextForWordPress = async () => {
    const html = generateWordPressHtml();
    const plainText = `${title.toUpperCase()}\n\n${subtitle}\n\n${content}\n\n${quote ? `"${quote}"\n\n` : ''}${keyPoints}\n\nFuente: ${secretaria} - GAMEA (elalto.gob.bo)\nFolio: ${folio}`;

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const htmlBlob = new Blob([html], { type: 'text/html' });
        const textBlob = new Blob([plainText], { type: 'text/plain' });
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob
          })
        ]);
      } else {
        await navigator.clipboard.writeText(html);
      }
      setCopiedStatus('RICH_TEXT');
      setTimeout(() => setCopiedStatus(null), 4000);
    } catch (err) {
      console.warn('Error al copiar enriquecido, usando texto plano:', err);
      try {
        await navigator.clipboard.writeText(html);
        setCopiedStatus('HTML_CODE');
        setTimeout(() => setCopiedStatus(null), 4000);
      } catch (err2) {
        alert('No se pudo copiar automáticamente. Por favor copia el código desde la pestaña "Código HTML".');
      }
    }
  };

  // Copiado exclusivo del código HTML plano
  const handleCopyHtmlCode = async () => {
    const html = generateWordPressHtml();
    try {
      await navigator.clipboard.writeText(html);
      setCopiedStatus('HTML_CODE');
      setTimeout(() => setCopiedStatus(null), 4000);
    } catch (err) {
      alert('Error al copiar código al portapapeles.');
    }
  };

  // Copiado de titular o bajada de forma individual
  const handleCopyField = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStatus(label);
      setTimeout(() => setCopiedStatus(null), 3000);
    } catch (err) {
      alert(`Error al copiar ${label}`);
    }
  };

  const handleExportPNG = () => {
    if (format === 'POST_WORDPRESS') {
      // Imagen destacada 16:9 de 1200x675 para WordPress elalto.gob.bo
      const w = 1200;
      const h = 675;
      const filename = `NOTICIA_WORDPRESS_${category.replace(/\s+/g, '_')}_${folio}.svg`;

      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <defs>
          <linearGradient id="aguayoWp" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#4B008F" />
            <stop offset="25%" stop-color="#F5007B" />
            <stop offset="50%" stop-color="#F5B400" />
            <stop offset="75%" stop-color="#008F89" />
            <stop offset="100%" stop-color="#690BB2" />
          </linearGradient>
          <linearGradient id="bgDarkWp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0E051D" />
            <stop offset="50%" stop-color="#190B33" />
            <stop offset="100%" stop-color="#0A0314" />
          </linearGradient>
        </defs>

        <!-- Fondo General -->
        <rect width="${w}" height="${h}" fill="url(#bgDarkWp)" />
        
        <!-- Guardas y Elementos Geométricos de Identidad -->
        <circle cx="1100" cy="100" r="300" fill="#4B008F" opacity="0.25" filter="blur(60px)" />
        <circle cx="100" cy="550" r="250" fill="#F5007B" opacity="0.18" filter="blur(50px)" />
        <circle cx="950" cy="550" r="200" fill="#008F89" opacity="0.18" filter="blur(50px)" />

        <!-- Cintillo Aguayo Superior -->
        <rect width="${w}" height="14" fill="url(#aguayoWp)" />

        <!-- Barra Superior de Portal -->
        <rect y="14" width="${w}" height="76" fill="#140827" fill-opacity="0.9" />
        <text x="60" y="58" fill="#FFFFFF" font-family="Montserrat, sans-serif" font-size="22" font-weight="900" letter-spacing="1">GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO</text>
        <text x="60" y="78" fill="#008F89" font-family="Poppins, sans-serif" font-size="13" font-weight="700">PORTAL OFICIAL DE NOTICIAS • elalto.gob.bo</text>

        <!-- Badge Categoría -->
        <rect x="60" y="130" width="${category.length * 13 + 30}" height="36" rx="18" fill="#F5007B" />
        <text x="75" y="154" fill="#FFFFFF" font-family="Montserrat, sans-serif" font-size="13" font-weight="800" letter-spacing="1">${category}</text>

        <!-- Titular de Noticia -->
        <foreignObject x="60" y="185" width="${w - 120}" height="240">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Montserrat, sans-serif; font-size: 38px; font-weight: 900; color: #FFFFFF; line-height: 1.25; text-shadow: 0 4px 20px rgba(0,0,0,0.6);">
            ${title}
          </div>
        </foreignObject>

        <!-- Bajada / Subtítulo -->
        <foreignObject x="60" y="440" width="${w - 120}" height="110">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Poppins, sans-serif; font-size: 20px; font-weight: 500; color: #D1D5DB; line-height: 1.5; border-left: 4px solid #F5B400; padding-left: 16px;">
            ${subtitle}
          </div>
        </foreignObject>

        <!-- Barra Inferior de Firma y Folio -->
        <rect y="${h - 90}" width="${w}" height="78" fill="#090312" />
        <text x="60" y="${h - 50}" fill="#F5B400" font-family="Montserrat, sans-serif" font-size="14" font-weight="700">EMISOR OFICIAL: ${secretaria.toUpperCase()}</text>
        <text x="60" y="${h - 30}" fill="#9CA3AF" font-family="Poppins, sans-serif" font-size="12">${dateText} | Folio: ${folio}</text>

        <text x="${w - 320}" y="${h - 42}" fill="#008F89" font-family="Montserrat, sans-serif" font-size="15" font-weight="800">www.elalto.gob.bo</text>

        <!-- Cintillo Aguayo Inferior -->
        <rect y="${h - 12}" width="${w}" height="12" fill="url(#aguayoWp)" />
      </svg>`;

      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    // Generar documento SVG para otros formatos
    const filename = `GAMEA_${format}_${folio}.svg`;
    const w = format === 'POST_INSTAGRAM' ? 800 : format === 'STORY_INSTAGRAM' ? 720 : 794;
    const h = format === 'POST_INSTAGRAM' ? 800 : format === 'STORY_INSTAGRAM' ? 1280 : 1123;

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <linearGradient id="aguayo" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4B008F" />
          <stop offset="25%" stop-color="#F5007B" />
          <stop offset="50%" stop-color="#F5B400" />
          <stop offset="75%" stop-color="#008F89" />
          <stop offset="100%" stop-color="#690BB2" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#FFFFFF" />
      <rect width="${w}" height="10" fill="url(#aguayo)" />
      
      <!-- Encabezado Institucional -->
      <rect y="10" width="${w}" height="90" fill="#090314" />
      <text x="40" y="55" fill="#FFFFFF" font-family="Montserrat, sans-serif" font-size="20" font-weight="900">GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO</text>
      <text x="40" y="80" fill="#008F89" font-family="Poppins, sans-serif" font-size="12" font-weight="600">${secretaria}</text>

      <!-- Folio -->
      <text x="${w - 240}" y="55" fill="#F5007B" font-family="Montserrat, sans-serif" font-size="12" font-weight="700">FOLIO OFICIAL:</text>
      <text x="${w - 240}" y="75" fill="#FFFFFF" font-family="monospace" font-size="11">${folio}</text>

      <!-- Contenido Principal -->
      <text x="40" y="160" fill="#4B008F" font-family="Montserrat, sans-serif" font-size="22" font-weight="900">${title}</text>
      <text x="40" y="200" fill="#F5007B" font-family="Montserrat, sans-serif" font-size="14" font-weight="700">${subtitle}</text>
      
      <!-- Cuerpo del Mensaje -->
      <foreignObject x="40" y="230" width="${w - 80}" height="${h - 380}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Poppins, sans-serif; font-size: 15px; color: #333333; line-height: 1.7;">
          ${content}
        </div>
      </foreignObject>

      <!-- Pie de página con firma y QR -->
      <line x1="40" y1="${h - 90}" x2="${w - 40}" y2="${h - 90}" stroke="#E5E7EB" stroke-width="2" />
      <text x="40" y="${h - 60}" fill="#4B008F" font-family="Montserrat, sans-serif" font-size="13" font-weight="700">${dateText}</text>
      <text x="40" y="${h - 40}" fill="#9CA3AF" font-family="Poppins, sans-serif" font-size="11">Firma digital institucional - Verificación inmutable GAMEA</text>
      
      <rect x="${w - 120}" y="${h - 80}" width="80" height="50" fill="#F3E8FF" rx="6" />
      <text x="${w - 110}" y="${h - 55}" fill="#4B008F" font-family="Montserrat, sans-serif" font-size="10" font-weight="800">QR OFICIAL</text>
      <text x="${w - 110}" y="${h - 42}" fill="#6B21A8" font-family="monospace" font-size="8">VALIDADO</text>
      
      <rect y="${h - 8}" width="${w}" height="8" fill="url(#aguayo)" />
    </svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(420px, 480px) 1fr', gap: '32px', minHeight: '80vh', alignItems: 'start' }}>
      {/* Editor Controls */}
      <div className="ea-card" style={{ padding: '28px', height: 'fit-content' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={22} color="var(--ea-secondary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Generador de Comunicados y Prensa</h3>
          </div>
          <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.7rem' }}>
            v2.6 WordPress Ready
          </span>
        </div>

        {/* Format Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--ea-text-muted)', marginBottom: '8px' }}>
            Tipo de Pieza Institucional:
          </label>
          
          {/* Opción Destacada WordPress */}
          <button
            onClick={() => setFormat('POST_WORDPRESS')}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: format === 'POST_WORDPRESS' ? '2px solid var(--ea-teal)' : '1px solid rgba(0, 143, 137, 0.4)',
              background: format === 'POST_WORDPRESS' ? 'linear-gradient(135deg, rgba(0, 143, 137, 0.25) 0%, rgba(75, 0, 143, 0.25) 100%)' : 'rgba(0, 143, 137, 0.08)',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              transition: 'all 0.2s ease',
              boxShadow: format === 'POST_WORDPRESS' ? '0 0 20px rgba(0, 143, 137, 0.3)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={18} color="var(--ea-teal)" />
              <div style={{ textAlign: 'left' }}>
                <div>Noticia Web WordPress (elalto.gob.bo)</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ea-text-muted)', fontWeight: 400 }}>Copiar y pegar directo en entradas de WordPress</div>
              </div>
            </div>
            <span style={{ 
              background: 'var(--ea-teal)', 
              color: '#090314', 
              fontSize: '0.65rem', 
              fontWeight: 900, 
              padding: '2px 8px', 
              borderRadius: '12px' 
            }}>
              WP OFICIAL
            </span>
          </button>

          {/* Otros Formatos Tradicionales */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { id: 'COMUNICADO_A4', label: 'Comunicado A4' },
              { id: 'POST_INSTAGRAM', label: 'Post Redes (1:1)' },
              { id: 'STORY_INSTAGRAM', label: 'Story Redes (9:16)' },
              { id: 'AFICHE_PRENSA', label: 'Afiche Convocatoria' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id as FormatType)}
                style={{
                  padding: '9px 10px',
                  borderRadius: '8px',
                  border: format === f.id ? '1px solid var(--ea-secondary)' : '1px solid var(--ea-border)',
                  background: format === f.id ? 'rgba(245, 0, 123, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: format === f.id ? '#FFFFFF' : 'var(--ea-text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{
            marginTop: '12px',
            padding: '10px 12px',
            borderRadius: '8px',
            background: 'rgba(0, 143, 137, 0.12)',
            border: '1px solid rgba(0, 143, 137, 0.3)',
            fontSize: '0.75rem',
            color: 'var(--ea-teal)'
          }}>
            💡 <strong>Integración con elalto.gob.bo:</strong> Genera la noticia con la tipografía, colores del aguayo, cita del alcalde y puntos clave lista para pegar con <strong>Ctrl + V</strong> en el editor de WordPress.
          </div>
        </div>

        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Selector de Categoría (Especial para WordPress) */}
          {format === 'POST_WORDPRESS' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', color: 'var(--ea-teal)' }}>
                🏷️ Categoría de Noticia (WordPress):
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--ea-teal)',
                  color: '#FFFFFF',
                  fontFamily: 'inherit',
                  fontSize: '0.85rem'
                }}
              >
                <option value="OBRAS Y VIALIDAD">Obras y Vialidad</option>
                <option value="GESTIÓN MUNICIPAL">Gestión Municipal</option>
                <option value="SALUD PÚBLICA">Salud Pública</option>
                <option value="SEGURIDAD CIUDADANA">Seguridad Ciudadana</option>
                <option value="EDUCACIÓN Y CULTURA">Educación y Cultura</option>
                <option value="DESARROLLO ECONÓMICO">Desarrollo Económico</option>
                <option value="MEDIO AMBIENTE Y RIESGOS">Medio Ambiente y Riesgos</option>
                <option value="SUBALCALDÍAS DISTRITALES">Subalcaldías Distritales</option>
                <option value="COMUNICADO OFICIAL">Comunicado Oficial</option>
              </select>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--ea-text-muted)' }}>
              Secretaría / Dirección Emisora:
            </label>
            <select
              value={secretaria}
              onChange={(e) => setSecretaria(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.85rem'
              }}
            >
              {['Nivel Ejecutivo', 'Gestión Institucional', 'Secretaría Municipal', 'Subalcaldías Distritales', 'Hospitales Municipales', 'Entidades Descentralizadas'].map(cat => {
                const items = SECRETARIAS_MUNICIPALES.filter(s => (s as any).category === cat);
                if (items.length === 0) return null;
                return (
                  <optgroup key={cat} label={`── ${cat.toUpperCase()} ──`} style={{ background: '#090314', color: 'var(--ea-gold)' }}>
                    {items.map(s => (
                      <option key={s.id} value={s.name} style={{ background: '#150A2B', color: '#FFF' }}>
                        {s.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--ea-text-muted)' }}>
                Titular Principal (H1):
              </label>
              <button
                onClick={() => handleCopyField(title, 'TITULAR')}
                style={{ background: 'none', border: 'none', color: 'var(--ea-gold)', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                title="Copiar solo el titular para la barra de título de WordPress"
              >
                <Copy size={11} />
                <span>{copiedStatus === 'TITULAR' ? '¡Copiado!' : 'Copiar Titular'}</span>
              </button>
            </div>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--ea-text-muted)' }}>
                Bajada / Subtítulo (Epígrafe):
              </label>
              <button
                onClick={() => handleCopyField(subtitle, 'BAJADA')}
                style={{ background: 'none', border: 'none', color: 'var(--ea-gold)', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                title="Copiar bajada para el extracto o SEO de WordPress"
              >
                <Copy size={11} />
                <span>{copiedStatus === 'BAJADA' ? '¡Copiado!' : 'Copiar Bajada'}</span>
              </button>
            </div>
            <input 
              type="text" 
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--ea-text-muted)' }}>
              Cuerpo de la Noticia / Comunicado:
            </label>
            <textarea 
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--ea-border)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.82rem',
                resize: 'vertical',
                lineHeight: 1.5
              }}
            />
          </div>

          {/* Campos Adicionales para Post de Noticias en WordPress */}
          {format === 'POST_WORDPRESS' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--ea-gold)' }}>
                  💬 Cita Destacada / Declaración Oficial (Pullquote):
                </label>
                <textarea 
                  rows={2}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Declaración del Alcalde o autoridad municipal..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(245, 180, 0, 0.4)',
                    color: '#FFFFFF',
                    fontFamily: 'inherit',
                    fontSize: '0.82rem',
                    resize: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--ea-text-muted)' }}>
                  📌 Puntos Clave / Logros (un punto por línea):
                </label>
                <textarea 
                  rows={3}
                  value={keyPoints}
                  onChange={(e) => setKeyPoints(e.target.value)}
                  placeholder="Escribe cada dato o aspecto relevante en una línea..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid var(--ea-border)',
                    color: '#FFFFFF',
                    fontFamily: 'inherit',
                    fontSize: '0.8rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            </>
          )}

          {/* BOTONES DE ACCIÓN PARA WORDPRESS */}
          {format === 'POST_WORDPRESS' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <button 
                onClick={handleCopyRichTextForWordPress}
                className="ea-btn" 
                style={{ 
                  width: '100%', 
                  background: copiedStatus === 'RICH_TEXT' 
                    ? '#059669' 
                    : 'linear-gradient(135deg, #008F89 0%, #4B008F 100%)',
                  color: '#FFFFFF',
                  padding: '12px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 18px rgba(0, 143, 137, 0.4)'
                }}
              >
                {copiedStatus === 'RICH_TEXT' ? <Check size={18} /> : <Copy size={18} />}
                <span>{copiedStatus === 'RICH_TEXT' ? '¡Copiado para WordPress!' : 'Copiar Contenido para WordPress (Ctrl + V)'}</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={handleCopyHtmlCode}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    background: copiedStatus === 'HTML_CODE' ? 'rgba(5, 150, 105, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                    border: copiedStatus === 'HTML_CODE' ? '1px solid #10B981' : '1px solid var(--ea-border)',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Code size={14} color="var(--ea-gold)" />
                  <span>{copiedStatus === 'HTML_CODE' ? '¡Código Copiado!' : 'Copiar Código HTML'}</span>
                </button>

                <button
                  onClick={handleExportPNG}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    background: 'rgba(245, 0, 123, 0.15)',
                    border: '1px solid rgba(245, 0, 123, 0.4)',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={14} color="var(--ea-secondary)" />
                  <span>Descargar Banner (16:9)</span>
                </button>
              </div>

              {/* Mensaje de éxito flotante */}
              {copiedStatus && (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid #10B981',
                  color: '#A7F3D0',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <CheckCircle size={16} color="#34D399" />
                  <span>
                    <strong>¡Listo!</strong> Ve a tu entrada en <strong>elalto.gob.bo/wp-admin</strong> y presiona <strong>Ctrl + V</strong> en el editor.
                  </span>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={handleExportPNG}
              className="ea-btn ea-btn-primary" 
              style={{ width: '100%', marginTop: '8px' }}
            >
              <Download size={18} />
              <span>Generar y Descargar (PNG / SVG)</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Preview Canvas WYSIWYG */}
      <div className="ea-card" style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>
        {/* Encabezado de la previsualización con selector de pestaña */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="ea-badge ea-badge-teal">
              <CheckCircle size={14} />
              {format === 'POST_WORDPRESS' ? 'Plantilla Oficial Web elalto.gob.bo' : 'Plantilla Certificada 100% Brand Compliant'}
            </span>
          </div>

          {format === 'POST_WORDPRESS' ? (
            <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px', borderRadius: '8px', border: '1px solid var(--ea-border)' }}>
              <button
                onClick={() => setWpTab('PREVIEW')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: wpTab === 'PREVIEW' ? 'var(--ea-primary)' : 'transparent',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Eye size={13} />
                <span>Vista Previa</span>
              </button>
              <button
                onClick={() => setWpTab('HTML')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: wpTab === 'HTML' ? 'var(--ea-primary)' : 'transparent',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Code size={13} />
                <span>Código HTML</span>
              </button>
              <button
                onClick={() => setWpTab('GUIDE')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: wpTab === 'GUIDE' ? 'var(--ea-primary)' : 'transparent',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <BookOpen size={13} />
                <span>Guía WordPress</span>
              </button>
            </div>
          ) : (
            <span style={{ fontSize: '0.85rem', color: 'var(--ea-text-muted)' }}>Folio: {folio}</span>
          )}
        </div>

        {/* CONTENIDO DE LA PREVISUALIZACIÓN */}
        {format === 'POST_WORDPRESS' ? (
          <div>
            {/* PESTAÑA 1: VISTA PREVIA PERIODÍSTICA SIMULADOR ELALTO.GOB.BO */}
            {wpTab === 'PREVIEW' && (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                border: '1px solid #E5E7EB'
              }}>
                {/* Simulación Barra del Navegador Web */}
                <div style={{
                  background: '#F3F4F6',
                  padding: '8px 16px',
                  borderBottom: '1px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                  </div>
                  <div style={{
                    flex: 1,
                    background: '#FFFFFF',
                    borderRadius: '6px',
                    padding: '3px 12px',
                    fontSize: '0.72rem',
                    color: '#6B7280',
                    fontFamily: 'monospace',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Globe size={11} color="#008F89" />
                    <span>https://elalto.gob.bo/noticias/{category.toLowerCase().replace(/\s+/g, '-')}/</span>
                  </div>
                </div>

                {/* Banner Aguayo Superior */}
                <div style={{
                  height: '6px',
                  width: '100%',
                  background: 'linear-gradient(90deg, #4B008F 0%, #F5007B 25%, #F5B400 50%, #008F89 75%, #690BB2 100%)'
                }} />

                {/* Imagen Destacada 16:9 Simulada en la Cabecera de la Noticia */}
                <div style={{
                  background: 'linear-gradient(135deg, #0E051D 0%, #190B33 50%, #0A0314 100%)',
                  padding: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderBottom: '1px solid #EAE6F0'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(75,0,143,0.4) 0%, transparent 70%)'
                  }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
                    <BrandLogo size={36} variant="color" subbrand="Alcaldía de El Alto" />
                    <span style={{
                      background: 'rgba(245, 0, 123, 0.25)',
                      border: '1px solid #F5007B',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {category}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                    marginBottom: '8px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {title}
                  </h3>

                  <div style={{ fontSize: '0.72rem', color: '#9CA3AF', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{dateText}</span>
                    <span>•</span>
                    <span>{secretaria}</span>
                  </div>
                </div>

                {/* Cuerpo del Artículo Maquetado para WordPress */}
                <div style={{ padding: '32px 36px', color: '#1F2937' }}>
                  {/* Badge de Categoría y Metadatos */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <span style={{
                      background: '#FAF5FF',
                      color: '#4B008F',
                      border: '1px solid #D8B4FE',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {category}
                    </span>
                    <span style={{ color: '#6B7280', fontSize: '0.8rem' }}>
                      📅 {dateText} &nbsp;|&nbsp; 🏛️ {secretaria}
                    </span>
                  </div>

                  {/* Titular Principal H1 */}
                  <h1 style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '1.85rem',
                    fontWeight: 900,
                    color: '#150A2B',
                    lineHeight: 1.25,
                    marginBottom: '14px',
                    letterSpacing: '-0.02em'
                  }}>
                    {title}
                  </h1>

                  {/* Bajada informativa */}
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#4B5563',
                    lineHeight: 1.6,
                    borderLeft: '4px solid #F5007B',
                    paddingLeft: '14px',
                    background: 'rgba(245, 0, 123, 0.03)',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    borderRadius: '0 8px 8px 0',
                    marginBottom: '22px'
                  }}>
                    {subtitle}
                  </div>

                  {/* Párrafos de la noticia */}
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.92rem',
                    lineHeight: 1.75,
                    color: '#374151',
                    marginBottom: '24px'
                  }}>
                    {content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} style={{ marginBottom: '14px' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Cita Destacada (Pullquote) */}
                  {quote.trim() && (
                    <blockquote style={{
                      margin: '24px 0',
                      padding: '18px 22px',
                      background: '#FAF5FF',
                      borderLeft: '5px solid #4B008F',
                      borderRadius: '0 12px 12px 0'
                    }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Quote size={20} color="#4B008F" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <p style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '0.98rem',
                            fontStyle: 'italic',
                            fontWeight: 600,
                            color: '#4B008F',
                            lineHeight: 1.6,
                            marginBottom: '6px'
                          }}>
                            “{quote}”
                          </p>
                          <cite style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#6B21A8',
                            fontStyle: 'normal',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            — Declaración Oficial • Gobierno Autónomo Municipal de El Alto
                          </cite>
                        </div>
                      </div>
                    </blockquote>
                  )}

                  {/* Puntos Relevantes (Aspectos de impacto) */}
                  {keyPoints.trim() && (
                    <div style={{
                      margin: '24px 0',
                      padding: '20px 22px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px'
                    }}>
                      <h4 style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#008F89',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        📌 Aspectos Relevantes de la Gestión:
                      </h4>
                      <ul style={{
                        margin: 0,
                        paddingLeft: '18px',
                        color: '#334155',
                        lineHeight: 1.7,
                        fontSize: '0.85rem'
                      }}>
                        {keyPoints.split('\n').filter(p => p.trim()).map((pt, i) => (
                          <li key={i} style={{ marginBottom: '6px' }}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pie de artículo institucional */}
                  <div style={{
                    marginTop: '32px',
                    paddingTop: '16px',
                    borderTop: '1px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: '#6B7280',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div>
                      <strong style={{ color: '#4B008F' }}>Gobierno Autónomo Municipal de El Alto</strong> — Dirección de Comunicación<br />
                      Portal de Noticias Oficial: <span style={{ color: '#008F89', fontWeight: 600 }}>www.elalto.gob.bo</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ background: '#EEF2F6', padding: '3px 8px', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>{folio}</span>
                    </div>
                  </div>
                </div>

                {/* Banner Aguayo Inferior */}
                <div style={{
                  height: '5px',
                  width: '100%',
                  background: 'linear-gradient(90deg, #690BB2 0%, #008F89 25%, #F5B400 50%, #F5007B 75%, #4B008F 100%)'
                }} />
              </div>
            )}

            {/* PESTAÑA 2: CÓDIGO HTML DIRECTO */}
            {wpTab === 'HTML' && (
              <div style={{ position: 'relative' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: '#0D051A',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  border: '1px solid var(--ea-border)',
                  borderBottom: 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--ea-gold)' }}>
                    <Code size={16} />
                    <strong>Código HTML Listo para WordPress (Bloque Gutenberg "HTML Personalizado" o Elementor)</strong>
                  </div>
                  <button
                    onClick={handleCopyHtmlCode}
                    className="ea-btn ea-btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.75rem' }}
                  >
                    {copiedStatus === 'HTML_CODE' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedStatus === 'HTML_CODE' ? '¡Copiado!' : 'Copiar Todo el Código'}</span>
                  </button>
                </div>

                <pre style={{
                  background: '#07020E',
                  padding: '20px',
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                  border: '1px solid var(--ea-border)',
                  color: '#A5B4FC',
                  fontSize: '0.76rem',
                  fontFamily: 'Consolas, monospace',
                  lineHeight: 1.6,
                  maxHeight: '520px',
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {generateWordPressHtml()}
                </pre>
              </div>
            )}

            {/* PESTAÑA 3: GUÍA RÁPIDA DE PUBLICACIÓN EN ELALTO.GOB.BO */}
            {wpTab === 'GUIDE' && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--ea-border)',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ea-gold)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={18} />
                  ¿Cómo publicar este contenido en el portal de noticias elalto.gob.bo?
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--ea-primary)',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      1
                    </div>
                    <div>
                      <strong style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>Ingresa al Administrador de WordPress</strong>
                      <p style={{ fontSize: '0.82rem', color: 'var(--ea-text-muted)', marginTop: '4px' }}>
                        Accede a tu panel en <code style={{ background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px', color: 'var(--ea-teal)' }}>elalto.gob.bo/wp-admin</code>, ve a <strong>Entradas</strong> &gt; <strong>Añadir nueva entrada</strong>.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--ea-secondary)',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      2
                    </div>
                    <div>
                      <strong style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>Pega el Contenido con Ctrl + V</strong>
                      <p style={{ fontSize: '0.82rem', color: 'var(--ea-text-muted)', marginTop: '4px' }}>
                        Haz clic en el botón verde <strong>"Copiar Contenido para WordPress (Ctrl + V)"</strong> de este generador. En el editor de WordPress, haz clic en el área de texto y presiona <strong>Ctrl + V</strong>. Se insertará automáticamente con encabezados, cintillos de aguayo, cita destacada y listas.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--ea-teal)',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      3
                    </div>
                    <div>
                      <strong style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>Sube la Imagen Destacada (16:9)</strong>
                      <p style={{ fontSize: '0.82rem', color: 'var(--ea-text-muted)', marginTop: '4px' }}>
                        Haz clic en <strong>"Descargar Banner (16:9)"</strong> en este generador. En la columna derecha de WordPress, ve a <strong>Imagen Destacada</strong>, sube el archivo generado y asigna la categoría correspondiente (ej. <em>{category}</em>).
                      </p>
                    </div>
                  </div>

                  <div style={{
                    marginTop: '10px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(0, 143, 137, 0.1)',
                    border: '1px solid rgba(0, 143, 137, 0.3)',
                    fontSize: '0.8rem',
                    color: '#A7F3D0'
                  }}>
                    ✨ <strong>Ventaja Técnica:</strong> Todos los estilos están pre-incrustados con CSS inline compatible. No requiere plugins adicionales en WordPress y se verá perfecto en cualquier tema oficial del municipio.
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* CANVAS VISUAL TRADICIONAL PARA A4 / INSTAGRAM / STORY */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div 
              ref={canvasRef}
              style={{
                width: format === 'POST_INSTAGRAM' ? '460px' : format === 'STORY_INSTAGRAM' ? '320px' : '500px',
                minHeight: format === 'POST_INSTAGRAM' ? '460px' : format === 'STORY_INSTAGRAM' ? '560px' : '650px',
                background: '#FFFFFF',
                color: '#150A2B',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Aguayo Top Border */}
              <div style={{
                height: '10px',
                width: '100%',
                background: 'linear-gradient(90deg, #4B008F 0%, #F5007B 25%, #F5B400 50%, #008F89 75%, #690BB2 100%)'
              }} />

              {/* Header del Comunicado */}
              <div style={{ padding: '24px 28px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #EAE6F0' }}>
                <BrandLogo size={44} variant="color" subbrand="Alcaldía Municipal" />
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#4B008F', letterSpacing: '0.05em' }}>DIRECCIÓN DE COMUNICACIÓN</div>
                  <div style={{ fontSize: '0.65rem', color: '#666' }}>{folio}</div>
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 700, 
                  color: '#F5007B', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '6px'
                }}>
                  {secretaria}
                </div>

                <h2 style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: format === 'POST_INSTAGRAM' ? '1.3rem' : '1.5rem',
                  fontWeight: 900,
                  color: '#4B008F',
                  lineHeight: 1.2,
                  marginBottom: '10px'
                }}>
                  {title}
                </h2>

                <h4 style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '20px'
                }}>
                  {subtitle}
                </h4>

                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  color: '#444444',
                  flex: 1
                }}>
                  {content}
                </p>

                {/* Sello y Código QR Verificable */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: '1px dashed #DDD'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B008F' }}>{dateText}</div>
                    <div style={{ fontSize: '0.65rem', color: '#777' }}>Firma digital inmutable del Municipio de El Alto</div>
                  </div>

                  {/* QR Code Simulado Oficial */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#F8F5FC',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid #E0D6F0'
                  }}>
                    <QrCode size={32} color="#4B008F" />
                    <div style={{ fontSize: '0.6rem', color: '#4B008F', lineHeight: 1.2 }}>
                      <strong>VERIFICAR</strong><br />Documento Oficial
                    </div>
                  </div>
                </div>
              </div>

              {/* Aguayo Bottom Border */}
              <div style={{
                height: '6px',
                width: '100%',
                background: 'linear-gradient(90deg, #690BB2 0%, #008F89 25%, #F5B400 50%, #F5007B 75%, #4B008F 100%)'
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

