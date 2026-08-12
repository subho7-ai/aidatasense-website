import type { AuthResponse } from "@aidatasense/shared";
import { apiFetch } from "./client";

export function signup(email: string, password: string, name: string): Promise<AuthResponse> {
  return apiFetch("/auth/signup", { method: "POST", body: JSON.stringify({ email, password, name }) });
}

export function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export function refresh(): Promise<AuthResponse> {
  return apiFetch("/auth/refresh", { method: "POST" });
}

export function logout(): Promise<null> {
  return apiFetch("/auth/logout", { method: "POST" });
}

export function fetchMe(): Promise<{ user: AuthResponse["user"] }> {
  return apiFetch("/auth/me");
}
