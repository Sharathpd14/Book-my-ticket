import { Seat } from "./booking.model.js";

export class BookingService {
  static async getSeats() {
    return await Seat.findAll();
  }

  static async bookSeat(seatId, userId) {
    return await Seat.bookSeat(seatId, userId);
  }
}