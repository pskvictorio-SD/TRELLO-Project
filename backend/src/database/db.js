import mysql2 from "mysql2";
import dotenv from "dotenv";
import {script_db} from "./script_db.js";

dotenv.config();

export const conn = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  multipleStatements: true,
});

conn.query(script_db, (err) => {
    if (err) {
        console.error("Error executing database script:", err);
        return;
    }
    console.log("✅ Database initialized successfully.");
});

conn.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("✅ Connected to the MySQL database.");
})