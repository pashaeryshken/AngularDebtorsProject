import {initialUserState, UserState} from '../state/user.state';
import {UserAction, UserActionTypes} from '../actions/user.action';
import {ActionReducer} from '@ngrx/store';

export const userReducer: ActionReducer<UserState> =
  (state: UserState = initialUserState, action: UserAction): UserState => {
    switch (action.type) {
      case UserActionTypes.GET_USER: {
        return {...state, userLoading: true};
      }
      case UserActionTypes.SET_USER: {
        return {...state, user: action.user, userLoading: false};
      }
      default:
        return state;
    }
  };
