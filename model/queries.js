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
      
      return result.rows[0];
    } else {
      return new Error("No se encontraron Usuarios");
    }
  } catch (error) {
    console.log("Query Error code: ", error.code, "Error: ", error.message);
  }
}


export const updateSkaterQuery = async (email, nombre, password, anos_experiencia, especialidad ) => {
  try {
    const sql = {
      text: "UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 WHERE email = $5 returning *",
      values: [nombre, password, anos_experiencia, especialidad, email],
    }
    const result = await pool.query(sql);
    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      return new Error("No se pudo actualizar el skater");
    }
  } catch (error) {
    console.log("Query Error code: ", error.code, "Error: ", error.message);
  }
}

export const deleteSkaterQuery = async (email) => {
  try {
    const sql = {
      text: "DELETE FROM skaters WHERE email = $1",
      values: [email],
    };
    const result = await pool.query(sql);
    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      return new Error("No se pudo borrar el skater");
    }
  } catch (error) {
    console.log("Query Error code: ", error.code, "Error: ", error.message);
  }
}

export const adminAprovalQuery = async (email, estado) => {
  try {
    const sql = {
      text: "UPDATE skaters SET estado = $1 WHERE email = $2",
      values: [estado, email],
    };
    const result = await pool.query(sql);
    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      return new Error("No se pudo borrar el skater");
    }
  } catch (error) {
    console.log("Query Error code: ", error.code, "Error: ", error.message);
  }
}