import { conn } from "../database/db.js";

// Verificar que el usuario este en el board
export const userInBoard = (req, res, next) => {
  const userId = req.user.id;
  const { boardId } = req.params;

  conn.query(
    "SELECT * FROM board_members WHERE user_id = ? AND board_id = ?",
    [userId, boardId],
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
          message: "No perteneces a este board",
        });
      }
      req.userInBoard = results[0];
      console.log(req.userInBoard)
      next();
    },
  );
};
