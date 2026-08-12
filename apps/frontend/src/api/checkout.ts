import type { CreateCheckoutSessionResponse } from "@aidatasense/shared";
import { apiFetch } from "./client";

export function createCheckoutSession(courseId: string): Promise<CreateCheckoutSessionResponse> {
  return apiFetch("/checkout/create-session", { method: "POST", body: JSON.stringify({ courseId }) });
}
