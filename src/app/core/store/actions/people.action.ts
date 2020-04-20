import {Action} from '@ngrx/store';
import {DebtorsResponse, People} from '../../../shared/interfaces';

export enum PeopleActionTypes {
  GET_PEOPLES = 'GET_PEOPLES',
  SET_PEOPLES = 'SET_PEOPLES',
  SET_PEOPLE = 'SET_PEOPLE',
  REMOVE_PEOPLE = 'REMOVE_PEOPLE',
  ADD_PEOPLE = 'ADD_PEOPLE',
  UPDATE_PEOPLE = 'UPDATE_PEOPLE',
}

export class GetPeopleAction implements Action {
  public type: PeopleActionTypes.GET_PEOPLES = PeopleActionTypes.GET_PEOPLES;
}

export class SetPeoplesAction implements Action {
  public type: PeopleActionTypes.SET_PEOPLES = PeopleActionTypes.SET_PEOPLES;
  constructor(public peoples: People[]) {
  }
}

export class AddPeopleAction implements Action {
  public type: PeopleActionTypes.ADD_PEOPLE = PeopleActionTypes.ADD_PEOPLE;

  constructor(public people: People | FormData) {
  }
}
export class SetPeopleAction implements Action {
  public type: PeopleActionTypes.SET_PEOPLE = PeopleActionTypes.SET_PEOPLE;

  constructor(public people: People) {
  }
}

export class RemovePeopleAction implements Action {
  public type: PeopleActionTypes.REMOVE_PEOPLE = PeopleActionTypes.REMOVE_PEOPLE;

  constructor(public id: string) {
  }
}

export class UpdatePeopleAction implements Action {
  public type: PeopleActionTypes.UPDATE_PEOPLE = PeopleActionTypes.UPDATE_PEOPLE;

  constructor(public people: People) {
  }
}

export type PeopleAction = GetPeopleAction
  | SetPeoplesAction
  | AddPeopleAction
  | SetPeopleAction
  | RemovePeopleAction
  | UpdatePeopleAction;
