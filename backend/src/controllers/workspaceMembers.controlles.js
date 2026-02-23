import { conn } from "../database/db.js";

export const addMember = (req, res) => {
  const { workspaceId } = req.params;
  const { email, role } = req.body;

  conn.query(
    // Se obtiene el ID del usuario a agregar al workspace a partir de su email
    "SELECT id FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          ok: false,
          message: "Usuario no encontrado",
        });
      }

      const userId = results[0].id;

      conn.query(
        "INSERT INTO workspace_members (user_id, workspace_id, role) VALUES (?, ?, ?)",
        [userId, workspaceId, role],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              message: "Error en el servidor",
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
};