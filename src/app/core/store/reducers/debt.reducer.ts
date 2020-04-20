import {ActionReducer} from '@ngrx/store';
import {DebtState, initialDebtorState} from '../state/debt.state';
import {DebtAction, DebtActionTypes} from '../actions/debt.action';

export const debtReducer: ActionReducer<DebtState> =
  (state: DebtState = initialDebtorState, action: DebtAction): DebtState => {
    switch (action.type) {

      case DebtActionTypes.GET_DEBTOR: {
        return {...state, debtorLoading: true};
      }

      case DebtActionTypes.SET_DEBTOR: {
        return {...state, debtor: action.debtor, debtorLoading: false};
      }

      case DebtActionTypes.UPDATE_DEBTOR: {
        return {...state, debtorLoading: true};
      }

      default:
        return {...state};
    }
  };
