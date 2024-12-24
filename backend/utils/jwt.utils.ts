// backend/utils/auth.utils.ts

import jwt, { JwtPayload } from "jsonwebtoken";
import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'
configDotenv({
  path: resolve(__dirname, "../.env")
});

// Validate environment variables
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("Missing JWT secrets in environment variables");
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

/**
 * Generate an access token with a short expiration time.
 * @param userId - User ID
 * @param role - User role
 * @param username - Username
 * @returns JWT access token
 */
export const generateAccessToken = (userId: string, role: string, username: string): string => {
  return jwt.sign({ userId, role, username }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

/**
 * Generate a refresh token with a longer expiration time.
 * @param userId - User ID
 * @returns JWT refresh token
 */
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

/**
 * Verify and decode the access token.
 * @param token - JWT access token
 * @returns Decoded token payload or null if invalid
 */
export const verifyAccessToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
  } catch (error: any) {
    console.error("Error verifying access token:", error.message);
    return null;
  }
};
/**
 * Verify and decode the refresh token.
 * @param token - JWT refresh token
 * @returns Decoded token payload or null if invalid
 */
export const verifyRefreshToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return null;
  }
};
