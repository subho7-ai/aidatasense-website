import type { Request, Response } from "express";
import { prisma } from "../services/prisma";
import { createUser, issueTokens, toPublicUser, verifyCredentials } from "../services/auth.service";
import { verifyRefreshToken } from "../utils/jwt";

const REFRESH_COOKIE_NAME = "refreshToken";
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/api/auth",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export async function signup(req: Request, res: Response) {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "email, password, and name are required" });
  }

  try {
    const user = await createUser(email, password, name);
    const tokens = issueTokens(user);
    res.cookie(REFRESH_COOKIE_NAME, tokens.refreshToken, REFRESH_COOKIE_OPTIONS);
    return res.status(201).json({ accessToken: tokens.accessToken, user: toPublicUser(user) });
  } catch (error) {
    return res.status(409).json({ error: (error as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  try {
    const user = await verifyCredentials(email, password);
    const tokens = issueTokens(user);
    res.cookie(REFRESH_COOKIE_NAME, tokens.refreshToken, REFRESH_COOKIE_OPTIONS);
    return res.json({ accessToken: tokens.accessToken, user: toPublicUser(user) });
  } catch (error) {
    return res.status(401).json({ error: (error as Error).message });
  }
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.[REFRESH_COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ error: "Missing refresh token" });
  }

  try {
    const payload = verifyRefreshToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    const tokens = issueTokens(user);
    res.cookie(REFRESH_COOKIE_NAME, tokens.refreshToken, REFRESH_COOKIE_OPTIONS);
    return res.json({ accessToken: tokens.accessToken, user: toPublicUser(user) });
  } catch {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
}

export function logout(_req: Request, res: Response) {
  res.clearCookie(REFRESH_COOKIE_NAME, { path: REFRESH_COOKIE_OPTIONS.path });
  return res.status(204).send();
}

export async function me(req: Request, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json({ user: toPublicUser(user) });
}
