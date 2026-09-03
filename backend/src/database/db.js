/**
 * La conexion con la base.
 *
 * Es un **pool** y no una conexion unica. En un servidor persistente una sola
 * conexion alcanza, pero este backend corre como funcion serverless: cada
 * invocacion puede reusar una instancia tibia o levantar una nueva, y una
 * conexion suelta que se cae —por inactividad o por un reinicio del proveedor—
 * deja al proceso sirviendo errores hasta que alguien lo reinicia. El pool
 * reemplaza la conexion muerta solo.
 *
 * `connectionLimit` es deliberadamente bajo: lo que se multiplica en serverless
 * son las instancias, no las consultas dentro de una. Un limite alto por
 * instancia agota las conexiones del servidor sin darle mas velocidad a nadie.
 *
 * `multipleStatements` queda apagado. Estaba encendido para poder mandar el
 * script de tablas entero; ese script ahora vive en `migrar.js` y manda una
 * sentencia por vez, asi que la aplicacion ya no lo necesita, y apagarlo cierra
 * la puerta a que una inyeccion encadene una segunda sentencia.
 *
 * La interfaz que ven los controladores no cambia: `conn.query(sql, valores,
 * callback)` funciona igual en un pool que en una conexion.
 */

import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const conn = mysql2.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_MAX_CONEXIONES || 4),
  queueLimit: 0,
  /*
   * TiDB Cloud exige TLS y presenta un certificado de una autoridad que Node ya
   * confia, asi que no hace falta acompanar un CA propio. En un MySQL local no
   * hay TLS, y por eso la opcion se enciende por entorno en vez de siempre.
   */
  ...(process.env.DB_SSL === "true"
    ? { ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true } }
    : {}),
});
