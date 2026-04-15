import { User } from "./auth.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../common/utils/jwt.utils.js";

export class AuthService {
  static async register(email, password) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const user = await User.create(email, password);
    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
  }

  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    const token = generateToken({ id: user.id, email: user.email });
    return { user: { id: user.id, email: user.email }, token };
  }
}