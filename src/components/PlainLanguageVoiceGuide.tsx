import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  BookMarked, 
  Sparkles, 
  Languages, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Volume2
} from 'lucide-react';

interface VoiceRule {
  id: string;
  category: 'Claridad' | 'Inclusión' | 'Cosmovisión Aymara' | 'Tono Ciudadano';
  bureaucratic: string;
  plainGov: string;
  explanation: string;
}

interface CulturalGlossaryItem {
  term: string;
  meaning: string;
  correctUsage: string;
  wrongUsage: string;
  category: 'Simbología' | 'Urbanismo' | 'Valores Comunitarios';
}

const VOICE_RULES: VoiceRule[] = [
  {
    id: '1',
    category: 'Claridad',
    bureaucratic: 'En virtud a la Resolución Administrativa N° 452/2026, se procede a la interdicción temporal de la vía...',
    plainGov: 'Cerramos la Av. 6 de Marzo por trabajos de asfalto desde este lunes. Conoce los desvíos habilitados.',
    explanation: 'GOV.UK Standard: Dirígete al ciudadano en primera o segunda persona activa. Evita citar números de decretos en el titular.'
  },
  {
    id: '2',
    category: 'Tono Ciudadano',
    bureaucratic: 'Los administrados que no cumplan con la presentación de la declaración jurada serán pasibles a sanciones...',
    plainGov: 'Presenta tu declaración jurada antes del 15 de marzo para evitar multas. Te ayudamos paso a paso aquí.',
    explanation: 'SF.gov Standard: El ciudadano no es un "administrado" ni un "sujeto pasivo". Es un vecino que requiere orientación clara.'
  },
  {
    id: '3',
    category: 'Cosmovisión Aymara',
    bureaucratic: 'Jornada de trabajo comunitario obligatorio entre vecinos para el aseo de aceras.',
    plainGov: 'Nos unimos en Ayni y Mink\'a por nuestra zona: Jornada comunitaria de limpieza de aceras.',
    explanation: 'Identidad Alteña: Valorar las prácticas ancestrales de reciprocidad andina respetando el significado cultural de cada concepto.'
  },
  {
    id: '4',
    category: 'Inclusión',
    bureaucratic: 'Los solicitantes de la tercera edad deben apersonarse a ventanilla 4.',
    plainGov: 'Nuestras abuelas, abuelos y personas adultas mayores tienen atención preferente y sin filas en ventanilla 4.',
    explanation: 'USWDS Plain Language: Priorizar empatía y accesibilidad para grupos de atención prioritaria.'
  }
];

const CULTURAL_GLOSSARY: CulturalGlossaryItem[] = [
  {
    term: "Jach'a Uta",
    meaning: "Casa Grande en idioma aymara. Sede oficial del Gobierno Autónomo Municipal de El Alto en la zona Libertad.",
    correctUsage: "La reunión se llevará a cabo en el auditorio de la Jach'a Uta.",
    wrongUsage: "El edificio de oficinas del municipio (Jach'a Uta debe llevar grafía oficial con apóstrofe glotil).",
    category: 'Urbanismo'
  },
  {
    term: "Ayni",
    meaning: "Principio andino de reciprocidad mutua: 'Hoy por ti, mañana por mí'.",
    correctUsage: "Trabajamos en ayni municipal para reparar los accesos vecinales.",
    wrongUsage: "Usarlo como sinónimo de transacción comercial o pago de tributos.",
    category: 'Valores Comunitarios'
  },
  {
    term: "Cholet / Neo-Andino",
    meaning: "Expresión arquitectónica identitaria alteña caracterizada por policromía, motivos tiwanakotas y salones de fiesta.",
    correctUsage: "Ruta turística y cultural de la arquitectura neo-andina de El Alto.",
    wrongUsage: "Utilizar despectivamente la palabra sin reconocer su valor patrimonial y estético.",
    category: 'Simbología'
  },
  {
    term: "Chacha-Warmi",
    meaning: "Equilibrio, complementariedad y equidad dual entre hombre y mujer en la toma de decisiones.",
    correctUsage: "Enfoque de gobernanza chacha-warmi en los consejos de desarrollo distrital.",
    wrongUsage: "Reducirlo a un simple eslogan electoral sin aplicación paritaria en la gestión.",
    category: 'Valores Comunitarios'
  },
  {
    term: "Wayna Tambo / Jisk'a",
    meaning: "Términos toponímicos y de escala urbana respetados en la nomenclatura barrial.",
    correctUsage: "Centro Cultural Wayna Tambo, Distrito 8.",
    wrongUsage: "Castellanizar o alterar la fonética de los distritos originarios.",
    category: 'Urbanismo'
  }
];

