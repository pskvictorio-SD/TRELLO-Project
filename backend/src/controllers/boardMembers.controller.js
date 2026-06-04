import { conn } from "../database/db.js";

// Agregar miembro a un board
export const addMember = (req, res) => {
  const { boardId } = req.params;
  const { id } = req.user;
  const { role } = req.body;

  conn.query(
    "SELECT * FROM board_members WHERE user_id = ? AND board_id = ?",
    [id, boardId],
    (err, members) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err,
        });
      }

      if (members.length > 0) {
        return res.status(409).json({
          ok: false,
          message: "El usuario ya es miembro del tablero",
        });
      }

      conn.query(
        "INSERT INTO board_members (user_id, board_id, role) VALUES (?, ?, ?)",
        [id, boardId, role],
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              ok: false,
              message: "Error en el servidor",
              error: err,
            });
          }

          conn.query(
            "SELECT * FROM boards WHERE id = ?",
            [boardId],
            (err, boards) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  ok: false,
                  message: "Error en el servidor",
                  error: err,
                });
              }

              return res.status(201).json({
                ok: true,
                message: "Miembro agregado correctamente",
                board: boards[0],
              });
            },
          );
        },
      );
    },
  );
};

// Obtener todos los boards de un usuario determinado
export const getMembers = (req, res) => {
  const userId = req.user.id;
  const { boardId } = req.params;

  conn.query(
    `
    SELECT
      u.id,
      u.username,
      u.email,
      u.avatar,
      bm.role
    FROM board_members bm
    INNER JOIN users u
      ON bm.user_id = u.id
    WHERE bm.board_id = ?
      AND bm.user_id != ?
    `,
    [boardId, userId],
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
        members: results,
      });
    },
  );
};

// Cambiar rol de un miembro
export const changeRole = (req, res) => {
  const { boardId, userId } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({
      ok: false,
      message: "El rol es requerido",
    });
  }

  conn.query(
    "UPDATE board_members SET role = ? WHERE user_id = ? AND board_id = ?",
    [role, userId, boardId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err,
        });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: "Miembro no encontrado",
        });
      }
      return res.status(200).json({
        ok: true,
        message: "Miembro actualizado correctamente",
      });
    },
  );
};

// Eliminar miembro de un workspace (cuando haga el frontend vere si vere si lo hago por id o por email, por ahora lo hago por id. Ademas)
export const deleteMember = (req, res) => {
  const { boardId, userId } = req.params;

  if (req.userInBoard.user_id === parseInt(userId)) {
    return res.status(400).json({
      ok: false,
      message: "No puedes eliminarte a ti mismo",
    });
  }
  conn.query(
    "DELETE FROM board_members WHERE user_id = ? AND board_id = ?",
    [userId, boardId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err,
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: "Miembro no encontrado",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Miembro eliminado correctamente",
      });
    },
  );
};
