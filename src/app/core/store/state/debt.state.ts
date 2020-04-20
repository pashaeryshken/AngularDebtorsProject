import {DebtorsResponse} from '../../../shared/interfaces';

export interface DebtState {
  debtorLoading: boolean;
  debtor: DebtorsResponse;
}

export const initialDebtorState: DebtState = {
  debtorLoading: false,
  debtor: null
};
