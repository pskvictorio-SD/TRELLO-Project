import { Router } from "express";
import { register, login, reactivateAccount } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registrar nuevo usuario y crearle un workspace
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Login de usuario
 */
router.post("/login", login);

/**
 * @route   POST /api/auth/reactivate
 * @desc    Reactivar cuenta de usuario
 */
router.post("/reactivate", reactivateAccount);

export default router;