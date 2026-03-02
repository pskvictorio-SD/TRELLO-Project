import { conn } from "../database/db.js";

export const createList = (req, res) => {
  const { name } = req.body;
  const { boardId } = req.params;

  if (!name || !name.trim()) {
    return res.status(400).json({
      ok: false,
      message: "El nombre es requerido",
    });
  }
  // Obtener última posición
  conn.query(
    "SELECT MAX(position) AS maxPosition FROM lists WHERE board_id = ?",
    [boardId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }

      const maxPosition = results[0].maxPosition;
      const position = maxPosition !== null ? maxPosition + 10 : 10;

      // Insertar nueva lista
      conn.query(
        "INSERT INTO lists (board_id, name, position) VALUES (?, ?, ?)",
        [boardId, name.trim(), position],
        (err, insertResult) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              message: "Error en el servidor",
              error: err.message,
            });
          }

          return res.status(201).json({
            ok: true,
            message: "Lista creada correctamente",
            list: {
              id: insertResult.insertId,
              name: name.trim(),
              boardId,
              position,
            },
          });
        },
      );
    },
  );
};

export const getListsOfBoard = (req, res) => {
  const { boardId } = req.params;

  conn.query(
    "SELECT * FROM lists WHERE board_id = ? ORDER BY position ASC",
    [boardId],
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
        message: "Listas obtenidas correctamente",
        lists: results,
      });
    },
  );
};

export const updateList = (req, res) => {
  const { listId } = req.params;
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      ok: false,
      message: "El nombre es requerido",
    });
  }

  conn.query(
    "UPDATE lists SET name = ? WHERE id = ?",
    [name.trim(), listId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }
      return res.status(200).json({
        ok: true,
        message: "Lista actualizada correctamente",
      });
    },
  );
};

export const moveList = (req, res) => {
  const { listId } = req.params;
  const { position } = req.body;

  // Validar posición
  if (position === undefined || isNaN(position)) {
    return res.status(400).json({
      ok: false,
      message: "La posición debe ser un número válido",
    });
  }

  // Actualizar posición
  conn.query(
    "UPDATE lists SET position = ? WHERE id = ?",
    [position, listId],
    (err, updateResult) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Lista movida correctamente",
        list: {
          id: list.id,
          name: list.name,
          boardId: list.board_id,
          position,
        },
      });
    },
  );
};

export const deleteList = (req, res) => {
  const { listId } = req.params;

  conn.query("DELETE FROM lists WHERE id = ?", [listId], (err, results) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error en el servidor",
        error: err.message,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: "Lista no encontrada",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Lista eliminada correctamente",
    });
  });
};
