import { Router } from "express";
import {
  createTask,
  getTasksOfList,
  updateTask,
  moveTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userInWorkspace } from "../middleware/userInWorkspace.js";
import { validateBoardExists } from "../middleware/validateBoardExists.js";
import { validateListExists } from "../middleware/validateListExistsAndBelongsToBoard.js";
import { validateTaskIsInList } from "../middleware/validateTaskIsInList.js";

const router = Router();

/**
 * @route   POST /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/tasks
 * @desc    Crear una nueva tarea
 */

router.post(
  "/:workspaceId/boards/:boardId/lists/:listId/tasks",
  authMiddleware,
  userInWorkspace,
  validateBoardExists,
  validateListExists,
  createTask,
);

/**
 * @route   GET /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/tasks
 * @desc    Obtener tareas de una lista
 */
router.get(
  "/:workspaceId/boards/:boardId/lists/:listId/tasks",
  authMiddleware,
  userInWorkspace,
  validateBoardExists,
  validateListExists,
  getTasksOfList,
);

/**
 * @route   PUT /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId
 * @desc    Actualizar una tarea
 */
router.put(
  "/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId",
  authMiddleware,
  userInWorkspace,
  validateBoardExists,
  validateListExists,
  validateTaskIsInList,
  updateTask,
);

/**
 * @route   PATCH /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId/move
 * @desc    Mover una tarea
 */
router.patch(
  "/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId/move",
  authMiddleware,
  userInWorkspace,
  validateBoardExists,
  validateListExists,
  moveTask,
);

/**
 * @route   DELETE /api/workspaces/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId
 * @desc    Eliminar una tarea
 */
router.delete(
  "/:workspaceId/boards/:boardId/lists/:listId/tasks/:taskId",
  authMiddleware,
  userInWorkspace,
  validateBoardExists,
  validateListExists,
  validateTaskIsInList,
  deleteTask,
);

export default router;
