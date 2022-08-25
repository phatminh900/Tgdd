import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { promisify } from "util";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;
export const signJwt = (id: string) => {
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!;
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
export const verifyJwt = async (token: string) => {
  try {
    // @ts-ignore
    return await promisify(jwt.verify)(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};
