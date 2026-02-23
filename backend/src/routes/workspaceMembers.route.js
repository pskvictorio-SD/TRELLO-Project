import { Router } from "express";
import { addMember } from "../controllers/workspaceMembers.controlles.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @route   POST /api/workspaces/:workspaceId/members
 * @desc    Agregar un miembro a un workspace
 */
router.post("/:workspaceId/members", authMiddleware, addMember);

export default router;