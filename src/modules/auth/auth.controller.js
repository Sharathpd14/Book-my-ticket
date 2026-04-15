import { AuthService } from "./auth.service.js";

export class AuthController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.register(email, password);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}