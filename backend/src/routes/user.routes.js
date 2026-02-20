import { Router } from "express";
import { getMe, deleteAccount } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @route   GET /api/users/me
 * @desc    Obtener perfil del usuario autenticado
 */
router.get("/me", authMiddleware, getMe);

/**
 * @route   DELETE /api/users/me
 * @desc    Cerrar cuenta de usuario
 */
router.delete("/me", authMiddleware, deleteAccount);

export default router;
