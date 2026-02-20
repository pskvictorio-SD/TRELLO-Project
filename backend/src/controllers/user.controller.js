import { conn } from "../database/db.js";
import bcrypt from "bcryptjs";

export const getMe = (req, res) => {
  // El middleware ya verificó el token
  // y guardó el payload en req.user
  const userId = req.user.id;

  conn.query(
    "SELECT id, username, email, avatar, role, created_at FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error en el servidor",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Usuario no encontrado",
        });
      }

      return res.status(200).json({
        user: results[0],
      });
    },
  );
};

export const deleteAccount = (req, res) => {
  const userId = req.user.id;
  console.log(userId)
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      ok: false,
      message: "Debes confirmar tu contraseña",
    });
  }

  // 1️⃣ Buscar usuario
  conn.query(
    "SELECT password FROM users WHERE id = ? AND is_active = TRUE",
    [userId],
    async (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          ok: false,
          message: "Usuario no encontrado o ya desactivado",
        });
      }

      const user = results[0];

      try {
        // 2️⃣ Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({
            ok: false,
            message: "Contraseña incorrecta",
          });
        }

        // 3️⃣ Soft delete
        conn.query(
          `UPDATE users 
           SET is_active = FALSE, deleted_at = NOW() 
           WHERE id = ?`,
          [userId],
          (err) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                message: "Error al desactivar cuenta",
                error: err.message,
              });
            }

            return res.status(200).json({
              message: "Cuenta desactivada correctamente",
            });
          },
        );
      } catch (compareError) {
        return res.status(500).json({
          ok: false,
          message: "Error al verificar contraseña",
          error: compareError.message,
        });
      }
    },
  );
};
