import {Action} from '@ngrx/store';
import {DebtorsResponse} from '../../../shared/interfaces';

export enum DebtorsActionTypes {
  GET_DEBTORS = 'GET_DEBTORS',
  SET_DEBTORS = 'SET_DEBTORS',
  SET_DEBTOR = 'SET_DEBTOR',
  REMOVE_DEBTORS = 'REMOVE_DEBTORS',
  ADD_DEBTOR = 'ADD_DEBTOR'
}

export class GetDebtorsAction implements Action {
  public type: DebtorsActionTypes.GET_DEBTORS = DebtorsActionTypes.GET_DEBTORS;
}

export class SetDebtorsAction implements Action {
  public type: DebtorsActionTypes.SET_DEBTORS = DebtorsActionTypes.SET_DEBTORS;
  constructor(public debtors: DebtorsResponse[]) {
  }
}
export class AddDebtorAction implements Action {
  public type: DebtorsActionTypes.ADD_DEBTOR = DebtorsActionTypes.ADD_DEBTOR;
  constructor(public debtor: DebtorsResponse | FormData) {
  }
}

export class SetDebtorAction implements Action {
  public type: DebtorsActionTypes.SET_DEBTOR = DebtorsActionTypes.SET_DEBTOR;
  constructor(public debtor: DebtorsResponse) {
  }
}

export class RemoveDebtorsAction implements Action {
  public type: DebtorsActionTypes.REMOVE_DEBTORS = DebtorsActionTypes.REMOVE_DEBTORS;
  constructor(public id: string) {
  }
}

export type DebtorsAction = GetDebtorsAction | SetDebtorsAction | AddDebtorAction | RemoveDebtorsAction | SetDebtorAction;
