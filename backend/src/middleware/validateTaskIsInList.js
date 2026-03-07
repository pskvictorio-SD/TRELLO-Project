import { conn } from "../database/db.js";

export const validateTaskIsInList = (req, res, next) => {
  const { taskId, listId } = req.params;

  conn.query(
    "SELECT * FROM tasks WHERE id = ? AND list_id = ?",
    [taskId, listId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          ok: false,
          message: "Esta tarea no pertenece a esta lista",
        });
      }

      next();
    },
  );
};
