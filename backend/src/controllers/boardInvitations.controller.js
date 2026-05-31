import { conn } from "../database/db.js";

// Enviar invitacion a un usuario
export const sendInvitation = (req, res) => {
  const { boardId } = req.params;
  const { email } = req.body;
  const userId = req.user.id;

  if (!email) {
    return res.status(400).json({
      ok: false,
      message: "Falta el email del usuario",
    });
  }

  // Verificar que el usuario exista y traer el id
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
      if (results.length === 0) {
        return res.status(404).json({
          ok: false,
          message: "Usuario no encontrado",
        });
      }

      const username = results[0].username;
      const receiverId = results[0].id;
      // Verificar que el usuario no este invitado
      // Insertar invitacion
      conn.query(
        "INSERT INTO board_invitations (board_id, sender_id, receiver_id, status) VALUES (?, ?, ?, ?)",
        [boardId, userId, receiverId, "pending"],
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
            message: "Invitación enviada correctamente",
            invitation: results,
          });
        },
      );
    },
  );
};

export const getInvitations = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT
      bi.id,
      bi.status,
      bi.created_at,
      bi.board_id,
      b.title AS boardTitle,
      u.id AS senderId,
      u.username AS senderName
    FROM board_invitations bi
    INNER JOIN users u
      ON bi.sender_id = u.id
    INNER JOIN boards b
      ON bi.board_id = b.id
    WHERE bi.receiver_id = ?
      AND bi.status = 'pending'
    ORDER BY bi.created_at DESC
  `;

  conn.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error en el servidor",
        error: err,
      });
    }

    return res.status(200).json({
      ok: true,
      invitations: results,
    });
  });
};

export const statusInvitation = (req, res) => {
  const { invitationId } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  if (!status) {
    return res.status(400).json({
      ok: false,
      message: "Falta el status de la invitacion",
    });
  }

  conn.query(
    "UPDATE board_invitations SET status = ? WHERE id = ? AND sender_id = ?",
    [status, invitationId, userId],
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
          message: "Invitación no encontrada",
        });
      }
      return res.status(200).json({
        ok: true,
        message: "Invitación actualizada correctamente",
      });
    },
  );
};

export const deleteInvitation = (req, res) => {
  const { invitationId } = req.params;
  const userId = req.user.id;

  conn.query(
    "DELETE FROM board_invitations WHERE id = ? AND sender_id = ?",
    [invitationId, userId],
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
          message: "Invitación no encontrada",
        });
      }
      return res.status(200).json({
        ok: true,
        message: "Invitación eliminada correctamente",
      });
    },
  );
};
