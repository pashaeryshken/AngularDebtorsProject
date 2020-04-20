import {Action} from '@ngrx/store';
import {DebtorsResponse} from '../../../shared/interfaces';

export enum DebtActionTypes {
  GET_DEBTOR = 'GET_DEBTOR',
  SET_DEBTOR = 'SET_DEBTOR',
  UPDATE_DEBTOR = 'UPDATE_DEBTOR'
}

export class GetDebtAction implements Action {
  public type: DebtActionTypes.GET_DEBTOR = DebtActionTypes.GET_DEBTOR;
  constructor(public debtId: string) {
  }
}

export class SetDebtAction implements Action {
  public type: DebtActionTypes.SET_DEBTOR = DebtActionTypes.SET_DEBTOR;

  constructor(public debtor: DebtorsResponse) {
  }
}

export class UpdateDebtAction implements Action {
  public type: DebtActionTypes.UPDATE_DEBTOR = DebtActionTypes.UPDATE_DEBTOR;
  constructor(public debtor: DebtorsResponse) {
  }
}



export type DebtAction = GetDebtAction
  | SetDebtAction
  | UpdateDebtAction;
