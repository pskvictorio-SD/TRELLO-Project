import { Router } from "express";
import {
  createList,
  getListsOfBoard,
  updateList,
  moveList,
  deleteList,
} from "../controllers/list.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userInBoard } from "../middleware/userInBoard.js";
import { userRoleInBoard } from "../middleware/userRoleInBoard.js";
import { validateListExists } from "../middleware/validateListExistsAndBelongsToBoard.js";

const router = Router();

/**
 * @route   POST /api/workspaces/:workspaceId/boards/:boardId/lists
 * @desc    Crear nueva lista
 */
router.post(
  "/:workspaceId/boards/:boardId/lists",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  createList,
);

/**
 * @route   GET /api/workspaces/:workspaceId/boards/:boardId/lists
 * @desc    Obtener listas de un tablero
 */
router.get(
  "/:workspaceId/boards/:boardId/lists",
  authMiddleware,
  userInBoard,
  getListsOfBoard,
);

/**
 * @route   PUT /api/workspaces/:workspaceId/boards/:boardId/lists/:listId
 * @desc    Actualizar una lista
 */
router.put(
  "/:workspaceId/boards/:boardId/lists/:listId",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  validateListExists,
  updateList,
);

/**
 * @route   PATCH /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/move
 * @desc    Mover una lista
 */
router.patch(
  "/:workspaceId/boards/:boardId/lists/:listId/move",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  validateListExists,
  moveList,
);

/**
 * @route   DELETE /api/workspaces/:workspaceId/boards/:boardId/lists/:listId
 * @desc    Eliminar una lista
 */
router.delete(
  "/:workspaceId/boards/:boardId/lists/:listId",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  validateListExists,
  deleteList,
);

export default router;
