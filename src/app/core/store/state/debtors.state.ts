import {DebtorsResponse} from '../../../shared/interfaces';

export interface DebtorsState {
  debtors: DebtorsResponse[];
  debtorsLoading: boolean;
<<<<<<< HEAD
=======
  debtorUpdate: boolean;
>>>>>>> Revert "finaly commit"
}

export const initialDebtorState: DebtorsState = {
  debtors: [],
  debtorsLoading: false,
<<<<<<< HEAD
=======
  debtorUpdate: false
>>>>>>> Revert "finaly commit"
};
