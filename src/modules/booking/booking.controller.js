import { BookingService } from "./booking.service.js";

export class BookingController {
  static async getSeats(req, res) {
    try {
      const seats = await BookingService.getSeats();
      res.json(seats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async bookSeat(req, res) {
    try {
      const { seatId } = req.body;
      const userId = req.user.id;
      const result = await BookingService.bookSeat(seatId, userId);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}