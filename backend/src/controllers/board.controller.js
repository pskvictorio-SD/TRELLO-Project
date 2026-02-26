import { conn } from "../database/db.js";

export const createBoard = (req, res) => {
  const { workspaceId } = req.params;
  const { title, description } = req.body;

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

      res.status(201).json({
        ok: true,
        message: "Board creado exitosamente",
        board: {
          id: results.insertId,
          workspace_id: workspaceId,
          title,
          description,
          created_at: results.insertDate,
        },
      });
    },
  );
};

export const getBoardsOfWorkspace = (req, res) => {
  const { workspaceId } = req.params;

  conn.query(
    "SELECT * FROM boards WHERE workspace_id = ?",
    [workspaceId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error al obtener los boards del workspace",
          error: err,
        });
      }
      return res.status(200).json({
        ok: true,
        message: "Boards obtenidos exitosamente",
        boards: results,
      });
    },
  );
};

export const updateBoard = (req, res) => {
  const {title, description} = req.body;
  const { boardId } = req.params;

  if (!title || !description) {
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
  )
}

export const deleteBoard = (req, res) => {
  const { boardId } = req.params;

  conn.query(
    "DELETE FROM boards WHERE id = ?",
    [boardId],
    (err, results) => {
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
    },
  );
}