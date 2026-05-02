import { Router } from "express";
import {
  createTask,
  getTasksOfList,
  updateTask,
  moveTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userInBoard } from "../middleware/userInBoard.js";
import { userRoleInBoard } from "../middleware/userRoleInBoard.js";

const router = Router();

/**
 * @route   POST /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/tasks
 * @desc    Crear una nueva tarea
 */

router.post(
  "/:workspaceId/boards/:boardId/lists/:listId/tasks",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  createTask,
);

/**
 * @route   GET /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/tasks
 * @desc    Obtener tareas de una lista
 */
router.get(
  "/:workspaceId/boards/:boardId/lists/:listId/tasks",
  authMiddleware,
  userInBoard,
  getTasksOfList,
);

/**
 * @route   PUT /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId
 * @desc    Actualizar una tarea
 */
router.put(
  "/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  updateTask,
);

/**
 * @route   PATCH /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId/move
 * @desc    Mover una tarea
 */
router.patch(
  "/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId/move",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  moveTask,
);

/**
 * @route   DELETE /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId
 * @desc    Eliminar una tarea
 */
router.delete(
  "/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  deleteTask,
);

export default router;
