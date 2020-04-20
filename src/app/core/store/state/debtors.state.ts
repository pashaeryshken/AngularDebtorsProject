import {DebtorsResponse} from '../../../shared/interfaces';

export interface DebtorsState {
  debtors: DebtorsResponse[];
  debtorsLoading: boolean;
}

export const initialDebtorState: DebtorsState = {
  debtors: [],
  debtorsLoading: false,
};
