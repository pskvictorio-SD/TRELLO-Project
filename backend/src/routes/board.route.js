import { Router } from "express";
import {
  getBoardsOfWorkspace,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/board.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userInWorkspace } from "../middleware/userInWorkspace.js";

const router = Router();

/**
 * @route   POST /api/workspaces/:workspaceId/boards
 * @desc    Crear nuevo board
 */
router.post(
  "/:workspaceId/boards",
  authMiddleware,
  userInWorkspace,
  createBoard,
);

/**
 * @route   GET /api/workspaces/:workspaceId/boards
 * @desc    Obtener todos los boards del workspace
 */
router.get(
  "/:workspaceId/boards",
  authMiddleware,
  userInWorkspace,
  getBoardsOfWorkspace,
);

/**
 * @route   PUT /api/workspaces/:workspaceId/boards/:boardId
 * @desc    Actualizar un board
 */
router.put(
  "/:workspaceId/boards/:boardId",
  authMiddleware,
  userInWorkspace,
  updateBoard,
);

/**
 * @route   DELETE /api/workspaces/:workspaceId/boards/:boardId
 * @desc    Eliminar un board
 */
router.delete(
  "/:workspaceId/boards/:boardId",
  authMiddleware,
  userInWorkspace,
  deleteBoard,
);

export default router;
