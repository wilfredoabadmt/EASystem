import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Cpu, 
  CheckCircle, 
  ArrowRight, 
  Copy, 
  FileText,
  Sliders,
  Menu,
  X
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface LandingProps {
  onEnterBrandManager: () => void;
}

export const LandingPage: React.FC<LandingProps> = ({ onEnterBrandManager }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyToClipboard = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Banner de Aguayo */}
      <div className="ea-aguayo-bar" />

      {/* Navigation Header */}
      <nav className="ea-landing-nav">
        <BrandLogo size={38} />

        <div className="ea-landing-nav-links">
          <a href="#identidad">Identidad</a>
          <a href="#marca">Sistema de Marca</a>
          <a href="#tokens">Componentes</a>
          <a href="#automatizacion">Automatización</a>
          <a href="#gobierno">Gobierno Digital</a>
        </div>

        <div className="ea-landing-nav-actions">
          <button 
            onClick={onEnterBrandManager}
            className="ea-btn ea-btn-primary"
            style={{ padding: '9px 18px', fontSize: '0.88rem' }}
          >
            <span>Ingresar</span>
            <ArrowRight size={16} />
          </button>

          <button 
            className="ea-landing-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú de Navegación"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`ea-landing-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#identidad" onClick={() => setMobileMenuOpen(false)}>A. Identidad de Ciudad & Aguayo</a>
        <a href="#marca" onClick={() => setMobileMenuOpen(false)}>B. Sistema de Marca</a>
        <a href="#tokens" onClick={() => setMobileMenuOpen(false)}>C. Tokens & Paleta Oficial</a>
        <a href="#automatizacion" onClick={() => setMobileMenuOpen(false)}>D. Automatización</a>
        <a href="#gobierno" onClick={() => setMobileMenuOpen(false)}>E. Gobierno Digital</a>
        <button 
          onClick={() => { setMobileMenuOpen(false); onEnterBrandManager(); }}
          className="ea-btn ea-btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '14px' }}
        >
          <ShieldCheck size={18} />
          <span>Ingresar al Brand Manager</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="ea-landing-hero">
        <div className="ea-badge ea-badge-purple" style={{ marginBottom: '20px' }}>
          <Sparkles size={14} />
          <span>Dirección de Comunicación — GAMEA</span>
        </div>

        <h1>
          El Alto Digital EASYSTEM
        </h1>

        <p className="lead">
          La identidad institucional de El Alto convertida en una plataforma inteligente. Protegemos, gobernamos y automatizamos toda la comunicación visual del Municipio.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            onClick={onEnterBrandManager}
            className="ea-btn ea-btn-primary" 
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            <ShieldCheck size={18} />
            <span>Ingresar al Brand Manager</span>
          </button>
          <a 
            href="#marca"
            className="ea-btn ea-btn-secondary" 
            style={{ padding: '14px 24px', fontSize: '0.95rem' }}
          >
            <span>Explorar Manual Interactivo</span>
          </a>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="ea-landing-hero-card">
          <div className="ea-card">
            <div style={{ color: 'var(--ea-secondary)', marginBottom: '12px' }}><Layers size={28} /></div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Brand Architecture</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Inspirado en el NYC Design System. Unifica la Marca Madre y las 12 secretarías sin dispersión visual.
            </p>
          </div>
          <div className="ea-card">
            <div style={{ color: 'var(--ea-teal)', marginBottom: '12px' }}><Sliders size={28} /></div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Motor Automático</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Generación de comunicados oficiales con QR, afiches y redes respetando retículas y márgenes obligatorios.
            </p>
          </div>
          <div className="ea-card">
            <div style={{ color: 'var(--ea-gold)', marginBottom: '12px' }}><Cpu size={28} /></div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Alto IA Validator</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Auditoría en tiempo real. Detección de distorsión geométrica y cálculo automático de Brand Score (0-100%).
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN A: IDENTIDAD DE CIUDAD */}
      <section id="identidad" className="ea-landing-section">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="ea-badge ea-badge-pink" style={{ marginBottom: '12px' }}>Pilar Cultural</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>A. Identidad de Ciudad & Concepto del Aguayo</h2>
          <p style={{ color: 'var(--ea-text-muted)', maxWidth: '650px', margin: '12px auto 0' }}>
            El coraje histórico de El Alto fusionado con su vibrante cosmovisión y el poderío del tejido andino.
          </p>
        </div>

        <div className="ea-landing-grid-2">
          <div className="ea-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '14px', color: '#FFAAD4' }}>La Fuerza de Nuestra Historia</h3>
            <p style={{ color: 'var(--ea-text-muted)', marginBottom: '14px', lineHeight: 1.6 }}>
              El Alto no se rinde ni se detiene. Es la metrópoli más joven y productiva de Bolivia. Desde la cumbre andina, nuestro pueblo impulsa el comercio, la industria y la dignidad de toda la nación.
            </p>
            <p style={{ color: 'var(--ea-text-muted)', marginBottom: '22px', lineHeight: 1.6 }}>
              EASystem convierte ese legado en un sistema vivo: cada línea geométrica proviene de la arquitectura andina contemporánea (los afamados cholets) y la solidez de nuestra gente.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '10px', flex: '1 1 80px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ea-teal)' }}>+1.1M</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ea-text-muted)' }}>Habitantes alteños</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '10px', flex: '1 1 80px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ea-gold)' }}>4.070m</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ea-text-muted)' }}>Sobre nivel del mar</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '10px', flex: '1 1 80px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ea-secondary)' }}>100%</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ea-text-muted)' }}>Soberanía visual</div>
              </div>
            </div>
          </div>

          <div className="ea-card" style={{ padding: '32px', background: 'linear-gradient(145deg, rgba(75, 0, 143, 0.4) 0%, rgba(245, 0, 123, 0.15) 100%)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '14px', color: '#65F0EB' }}>El Aguayo como Fibra Digital</h3>
            <p style={{ color: 'var(--ea-text-muted)', marginBottom: '18px', lineHeight: 1.6 }}>
              En la cosmovisión aymara, el aguayo no es adorno: es un libro textil donde se tejen pactos comunitarios, caminos y linajes.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={18} color="var(--ea-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem' }}><strong>Trama y Urdimbre:</strong> Interoperabilidad entre secretarías municipales.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={18} color="var(--ea-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem' }}><strong>Franjas de Color:</strong> Púrpura, Rosa, Turquesa y Oro como código cromático unificado.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={18} color="var(--ea-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem' }}><strong>Resistencia Textil:</strong> Comunicación blindada contra la improvisación y el fraude.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN B: SISTEMA DE MARCA */}
      <section id="marca" className="ea-landing-section" style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="ea-badge ea-badge-teal" style={{ marginBottom: '12px' }}>Normativa Gráfica</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>B. Sistema de Marca & Aplicaciones</h2>
          <p style={{ color: 'var(--ea-text-muted)', maxWidth: '650px', margin: '12px auto 0' }}>
            Construcción geométrica, área segura y versiones oficiales del imagotipo del GAMEA.
          </p>
        </div>

        <div className="ea-landing-grid-3">
          {/* Versión Color Principal */}
          <div className="ea-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 20px' }}>
            <div style={{ padding: '24px', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <BrandLogo size={56} variant="color" />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Versión Cromática Oficial</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--ea-text-muted)', textAlign: 'center' }}>
              Para uso sobre fondos oscuros institucionales o piezas de alta visibilidad.
            </p>
          </div>

          {/* Versión Positiva Fondo Blanco */}
          <div className="ea-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 20px' }}>
            <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: '16px', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <BrandLogo size={56} variant="color" />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Versión Sobre Blanco</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--ea-text-muted)', textAlign: 'center' }}>
              Para papelería membretada, notas oficiales y publicaciones impresas.
            </p>
          </div>

          {/* Versión Monocromo / Negativa */}
          <div className="ea-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 20px' }}>
            <div style={{ padding: '24px', background: 'var(--ea-primary)', borderRadius: '16px', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <BrandLogo size={56} variant="white" />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Versión Negativa (Blanco Puro)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--ea-text-muted)', textAlign: 'center' }}>
              Para fondos fotográficos complejos, serigrafía y grabado de merchandising.
            </p>
          </div>
        </div>

        {/* Área Segura & Retícula */}
        <div className="ea-landing-area-box">
          <div>
            <h4 style={{ color: 'var(--ea-teal)', fontSize: '1.05rem', marginBottom: '4px' }}>Área de Reserva Obligatoria: Regla '2X'</h4>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.88rem' }}>
              Ningún elemento gráfico, titular o borde puede colocarse a una distancia menor a dos módulos del imagotipo.
            </p>
          </div>
          <button onClick={onEnterBrandManager} className="ea-btn ea-btn-secondary" style={{ flexShrink: 0 }}>
            <span>Ver Retícula en Brand Book</span>
          </button>
        </div>
      </section>

      {/* SECCIÓN C: COMPONENTES DIGITALES (DESIGN TOKENS) */}
      <section id="tokens" className="ea-landing-section">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="ea-badge ea-badge-purple" style={{ marginBottom: '12px' }}>Design Tokens</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>C. Componentes Digitales & Paleta Oficial</h2>
          <p style={{ color: 'var(--ea-text-muted)', maxWidth: '650px', margin: '12px auto 0' }}>
            Variables normalizadas en formato W3C para consumo en web, aplicaciones y diseño editorial.
          </p>
        </div>

        {/* Selector interactivo de colores */}
        <div className="ea-landing-grid-palette">
          {[
            { name: 'Púrpura Alteño', hex: '#4B008F', role: 'Color Primario', token: 'brand.primaryPurple' },
            { name: 'Rosa Rebelde', hex: '#F5007B', role: 'Fuerza & Juventud', token: 'brand.secondaryPink' },
            { name: 'Turquesa Integración', hex: '#008F89', role: 'Futuro & Salud', token: 'brand.tealFuture' },
            { name: 'Oro Cultura', hex: '#F5B400', role: 'Sol Andino & Riqueza', token: 'brand.goldCulture' },
            { name: 'Púrpura Profundo', hex: '#690BB2', role: 'Jerarquía Noble', token: 'brand.purpleDeep' },
          ].map((c) => (
            <div 
              key={c.hex} 
              className="ea-card" 
              style={{ padding: '14px', cursor: 'pointer', textAlign: 'center' }}
              onClick={() => copyToClipboard(c.hex, c.name)}
            >
              <div style={{
                height: '70px',
                borderRadius: '10px',
                background: c.hex,
                marginBottom: '10px',
                boxShadow: `0 8px 18px ${c.hex}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Copy size={18} opacity={0.85} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.name}</div>
              <div style={{ color: 'var(--ea-text-muted)', fontSize: '0.75rem', marginBottom: '6px' }}>{c.role}</div>
              <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', color: '#FFAAD4' }}>
                {copiedColor === c.name ? '¡Copiado!' : c.hex}
              </code>
            </div>
          ))}
        </div>

        {/* Tipografías Oficiales */}
        <div className="ea-landing-grid-2">
          <div className="ea-card">
            <span className="ea-badge ea-badge-purple" style={{ marginBottom: '10px' }}>Tipografía Primaria</span>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
              Gotham / Montserrat
            </h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.88rem', marginBottom: '14px', lineHeight: 1.5 }}>
              Geométrica, sólida y rotunda. Destinada a titulares, logotipos, portadas de memorándums y letreros metropolitanos.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '8px', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.9rem' }}>
              EL ALTO DE PIE: GOBIERNO AUTÓNOMO MUNICIPAL 2026
            </div>
          </div>

          <div className="ea-card">
            <span className="ea-badge ea-badge-teal" style={{ marginBottom: '10px' }}>Tipografía Secundaria</span>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>
              Poppins
            </h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.88rem', marginBottom: '14px', lineHeight: 1.5 }}>
              Cálida, legible y contemporánea. Diseñada para textos largos, interfaces de usuario, comunicados oficiales y redes.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '8px', fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
              Construyendo una ciudad con mayor conectividad, salud digna y educación tecnológica para la juventud.
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN D: AUTOMATIZACIÓN */}
      <section id="automatizacion" className="ea-landing-section" style={{ background: 'linear-gradient(180deg, rgba(245, 0, 123, 0.08) 0%, rgba(75, 0, 143, 0.05) 100%)', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="ea-badge ea-badge-pink" style={{ marginBottom: '12px' }}>Productividad Municipal</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>D. Automatización de Materiales Gráficos</h2>
          <p style={{ color: 'var(--ea-text-muted)', maxWidth: '700px', margin: '12px auto 0', fontSize: '1.05rem' }}>
            "Genera piezas institucionales respetando automáticamente la marca."
          </p>
        </div>

        <div className="ea-landing-grid-4">
          {[
            { title: 'Comunicados Oficiales', desc: 'Con código QR inmutable de validación y folio municipal.', icon: FileText },
            { title: 'Posts para Redes', desc: 'Formatos 1080x1080 y Stories 1080x1920 con retícula fija.', icon: Layers },
            { title: 'Afiches de Prensa', desc: 'Archivos en alta resolución 300 DPI con marcas de corte.', icon: Sliders },
            { title: 'Credenciales de Prensa', desc: 'Identificación oficial para eventos y funcionarios.', icon: ShieldCheck },
          ].map((item, idx) => (
            <div key={idx} className="ea-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--ea-secondary)', marginBottom: '12px' }}>
                <item.icon size={26} />
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>{item.title}</h4>
              <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.85rem', flex: 1, lineHeight: 1.5 }}>{item.desc}</p>
              <button 
                onClick={onEnterBrandManager}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ea-teal)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '16px',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <span>Generar ahora</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN E: GOBIERNO DIGITAL */}
      <section id="gobierno" className="ea-landing-section" style={{ textAlign: 'center' }}>
        <div className="ea-badge ea-badge-teal" style={{ marginBottom: '14px' }}>Visión Estratégica</div>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '16px' }}>
          E. Gobierno Digital para la Ciudad de El Alto
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--ea-text-muted)',
          maxWidth: '850px',
          margin: '0 auto 36px',
          fontWeight: 400
        }}>
          "Una ciudad conectada, organizada y preparada para el futuro."
        </p>

        <div className="ea-landing-grid-3" style={{ textAlign: 'left' }}>
          <div className="ea-card">
            <h3 style={{ color: '#FFAAD4', fontSize: '1.2rem', marginBottom: '10px' }}>Identidad Soberana</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Software 100% autogestionado en servidores propios. Ni un solo dato de los ciudadanos o de la imagen pública depende de plataformas corporativas foráneas.
            </p>
          </div>
          <div className="ea-card">
            <h3 style={{ color: '#65F0EB', fontSize: '1.2rem', marginBottom: '10px' }}>Agilidad en Crisis</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Reducción del tiempo de respuesta comunicacional ante emergencias de horas a solo minutos, con verificación en vivo y respaldo en un solo clic.
            </p>
          </div>
          <div className="ea-card">
            <h3 style={{ color: '#FFD768', fontSize: '1.2rem', marginBottom: '10px' }}>Transparencia Total</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Criptografía ligera y auditoría inmutable en cada pieza emitida. Los alteños sabrán con certeza si un anuncio proviene realmente de su Alcaldía.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN F: ACCESO AL SISTEMA (CALL TO ACTION) */}
      <section style={{
        padding: '60px 20px 80px',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div className="ea-landing-cta-banner">
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '14px' }}>
            Acceso al Ecosistema Digital
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Plataforma reservada para autoridades, secretarías, diseñadores institucionales y proveedores autorizados del GAMEA.
          </p>
          <button 
            onClick={onEnterBrandManager}
            className="ea-btn ea-btn-primary" 
            style={{ padding: '16px 40px', fontSize: '1.08rem' }}
          >
            <span>Ingresar al Brand Manager</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="ea-landing-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <BrandLogo size={28} />
          <span>© 2026 Gobierno Autónomo Municipal de El Alto — Dirección de Comunicación</span>
        </div>
        <div>
          <span>EL ALTO DIGITAL EASYSTEM v1.0.0 (SDD Compliant)</span>
        </div>
      </footer>
    </div>
  );
};
