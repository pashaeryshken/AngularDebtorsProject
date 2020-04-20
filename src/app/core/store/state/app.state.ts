import { UserState} from './user.state';
import {ActionReducerMap} from '@ngrx/store/src/models';
import {userReducer} from '../reducers/user.reducer';
import {DebtorsState,} from './debtors.state';
import {debtorsReducer} from '../reducers/debtors.reducer';
import {PeopleState} from './people.state';
import {peopleReducer} from '../reducers/people.reducer';
import {debtReducer} from '../reducers/debt.reducer';
import {DebtState} from './debt.state';

export interface AppState {
  userData: UserState;
  debtorsState: DebtorsState;
  peopleState: PeopleState;
  debtorState: DebtState;
}

export const reducerMap: ActionReducerMap<AppState> = {
  userData: userReducer,
  debtorsState: debtorsReducer,
  peopleState: peopleReducer,
  debtorState: debtReducer
};
