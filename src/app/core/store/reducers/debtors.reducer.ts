import {DebtorsState, initialDebtorState} from '../state/debtors.state';
import {DebtorsAction, DebtorsActionTypes} from '../actions/debtors.action';
import {ActionReducer} from '@ngrx/store';
import {DebtorsResponse} from '../../../shared/interfaces';

export const debtorsReducer: ActionReducer<DebtorsState> =
  (state: DebtorsState = initialDebtorState, action: DebtorsAction): DebtorsState => {
    switch (action.type) {

      case DebtorsActionTypes.GET_DEBTORS: {
        return {...state, debtorsLoading: true};
      }
      case DebtorsActionTypes.SET_DEBTORS: {
        return {...state, debtors: action.debtors, debtorsLoading: false};
      }
      case DebtorsActionTypes.ADD_DEBTOR: {
        return {...state};
      }
      case DebtorsActionTypes.SET_DEBTOR: {
        return {...state, debtors: [...state.debtors, action.debtor]};
      }
      case DebtorsActionTypes.REMOVE_DEBTORS: {
        return {...state, debtors: [...state.debtors].filter( (debtor) => debtor._id !== action.id)};
      }
      case DebtorsActionTypes.UPDATE_DEBTOR: {
        return {...state, debtors: [...state.debtors]
            .map( (debtor) => {
            if (debtor._id === action.debtor.id) {
              const updateDebtor: DebtorsResponse = {...debtor};
              for (const key in action.debtor) {
                if (key !== 'id') {
                  updateDebtor[key] = action.debtor[key];
                }
              }
              return updateDebtor;
            }
            return debtor;
          })};
      }

      default:
        return state;
    }
  };
