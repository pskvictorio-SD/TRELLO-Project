import { conn } from "../database/db.js";

export const validateListExists = (req, res, next) => {
  const { listId } = req.params;
  const { boardId } = req.params;

  conn.query(
    "SELECT * FROM lists WHERE id = ? AND board_id = ?",
    [listId, boardId],
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
          message: "Lista no encontrada",
        });
      }

      req.list = results[0];

      next();
    },
  );
};
