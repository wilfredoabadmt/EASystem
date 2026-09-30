# PLAN TÉCNICO: INTEGRACIÓN DE OPENROUTER API EN ALTO IA ASSISTANT
`specs/003-openrouter-alto-ia/plan.md`

## 1. ARQUITECTURA TÉCNICA Y FLUJO DE DATOS

```
┌────────────────────────────────────────────────────────────────────────┐
│                   ALTO IA ASSISTANT (AltoIAAssistant.tsx)              │
│                                                                        │
│   - Selector de Modelo Gratuito (:free)                                │
│   - Modal de Configuración de API Key (LocalStorage / .env)            │
│   - Lista de Mensajes y Renderizado Markdown                           │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 OPENROUTER SERVICE (openrouterService.ts)              │
│                                                                        │
│   1. Obtener API Key (LocalStorage || import.meta.env)                 │
│   2. Inyectar System Prompt Institucional (GAMEA Brand Guidelines)     │
│   3. POST https://openrouter.ai/api/v1/chat/completions                │
│   4. Manejo de Errores con Fallback Offline si la red/cuota falla      │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ HTTPS
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      OPENROUTER AI GATEWAY                             │
│                                                                        │
│   - meta-llama/llama-3.3-70b-instruct:free                             │
│   - deepseek/deepseek-r1:free                                          │
│   - google/gemini-2.0-flash-lite-preview-02-05:free                    │
│   - qwen/qwen-2.5-coder-32b-instruct:free                             │
│   - mistralai/mistral-small-24b-instruct-2501:free                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. LISTA DE TAREAS Y ENTREGABLES

1. **`src/services/openrouterService.ts`**:
   - Definición de interfaces (`OpenRouterMessage`, `OpenRouterResponse`, `OpenRouterModelOption`).
   - Catálogo de modelos gratuitos recomendados.
   - Función `sendChatMessage(messages, model, apiKeyOverride)` con `fetch` nativo.
   - Base de conocimiento y prompt institucional integrado del GAMEA.
   - Métodos utilitarios `getApiKey()`, `setApiKey(key)` y `clearApiKey()`.
2. **`src/components/AltoIAAssistant.tsx`**:
   - Reemplazar las respuestas estáticas mock por llamadas reales a `openrouterService.sendChatMessage()`.
   - Selector visual de modelo gratuito con badges informativos.
   - Modal interactivo de configuración de API Key con enlace para conseguir una gratuita.
   - Botón de copiar para cada fragmento de comunicado o respuesta.
   - Botón de reiniciar historial.
3. **`.env.example`**:
   - Añadir placeholders y documentación para `VITE_OPENROUTER_API_KEY` y `VITE_OPENROUTER_DEFAULT_MODEL`.
4. **Validación y Build**:
   - Ejecutar `npm run build` para asegurar 0 errores de tipado.
   - Commit, push y re-deploy en Coolify.
