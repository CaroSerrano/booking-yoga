import bcrypt from "bcrypt";
import type { User } from "booking-domain";

export const createHash = async (password:string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const isValidPassword = async (user: User, password: string )=> {
  return await bcrypt.compare(password, user.password);
};