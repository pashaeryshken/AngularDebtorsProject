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

export interface DebtorsResponse {
  date: Date
  dateOfPayment: Date
  status: number
  currency: string
  _id: string
  isI: boolean
  name: string
  amount: number
}
