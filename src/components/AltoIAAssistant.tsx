import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw,
  Palette,
  BookOpen
} from 'lucide-react';
import { openrouterService } from '../services/openrouterService';

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
      text: '¡Kamisaraki! Soy Alto IA Brand Assistant, el copiloto oficial de la Dirección de Comunicación del Gobierno Autónomo Municipal de El Alto (GAMEA). Puedo redactar notas de prensa con tono alteño, preparar comunicados oficiales y asesorarte sobre cualquier norma del Brand Book.'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleClearChat = () => {
    if (window.confirm('¿Reiniciar la conversación con Alto IA?')) {
      setMessages([
        {
          id: Date.now().toString(),
          sender: 'ia',
          text: 'Conversación reiniciada. ¿Qué pieza gráfica, comunicado o consulta sobre la marca de El Alto deseas trabajar hoy?'
        }
      ]);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim()
    };

    const currentConvo = [...messages, userMsg];
    setMessages(currentConvo);
    setInput('');
    setIsTyping(true);

    try {
      const response = await openrouterService.sendChatCompletion(
        currentConvo.map(m => ({ sender: m.sender, text: m.text }))
      );

      const iaMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ia',
        text: response.text,
        actionableSnippet: response.snippet
      };

      setMessages(prev => [...prev, iaMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ia',
        text: `⚠️ Ocurrió un error al procesar tu mensaje: ${err.message || 'Error desconocido'}.`
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="ea-grid-assistant">
      
      {/* Panel Izquierdo: Prompts Rápidos y Lineamientos Institucionales */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Consultas Frecuentes Institucionales */}
        <div className="ea-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Sparkles size={18} color="var(--ea-secondary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Consultas Frecuentes GAMEA</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Redactar comunicado oficial sobre pavimentación en el Distrito 4',
              '¿Cuáles son los códigos HEX exactos de la paleta oficial?',
              'Crear texto para post de Facebook sobre la Feria de Salud',
              '¿Cuál es el margen de reserva obligatorio del logo?',
              'Redactar salutación protocolar por el Aniversario de El Alto',
              '¿Se puede utilizar el imagotipo sobre fondo amarillo?'
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={isTyping}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--ea-border)',
                  color: 'var(--ea-text-muted)',
                  fontSize: '0.78rem',
                  cursor: isTyping ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  lineHeight: '1.3'
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Lineamientos Rápidos de Identidad */}
        <div className="ea-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Palette size={18} color="var(--ea-gold)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Paleta Oficial Institucional</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {[
              { name: 'Púrpura', hex: '#4B008F' },
              { name: 'Rosa Rebelde', hex: '#F5007B' },
              { name: 'Turquesa', hex: '#008F89' },
              { name: 'Oro Cultura', hex: '#F5B400' }
            ].map((col, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  navigator.clipboard.writeText(col.hex);
                  alert(`Color ${col.name} (${col.hex}) copiado al portapapeles.`);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--ea-border)',
                  cursor: 'pointer'
                }}
                title="Clic para copiar código HEX"
              >
                <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: col.hex, border: '1px solid rgba(255,255,255,0.3)' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{col.hex}</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--ea-border)', paddingTop: '12px', fontSize: '0.75rem', color: 'var(--ea-text-muted)', lineHeight: '1.4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#FFFFFF', fontWeight: 700 }}>
              <BookOpen size={14} color="var(--ea-teal)" />
              <span>Tipografías Oficiales</span>
            </div>
            Titulares: <strong>Gotham / Montserrat</strong><br />
            Lectura y Cuerpo: <strong>Poppins</strong>
          </div>
        </div>

      </div>

      {/* Panel Derecho: Área Principal de Chat */}
      <div className="ea-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Cabecera del Chat */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--ea-border)',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--ea-primary), var(--ea-secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Bot size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Alto IA Brand Assistant</h3>
                <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.65rem' }}>
                  GAMEA AI
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>
                Asistente inteligente de comunicación institucional · Gobierno Autónomo Municipal de El Alto
              </span>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="ea-btn ea-btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.75rem' }}
            title="Reiniciar chat"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Mensajes del Chat */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          paddingRight: '8px'
        }}>
          {messages.map((m) => {
            const isUser = m.sender === 'user';

            return (
              <div
                key={m.id}
                style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: isUser
                    ? 'linear-gradient(135deg, var(--ea-primary), var(--ea-secondary))'
                    : 'rgba(255, 255, 255, 0.04)',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: isUser ? 'none' : '1px solid var(--ea-border)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  marginBottom: '6px',
                  color: isUser ? '#FFFFFF' : 'var(--ea-teal)'
                }}>
                  <span>{isUser ? 'Tú (Funcionario Municipal)' : 'Alto IA Assistant'}</span>
                </div>

                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {m.text}
                </div>

                {/* Snippet de Comunicado o Bloque Copiable */}
                {m.actionableSnippet && (
                  <div style={{
                    marginTop: '12px',
                    padding: '14px',
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '8px',
                    border: '1px solid var(--ea-gold)',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    whiteSpace: 'pre-wrap',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--ea-gold)', fontWeight: 700 }}>
                        BORRADOR INSTITUCIONAL GENERADO
                      </span>
                      <button
                        onClick={() => handleCopySnippet(m.actionableSnippet!, m.id)}
                        className="ea-btn ea-btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        {copiedId === m.id ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                        <span>{copiedId === m.id ? '¡Copiado!' : 'Copiar Texto'}</span>
                      </button>
                    </div>
                    {m.actionableSnippet}
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div style={{
              alignSelf: 'flex-start',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '12px 18px',
              borderRadius: '12px',
              border: '1px solid var(--ea-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--ea-text-muted)',
              fontSize: '0.85rem'
            }}>
              <RefreshCw size={14} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
              <span>Alto IA redactando respuesta institucional...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--ea-border)'
        }}>
          <input
            type="text"
            placeholder="Escribe tu solicitud o consulta institucional..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--ea-border)',
              color: '#FFFFFF',
              fontFamily: 'inherit',
              fontSize: '0.9rem'
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className="ea-btn ea-btn-primary"
            style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Send size={18} />
          </button>
        </div>

      </div>

    </div>
  );
};
