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

      // Verificar que el usuario no sea ya miembro del workspace
      conn.query(
        "SELECT * FROM workspace_members WHERE user_id = ? AND workspace_id = ?",
        [userId, workspaceId],
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
    },
  );
};

export const getMembers = (req, res) => {
  const { workspaceId } = req.params;

  const query = `
    SELECT wm.user_id, wm.role, wm.joined_at, u.username, u.avatar, u.email
    FROM workspace_members wm 
    INNER JOIN users u ON wm.user_id = u.id 
    WHERE wm.workspace_id = ?
  `;

  conn.query(query, [workspaceId], (err, results) => {
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
  const { workspaceId, userId } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({
      ok: false,
      message: "El rol es requerido",
    });
  }

  conn.query(
    "UPDATE workspace_members SET role = ? WHERE user_id = ? AND workspace_id = ?",
    [role, userId, workspaceId],
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
  const { workspaceId, userId } = req.params;

  if (req.userInWorkspace.user_id === parseInt(userId)) {
    return res.status(400).json({
      ok: false,
      message: "No puedes eliminarte a ti mismo",
    });
  }
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
