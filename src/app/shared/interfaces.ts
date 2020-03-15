export interface User {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  expiresIn: string
}

export interface SignData {
  userName: string
  email: string
  password: string
}
