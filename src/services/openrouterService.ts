// =============================================================================
// EL ALTO DIGITAL EASYSTEM (EASystem)
// OpenRouter AI Service — Modelos Gratuitos para Alto IA Brand Assistant
// Con Auto-Fallback y Detección Dinámica de Modelos
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
    id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
    name: 'NVIDIA Nemotron 3 Nano Omni (Free)',
    provider: 'NVIDIA',
    description: 'Excelente para redacción institucional, notas de prensa y comunicados con tono alteño en español.',
    contextLength: '256k',
    badge: 'Recomendado'
  },
  {
    id: 'nvidia/nemotron-3-super-120b-a12b:free',
    name: 'NVIDIA Nemotron 3 Super 120B (Free)',
    provider: 'NVIDIA',
    description: 'Modelo de 120B de parámetros de alta capacidad para redacción de documentos complejos.',
    contextLength: '262k',
    badge: 'Potencia 120B'
  },
  {
    id: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    name: 'NVIDIA Nemotron 3 Ultra 550B (Free)',
    provider: 'NVIDIA',
    description: 'Modelo colosal de 550B de parámetros y 1 millón de tokens de contexto.',
    contextLength: '1M',
    badge: 'Ultra 550B'
  },
  {
    id: 'nvidia/nemotron-3.5-lightning:free',
    name: 'NVIDIA Nemotron 3.5 Lightning (Free)',
    provider: 'NVIDIA',
    description: 'Modelo relámpago con 1 millón de tokens de ventana de contexto.',
    contextLength: '1M',
    badge: 'Ultra Rápido'
  },
  {
    id: 'qwen/qwen3.8-27b:free',
    name: 'Qwen 3.8 27B (Free)',
    provider: 'Alibaba Cloud',
    description: 'Especializado en redacción formal y estructuración de normativas.',
    contextLength: '262k',
    badge: 'Estructurado'
  },
  {
    id: 'google/gemma-4-31b-it:free',
    name: 'Google Gemma 4 31B (Free)',
    provider: 'Google',
    description: 'Modelo de Google para instrucciones detalladas y síntesis de notas.',
    contextLength: '262k',
    badge: 'Google AI'
  }
];

// Lista de modelos de respaldo en caso de que uno esté saturado
const FALLBACK_MODELS = [
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'nvidia/nemotron-3.5-lightning:free'
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
- Sé directo, profesional y claro en español.
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
    return envModel || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free';
  }

  public saveSelectedModel(modelId: string): void {
    try {
      localStorage.setItem(STORAGE_KEY_MODEL, modelId);
    } catch (e) {}
  }

  private cleanReplyText(text: string): { cleaned: string; snippet?: string } {
    // Si contiene tags de pensamiento <think>...</think>, formatearlos
    let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
    if (!cleaned) cleaned = text;

    // Extraer snippets de código o comunicados si están entre ```
    let snippet: string | undefined = undefined;
    const codeBlockMatch = cleaned.match(/```(?:markdown|txt)?([\s\S]*?)```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      snippet = codeBlockMatch[1].trim();
    }

    return { cleaned, snippet };
  }

  private async callApi(apiKey: string, model: string, messages: OpenRouterChatMessage[]): Promise<any> {
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
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data };
  }

  public async sendChatCompletion(
    conversation: { sender: 'user' | 'ia'; text: string }[],
    modelId?: string
  ): Promise<{ text: string; snippet?: string; modelUsed?: string; error?: string }> {
    const apiKey = this.getApiKey();
    const primaryModel = modelId || this.getSelectedModel();

    if (!apiKey) {
      return {
        text: '⚠️ No has configurado tu OpenRouter API Key. Por favor haz clic en "⚙️ Configurar OpenRouter" arriba para ingresar tu clave gratuita y conectar los modelos en vivo.',
        error: 'NO_API_KEY'
      };
    }

    const apiMessages: OpenRouterChatMessage[] = [
      { role: 'system', content: GAMEA_SYSTEM_PROMPT }
    ];

    const recent = conversation.slice(-6);
    for (const msg of recent) {
      apiMessages.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      });
    }

    // 1. Intentar con el modelo primario seleccionado
    const primaryAttempt = await this.callApi(apiKey, primaryModel, apiMessages);

    if (primaryAttempt.ok && primaryAttempt.data?.choices?.[0]?.message?.content) {
      const rawText = primaryAttempt.data.choices[0].message.content;
      const { cleaned, snippet } = this.cleanReplyText(rawText);
      return { text: cleaned, snippet, modelUsed: primaryModel };
    }

    // 2. Si falla por falta de clave (401), avisar directamente
    if (primaryAttempt.status === 401) {
      return {
        text: `❌ Error de autenticación en OpenRouter: Tu API Key es inválida. Verifica tu clave en openrouter.ai/keys e ingrésala en "Administrar API Key".`,
        error: 'INVALID_API_KEY'
      };
    }

    // 3. Si el modelo no está disponible o tiene rate limit, activar AUTO-FALLBACK
    const candidateFallbacks = FALLBACK_MODELS.filter(m => m !== primaryModel);
    for (const fallbackModel of candidateFallbacks) {
      try {
        const fallbackAttempt = await this.callApi(apiKey, fallbackModel, apiMessages);
        if (fallbackAttempt.ok && fallbackAttempt.data?.choices?.[0]?.message?.content) {
          const rawText = fallbackAttempt.data.choices[0].message.content;
          const { cleaned, snippet } = this.cleanReplyText(rawText);
          const fallbackNote = `\n\n> *(Respuesta procesada con **${fallbackModel.split('/')[1] || fallbackModel}** debido a saturación temporal en el modelo principal)*`;
          return {
            text: cleaned + fallbackNote,
            snippet,
            modelUsed: fallbackModel
          };
        }
      } catch (e) {
        // Seguir al siguiente fallback
      }
    }

    // Si todos fallaron
    const errMsg = primaryAttempt.data?.error?.message || `HTTP ${primaryAttempt.status}`;
    return {
      text: `⚠️ Los modelos gratuitos de OpenRouter están temporalmente saturados en los proveedores compartidos. Detalle: ${errMsg}. Por favor intenta de nuevo en unos segundos.`,
      error: errMsg
    };
  }
}

export const openrouterService = new OpenRouterService();
