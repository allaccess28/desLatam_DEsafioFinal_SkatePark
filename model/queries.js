import { pool } from "../config/db.js";

export const addSkaterQuery = async (
  email,
  nombre,
  password,
  anos_experiencia,
  especialidad,
  foto,
  estado
) => {
  try {
    const sql = {
      text: "INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      values: [
        email,
        nombre,
        password,
        anos_experiencia,
        especialidad,
        foto,
        estado,
      ],
    };
    const result = await pool.query(sql);
    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      return new Error("No se pudo registrar el skater");
    }
  } catch (error) {
    console.log("Query Error code: ", error.code, "Error: ", error.message);
  }
};

export const getSkatersQuery = async () => {
  try {
    const sql = {
      text: "SELECT * FROM skaters",
    };
    const result = await pool.query(sql);
    if (result.rowCount > 0) {
      console.log(result.rows);
      return result.rows;
    } else {
      return new Error("No se encontraron skaters");
    }
  } catch (error) {
    console.log("Query Error code: ", error.code, "Error: ", error.message);
  }
};

export const verifyUserQuery = async (email) => {
  try {
    const sql = {
      text: "SELECT * FROM skaters WHERE email = $1",
      values: [email],
    };
    const result = await pool.query(sql);
    if (result.rowCount > 0) {
      console.log(result.rows);
      return result.rows[0];
    } else {
      return new Error("No se encontraron Usuarios");
    }
  } catch (error) {
    console.log("Query Error code: ", error.code, "Error: ", error.message);
  }
}