export const PlainLanguageVoiceGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VOICE_RULES' | 'GLOSSARY'>('VOICE_RULES');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');

  const filteredRules = VOICE_RULES.filter(r => {
    const matchesCat = selectedCategory === 'TODAS' || r.category === selectedCategory;
    const matchesSearch = r.plainGov.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.bureaucratic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredGlossary = CULTURAL_GLOSSARY.filter(g => {
    return g.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
           g.meaning.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Institucional */}
      <div className="ea-card" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="ea-badge ea-badge-purple" style={{ marginBottom: '10px' }}>
              Estándar GOV.UK Content Design & SF.gov Plain Language
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Guía de Lenguaje Ciudadano & Voz Cultural</h2>
            <p style={{ color: 'var(--ea-text-muted)', maxWidth: '800px', marginTop: '6px', fontSize: '0.92rem' }}>
              Pautas de redacción institucional para los 14 distritos de El Alto. Reemplazamos el lenguaje burocrático impenetrable por mensajes claros, empáticos y que honran las raíces andinas.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('VOICE_RULES')}
              className={`ea-btn ${activeTab === 'VOICE_RULES' ? 'ea-btn-primary' : 'ea-btn-secondary'}`}
              style={{ fontSize: '0.85rem' }}
            >
              <FileText size={16} />
              <span>Burocrático vs. Claro ({VOICE_RULES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('GLOSSARY')}
              className={`ea-btn ${activeTab === 'GLOSSARY' ? 'ea-btn-teal' : 'ea-btn-secondary'}`}
              style={{ fontSize: '0.85rem' }}
            >
              <Languages size={16} />
              <span>Glosario Aymara/Urbano ({CULTURAL_GLOSSARY.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Buscador y Filtros */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1,
          minWidth: '280px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--ea-border)',
          borderRadius: '10px',
          padding: '10px 16px'
        }}>
          <Search size={18} color="var(--ea-text-muted)" />
          <input
            type="text"
            placeholder={activeTab === 'VOICE_RULES' ? "Buscar por palabra clave o frase..." : "Buscar término aymara o concepto..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              width: '100%',
              outline: 'none'
            }}
          />
        </div>

        {activeTab === 'VOICE_RULES' && (
          <div style={{ display: 'flex', gap: '8px' }}>
            {['TODAS', 'Claridad', 'Inclusión', 'Cosmovisión Aymara', 'Tono Ciudadano'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border: selectedCategory === cat ? '1px solid var(--ea-secondary)' : '1px solid var(--ea-border)',
                  background: selectedCategory === cat ? 'rgba(245, 0, 123, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--ea-text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Contenido según pestaña */}
      {activeTab === 'VOICE_RULES' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {filteredRules.map(rule => (
            <div key={rule.id} className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.75rem' }}>
                  {rule.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--ea-text-muted)' }}>
                  Regla #{rule.id}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                {/* Lo Burocrático (Incorrecto) */}
                <div style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: 'rgba(255, 51, 102, 0.08)',
                  border: '1px solid rgba(255, 51, 102, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ea-red)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                    <XCircle size={16} />
                    <span>LENGUAJE BUROCRÁTICO (NO USAR)</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#FCA5A5', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "{rule.bureaucratic}"
                  </p>
                </div>

                {/* Lo Claro Ciudadano (Correcto) */}
                <div style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: 'rgba(0, 143, 137, 0.12)',
                  border: '1px solid rgba(0, 143, 137, 0.4)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ea-teal)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                    <CheckCircle2 size={16} />
                    <span>VOZ CIUDADANA ALTEÑA (RECOMENDADO)</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#E2E8F0', fontWeight: 600, lineHeight: 1.5 }}>
                    "{rule.plainGov}"
                  </p>
                </div>
              </div>

              <div style={{
                padding: '10px 16px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '0.82rem',
                color: 'var(--ea-text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={14} color="var(--ea-secondary)" />
                <span><strong>Fundamento cívico:</strong> {rule.explanation}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Pestaña Glosario Cultural */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          {filteredGlossary.map((item, idx) => (
            <div key={idx} className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ea-gold)' }}>
                  {item.term}
                </h3>
                <span className="ea-badge ea-badge-teal" style={{ fontSize: '0.72rem' }}>
                  {item.category}
                </span>
              </div>

              <p style={{ margin: 0, fontSize: '0.9rem', color: '#FFFFFF', lineHeight: 1.5 }}>
                {item.meaning}
              </p>

              <div style={{
                padding: '12px 14px',
                borderRadius: '8px',
                background: 'rgba(0, 143, 137, 0.1)',
                border: '1px solid rgba(0, 143, 137, 0.3)',
                fontSize: '0.82rem'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--ea-teal)', marginBottom: '4px' }}>✓ Uso correcto en comunicados:</div>
                <div style={{ color: 'var(--ea-text-muted)' }}>"{item.correctUsage}"</div>
              </div>

              <div style={{
                padding: '12px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 51, 102, 0.08)',
                border: '1px solid rgba(255, 51, 102, 0.25)',
                fontSize: '0.82rem'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--ea-red)', marginBottom: '4px' }}>✕ Error recurrente:</div>
                <div style={{ color: 'var(--ea-text-muted)' }}>"{item.wrongUsage}"</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
