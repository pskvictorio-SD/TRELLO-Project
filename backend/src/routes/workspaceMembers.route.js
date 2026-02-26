import { Router } from "express";
import { addMember, deleteMember } from "../controllers/workspaceMembers.controlles.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @route   POST /api/workspaces/:workspaceId/members
 * @desc    Agregar un miembro a un workspace
 */
router.post("/:workspaceId/members", authMiddleware, addMember);

/**
 * @route   DELETE /api/workspaces/:workspaceId/members
 * @desc    Eliminar un miembro de un workspace
 */
router.delete("/:workspaceId/members", authMiddleware, deleteMember);

export default router;