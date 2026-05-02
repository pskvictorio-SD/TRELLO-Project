import { Router } from "express";
import {
  getBoardsOfUser,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/board.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userInBoard } from "../middleware/userInBoard.js";
import { userRoleInBoard } from "../middleware/userRoleInBoard.js";

const router = Router();

/**
 * @route   POST /api/workspaces/:workspaceId/boards
 * @desc    Crear nuevo board
 */
router.post("/:workspaceId/boards", authMiddleware, createBoard);

/**
 * @route   GET /api/workspaces/:workspaceId/boards
 * @desc    Obtener todos los boards de un usuario
 */
router.get("/:workspaceId/boards", authMiddleware, getBoardsOfUser);

/**
 * @route   PUT /api/workspaces/:workspaceId/boards/:boardId
 * @desc    Actualizar un board
 */
router.put(
  "/:workspaceId/boards/:boardId",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin"),
  updateBoard,
);

/**
 * @route   DELETE /api/workspaces/:workspaceId/boards/:boardId
 * @desc    Eliminar un board
 */
router.delete(
  "/:workspaceId/boards/:boardId",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin"),
  deleteBoard,
);

export default router;
