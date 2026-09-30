# ESPECIFICACIÓN TÉCNICA FORMAL: ALTO IA ASSISTANT CON OPENROUTER API (MODELOS GRATUITOS)
`specs/003-openrouter-alto-ia/spec.md`

## 1. RESUMEN EJECUTIVO
Bajo la metodología **SDD (Spec-Driven Development)**, esta especificación define la integración del servicio de Inteligencia Artificial para el módulo **Alto IA Assistant** mediante la API de **OpenRouter**, priorizando el catálogo de **modelos de acceso gratuito (`:free`)**.

El asistente actúa como el copiloto institucional de la Dirección de Comunicación del Gobierno Autónomo Municipal de El Alto (GAMEA), permitiendo a funcionarios municipales consultar normativas del Brand Book, redactar notas de prensa con tono alteño y generar comunicados oficiales en tiempo real.

---

## 2. HISTORIAS DE USUARIO (USER STORIES)

### US-01: Funcionario / Redactor Institucional
*Como funcionario de una secretaría municipal, quiero solicitar a Alto IA la redacción de comunicados, notas de prensa o posts para redes sociales ingresando una instrucción simple, y recibir un borrador estructurado con la voz oficial de El Alto y botón de copia directa.*

### US-02: Diseñador y Consultor de Marca
*Como diseñador o auditor interno, quiero hacer preguntas normativas (ej: "¿Puedo alterar el tono púrpura en un afiche?", "¿Cuál es el área de reserva del imagotipo?") y recibir respuestas precisas citando los módulos del Brand Book de El Alto.*

### US-03: Administrador del Sistema
*Como administrador de la plataforma, quiero poder configurar la clave API de OpenRouter tanto por variable de entorno (`VITE_OPENROUTER_API_KEY`) como directamente desde la interfaz de usuario, y seleccionar entre múltiples modelos gratuitos según disponibilidad.*

---

## 3. REQUERIMIENTOS FUNCIONALES (RF)

### 3.1. Integración con OpenRouter API (RF-01)
- **Endpoint**: `https://openrouter.ai/api/v1/chat/completions` (OpenAI-compatible).
- **Headers Obligatorios**:
  - `Authorization: Bearer <OPENROUTER_API_KEY>`
  - `HTTP-Referer: https://easystem.200.105.141.138.sslip.io`
  - `X-Title: El Alto Digital EASystem`
  - `Content-Type: application/json`
- **Modelos Gratuitos Soportados (`:free`)**:
  - `meta-llama/llama-3.3-70b-instruct:free` (Llama 3.3 70B Instruct - Recomendado para redacción institucional)
  - `deepseek/deepseek-r1:free` (DeepSeek R1 - Razonamiento normativo)
  - `google/gemini-2.0-flash-lite-preview-02-05:free` (Gemini 2.0 Flash Lite Free - Respuestas rápidas)
  - `qwen/qwen-2.5-coder-32b-instruct:free` (Qwen 2.5 Coder 32B Free)
  - `mistralai/mistral-small-24b-instruct-2501:free` (Mistral Small 24B Free)

### 3.2. Gestión de Credenciales y Resiliencia (RF-02)
- La API Key se lee en orden de prioridad:
  1. Clave guardada por el usuario en el modal de la app (`localStorage`).
  2. Variable de entorno `import.meta.env.VITE_OPENROUTER_API_KEY`.
- Si no hay API key configurada, la interfaz muestra un modal guiado con enlace directo para obtenerla gratis en `openrouter.ai/keys`.
- Modo de contingencia offline: Si la llamada al API falla (rate limit, timeout o falta de cuota), el sistema degrada limpiamente a la base de conocimiento local sin bloquear el chat.

### 3.3. Prompt de Sistema Institucional (RF-03)
El asistente incorpora de manera invisible para el usuario un `system_prompt` exhaustivo con:
- Identidad, valores y tono de El Alto (orgullo, dignidad, soberanía, empuje laboral, calidez andina, eslóganes oficiales: *"El Corazón de la Metrópoli"*, *"Ciudad de Oportunidades y Trabajo"*).
- Paleta cromática oficial HEX (`#4B008F`, `#F5007B`, `#008F89`, `#F5B400`, `#690BB2`).
- Normativa de imagotipo, área de reserva y tipografías (Gotham/Montserrat y Poppins).

### 3.4. Interfaz de Usuario y Experiencia (RF-04)
- Selector de modelo en el encabezado del chat.
- Botón "⚙️ Configurar OpenRouter" con indicador de estado (🟢 Conectado / 🟡 Clave pendiente).
- Indicador visual de generación ("Alto IA pensando con OpenRouter...").
- Formateo de código y botón de copia con 1 clic para comunicados y snippets generados.
- Botón para limpiar o reiniciar el historial de conversación.

---

## 4. CRITERIOS DE ACEPTACIÓN OBSERVABLES

- [ ] **CA-01**: En la sección "Alto IA Assistant", el usuario visualiza el selector de modelos gratuitos de OpenRouter.
- [ ] **CA-02**: El usuario puede hacer clic en "Configurar API Key", ingresar su clave `sk-or-v1-...` y guardarla de forma segura.
- [ ] **CA-03**: Al enviar una consulta ("Redactar comunicado de bacheo distrital"), Alto IA responde con texto generado por el modelo de OpenRouter respetando el tono institucional de El Alto.
- [ ] **CA-04**: Los bloques de comunicados incluyen botón para copiar el texto completo al portapapeles.
- [ ] **CA-05**: Si no hay conexión o la clave es inválida, se muestra una advertencia amigable sin colgar la interfaz.
