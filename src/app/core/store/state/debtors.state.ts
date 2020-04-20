import {DebtorsResponse} from '../../../shared/interfaces';

export interface DebtorsState {
  debtors: DebtorsResponse[];
  debtorsLoading: boolean;
<<<<<<< HEAD
  debtorUpdate: boolean;
=======
>>>>>>> master
}

export const initialDebtorState: DebtorsState = {
  debtors: [],
  debtorsLoading: false,
<<<<<<< HEAD
  debtorUpdate: false
=======
>>>>>>> master
};
