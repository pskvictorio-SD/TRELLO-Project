/**
 * El punto de entrada en Vercel.
 *
 * Vercel busca funciones en `api/`. Este archivo no agrega logica: entrega la
 * misma aplicacion de `app.js` como manejador, y `vercel.json` reescribe todas
 * las rutas hacia aca para que Express siga viendo la ruta original y resuelva
 * el enrutamiento como siempre.
 */

import app from "../app.js";

export default app;
