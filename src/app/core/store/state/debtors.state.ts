import {DebtorsResponse} from '../../../shared/interfaces';

export interface DebtorsState {
  debtors: DebtorsResponse[];
  debtorsLoading: boolean;
  debtorUpdate: boolean;
  statusUpdate: boolean;
  debtor: DebtorsResponse;
}

export const initialDebtorsState: DebtorsState = {
  debtors: [],
  debtorsLoading: false,
  debtorUpdate: false,
  statusUpdate: false,
  debtor: null
};
