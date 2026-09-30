import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Settings, 
  Copy, 
  Check, 
  Trash2, 
  Key, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  RefreshCw,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { 
  openrouterService, 
  FREE_OPENROUTER_MODELS, 
  OpenRouterModelOption 
} from '../services/openrouterService';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ia';
  text: string;
  modelUsed?: string;
  actionableSnippet?: string;
}

export const AltoIAAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ia',
      text: '¡Kamisaraki! Soy Alto IA Brand Assistant, el copiloto oficial de la Dirección de Comunicación del Gobierno Autónomo Municipal de El Alto (GAMEA). Conectado a los modelos gratuitos de OpenRouter, puedo redactar notas de prensa con tono alteño, preparar comunicados oficiales y asesorarte sobre cualquier norma del Brand Book.',
      modelUsed: 'OpenRouter Free Gateway'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(openrouterService.getSelectedModel());
  
  // Modal de configuración de API Key
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const key = openrouterService.getApiKey();
    setHasApiKey(Boolean(key));
    if (key) {
      setApiKeyInput(key);
    }
  }, []);

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    openrouterService.saveSelectedModel(modelId);
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      openrouterService.saveApiKey(apiKeyInput.trim());
      setHasApiKey(true);
      setShowConfigModal(false);
    }
  };

  const handleClearApiKey = () => {
    openrouterService.clearApiKey();
    setApiKeyInput('');
    setHasApiKey(false);
  };

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
          text: 'Conversación reiniciada. ¿Qué pieza gráfica, comunicado o consulta sobre la marca de El Alto deseas trabajar hoy?',
          modelUsed: selectedModel
        }
      ]);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    if (!hasApiKey) {
      setShowConfigModal(true);
      return;
    }

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
        currentConvo.map(m => ({ sender: m.sender, text: m.text })),
        selectedModel
      );

      const iaMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ia',
        text: response.text,
        actionableSnippet: response.snippet,
        modelUsed: selectedModel
      };

      setMessages(prev => [...prev, iaMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ia',
        text: `⚠️ Ocurrió un error al procesar tu mensaje: ${err.message || 'Error desconocido'}.`,
        modelUsed: selectedModel
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const activeModelMeta = FREE_OPENROUTER_MODELS.find(m => m.id === selectedModel) || FREE_OPENROUTER_MODELS[0];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '28px', minHeight: '80vh' }}>
      
      {/* Panel Izquierdo: Prompts Rápidos y Modelos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Selector de Modelo OpenRouter */}
        <div className="ea-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="var(--ea-teal)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Modelo OpenRouter</span>
            </div>
            <span className="ea-badge ea-badge-teal" style={{ fontSize: '0.65rem' }}>
              GRATUITO
            </span>
          </div>

          <select
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid var(--ea-border)',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {FREE_OPENROUTER_MODELS.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.provider})
              </option>
            ))}
          </select>

          <p style={{ margin: '8px 0 0 0', fontSize: '0.75rem', color: 'var(--ea-text-muted)', lineHeight: '1.4' }}>
            {activeModelMeta.description}
          </p>

          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--ea-text-muted)' }}>
            <span>Contexto: <strong>{activeModelMeta.contextLength}</strong></span>
            <span style={{ color: 'var(--ea-gold)', fontWeight: 700 }}>{activeModelMeta.badge}</span>
          </div>
        </div>

        {/* Estado de la API Key */}
        <div className="ea-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} color={hasApiKey ? 'var(--ea-teal)' : 'var(--ea-gold)'} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>OpenRouter API</span>
            </div>
            {hasApiKey ? (
              <span className="ea-badge ea-badge-teal" style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={10} /> CONECTADO
              </span>
            ) : (
              <span className="ea-badge ea-badge-gold" style={{ fontSize: '0.65rem' }}>
                REQUIERE CLAVE
              </span>
            )}
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)', margin: '8px 0 12px 0' }}>
            {hasApiKey 
              ? 'Clave configurada. Las consultas se envían en vivo a la API gratuita de OpenRouter.' 
              : 'Configura tu clave personal de OpenRouter para activar los modelos gratuitos en tiempo real.'}
          </p>

          <button
            onClick={() => setShowConfigModal(true)}
            className={`ea-btn ${hasApiKey ? 'ea-btn-secondary' : 'ea-btn-primary'}`}
            style={{ width: '100%', fontSize: '0.8rem', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <Settings size={14} />
            <span>{hasApiKey ? 'Administrar API Key' : 'Ingresar API Key Gratuita'}</span>
          </button>
        </div>

        {/* Prompts Rápidos Institucionales */}
        <div className="ea-card" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={18} color="var(--ea-secondary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Consultas Frecuentes GAMEA</span>
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
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--ea-border)',
                  color: 'var(--ea-text-muted)',
                  fontSize: '0.75rem',
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
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--ea-primary), var(--ea-secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Bot size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Alto IA Brand Assistant</h3>
                <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.65rem' }}>
                  GAMEA AI
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--ea-text-muted)' }}>
                Modelo activo: <strong style={{ color: 'var(--ea-teal)' }}>{activeModelMeta.name}</strong>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleClearChat}
              className="ea-btn ea-btn-secondary"
              style={{ padding: '8px 12px', fontSize: '0.75rem' }}
              title="Reiniciar chat"
            >
              <Trash2 size={14} />
            </button>
          </div>
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
                  {!isUser && m.modelUsed && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--ea-text-muted)', fontWeight: 400 }}>
                      {m.modelUsed.split('/')[1] || m.modelUsed}
                    </span>
                  )}
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
              <span>Alto IA procesando con <strong>{activeModelMeta.name}</strong>...</span>
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
            placeholder={hasApiKey ? 'Escribe tu solicitud o consulta institucional...' : '⚠️ Ingresa tu API Key de OpenRouter para comenzar...'}
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

      {/* Modal: Configuración OpenRouter API Key */}
      {showConfigModal && (
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
            maxWidth: '560px',
            padding: '28px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--ea-border)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Key size={22} color="var(--ea-gold)" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Configuración de OpenRouter API</h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveApiKey} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ea-text-muted)' }}>
                  OPENROUTER API KEY:
                </label>
                <input
                  type="password"
                  placeholder="sk-or-v1-..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--ea-border)',
                    color: '#FFFFFF',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    marginTop: '6px'
                  }}
                />
              </div>

              <div style={{
                background: 'rgba(0, 143, 137, 0.1)',
                border: '1px solid rgba(0, 143, 137, 0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.8rem',
                color: 'var(--ea-text-muted)',
                lineHeight: '1.4'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--ea-teal)', marginBottom: '4px' }}>
                  ¿Cómo obtener tu clave gratuita en 1 minuto?
                </div>
                1. Ingresa a <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" style={{ color: 'var(--ea-secondary)', fontWeight: 700 }}>openrouter.ai/keys</a>.<br />
                2. Haz clic en <strong>"Create Key"</strong>.<br />
                3. Pega la clave aquí. Podrás utilizar modelos de primer nivel con el sufijo <code>:free</code> sin ningún costo.
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--ea-border)', paddingTop: '16px' }}>
                {hasApiKey ? (
                  <button
                    type="button"
                    onClick={handleClearApiKey}
                    className="ea-btn ea-btn-secondary"
                    style={{ color: '#EF4444', fontSize: '0.8rem' }}
                  >
                    Eliminar Clave
                  </button>
                ) : <div />}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowConfigModal(false)}
                    className="ea-btn ea-btn-secondary"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="ea-btn ea-btn-primary"
                    style={{ padding: '10px 20px', fontWeight: 800 }}
                  >
                    Guardar Clave
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
