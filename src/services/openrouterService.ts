// =============================================================================
// EL ALTO DIGITAL EASYSTEM (EASystem)
// OpenRouter AI Service — Modelo openrouter/free con Reasoning Effort High
// =============================================================================

export interface OpenRouterChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY_API_KEY = 'easystem_openrouter_api_key';

// Default Model: openrouter/free (con enrutamiento automático al mejor modelo gratuito disponible)
export const DEFAULT_MODEL = 'openrouter/free';

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
- Responde siempre en español.
- Sé directo, profesional y claro.
- Cuando redactes un comunicado o nota oficial, formatéalo en un bloque claro y estructurado con encabezado, cuerpo, fecha, firma institucional y hashtags recomendados.
- Si detectas una consulta que infringe el Brand Book (por ejemplo, usar un color verde flúor o estirar el logo), adviértelo amablemente y sugiere la alternativa oficial.`;

// Fallback por si openrouter/free sufre saturación momentánea
const FALLBACK_FREE_MODEL = 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free';

class OpenRouterService {
  public getApiKey(): string {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_API_KEY);
      if (stored && stored.trim()) return stored.trim();
    } catch (e) {}

    const envKey = (import.meta as any).env?.VITE_OPENROUTER_API_KEY;
    if (envKey && typeof envKey === 'string' && !envKey.startsWith('REEMPLAZA_')) {
      return envKey.trim();
    }

    return '';
  }

  private cleanReplyText(text: string): { cleaned: string; snippet?: string } {
    let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
    if (!cleaned) cleaned = text;

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
        max_tokens: 1024,
        reasoning: {
          effort: 'high'
        }
      })
    });

    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data };
  }

  public async sendChatCompletion(
    conversation: { sender: 'user' | 'ia'; text: string }[]
  ): Promise<{ text: string; snippet?: string; error?: string }> {
    const apiKey = this.getApiKey();

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

    // 1. Intento primario con openrouter/free y effortLevel: high
    const primaryAttempt = await this.callApi(apiKey, DEFAULT_MODEL, apiMessages);

    if (primaryAttempt.ok && primaryAttempt.data?.choices?.[0]?.message?.content) {
      const rawText = primaryAttempt.data.choices[0].message.content;
      const { cleaned, snippet } = this.cleanReplyText(rawText);
      return { text: cleaned, snippet };
    }

    // 2. Fallback automático transparente
    try {
      const fallbackAttempt = await this.callApi(apiKey, FALLBACK_FREE_MODEL, apiMessages);
      if (fallbackAttempt.ok && fallbackAttempt.data?.choices?.[0]?.message?.content) {
        const rawText = fallbackAttempt.data.choices[0].message.content;
        const { cleaned, snippet } = this.cleanReplyText(rawText);
        return { text: cleaned, snippet };
      }
    } catch (e) {}

    const errMsg = primaryAttempt.data?.error?.message || `HTTP ${primaryAttempt.status}`;
    return {
      text: `⚠️ No se pudo procesar la consulta en este momento (${errMsg}). Por favor intenta de nuevo en unos segundos.`,
      error: errMsg
    };
  }
}

export const openrouterService = new OpenRouterService();
