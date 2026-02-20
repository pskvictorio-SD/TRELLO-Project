import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./src/routes/auth.route.js"
import userRoutes from "./src/routes/user.routes.js"

// Configuración de entorno
dotenv.config()
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Rutas
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

// Puerto
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`)
})