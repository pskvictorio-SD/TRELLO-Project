import { Router } from "express";
import {
  createList,
  getListsOfBoard,
  updateList,
  moveList,
  deleteList,
} from "../controllers/list.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userInWorkspace } from "../middleware/userInWorkspace.js";
import { userRoleWorkspace } from "../middleware/userRoleWorkspace.js";

const router = Router();

/**
 * @route   POST /api/workspaces/:workspaceId/boards/:boardId/lists
 * @desc    Crear nueva lista
 */
router.post(
  "/:workspaceId/boards/:boardId/lists",
  authMiddleware,
  userInWorkspace,
  userRoleWorkspace,
  createList,
);

/**
 * @route   GET /api/workspaces/:workspaceId/boards/:boardId/lists
 * @desc    Obtener listas de un tablero
 */
router.get(
  "/:workspaceId/boards/:boardId/lists",
  authMiddleware,
  userInWorkspace,
  getListsOfBoard,
);

/**
 * @route   PUT /api/workspaces/:workspaceId/boards/:boardId/lists/:listId
 * @desc    Actualizar una lista
 */
router.put(
  "/:workspaceId/boards/:boardId/lists/:listId",
  authMiddleware,
  userInWorkspace,
  userRoleWorkspace,
  updateList,
);

/**
 * @route   PATCH /api/workspaces/:workspaceId/boards/:boardId/lists/:listId
 * @desc    Mover una lista
 */
router.patch(
  "/:workspaceId/boards/:boardId/lists/:listId/move",
  authMiddleware,
  userInWorkspace,
  userRoleWorkspace,
  moveList,
);

/**
 * @route   DELETE /api/workspaces/:workspaceId/boards/:boardId/lists/:listId
 * @desc    Eliminar una lista
 */
router.delete(
  "/:workspaceId/boards/:boardId/lists/:listId",
  authMiddleware,
  userInWorkspace,
  userRoleWorkspace,
  deleteList,
);

export default router;
