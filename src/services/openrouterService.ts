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

  }

  /**
   * Generador de Copy Inteligente para Comunicados, Noticias Web y Prensa Municipal
   */
  public async generatePressCopy(params: {
    keywords: string;
    tone?: string;
    secretaria?: string;
    format?: string;
  }): Promise<{
    title: string;
    subtitle: string;
    content: string;
    quote: string;
    keyPoints: string;
    category: string;
  }> {
    const { keywords, tone = 'Informativo y Persuasivo', secretaria = 'Gobierno Autónomo Municipal de El Alto', format = 'POST_WORDPRESS' } = params;
    const apiKey = this.getApiKey();

    const systemPrompt = `Eres el Director de Redacción y Estrategia Comunicacional de la Alcaldía de El Alto (GAMEA), Bolivia.
Tu misión es redactar piezas periodísticas e institucionales oficiales de alto impacto, informativas, persuasivas y de redacción impecable.
Debes responder ÚNICAMENTE con un objeto JSON válido con las siguientes claves:
- "title": Titular principal contundente y periodístico en MAYÚSCULAS (máximo 15 palabras).
- "subtitle": Bajada o epígrafe persuasivo que enganche al ciudadano y resuma el impacto social.
- "content": 2 o 3 párrafos de redacción periodística (pirámide invertida: qué, quién, cuándo, dónde, por qué y beneficio ciudadano). Separa párrafos con doble salto de línea "\\n\\n".
- "quote": Declaración oficial contundente de la autoridad municipal (Alcalde o Secretario) que transmita orgullo alteño, compromiso y transparencia.
- "keyPoints": 3 o 4 viñetas clave con datos concretos (cifras, plazos, zonas intervenidas, beneficios), cada una en una línea separada por salto "\\n".
- "category": Una categoría oficial entre: "OBRAS Y VIALIDAD", "GESTIÓN MUNICIPAL", "SALUD PÚBLICA", "SEGURIDAD CIUDADANA", "EDUCACIÓN Y CULTURA", "DESARROLLO ECONÓMICO", "MEDIO AMBIENTE Y RIESGOS", "SUBALCALDÍAS DISTRITALES" o "COMUNICADO OFICIAL".`;

    const userPrompt = `Por favor genera el copy completo para esta pieza institucional:
- Palabras clave / Ideas: "${keywords}"
- Enfoque / Tono: "${tone}"
- Secretaría / Emisor: "${secretaria}"
- Formato de destino: "${format}"

Genera exclusivamente el JSON parseable.`;

    if (apiKey) {
      try {
        const response = await this.callApi(apiKey, DEFAULT_MODEL, [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]);

        if (response.ok && response.data?.choices?.[0]?.message?.content) {
          const rawText = response.data.choices[0].message.content;
          const { cleaned } = this.cleanReplyText(rawText);
          const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.title && parsed.content) {
              return {
                title: String(parsed.title).trim(),
                subtitle: String(parsed.subtitle || '').trim(),
                content: String(parsed.content).trim(),
                quote: String(parsed.quote || '').trim(),
                keyPoints: String(parsed.keyPoints || '').trim(),
                category: String(parsed.category || 'GESTIÓN MUNICIPAL').trim()
              };
            }
          }
        }
      } catch (err) {
        console.warn('Error al llamar a OpenRouter para copy de prensa, usando motor local:', err);
      }
    }

    // Motor Local Inteligente Especializado en El Alto (Fallback instantáneo de alta fidelidad)
    return this.generateLocalPressCopy(keywords, tone, secretaria);
  }

  /**
   * Motor Semántico Local de Redacción Institucional para El Alto
   */
  private generateLocalPressCopy(keywords: string, tone: string, secretaria: string) {
    const kw = keywords.toLowerCase();

    // Detección de Categoría y Temática
    let category = 'GESTIÓN MUNICIPAL';
    let tema = 'acciones y proyectos estratégicos';
    let verboAccion = 'anuncia la implementación inmediata de';

    if (kw.includes('bacheo') || kw.includes('asfalto') || kw.includes('vial') || kw.includes('avenida') || kw.includes('calle') || kw.includes('recarpetado') || kw.includes('pavimento')) {
      category = 'OBRAS Y VIALIDAD';
      tema = 'trabajos integrales de mantenimiento vial y mejora de rutas';
      verboAccion = 'inicia obras de bacheo y modernización de la carpeta asfáltica en';
    } else if (kw.includes('salud') || kw.includes('hospital') || kw.includes('médic') || kw.includes('vacun') || kw.includes('farmacia')) {
      category = 'SALUD PÚBLICA';
      tema = 'fortalecimiento del sistema de atención médica y provisión de insumos';
      verboAccion = 'despliega brigadas de atención integral y equipamiento hospitalario para';
    } else if (kw.includes('seguridad') || kw.includes('guardia') || kw.includes('cámara') || kw.includes('patrull') || kw.includes('alarma') || kw.includes('polic')) {
      category = 'SEGURIDAD CIUDADANA';
      tema = 'plan preventivo de resguardo vecinal y vigilancia comunitaria';
      verboAccion = 'intensifica operativos de control y patrullaje preventivo en coordinación con';
    } else if (kw.includes('colegio') || kw.includes('escuela') || kw.includes('educa') || kw.includes('estudiant') || kw.includes('bono') || kw.includes('aula')) {
      category = 'EDUCACIÓN Y CULTURA';
      tema = 'mejoramiento de infraestructura escolar y apoyo integral al estudiantado';
      verboAccion = 'garantiza recursos y equipamiento moderno para las unidades educativas de';
    } else if (kw.includes('empleo') || kw.includes('feria') || kw.includes('productor') || kw.includes('econom') || kw.includes('comercio') || kw.includes('joven')) {
      category = 'DESARROLLO ECONÓMICO';
      tema = 'impulso a los emprendedores alteños y reactivación económica';
      verboAccion = 'lanza iniciativas de fomento productivo y generación de oportunidades en';
    } else if (kw.includes('agua') || kw.includes('drenaje') || kw.includes('lluvia') || kw.includes('limpieza') || kw.includes('basura') || kw.includes('río')) {
      category = 'MEDIO AMBIENTE Y RIESGOS';
      tema = 'plan de contingencia y prevención de riesgos ambientales';
      verboAccion = 'ejecuta tareas preventivas de limpieza hidráulica y monitoreo de cuencas en';
    }

    // Extracción de menciones específicas en las palabras clave
    const distritoMatch = keywords.match(/distrito\s*\d+/i);
    const distritoStr = distritoMatch ? `en el ${distritoMatch[0].toUpperCase()}` : 'en los 14 distritos municipales';

    const cleanKeywordsSummary = keywords
      .replace(/distrito\s*\d+/gi, '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 3)
      .join(', ');

    // Construcción del Titular
    const title = `ALCALDÍA DE EL ALTO: GAMEA ${verboAccion.toUpperCase()} ${cleanKeywordsSummary.toUpperCase() || tema.toUpperCase()} ${distritoStr.toUpperCase()}`;

    // Construcción de Bajada Persuasiva
    const subtitle = `La intervención municipal prioriza la seguridad, calidad de vida y bienestar directo de miles de familias alteñas, garantizando un despliegue técnico oportuno.`;

    // Construcción del Cuerpo Periodístico
    const content = `El Gobierno Autónomo Municipal de El Alto (GAMEA), a través de la ${secretaria}, informa a la ciudadanía que se encuentra en plena ejecución el plan enfocado en ${cleanKeywordsSummary || tema}, beneficiando de forma prioritaria a los vecinos ${distritoStr}.

Este proyecto surge como respuesta inmediata a las demandas vecinales y a los compromisos asumidos por el Órgano Ejecutivo Municipal. Las cuadrillas especializadas y los equipos técnicos han sido desplegados con la instrucción precisa de actuar con rapidez, transparencia y rigurosos estándares de calidad técnica para evitar perjuicios en la rutina cotidiana de las familias alteñas.

Asimismo, se exhorta a las juntas vecinales, transportistas y transeúntes a colaborar con el personal debidamente identificado y respetar las señalizaciones preventivas instaladas durante el desarrollo de las labores.`;

    // Cita Inspiradora y Persuasiva de Autoridad
    const quote = `Nuestra vocación de servicio es clara: devolver con obras concretas la confianza que el pueblo alteño deposita cada día en nosotros. El Alto no se detiene; seguimos avanzando firmes, con dignidad y trabajo en cada rincón de nuestra ciudad.`;

    // Puntos Clave
    const keyPoints = `Despliegue operativo y técnico permanente ${distritoStr}.\nInversión garantizada para asegurar durabilidad y alto impacto ciudadano.\nSupervisión directa en campo para verificar el cumplimiento estricto del cronograma.\nCanal de atención y recepción de inquietudes habilitado a través de www.elalto.gob.bo.`;

    return {
      title,
      subtitle,
      content,
      quote,
      keyPoints,
      category
    };
  }
}

export const openrouterService = new OpenRouterService();

