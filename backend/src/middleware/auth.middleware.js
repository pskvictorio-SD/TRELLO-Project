import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Verificar que exista el header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token no proporcionado",
      });
    }

    // 2️⃣ Verificar formato: "Bearer TOKEN"
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Formato de token inválido",
      });
    }

    const token = parts[1];

    // 3️⃣ Verificar token
    const decoded = verifyToken(token);

    // 4️⃣ Guardar usuario en request
    req.user = decoded;

    // 5️⃣ Continuar
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
};
