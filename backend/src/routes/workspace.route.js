import { Router } from "express";
import {
  createWorkspace,
  getUserWorkspaces,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspace.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @route   POST /api/workspaces
 * @desc    Crear nuevo workspace
 */
router.post("/", authMiddleware, createWorkspace);

/**
 * @route   GET /api/workspaces
 * @desc    Obtener todos los workspaces del usuario autenticado
 */
router.get("/", authMiddleware, getUserWorkspaces);

/**
 * @route   PUT /api/workspaces/:workspaceId
 * @desc    Actualizar un workspace
 */
router.put("/:workspaceId", authMiddleware, updateWorkspace);

/**
 * @route   DELETE /api/workspaces/:workspaceId
 * @desc    Eliminar un workspace
 */
router.delete("/:workspaceId", authMiddleware, deleteWorkspace);

export default router;
