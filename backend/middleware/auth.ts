import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticate(
  req: Request & { user?: Record<string, unknown> },
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing token" });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: "JWT secret not configured" });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, secret) as Record<string, unknown>;
    req.user = payload;
    next();
  } catch (err) {
    const message =
      err instanceof Error && err.name === "TokenExpiredError"
        ? "Token expired"
        : "Invalid token";
    res.status(401).json({ error: message });
  }
}