import {DebtorsResponse} from '../../../shared/interfaces';

export interface DebtorsState {
  debtors: DebtorsResponse[];
  debtorsLoading: boolean;
  debtorUpdate: boolean;
}

export const initialDebtorState: DebtorsState = {
  debtors: [],
  debtorsLoading: false,
  debtorUpdate: false
};
