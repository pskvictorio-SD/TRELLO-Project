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

  const trimmedName = name.trim();

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

      const position =
        results[0].maxPosition !== null ? results[0].maxPosition + 10 : 10;

      conn.query(
        "INSERT INTO lists (board_id, name, position) VALUES (?, ?, ?)",
        [boardId, trimmedName, position],
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
              name: trimmedName,
              boardId: Number(boardId),
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
      if (results.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: "Lista no encontrada",
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
  const { position, reorder } = req.body;
  const { boardId, listId } = req.params;

  if (!position) {
    return res.status(400).json({
      ok: false,
      message: "Posición no especificada",
    });
  }

  // UPDATE
  conn.query(
    `
      UPDATE lists
      SET position = ?
      WHERE id = ?
    `,
    [position, listId],
    (err) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en servidor",
          error: err.message,
        });
      }

      // REORDER
      if (reorder) {
        conn.query(
          `
        SELECT id
        FROM lists
        WHERE board_id = ?
        ORDER BY position ASC
      `,
          [boardId],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                message: "Error en servidor",
                error: err.message,
              });
            }

            let currentPosition = 10;

            results.forEach((list) => {
              conn.query(
                `
              UPDATE lists
              SET position = ?
              WHERE id = ?
            `,
                [currentPosition, list.id],
              );
              currentPosition += 10;
            });
          },
        );
      }
      return res.status(200).json({
        ok: true,
        message: "Lista movida correctamente",
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
