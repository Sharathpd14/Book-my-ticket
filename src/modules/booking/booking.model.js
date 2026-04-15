import pool from "../../common/config/db.js";

export class Seat {
  static async findAll() {
    const result = await pool.query("SELECT * FROM seats");
    return result.rows;
  }

  static async bookSeat(id, userId) {
    const conn = await pool.connect();
    try {
      await conn.query("BEGIN");
      const sql = "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE";
      const result = await conn.query(sql, [id]);
      if (result.rowCount === 0) {
        throw new Error("Seat already booked");
      }
      const sqlU = "UPDATE seats SET isbooked = 1, user_id = $2 WHERE id = $1";
      await conn.query(sqlU, [id, userId]);
      await conn.query("COMMIT");
      return { message: "Seat booked successfully" };
    } catch (error) {
      await conn.query("ROLLBACK");
      throw error;
    } finally {
      conn.release();
    }
  }
}