import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// Configuración de entorno
dotenv.config()
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Rutas
// Ruta de autenticacion de usuarios
import authRoutes from "./src/routes/auth.route.js"
app.use("/api/auth", authRoutes)
// Ruta de manejo de usuarios
import userRoutes from "./src/routes/user.routes.js"
app.use("/api/users", userRoutes)
// Ruta de manejo de workspaces
import workspaceRoutes from "./src/routes/workspace.route.js"
app.use("/api/workspaces", workspaceRoutes)
// Ruta de manejo de miembros de workspaces
import workspaceMembersRoutes from "./src/routes/workspaceMembers.route.js"
app.use("/api/workspaces", workspaceMembersRoutes)
// Ruta de manejo de boards
import boardRoutes from "./src/routes/board.route.js"
app.use("/api/workspaces", boardRoutes)

// Puerto
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`)
})