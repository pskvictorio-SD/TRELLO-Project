import { Router } from "express";
import {
  addMember,
  getMembers,
  changeRole,
  deleteMember,
} from "../controllers/workspaceMembers.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userInWorkspace } from "../middleware/userInWorkspace.js";
import { userRoleWorkspace } from "../middleware/userRoleWorkspace.js";

const router = Router();

/**
 * @route   POST /api/workspaces/:workspaceId/members
 * @desc    Agregar un miembro a un workspace
 */
router.post(
  "/:workspaceId/members",
  authMiddleware,
  userInWorkspace,
  userRoleWorkspace("admin","member"),
  addMember,
);

/**
 * @route   GET /api/workspaces/:workspaceId/members
 * @desc    Obtener miembros de un workspace
 */
router.get(
  "/:workspaceId/members",
  authMiddleware,
  userInWorkspace,
  getMembers,
);

/**
 * @route   PUT /api/workspaces/:workspaceId/members/:userId
 * @desc    Cambiar rol de un miembro
 */
router.put(
  "/:workspaceId/members/:userId",
  authMiddleware,
  userInWorkspace,
  userRoleWorkspace("admin"),
  changeRole,
);

/**
 * @route   DELETE /api/workspaces/:workspaceId/members/:userId
 * @desc    Eliminar un miembro de un workspace
 */
router.delete(
  "/:workspaceId/members/:userId",
  authMiddleware,
  userInWorkspace,
  userRoleWorkspace("admin"),
  deleteMember,
);
export default router;
