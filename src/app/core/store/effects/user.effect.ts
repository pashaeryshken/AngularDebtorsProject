import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../../services/auth.service';
import {GetUsersAction, SetUserAction, UserActionTypes} from '../actions/user.action';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserData} from '../../../shared/interfaces';

@Injectable({providedIn: 'root'})
export class UserEffect {

  constructor(private actions$: Actions, private authService: AuthService) {
  }

  @Effect()
  public getUser$: Observable<UserData> = this.actions$.pipe(
    ofType(UserActionTypes.GET_USER),
    switchMap((action: GetUsersAction) => {
      console.log(action);
      return this.authService.userData();
    }),
    switchMap((user: UserData) => {
      console.log(user);
      return [new SetUserAction(user)];
    }),
    catchError(() => [])
  );

  @Effect({dispatch: false})
  public setUser$: Observable<SetUserAction> = this.actions$.pipe(
    ofType(UserActionTypes.SET_USER),
    tap((action: SetUserAction) => {
      console.log('Set', action);
    })
  );
}
