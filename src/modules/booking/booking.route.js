import express from "express";
import { BookingController } from "./booking.controller.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";

const router = express.Router();

router.get("/seats", BookingController.getSeats);
router.post("/book", authenticate, BookingController.bookSeat);

export default router;