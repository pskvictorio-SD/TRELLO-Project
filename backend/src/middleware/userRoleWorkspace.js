import { conn } from "../database/db.js";

// Middleware para verificar que el usuario este en el workspace y su rol para crear o modificar boards
export const userRoleWorkspace = (req, res, next) => {
  const role = req.userInWorkspace.role;

  if (role === "admin" || role === "member") {
    next();
  } else {
    return res.status(401).json({
      ok: false,
      message: "No tienes permisos para realizar esta acción",
    });
  }
}