import {UserData, UserToken} from '../../../shared/interfaces';

export interface UserState {
  user: UserData;
  userLoading: boolean;
}

export const initialUserState: UserState = {
  user: null,
  userLoading: false
};
