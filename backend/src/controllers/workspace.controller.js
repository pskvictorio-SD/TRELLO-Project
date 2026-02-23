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
      return res.status(201).json({
        ok: true,
        message: "Workspace creado con exito",
        workspaceId: results.insertId,
      });
    },
  );
};
// Funcion para obtener todos los workspaces del usuario autenticado
export const getWorkspaces = (req, res) => {
  const userId = req.user.id;

  conn.query(
    "SELECT id, name, description FROM workspaces WHERE created_by = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
        });
      }
      return res.status(200).json({
        ok: true,
        workspaces: results,
      });
    },
  );
};
// Funcion para obtener un workspace por su ID (Solo si el usuario esta autenticado)
export const getWorkspace = (req, res) => {
  const { workspaceId } = req.params;
  const userId = req.user.id;

  conn.query(
    "SELECT name, description FROM workspaces WHERE id = ? AND created_by = ?",
    [workspaceId, userId],
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
          message: "Workspace no encontrado",
        });
      }

      return res.status(200).json({
        ok: true,
        workspace: results[0],
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
