import {Action} from '@ngrx/store';
import {DebtorsResponse, UpdateStatusDebtor} from '../../../shared/interfaces';

export enum DebtorsActionTypes {
  GET_DEBTORS = 'GET_DEBTORS',
  SET_DEBTORS = 'SET_DEBTORS',
  SET_DEBTOR = 'SET_DEBTOR',
  REMOVE_DEBTORS = 'REMOVE_DEBTORS',
  ADD_DEBTOR = 'ADD_DEBTOR',
  UPDATE_DEBTOR = 'UPDATE_DEBTOR',
  SUCCESS_UPDATE_DEBTOR = 'SUCCESS_UPDATE_DEBTOR',
  UPDATE_DEBTOR_STATUS = 'UPDATE_DEBTOR_STATUS',
  SUCCESS_UPDATE_DEBTOR_STATUS = 'SUCCESS_UPDATE_DEBTOR_STATUS',
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

  constructor(public debtor: DebtorsResponse) {
  }
}

export class SetNewDebtorAction implements Action {
  public type: DebtorsActionTypes.SET_DEBTOR = DebtorsActionTypes.SET_DEBTOR;

  constructor(public debtor: DebtorsResponse) {
  }
}

export class RemoveDebtorsAction implements Action {
  public type: DebtorsActionTypes.REMOVE_DEBTORS = DebtorsActionTypes.REMOVE_DEBTORS;

  constructor(public id: string) {
  }
}

export class UpdateDebtorsAction implements Action {
  public type: DebtorsActionTypes.UPDATE_DEBTOR = DebtorsActionTypes.UPDATE_DEBTOR;

  constructor(public debtor: DebtorsResponse) {
  }
}

export class SuccessUpdateDebtorsAction implements Action {
  public type: DebtorsActionTypes.SUCCESS_UPDATE_DEBTOR = DebtorsActionTypes.SUCCESS_UPDATE_DEBTOR;

  constructor(public debtor: DebtorsResponse) {
  }
}

export class UpdateStatusDebtorsAction implements Action {
  public type: DebtorsActionTypes.UPDATE_DEBTOR_STATUS = DebtorsActionTypes.UPDATE_DEBTOR_STATUS;
  constructor(public statusBody: UpdateStatusDebtor) {
  }
}

export class SuccessUpdateStatusDebtorsAction implements Action {
  public type: DebtorsActionTypes.SUCCESS_UPDATE_DEBTOR_STATUS = DebtorsActionTypes.SUCCESS_UPDATE_DEBTOR_STATUS;
  constructor(public status: UpdateStatusDebtor) {
  }
}

export type DebtorsAction = GetDebtorsAction
  | SetDebtorsAction
  | AddDebtorAction
  | RemoveDebtorsAction
  | SetNewDebtorAction
  | UpdateDebtorsAction
  | SuccessUpdateDebtorsAction
  | UpdateStatusDebtorsAction
  | SuccessUpdateStatusDebtorsAction;
