export interface IUserDB {
  username: string;
  email: string;
  password: string;
}

export interface ICategoryDB {
  name: string;
}
export interface IExpenseDB {
  amount: number;
  category: string;
  description: string;
}
export interface IIncomeDB {
  amount: number;
  category: string;
  description: string;
}
