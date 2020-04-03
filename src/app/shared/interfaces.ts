export interface User {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: string;
}

export interface SignData {
  userName: string;
  email: string;
  password: string;
}

export interface DebtorsResponse {
  avatar?: string;
  email: string;
  date: Date;
  dateOfPayment: Date;
  status: number;
  address: string;
  tNumber: string;
  currency: string;
  _id?: string;
  isI: boolean;
  name: string;
  amount: number;
}

export interface UserData {
  email: string;
  userName: string;
  iTotalAmount: number;
  debtorsTotal: number;
}

export interface UserToken {
  token: string;
  tokenExp: string;
  TokenRefresh: string;
}
