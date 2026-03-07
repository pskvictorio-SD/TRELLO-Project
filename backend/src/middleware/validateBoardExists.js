import { conn } from "../database/db.js";

export const validateBoardExists = (req, res, next) => {
  const { boardId } = req.params;
  const { workspaceId } = req.params;

  conn.query(
    "SELECT * FROM boards WHERE id = ? AND workspace_id = ?",
    [boardId, workspaceId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err,
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          ok: false,
          message: "Board no encontrado",
        });
      }

      next();
    },
  );
};
