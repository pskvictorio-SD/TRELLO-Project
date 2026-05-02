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
 * @route   POST /api/boards/:boardId/members
 * @desc    Agregar un miembro a un Board
 */
router.post(
  "/boards/:boardId/members",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  addMember,
);

/**
 * @route   GET /api/boards/:boardId/members
 * @desc    Obtener miembros de un board
 */
router.get("/:workspaceId/boards/", authMiddleware, userInBoard, getMembers);

/**
 * @route   PUT /api/boards/:boardId/members/:userId
 * @desc    Cambiar rol de un miembro
 */
router.put(
  "/boards/:boardId/members/:userId",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin"),
  changeRole,
);

/**
 * @route   DELETE /api/boards/:boardId/members/:userId
 * @desc    Eliminar un miembro de un board
 */
router.delete(
  "/boards/:boardId/members/:userId",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin"),
  deleteMember,
);
export default router;
