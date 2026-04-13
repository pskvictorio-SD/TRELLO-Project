import { conn } from "../database/db.js";

// Funcion para obtener todos los workspaces del usuario autenticado
export const getWorkspace = (req, res) => {
  const user_id = req.user.id;

  if (!user_id) {
    return res.status(404).json({
      message: "No se pudo identificar al usuario",
      ok: false,
    });
  }

  conn.query(
    "SELECT name, created_at FROM workspaces WHERE user_id = ?",
    [user_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error al buscar workspace en base de datos",
          ok: false,
          error: err,
        });
      }
      return res.status(201).json({
        message: "Workspace consultado con exito",
        ok: true,
        workspace: results[0],
      });
    },
  );
};

// Funcion para crear workspaces
export const createWorkspace = (req, res) => {
  const userId = req.user.id;
  const name = "Workspace de " + req.user.username;

  console.log(req.user)

  conn.query(
    "INSERT INTO workspaces (name, user_id) VALUES (?, ?)",
    [name, userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error en el servidor",
          ok: false,
        });
      }
      return res.status(201).json({
        message: "Workspace creado con exito",
        ok: true,
      });
    },
  );
};

// Funcion para obtener workspace de usuario

// export const getUserWorkspaces = (req, res) => {
//   const userId = req.user.id;

//   conn.query(
//     "SELECT w.id, w.name, w.description FROM workspaces w JOIN workspace_members wm ON w.id = wm.workspace_id WHERE wm.user_id = ?",
//     [userId],
//     (err, results) => {
//       if (err) {
//         return res.status(500).json({
//           ok: false,
//           message: "Error en el servidor",
//           error: err,
//         });
//       }
//       return res.status(200).json({
//         ok: true,
//         message: "Workspaces obtenidos exitosamente",
//         workspaces: results,
//       });
//     },
//   );
// };
// Funcion para actualizar un workspace
// export const updateWorkspace = (req, res) => {
//   const { workspaceId } = req.params;
//   const { name, description } = req.body;
//   const userId = req.user.id;

//   conn.query(
//     "UPDATE workspaces SET name = ?, description = ? WHERE id = ? AND created_by = ?",
//     [name, description, workspaceId, userId],
//     (err, results) => {
//       if (err) {
//         return res.status(500).json({
//           ok: false,
//           message: "Error en el servidor",
//         });
//       }

//       if (results.affectedRows === 0) {
//         return res.status(404).json({
//           ok: false,
//           message: "Workspace no encontrado",
//         });
//       }

//       return res.status(200).json({
//         ok: true,
//         message: "Workspace actualizado correctamente",
//       });
//     },
//   );
// };
// Funcion para eliminar un workspace
// export const deleteWorkspace = (req, res) => {
//   const { workspaceId } = req.params;
//   const userId = req.user.id;

//   conn.query(
//     "DELETE FROM workspaces WHERE id = ? AND created_by = ?",
//     [workspaceId, userId],
//     (err, results) => {
//       if (err) {
//         return res.status(500).json({
//           ok: false,
//           message: "Error en el servidor",
//         });
//       }

//       if (results.affectedRows === 0) {
//         return res.status(404).json({
//           ok: false,
//           message: "Workspace no encontrado",
//         });
//       }

//       return res.status(200).json({
//         ok: true,
//         message: "Workspace eliminado correctamente",
//       });
//     },
//   );
// };
