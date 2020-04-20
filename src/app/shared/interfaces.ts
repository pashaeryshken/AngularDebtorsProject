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
  people: People;
<<<<<<< HEAD
  dateStart: Date;
  dateEnd: Date;
=======
  date: Date;
  dateOfPayment: Date;
>>>>>>> master
  status: number;
  currency: string;
  _id?: string;
  isI: boolean;
  amount: number;
  peopleId?: string;
}

export interface UpdateDebtor {
<<<<<<< HEAD
  dateStart?: Date;
  dateEnd?: Date;
=======
  date?: Date;
  dateOfPayment?: Date;
>>>>>>> master
  status?: number;
  currency?: string;
  id: string;
  isI?: boolean;
  amount?: number;
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

export interface People {
  _id?: string;
  email: string;
  name: string;
  address: string;
  tNumber: string;
  avatar: string;
}
