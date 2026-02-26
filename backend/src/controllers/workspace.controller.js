import { conn } from "../database/db.js";

// Funcion para crear workspaces
export const createWorkspace = (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  conn.query(
    "INSERT INTO workspaces (name, description, created_by) VALUES (?, ?, ?)",
    [name, description, userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
        });
      }
      conn.query(
        "INSERT INTO workspace_members (user_id, workspace_id, role) VALUES (?, ?, ?)",
        [userId, results.insertId, "admin"],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              message: "Error en el servidor",
            });
          }
          return res.status(201).json({
            ok: true,
            message: "Workspace creado con exito",
            workspaceId: results.insertId,
          });
        },
      );
    },
  );
};
// Funcion para obtener todos los workspaces del usuario autenticado
export const getUserWorkspaces = (req, res) => {
  const userId = req.user.id;

  conn.query(
    "SELECT w.id, w.name, w.description FROM workspaces w JOIN workspace_members wm ON w.id = wm.workspace_id WHERE wm.user_id = ?",
    [userId],
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
        message: "Workspaces obtenidos exitosamente",
        workspaces: results,
      });
    },
  );
};
// Funcion para actualizar un workspace
export const updateWorkspace = (req, res) => {
  const { workspaceId } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;

  conn.query(
    "UPDATE workspaces SET name = ?, description = ? WHERE id = ? AND created_by = ?",
    [name, description, workspaceId, userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: "Workspace no encontrado",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Workspace actualizado correctamente",
      });
    },
  );
};
// Funcion para eliminar un workspace
export const deleteWorkspace = (req, res) => {
  const { workspaceId } = req.params;
  const userId = req.user.id;

  conn.query(
    "DELETE FROM workspaces WHERE id = ? AND created_by = ?",
    [workspaceId, userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: "Workspace no encontrado",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Workspace eliminado correctamente",
      });
    },
  );
};