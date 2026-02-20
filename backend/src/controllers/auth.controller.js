import bcrypt from "bcryptjs";
import { conn } from "../database/db.js";
import { generateToken } from "../utils/jwt.js";

export const register = (req, res) => {
  const { username, email, password, avatar } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Todos los campos obligatorios deben completarse",
    });
  }

  // 1️⃣ Verificar si el email ya existe
  conn.query(
    "SELECT id, is_active FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error en el servidor",
          error: err.message,
        });
      }

      if (results.length > 0) {
        const existingUser = results[0];

        if (existingUser.is_active) {
          return res.status(400).json({
            message: "El email ya está registrado",
          });
        } else {
          return res.status(403).json({
            message: "Cuenta desactivada. Debes reactivarla.",
          });
        }
      }

      try {
        // 2️⃣ Hashear contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3️⃣ Insertar usuario
        conn.query(
          `INSERT INTO users (username, email, password, avatar)
           VALUES (?, ?, ?, ?)`,
          [username, email, hashedPassword, avatar || null],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Error al crear usuario",
                ok: false,
                error: err.message,
              });
            }

            // 4️⃣ Generar token
            const token = generateToken({
              id: result.insertId,
              email,
              role: "user",
            });

            return res.status(201).json({
              message: "Usuario registrado correctamente",
              ok: true,
              token,
            });
          },
        );
      } catch (hashError) {
        return res.status(500).json({
          message: "Error al encriptar contraseña",
          ok: false,
          error: hashError.message,
        });
      }
    },
  );
};

export const reactivateAccount = (req, res) => {
  const { email, password } = req.body;

  conn.query(
    "SELECT * FROM users WHERE email = ? AND is_active = FALSE",
    [email],
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
          message: "Cuenta no encontrada o ya activa",
        });
      }

      const user = results[0];

      try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({
            ok: false,
            message: "Contraseña incorrecta",
          });
        }

        conn.query(
          "UPDATE users SET is_active = TRUE, deleted_at = NULL WHERE id = ?",
          [user.id],
          (err) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                message: "Error al reactivar cuenta",
                error: err.message,
              });
            }

            const token = generateToken({
              id: user.id,
              email: user.email,
              role: user.role,
            });

            return res.status(200).json({
              message: "Cuenta reactivada correctamente",
              token,
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

export const login = (req, res) => {
  const { email, password } = req.body;

  conn.query(
    "SELECT * FROM users WHERE email = ? AND is_active = TRUE",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error en el servidor",
          ok: false,
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(400).json({
          message: "Credenciales inválidas",
          ok: false,
        });
      }

      const user = results[0];

      try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({
            message: "Credenciales inválidas",
            ok: false,
          });
        }

        // Generar token
        const token = generateToken({
          id: user.id,
          email: user.email,
          role: user.role,
        });

        return res.status(200).json({
          message: "Login exitoso",
          ok: true,
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
          },
        });
      } catch (compareError) {
        return res.status(500).json({
          message: "Error al verificar contraseña",
          ok: false,
          error: compareError.message,
        });
      }
    },
  );
};
