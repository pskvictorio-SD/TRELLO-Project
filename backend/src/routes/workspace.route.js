import { Router } from "express";
import {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
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
router.get("/", authMiddleware, getWorkspaces);

/**
 * @route   GET /api/workspaces/:workspaceId
 * @desc    Obtener un workspace por su ID
 */
router.get("/:workspaceId", authMiddleware, getWorkspace);

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
