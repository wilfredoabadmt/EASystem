// =============================================================================
// EL ALTO DIGITAL EASYSTEM (EASystem)
// OpenRouter AI Service — Modelos Gratuitos para Alto IA Brand Assistant
// =============================================================================

export interface OpenRouterModelOption {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextLength: string;
  badge: string;
}

export const FREE_OPENROUTER_MODELS: OpenRouterModelOption[] = [
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B Instruct (Free)',
    provider: 'Meta',
    description: 'Excelente para redacción institucional, notas de prensa y comunicados oficiales con tono alteño.',
    contextLength: '128k',
    badge: 'Recomendado'
  },
  {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek R1 (Free)',
    provider: 'DeepSeek',
    description: 'Modelo de razonamiento profundo. Ideal para consultas complejas sobre normativas del Brand Book.',
    contextLength: '64k',
    badge: 'Razonamiento'
  },
  {
    id: 'google/gemini-2.0-flash-lite-preview-02-05:free',
    name: 'Gemini 2.0 Flash Lite (Free)',
    provider: 'Google',
    description: 'Velocidad ultra-rápida. Perfecto para respuestas instantáneas de copy y redes sociales.',
    contextLength: '1M',
    badge: 'Ultra Rápido'
  },
  {
    id: 'qwen/qwen-2.5-coder-32b-instruct:free',
    name: 'Qwen 2.5 Coder 32B (Free)',
    provider: 'Alibaba Cloud',
    description: 'Especializado en estructura técnica, tokens CSS, código SVG y formatos estructurados.',
    contextLength: '32k',
    badge: 'Técnico'
  },
  {
    id: 'mistralai/mistral-small-24b-instruct-2501:free',
    name: 'Mistral Small 24B (Free)',
    provider: 'Mistral AI',
    description: 'Equilibrado y conciso. Muy bueno para resúmenes ejecutivos y síntesis de notas.',
    contextLength: '32k',
    badge: 'Equilibrado'
  }
];

export interface OpenRouterChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY_API_KEY = 'easystem_openrouter_api_key';
const STORAGE_KEY_MODEL = 'easystem_openrouter_selected_model';

// System Prompt Institucional cargado con la constitución y el Brand Book de El Alto
const GAMEA_SYSTEM_PROMPT = `Eres "Alto IA Brand Assistant", el copiloto oficial y asesor inteligente de la Dirección de Comunicación del Gobierno Autónomo Municipal de El Alto (GAMEA), Bolivia.

TU MISIÓN:
1. Asistir al personal municipal y a los diseñadores en la redacción de piezas institucionales (comunicados oficiales, notas de prensa, discursos, invitaciones, circulares y copys para redes sociales).
2. Asesorar y responder consultas normativas sobre el Brand Book de El Alto, garantizando el 100% de cumplimiento de marca.

IDENTIDAD Y TONO DE VOZ DE EL ALTO:
- Tono: Solemne pero cercano, digno, enérgico, de vanguardia y con orgullo alteño. Resalta el esfuerzo, la fuerza trabajadora y la soberanía de la ciudad más joven y pujante de Bolivia.
- Saludos tradicionales permitidos con respeto: "¡Kamisaraki!" o "¡Jallalla El Alto!" cuando sea pertinente.
- Eslóganes Oficiales: "El Corazón de la Metrópoli", "El Alto de Pie", "Ciudad de Oportunidades y Trabajo".

REGLAS ESTRICTAS DEL BRAND BOOK (GAMEA):
- Paleta Cromática Oficial:
  * Púrpura Alteño: #4B008F (Autoridad, institucionalidad, vanguardia).
  * Rosa Rebelde: #F5007B (Juventud, festividad, energía).
  * Turquesa Integración: #008F89 (Futuro, tecnología, ciudad conectada).
  * Oro Cultura / Sol Andino: #F5B400 (Riqueza cultural, pujanza comercial).
  * Púrpura Profundo: #690BB2 (Soporte jerárquico).
- Tipografías Institucionales:
  * Titulares y Logotipos: Gotham / Montserrat (geométrica, moderna, contundente).
  * Textos y Lectura: Poppins (humana, legible en papel y pantalla).
- Simbología del Aguayo: Metáfora de interculturalidad, interoperabilidad y tejido social. Prohibido deformar las franjas.
- Área de Reserva del Imagotipo: 2X perimetral libre de cualquier interferencia gráfica o textual.

FORMATO DE TUS RESPUESTAS:
- Sé directo, profesional y claro.
- Cuando redactes un comunicado o nota oficial, formatéalo en un bloque claro y estructurado con encabezado, cuerpo, fecha, firma institucional y hashtags recomendados.
- Si detectas una consulta que infringe el Brand Book (por ejemplo, usar un color verde flúor o estirar el logo), adviértelo amablemente y sugiere la alternativa oficial.`;

