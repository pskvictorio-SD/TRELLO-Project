import { conn } from "../database/db.js";

// Agregar miembro a un workspace
export const addMember = (req, res) => {
  const { workspaceId } = req.params;
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({
      ok: false,
      message: "Email y rol son requeridos",
    });
  }
  // El rol puede ser "admin", "member" o "viewer"

  conn.query(
    // Se obtiene el ID del usuario a agregar al workspace a partir de su email
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
          error: "No existe el usuario con ese email",
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
};

// Eliminar miembro de un workspace (cuando haga el frontend vere si vere si lo hago por id o por email, por ahora lo hago por id. Ademas)
export const deleteMember = (req, res) => {
  const { workspaceId } = req.params;
  const { userId } = req.body;

  conn.query(
    "DELETE FROM workspace_members WHERE user_id = ? AND workspace_id = ?",
    [userId, workspaceId],
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