import { Router } from "express";
import { userInBoard } from "../middleware/userInBoard.js";
import { userRoleInBoard } from "../middleware/userRoleInBoard.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  sendInvitation,
  getInvitations,
  statusInvitation,
  deleteInvitation,
} from "../controllers/boardInvitations.controller.js";

const router = Router();

/**
 * @route   POST /api/boards/:boardId/invitations
 * @desc    Enviar la invitacion
 */
router.post(
  "/boards/:boardId/invitations",
  authMiddleware,
  userInBoard,
  userRoleInBoard("admin", "member"),
  sendInvitation,
);

/**
 * @route   GET /api/workspaces/invitations
 * @desc    Obtener invitaciones
 */
router.get("/workspaces/invitations", authMiddleware, getInvitations);

/**
 * @route   PUT /api/boards/:boardId/invitations/:invitationId
 * @desc    Actualizar invitacion
 */
router.put(
  "/boards/:boardId/invitations/:invitationId",
  authMiddleware,
  statusInvitation,
);

/**
 * @route   DELETE /api/boards/:boardId/invitations/:invitationId
 * @desc    Eliminar invitacion
 */
router.delete(
  "/boards/:boardId/invitations/:invitationId",
  authMiddleware,
  deleteInvitation,
);

export default router;