class OpenRouterService {
  public getApiKey(): string {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_API_KEY);
      if (stored && stored.trim()) return stored.trim();
    } catch (e) {
      // localStorage error fallback
    }

    const envKey = (import.meta as any).env?.VITE_OPENROUTER_API_KEY;
    if (envKey && typeof envKey === 'string' && !envKey.startsWith('REEMPLAZA_')) {
      return envKey.trim();
    }

    return '';
  }

  public saveApiKey(key: string): void {
    try {
      localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
    } catch (e) {
      console.error('Error saving API Key to localStorage', e);
    }
  }

  public clearApiKey(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_API_KEY);
    } catch (e) {
      console.error('Error removing API Key from localStorage', e);
    }
  }

  public getSelectedModel(): string {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_MODEL);
      if (stored) return stored;
    } catch (e) {}

    const envModel = (import.meta as any).env?.VITE_OPENROUTER_DEFAULT_MODEL;
    return envModel || 'meta-llama/llama-3.3-70b-instruct:free';
  }

  public saveSelectedModel(modelId: string): void {
    try {
      localStorage.setItem(STORAGE_KEY_MODEL, modelId);
    } catch (e) {}
  }

  public async sendChatCompletion(
    conversation: { sender: 'user' | 'ia'; text: string }[],
    modelId?: string
  ): Promise<{ text: string; snippet?: string; error?: string }> {
    const apiKey = this.getApiKey();
    const model = modelId || this.getSelectedModel();

    if (!apiKey) {
      return {
        text: '⚠️ No has configurado tu OpenRouter API Key. Por favor haz clic en "⚙️ Configurar OpenRouter" arriba para ingresar tu clave gratuita y conectar los modelos en vivo.',
        error: 'NO_API_KEY'
      };
    }

    // Construir historial de mensajes en formato OpenAI / OpenRouter
    const apiMessages: OpenRouterChatMessage[] = [
      { role: 'system', content: GAMEA_SYSTEM_PROMPT }
    ];

    // Incluir últimos 6 turnos para mantener contexto sin sobrecargar tokens
    const recent = conversation.slice(-6);
    for (const msg of recent) {
      apiMessages.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      });
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://easystem.200.105.141.138.sslip.io',
          'X-Title': 'El Alto Digital EASystem',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMessage = errorData?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        console.error('OpenRouter API Error:', errMessage);

        if (response.status === 401) {
          return {
            text: `❌ Error de autenticación en OpenRouter: Tu API Key es inválida o expiró. Verifica tu clave en openrouter.ai/keys.`,
            error: 'INVALID_API_KEY'
          };
        } else if (response.status === 429) {
          return {
            text: `⏳ Límite de tasa alcanzado en el modelo gratuito (${model}). Por favor espera unos segundos o selecciona otro modelo gratuito como Gemini 2.0 Flash Lite o DeepSeek R1 en el menú.`,
            error: 'RATE_LIMIT'
          };
        }

        return {
          text: `⚠️ Error al procesar consulta con OpenRouter (${model}): ${errMessage}`,
          error: errMessage
        };
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content || 'Sin respuesta del modelo.';

      // Extraer snippets de código o comunicados si están entre ```
      let snippet: string | undefined = undefined;
      const codeBlockMatch = reply.match(/```(?:markdown|txt)?([\s\S]*?)```/);
      if (codeBlockMatch && codeBlockMatch[1]) {
        snippet = codeBlockMatch[1].trim();
      }

      return { text: reply, snippet };

    } catch (err: any) {
      console.error('OpenRouter Fetch Exception:', err);
      return {
        text: `⚠️ Error de conexión con el servicio de OpenRouter: ${err.message || 'Verifica tu conexión a internet.'}`,
        error: 'NETWORK_ERROR'
      };
    }
  }
}

export const openrouterService = new OpenRouterService();
