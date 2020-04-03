import {Action} from '@ngrx/store';
import {UserData} from '../../../shared/interfaces';

export enum UserActionTypes {
  SET_USER = 'SET_USER',
  GET_USER = 'GET_USER'
}

export class GetUsersAction implements Action {
  public type: UserActionTypes.GET_USER = UserActionTypes.GET_USER;
}

export class SetUserAction implements Action {
  public type: UserActionTypes.SET_USER = UserActionTypes.SET_USER;
  constructor(public user: UserData) {
  }
}

export type UserAction = GetUsersAction | SetUserAction;
