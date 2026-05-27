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
 * @route   POST /api/boards/:boardId/lists
 * @desc    Crear nueva lista
 */
router.post(
  "/boards/:boardId/lists",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  createList,
);

/**
 * @route   GET /api/boards/:boardId/lists
 * @desc    Obtener listas de un tablero
 */
router.get(
  "/boards/:boardId/lists",
  authMiddleware,
  userInBoard,
  getListsOfBoard,
);

/**
 * @route   PUT /api/boards/:boardId/lists/:listId
 * @desc    Actualizar una lista
 */
router.put(
  "/boards/:boardId/lists/:listId",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  validateListExists,
  updateList,
);

/**
 * @route   PATCH /api/boards/:boardId/lists/:listId/move
 * @desc    Mover una lista
 */
router.patch(
  "/boards/:boardId/lists/:listId/move",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  validateListExists,
  moveList,
);

/**
 * @route   DELETE /api/boards/:boardId/lists/:listId
 * @desc    Eliminar una lista
 */
router.delete(
  "/boards/:boardId/lists/:listId",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  validateListExists,
  deleteList,
);

export default router;
