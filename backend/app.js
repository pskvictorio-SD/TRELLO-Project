import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Configuración de entorno
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://trello-project-kappa.vercel.app",
    ],
    credentials: true,
  }),
);

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

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
