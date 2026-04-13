import { conn } from "../database/db.js";

// Agregar miembro a un board
export const addMember = (req, res) => {
  const { boardId } = req.params;
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({
      ok: false,
      message: "Email y rol son requeridos",
    });
  }
  // Verificar que el usuario exista
  conn.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err,
        });
      }
      if (results.length === 0)
        return res.status(404).json({
          ok: false,
          message: "Usuario no encontrado",
          error: "No existe el usuario con ese email",
        });

      const userId = results[0].id;

      // Verificar que el usuario no sea ya miembro del board
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
          if (results.length > 0)
            return res.status(409).json({
              ok: false,
              message: "El usuario ya es miembro del workspace",
              error: "El usuario ya es miembro del workspace",
            });

          // Insertar nuevo miembro
          conn.query(
            "INSERT INTO board_members (user_id, board_id, role) VALUES (?, ?, ?)",
            [userId, boardId, role],
            (err, results) => {
              if (err) {
                return res.status(500).json({
                  ok: false,
                  message: "Error en el servidor",
                  error: err,
                });
              }
              return res.status(201).json({
                ok: true,
                message: "Usuario agregado correctamente",
              });
            },
          );
        },
      );
    },
  );
};

// Traer miembros de un workspace con su rol y fecha de ingreso (ademas de su username, avatar y email para mostrarlo en el frontend) (esto lo hago para mostrarlo en la seccion de miembros del workspace, ademas de que lo necesito para mostrar los miembros de un board) (en el caso de los miembros de un board, se mostraran los miembros del workspace con su rol en el board, si es que tienen uno asignado, sino se mostrara su rol en el workspace)
export const getMembers = (req, res) => {
  const { boardId } = req.params;

  console.log(boardId)

  const query = `
    SELECT bm.user_id, bm.role, bm.joined_at, u.username, u.avatar, u.email
    FROM board_members bm 
    INNER JOIN users u ON bm.user_id = u.id 
    WHERE bm.board_id = ?
  `;

  conn.query(query, [boardId], (err, results) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error en el servidor",
        error: err,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Miembros obtenidos correctamente",
      members: results,
    });
  });
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
