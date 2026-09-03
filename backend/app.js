/**
 * La aplicacion Express.
 *
 * Se **exporta** en vez de quedarse escuchando un puerto, porque el mismo
 * archivo sirve en dos entornos: en desarrollo se levanta un servidor, y en
 * produccion corre como funcion serverless, donde el que atiende el puerto es
 * el proveedor y no este proceso. Llamar a `listen()` incondicionalmente
 * funcionaria en el primer caso y fallaria en silencio en el segundo.
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Configuración de entorno
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
/*
 * Los origenes permitidos vienen del entorno y no del codigo: cambian cada vez
 * que se despliega el frontend en una URL nueva, y tocar el codigo para eso
 * obliga a un commit y un redeploy del backend por un dato de configuracion.
 * El de desarrollo queda fijo porque es el mismo en cualquier maquina.
 */
const ORIGENES = [
  "http://localhost:5173",
  ...(process.env.CORS_ORIGENES ?? "")
    .split(",")
    .map((origen) => origen.trim())
    .filter((origen) => origen !== ""),
];

app.use(cors({ origin: ORIGENES, credentials: true }));

/*
 * Un punto de salud sin base de datos. Sirve para distinguir "la funcion no
 * arranca" de "la funcion arranca pero no llega a la base", que son dos fallas
 * con causas distintas y desde afuera se ven igual.
 */
app.get("/api/salud", (_req, res) => {
  res.json({ ok: true, servicio: "tu-equipo-api" });
});

// Rutas
// Ruta de autenticacion de usuarios
import authRoutes from "./src/routes/auth.route.js";
app.use("/api/auth", authRoutes);
// Ruta de manejo de usuarios
import userRoutes from "./src/routes/user.routes.js";
app.use("/api/users", userRoutes);
// Ruta de manejo de workspaces
import workspaceRoutes from "./src/routes/workspace.route.js";
app.use("/api/workspaces", workspaceRoutes);
// Ruta de manejo de boards
import boardRoutes from "./src/routes/board.route.js";
app.use("/api/workspaces", boardRoutes);
// Ruta de manejo de invitaciones
import boardInvitationRoutes from "./src/routes/boardInvitations.route.js";
app.use("/api/", boardInvitationRoutes);
// Ruta de manejo de miembros de boards
import boardMemberRoutes from "./src/routes/boardMembers.route.js";
app.use("/api/", boardMemberRoutes);
// Ruta de manejo de listas
import listRoutes from "./src/routes/list.route.js";
app.use("/api/", listRoutes);
// Ruta de manejo de tareas
import taskRoutes from "./src/routes/task.route.js";
app.use("/api/", taskRoutes);

/*
 * En serverless no hay puerto que escuchar: el proveedor invoca la app como
 * manejador. `VERCEL` la define la plataforma; en cualquier otro entorno
 * —la maquina de desarrollo, un contenedor— se levanta el servidor normal.
 */
if (process.env.VERCEL === undefined) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

export default app;
