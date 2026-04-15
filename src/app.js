import express from "express";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pool from "./common/config/db.js";
import { authenticate } from "./common/middleware/auth.middleware.js";
import authRoutes from "./modules/auth/auth.route.js";
import bookingRoutes from "./modules/booking/booking.route.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../index.html");
});

// Existing endpoints with auth
app.get("/seats", async (req, res) => {
  const result = await pool.query("select * from seats");
  res.send(result.rows);
});

app.put("/:id/:name", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.params.name;
    const userId = req.user.id;
    const conn = await pool.connect();
    await conn.query("BEGIN");
    const sql = "SELECT * FROM seats where id = $1 and isbooked = 0 FOR UPDATE";
    const result = await conn.query(sql, [id]);
    if (result.rowCount === 0) {
      res.send({ error: "Seat already booked" });
      return;
    }
    const sqlU = "update seats set isbooked = 1, name = $2, user_id = $3 where id = $1";
    const updateResult = await conn.query(sqlU, [id, name, userId]);
    await conn.query("COMMIT");
    conn.release();
    res.send(updateResult);
  } catch (ex) {
    console.log(ex);
    res.send(500);
  }
});

app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes);

export default app;