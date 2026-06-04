import { conn } from "../database/db.js";

export const createBoard = (req, res) => {
  const { workspaceId } = req.params;
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      ok: false,
      message: "Falta el título del board",
    });
  }

  conn.query(
    "INSERT INTO boards (workspace_id, title, description) VALUES (?, ?, ?)",
    [workspaceId, title, description],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error al crear el board",
          error: err,
        });
      }

      // Insertar usuario en board_members con rol de admin
      const userId = req.user.id;
      const boardId = results.insertId;
      conn.query(
        "INSERT INTO board_members (user_id, board_id, role) VALUES (?, ?, ?)",
        [userId, boardId, "admin"],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              message: "Error al agregar usuario como admin",
              error: err,
            });
          }
        },
      );

      res.status(201).json({
        ok: true,
        message: "Board creado exitosamente",
        board: results,
      });
    },
  );
};

export const getBoardsOfUser = (req, res) => {
  const userId = req.user.id;

  conn.query(
    "SELECT board_id FROM board_members WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err,
        });
      } else if (results.length === 0) {
        return res.status(404).json({
          ok: false,
          message: "Aun no perteneces a ningun tableto, crea uno",
          boards: [],
        });
      }
      conn.query(
        "SELECT * FROM boards WHERE id IN (?)",
        [results.map((r) => r.board_id)],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              message: "Error en el servidor",
              error: err,
            });
          }
          return res.status(200).json({
            ok: true,
            boards: results,
          });
        },
      );
    },
  );
};

export const updateBoard = (req, res) => {
  const { title, description } = req.body;
  const { boardId } = req.params;

  if (!title) {
    return res.status(400).json({
      ok: false,
      message: "Faltan datos",
    });
  }

  conn.query(
    "UPDATE boards SET title = ?, description = ? WHERE id = ?",
    [title, description, boardId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error al actualizar el board",
          error: err,
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: "Board no encontrado",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Board actualizado exitosamente",
      });
    },
  );
};

export const deleteBoard = (req, res) => {
  const { boardId } = req.params;

  conn.query("DELETE FROM boards WHERE id = ?", [boardId], (err, results) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error al eliminar el board",
        error: err,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: "Board no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Board eliminado exitosamente",
    });
  });
};