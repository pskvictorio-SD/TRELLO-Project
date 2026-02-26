import { conn } from "../database/db.js";

// Middleware para verificar que el usuario este en el workspace
export const userInWorkspace = (req, res, next) => {
  const { workspaceId } = req.params;
  const userId = req.user.id;

  conn.query(
    "SELECT * FROM workspace_members WHERE user_id = ? AND workspace_id = ?",
    [userId, workspaceId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err,
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          ok: false,
          message: "No perteneces a este workspace",
        });
      }

      const user = results[0];

      req.userInWorkspace = user;

      next();
    },
  );
};
