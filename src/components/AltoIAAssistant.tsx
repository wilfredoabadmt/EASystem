import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle, 
  HelpCircle, 
  FileText, 
  Copy,
  MessageSquare
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ia';
  text: string;
  actionableSnippet?: string;
}

export const AltoIAAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ia',
      text: '¡Kamisaraki! Soy Alto IA Brand Assistant, el copiloto oficial de la Dirección de Comunicación de El Alto. Puedo ayudarte a redactar notas institucionales con tono alteño o resolver cualquier consulta del Manual de Imagen.',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let snippet = undefined;

      const lower = query.toLowerCase();
      if (lower.includes('comunicado') || lower.includes('redactar') || lower.includes('alumbrado')) {
        replyText = 'He preparado un borrador de comunicado oficial con la voz institucional del GAMEA, resaltando la cercanía ciudadana y el compromiso municipal:';
        snippet = `COMUNICADO OFICIAL\n\nEl Gobierno Autónomo Municipal de El Alto, a través de la Dirección de Obras Públicas, informa a los vecinos del Distrito 8 que desde este jueves se intensifican los trabajos de modernización del alumbrado público con tecnología LED.\n\n"Construyendo una ciudad segura y luminosa para nuestras familias."\n\nEl Alto, 29 de Septiembre de 2026\nDIRECCIÓN DE COMUNICACIÓN`;
      } else if (lower.includes('color') || lower.includes('amarillo') || lower.includes('hex')) {
        replyText = 'De acuerdo al Módulo 11 del Brand Book, el color amarillo oficial es Oro Cultura (#F5B400). Prohibido utilizar amarillos fluor o saturados al 100%. Debe mantener siempre contraste superior a 4.5:1 sobre fondo Púrpura Alteño (#4B008F).';
      } else if (lower.includes('area') || lower.includes('reserva') || lower.includes('margen')) {
        replyText = 'El área de reserva reglamentaria para el imagotipo es de 2X perimetral (donde X equivale al ancho del ápice de la pirámide central). Ningún texto ni borde puede invadir este perímetro.';
      } else {
        replyText = `Entendido. Según la normativa institucional del GAMEA, toda comunicación emitida debe llevar el sello de aval del Municipio y redactarse con solemnidad, dignidad y calidez andina. ¿Deseas que adapte este texto para redes sociales o prensa?`;
      }

      const iaMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ia',
        text: replyText,
        actionableSnippet: snippet
      };

      setMessages(prev => [...prev, iaMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '32px', height: '75vh' }}>
      {/* Quick Prompts Panel */}
      <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Sparkles size={20} color="var(--ea-secondary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Consultas Rápidas</h3>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--ea-text-muted)', marginBottom: '16px' }}>
          Selecciona una acción frecuente para que Alto IA la procese al instante:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            'Redactar comunicado de obras de alumbrado',
            '¿Cuál es el área segura mínima para el logo?',
            '¿Qué colores oficiales puedo usar en fondos?',
            'Adaptar mensaje para redes sociales de jóvenes'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--ea-border)',
                color: 'var(--ea-text-muted)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Panel */}
      <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
        {/* Messages List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '10px' }}>
          {messages.map((m) => (
            <div 
              key={m.id}
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: m.sender === 'user' ? 'linear-gradient(135deg, var(--ea-primary), var(--ea-secondary))' : 'rgba(255, 255, 255, 0.05)',
                padding: '14px 18px',
                borderRadius: '16px',
                border: m.sender === 'user' ? 'none' : '1px solid var(--ea-border)',
                fontSize: '0.9rem',
                lineHeight: 1.5
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.75rem', marginBottom: '4px', color: m.sender === 'user' ? '#FFFFFF' : 'var(--ea-teal)' }}>
                {m.sender === 'user' ? 'Tú (Funcionario)' : 'Alto IA Assistant'}
              </div>
              <p>{m.text}</p>

              {m.actionableSnippet && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '8px',
                  border: '1px solid var(--ea-border)',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  whiteSpace: 'pre-wrap',
                  position: 'relative'
                }}>
                  {m.actionableSnippet}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div style={{ alignSelf: 'flex-start', color: 'var(--ea-text-muted)', fontSize: '0.85rem' }}>
              Alto IA está pensando...
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--ea-border)' }}>
          <input 
            type="text" 
            placeholder="Pregunta sobre la marca o solicita redacción de copys..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--ea-border)',
              color: '#FFFFFF',
              fontFamily: 'inherit',
              fontSize: '0.9rem'
            }}
          />
          <button 
            onClick={() => handleSend()}
            className="ea-btn ea-btn-primary"
            style={{ padding: '0 24px' }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
