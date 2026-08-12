export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateCheckoutSessionRequest {
  courseId: string;
}

export interface CreateCheckoutSessionResponse {
  url: string;
}

export interface ApiErrorBody {
  error: string;
}
