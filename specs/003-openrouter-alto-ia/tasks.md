# LISTA DE TAREAS: INTEGRACIÓN OPENROUTER ALTO IA ASSISTANT
`specs/003-openrouter-alto-ia/tasks.md`

- [x] **TASK-01**: Actualizar `.env.example` con la guía clara y placeholders para `VITE_OPENROUTER_API_KEY` y `VITE_OPENROUTER_DEFAULT_MODEL`.
- [x] **TASK-02**: Crear `src/services/openrouterService.ts` con integración a `https://openrouter.ai/api/v1/chat/completions`, catálogo de modelos gratuitos (`:free`), system prompt institucional de El Alto y fallback resiliente.
- [x] **TASK-03**: Actualizar `src/components/AltoIAAssistant.tsx` con chat conectado en tiempo real, selector de modelos gratuitos, modal de configuración de API Key en vivo y formateo de comunicados con copiado en 1 clic.
- [x] **TASK-04**: Actualizar `.specify/feature.json` y `CLAUDE.md` para reflejar la feature activa.
- [x] **TASK-05**: Ejecutar `npm run build`, verificar compilación sin errores, realizar git commit, git push y re-deploy en Coolify.
