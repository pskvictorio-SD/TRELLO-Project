/**
 * Crea la base y las tablas. Se corre a mano, una vez: `npm run migrar`.
 *
 * Son dos conexiones y no una porque la primera sentencia crea la base: no se
 * puede pedir `database: tu_equipo` antes de que exista. La segunda ya entra
 * apuntada a ella.
 */

import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
import { ESQUEMA, NOMBRE_BASE } from "./esquema.js";

dotenv.config();

const tls =
  process.env.DB_SSL === "true"
    ? { ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true } }
    : {};

const credenciales = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ...tls,
};

const sinBase = await mysql2.createConnection(credenciales);
await sinBase.query(`CREATE DATABASE IF NOT EXISTS \`${NOMBRE_BASE}\``);
await sinBase.end();
console.log(`✅ Base \`${NOMBRE_BASE}\` lista.`);

const bd = await mysql2.createConnection({ ...credenciales, database: NOMBRE_BASE });

for (const [indice, sentencia] of ESQUEMA.entries()) {
  const nombre = sentencia.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1] ?? `#${indice + 1}`;
  await bd.query(sentencia);
  console.log(`✅ ${nombre}`);
}

await bd.end();
console.log("✅ Esquema aplicado.");
