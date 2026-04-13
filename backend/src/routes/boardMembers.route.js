import { Router } from "express";
import {
  addMember,
  getMembers,
  changeRole,
  deleteMember,
} from "../controllers/boardMembers.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userInBoard } from "../middleware/userInBoard.js";
import { userRoleInBoard } from "../middleware/userRoleInBoard.js";

const router = Router();

/**
 * @route   POST /api/workspaces/:workspaceId/boards/:boardId/members
 * @desc    Agregar un miembro a un workspace
 */
router.post(
  "/:workspaceId/boards/:boardId/members",
  authMiddleware,
  userInBoard,
  userRoleInBoard(["admin","member"]),
  addMember,
);

/**
 * @route   GET /api/workspaces/:workspaceId/boards/:boardId/members
 * @desc    Obtener miembros de un board
 */
router.get(
  "/:workspaceId/boards/:boardId/members",
  authMiddleware,
  userInBoard,
  getMembers,
);

/**
 * @route   PUT /api/workspaces/:workspaceId/boards/:boardId/members/:userId
 * @desc    Cambiar rol de un miembro
 */
router.put(
  "/:workspaceId/boards/:boardId/members/:userId",
  authMiddleware,
  userInBoard,
  userRoleInBoard(["admin","member"]),
  changeRole,
);

/**
 * @route   DELETE /api/workspaces/:workspaceId/boards/:boardId/members/:userId
 * @desc    Eliminar un miembro de un board
 */
router.delete(
  "/:workspaceId/boards/:boardId/members/:userId",
  authMiddleware,
  userInBoard,
  userRoleInBoard(["admin","member"]),
  deleteMember,
);
export default router;
