import jwt from "jsonwebtoken";

/**
 * Genera un token JWT
 * @param {Object} payload - Datos que queremos guardar dentro del token
 * @param {String} expiresIn - Tiempo de expiración (ej: "1h", "7d")
 */
export const generateToken = (payload, expiresIn = process.env.JWT_EXPIRES) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
};

/**
 * Verifica si el token es válido
 * @param {String} token
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Decodifica el token sin verificar firma
 * (Útil para debugging, NO para seguridad)
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};
