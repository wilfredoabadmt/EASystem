import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Palette, 
  Layers, 
  Cpu, 
  Building2, 
  CheckCircle, 
  ArrowRight, 
  Download, 
  Copy, 
  FileText,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BRAND_TOKENS, SECRETARIAS_MUNICIPALES, BRAND_MODULES_16 } from '../tokens/brandTokens';

interface LandingProps {
  onEnterBrandManager: () => void;
}

export const LandingPage: React.FC<LandingProps> = ({ onEnterBrandManager }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

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
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        borderBottom: '1px solid var(--ea-border)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(9, 3, 20, 0.8)'
      }}>
        <BrandLogo size={42} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#identidad" style={{ color: 'var(--ea-text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Identidad</a>
          <a href="#marca" style={{ color: 'var(--ea-text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Sistema de Marca</a>
          <a href="#tokens" style={{ color: 'var(--ea-text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Componentes</a>
          <a href="#automatizacion" style={{ color: 'var(--ea-text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Automatización</a>
          <a href="#gobierno" style={{ color: 'var(--ea-text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Gobierno Digital</a>
        </div>

        <button 
          onClick={onEnterBrandManager}
          className="ea-btn ea-btn-primary"
        >
          <span>Ingresar al Brand Manager</span>
          <ArrowRight size={18} />
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '100px 48px 80px',
        maxWidth: '1300px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div className="ea-badge ea-badge-purple" style={{ marginBottom: '24px' }}>
          <Sparkles size={14} />
          <span>Dirección de Comunicación — Alcaldía de El Alto</span>
        </div>

        <h1 style={{
          fontSize: '3.8rem',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #FFFFFF 30%, #FFAAD4 70%, #65F0EB 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          maxWidth: '1000px'
        }}>
          El Alto Digital EASYSTEM
        </h1>

        <p style={{
          fontSize: '1.35rem',
          color: 'var(--ea-text-muted)',
          maxWidth: '780px',
          marginBottom: '40px',
          fontWeight: 400
        }}>
          La identidad institucional de El Alto convertida en una plataforma inteligente. Protegemos, gobernamos y automatizamos toda la comunicación visual del Municipio.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            onClick={onEnterBrandManager}
            className="ea-btn ea-btn-primary" 
            style={{ padding: '16px 36px', fontSize: '1.05rem' }}
          >
            <ShieldCheck size={20} />
            <span>Ingresar al Brand Manager</span>
          </button>
          <a 
            href="#marca"
            className="ea-btn ea-btn-secondary" 
            style={{ padding: '16px 32px' }}
          >
            <span>Explorar Manual Interactivo</span>
          </a>
        </div>

        {/* Hero Interactive Preview Card */}
        <div style={{
          marginTop: '64px',
          width: '100%',
          maxWidth: '1100px',
          background: 'radial-gradient(ellipse at top, rgba(75, 0, 143, 0.4) 0%, rgba(21, 10, 43, 0.8) 60%, rgba(9, 3, 20, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(75, 0, 143, 0.3)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          textAlign: 'left'
        }}>
          <div className="ea-card">
            <div style={{ color: 'var(--ea-secondary)', marginBottom: '12px' }}><Layers size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Brand Architecture</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem' }}>
              Inspirado en el NYC Design System. Unifica la Marca Madre y las 12 secretarías sin dispersión visual.
            </p>
          </div>
          <div className="ea-card">
            <div style={{ color: 'var(--ea-teal)', marginBottom: '12px' }}><Sliders size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Motor Automático</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem' }}>
              Generación de comunicados oficiales con QR, afiches y redes respetando retículas y márgenes obligatorios.
            </p>
          </div>
          <div className="ea-card">
            <div style={{ color: 'var(--ea-gold)', marginBottom: '12px' }}><Cpu size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Alto IA Validator</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem' }}>
              Auditoría en tiempo real. Detección de distorsión geométrica y cálculo automático de Brand Score (0-100%).
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN A: IDENTIDAD DE CIUDAD */}
      <section id="identidad" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="ea-badge ea-badge-pink" style={{ marginBottom: '12px' }}>Pilar Cultural</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>A. Identidad de Ciudad & Concepto del Aguayo</h2>
          <p style={{ color: 'var(--ea-text-muted)', maxWidth: '650px', margin: '12px auto 0' }}>
            El coraje histórico de El Alto fusionado con su vibrante cosmovisión y el poderío del tejido andino.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div className="ea-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#FFAAD4' }}>La Fuerza de Nuestra Historia</h3>
            <p style={{ color: 'var(--ea-text-muted)', marginBottom: '16px' }}>
              El Alto no se rinde ni se detiene. Es la metrópoli más joven y productiva de Bolivia. Desde la cumbre andina, nuestro pueblo impulsa el comercio, la industria y la dignidad de toda la nación.
            </p>
            <p style={{ color: 'var(--ea-text-muted)', marginBottom: '24px' }}>
              EASystem convierte ese legado en un sistema vivo: cada línea geométrica proviene de la arquitectura andina contemporánea (los afamados cholets) y la solidez de nuestra gente.
            </p>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ea-teal)' }}>+1.1M</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Habitantes alteños</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ea-gold)' }}>4.070m</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Sobre el nivel del mar</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ea-secondary)' }}>100%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>Soberanía visual</div>
              </div>
            </div>
          </div>

          <div className="ea-card" style={{ padding: '36px', background: 'linear-gradient(145deg, rgba(75, 0, 143, 0.4) 0%, rgba(245, 0, 123, 0.15) 100%)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#65F0EB' }}>El Aguayo como Fibra Digital</h3>
            <p style={{ color: 'var(--ea-text-muted)', marginBottom: '20px' }}>
              En la cosmovisión aymara, el aguayo no es adorno: es un libro textil donde se tejen pactos comunitarios, caminos y linajes.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={18} color="var(--ea-teal)" />
                <span style={{ fontSize: '0.9rem' }}><strong>Trama y Urdimbre:</strong> Interoperabilidad entre secretarías municipales.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={18} color="var(--ea-gold)" />
                <span style={{ fontSize: '0.9rem' }}><strong>Franjas de Color:</strong> Púrpura, Rosa, Turquesa y Oro como código cromático unificado.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={18} color="var(--ea-secondary)" />
                <span style={{ fontSize: '0.9rem' }}><strong>Resistencia Textil:</strong> Comunicación blindada contra la improvisación y el fraude.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN B: SISTEMA DE MARCA */}
      <section id="marca" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="ea-badge ea-badge-teal" style={{ marginBottom: '12px' }}>Normativa Gráfica</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>B. Sistema de Marca & Aplicaciones</h2>
          <p style={{ color: 'var(--ea-text-muted)', maxWidth: '650px', margin: '12px auto 0' }}>
            Construcción geométrica, área segura y versiones oficiales del imagotipo del GAMEA.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {/* Versión Color Principal */}
          <div className="ea-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px' }}>
            <div style={{ padding: '30px', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <BrandLogo size={60} variant="color" />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Versión Cromática Oficial</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--ea-text-muted)', textAlign: 'center' }}>
              Para uso sobre fondos oscuros institucionales o piezas de alta visibilidad.
            </p>
          </div>

          {/* Versión Positiva Fondo Blanco */}
          <div className="ea-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px' }}>
            <div style={{ padding: '30px', background: '#FFFFFF', borderRadius: '16px', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <BrandLogo size={60} variant="color" />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Versión Sobre Blanco</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--ea-text-muted)', textAlign: 'center' }}>
              Para papelería membretada, notas oficiales y publicaciones impresas.
            </p>
          </div>

          {/* Versión Monocromo / Negativa */}
          <div className="ea-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px' }}>
            <div style={{ padding: '30px', background: 'var(--ea-primary)', borderRadius: '16px', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <BrandLogo size={60} variant="white" />
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Versión Negativa (Blanco Puro)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--ea-text-muted)', textAlign: 'center' }}>
              Para fondos fotográficos complejos, serigrafía y grabado de merchandising.
            </p>
          </div>
        </div>

        {/* Área Segura & Retícula */}
        <div style={{ marginTop: '32px', padding: '28px', background: 'rgba(75, 0, 143, 0.15)', border: '1px dashed var(--ea-teal)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ color: 'var(--ea-teal)', fontSize: '1.1rem', marginBottom: '4px' }}>Área de Reserva Obligatoria: Regla '2X'</h4>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem' }}>
              Ningún elemento gráfico, titular o borde puede colocarse a una distancia menor a dos módulos del imagotipo.
            </p>
          </div>
          <button onClick={onEnterBrandManager} className="ea-btn ea-btn-secondary" style={{ flexShrink: 0 }}>
            <span>Ver Retícula en Brand Book</span>
          </button>
        </div>
      </section>

      {/* SECCIÓN C: COMPONENTES DIGITALES (DESIGN TOKENS) */}
      <section id="tokens" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="ea-badge ea-badge-purple" style={{ marginBottom: '12px' }}>Design Tokens</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>C. Componentes Digitales & Paleta Oficial</h2>
          <p style={{ color: 'var(--ea-text-muted)', maxWidth: '650px', margin: '12px auto 0' }}>
            Variables normalizadas en formato W3C para consumo en web, aplicaciones y diseño editorial.
          </p>
        </div>

        {/* Selector interactivo de colores */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '48px' }}>
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
              style={{ padding: '16px', cursor: 'pointer', textAlign: 'center' }}
              onClick={() => copyToClipboard(c.hex, c.name)}
            >
              <div style={{
                height: '80px',
                borderRadius: '10px',
                background: c.hex,
                marginBottom: '12px',
                boxShadow: `0 8px 20px ${c.hex}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Copy size={20} opacity={0.8} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.name}</div>
              <div style={{ color: 'var(--ea-text-muted)', fontSize: '0.8rem', marginBottom: '6px' }}>{c.role}</div>
              <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', color: '#FFAAD4' }}>
                {copiedColor === c.name ? '¡Copiado!' : c.hex}
              </code>
            </div>
          ))}
        </div>

        {/* Tipografías Oficiales */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="ea-card">
            <span className="ea-badge ea-badge-purple" style={{ marginBottom: '12px' }}>Tipografía Primaria</span>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
              Gotham / Montserrat
            </h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Geométrica, sólida y rotunda. Destinada a titulares, logotipos, portadas de memorándums y letreros metropolitanos.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
              EL ALTO DE PIE: GOBIERNO AUTÓNOMO MUNICIPAL 2026
            </div>
          </div>

          <div className="ea-card">
            <span className="ea-badge ea-badge-teal" style={{ marginBottom: '12px' }}>Tipografía Secundaria</span>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.8rem', fontWeight: 600, marginBottom: '8px' }}>
              Poppins
            </h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Cálida, legible y contemporánea. Diseñada para textos largos, interfaces de usuario, comunicados oficiales y redes.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: "'Poppins', sans-serif" }}>
              Construyendo una ciudad con mayor conectividad, salud digna y educación tecnológica para la juventud.
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN D: AUTOMATIZACIÓN */}
      <section id="automatizacion" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(180deg, rgba(245, 0, 123, 0.08) 0%, rgba(75, 0, 143, 0.05) 100%)', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="ea-badge ea-badge-pink" style={{ marginBottom: '12px' }}>Productividad Municipal</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>D. Automatización de Materiales Gráficos</h2>
          <p style={{ color: 'var(--ea-text-muted)', maxWidth: '700px', margin: '12px auto 0', fontSize: '1.1rem' }}>
            "Genera piezas institucionales respetando automáticamente la marca."
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            { title: 'Comunicados Oficiales', desc: 'Con código QR inmutable de validación y folio municipal.', icon: FileText },
            { title: 'Posts para Redes', desc: 'Formatos 1080x1080 y Stories 1080x1920 con retícula fija.', icon: Layers },
            { title: 'Afiches de Prensa', desc: 'Archivos en alta resolución 300 DPI con marcas de corte.', icon: Sliders },
            { title: 'Credenciales de Prensa', desc: 'Identificación oficial para eventos y funcionarios.', icon: ShieldCheck },
          ].map((item, idx) => (
            <div key={idx} className="ea-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--ea-secondary)', marginBottom: '12px' }}>
                <item.icon size={28} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{item.title}</h4>
              <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.85rem', flex: 1 }}>{item.desc}</p>
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
                  cursor: 'pointer'
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
      <section id="gobierno" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div className="ea-badge ea-badge-teal" style={{ marginBottom: '16px' }}>Visión Estratégica</div>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '20px' }}>
          E. Gobierno Digital para la Ciudad de El Alto
        </h2>
        <p style={{
          fontSize: '1.4rem',
          color: 'var(--ea-text-muted)',
          maxWidth: '850px',
          margin: '0 auto 40px',
          fontWeight: 400
        }}>
          "Una ciudad conectada, organizada y preparada para el futuro."
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          textAlign: 'left'
        }}>
          <div className="ea-card">
            <h3 style={{ color: '#FFAAD4', fontSize: '1.25rem', marginBottom: '12px' }}>Identidad Soberana</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem' }}>
              Software 100% autogestionado en servidores propios. Ni un solo dato de los ciudadanos o de la imagen pública depende de plataformas corporativas foráneas.
            </p>
          </div>
          <div className="ea-card">
            <h3 style={{ color: '#65F0EB', fontSize: '1.25rem', marginBottom: '12px' }}>Agilidad en Crisis</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem' }}>
              Reducción del tiempo de respuesta comunicacional ante emergencias de horas a solo minutos, con verificación en vivo y respaldo en un solo clic.
            </p>
          </div>
          <div className="ea-card">
            <h3 style={{ color: '#FFD768', fontSize: '1.25rem', marginBottom: '12px' }}>Transparencia Total</h3>
            <p style={{ color: 'var(--ea-text-muted)', fontSize: '0.9rem' }}>
              Criptografía ligera y auditoría inmutable en cada pieza emitida. Los alteños sabrán con certeza si un anuncio proviene realmente de su Alcaldía.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN F: ACCESO AL SISTEMA (CALL TO ACTION) */}
      <section style={{
        padding: '80px 48px 120px',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(75, 0, 143, 0.7) 0%, rgba(245, 0, 123, 0.4) 100%)',
          border: '1px solid rgba(245, 0, 123, 0.5)',
          borderRadius: '24px',
          padding: '60px 40px',
          boxShadow: '0 20px 60px rgba(75, 0, 143, 0.5)'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px' }}>
            Acceso al Ecosistema Digital
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 32px' }}>
            Plataforma reservada para autoridades, secretarías, diseñadores institucionales y proveedores autorizados del GAMEA.
          </p>
          <button 
            onClick={onEnterBrandManager}
            className="ea-btn ea-btn-primary" 
            style={{ padding: '18px 48px', fontSize: '1.15rem' }}
          >
            <span>Ingresar al Brand Manager</span>
            <ArrowRight size={22} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--ea-border)',
        padding: '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.85rem',
        color: 'var(--ea-text-muted)',
        background: 'rgba(9, 3, 20, 0.95)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
