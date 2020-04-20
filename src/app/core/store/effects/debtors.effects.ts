import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DebtorsService} from '../../../services/debtors.service';
import {Observable} from 'rxjs';
import {
  AddDebtorAction,
  DebtorsActionTypes,
  RemoveDebtorsAction, SetDebtorAction,
<<<<<<< HEAD
  SetDebtorsAction, SuccessUpdateDebtorsAction, UpdateDebtorsAction
=======
  SetDebtorsAction, UpdateDebtorsAction
>>>>>>> master
} from '../actions/debtors.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {DebtorsResponse, UpdateDebtor} from '../../../shared/interfaces';

@Injectable({providedIn: 'root'})
export class DebtorsEffects {

  constructor(private actions$: Actions, private debtorsService: DebtorsService) {
  }

  @Effect()
  public getDebtors$: Observable<DebtorsResponse[]> = this.actions$.pipe(
    ofType(DebtorsActionTypes.GET_DEBTORS),
    switchMap(() => {
      return this.debtorsService.getDebtors();
    }),
    switchMap((debtors: DebtorsResponse[]) => {
      return [new SetDebtorsAction(debtors)];
    }),
    catchError(() => [])
  );

  @Effect({dispatch: false})
  public setDebtors$: Observable<SetDebtorsAction> = this.actions$.pipe(
    ofType(DebtorsActionTypes.SET_DEBTORS),
    tap((action: SetDebtorsAction) => {
      console.log('Set', action);
    })
  );

  @Effect({dispatch: false})
  public removeDebtors$: Observable<RemoveDebtorsAction> = this.actions$.pipe(
    ofType(DebtorsActionTypes.REMOVE_DEBTORS),
    switchMap((action: RemoveDebtorsAction) => {
      return this.debtorsService.removeDebtor(action.id);
    })
  );

  @Effect()
  public addDebtors$: Observable<SetDebtorAction> = this.actions$.pipe(
    ofType(DebtorsActionTypes.ADD_DEBTOR),
    switchMap((action: AddDebtorAction) => {
      return this.debtorsService.setDebtor(action.debtor);
    }),
    switchMap((debtor: DebtorsResponse) => {
      return [new SetDebtorAction(debtor)];
    })
  );

  @Effect({dispatch: false})
  public setDebtor$: Observable<SetDebtorAction> = this.actions$.pipe(
    ofType(DebtorsActionTypes.SET_DEBTOR),
<<<<<<< HEAD
    tap((action: SetDebtorAction) => {
=======
    tap( (action: SetDebtorAction) => {
>>>>>>> master
      console.log('set_debtor', action);
    })
  );

  @Effect({dispatch: false})
<<<<<<< HEAD
  public successUpdateDebtor$: Observable<SuccessUpdateDebtorsAction> = this.actions$.pipe(
    ofType(DebtorsActionTypes.SUCCESS_UPDATE_DEBTOR),
    tap((action: SuccessUpdateDebtorsAction) => {
      console.log('Set', action);
=======
  public updateDebtor$: Observable<UpdateDebtor> = this.actions$.pipe(
    ofType(DebtorsActionTypes.UPDATE_DEBTOR),
    switchMap( (action: UpdateDebtorsAction) => {
        return this.debtorsService.UpdateDebtor(action.debtor).pipe();
>>>>>>> master
    })
  );
}
