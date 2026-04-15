import pool from "../../common/config/db.js";
import bcrypt from "bcrypt";

export class User {
  static async create(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query("SELECT id, email FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }
}