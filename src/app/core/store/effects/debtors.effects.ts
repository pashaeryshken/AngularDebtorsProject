import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DebtorsService} from '../../../services/debtors.service';
import {Observable} from 'rxjs';
import {
  AddDebtorAction,
  DebtorsActionTypes,
  RemoveDebtorsAction, SetNewDebtorAction,
  SetDebtorsAction, SuccessUpdateDebtorsAction, SuccessUpdateStatusDebtorsAction, UpdateDebtorsAction, UpdateStatusDebtorsAction
} from '../actions/debtors.action';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {DebtorsResponse, UpdateStatusDebtor} from '../../../shared/interfaces';

@Injectable({providedIn: 'root'})
export class DebtorsEffects {

  constructor(private actions$: Actions, private debtorsService: DebtorsService) {
  }

  @Effect()
  public getDebtors$: Observable<SetNewDebtorAction> = this.actions$.pipe(
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
  public addDebtors$: Observable<SetNewDebtorAction> = this.actions$.pipe(
    ofType(DebtorsActionTypes.ADD_DEBTOR),
    switchMap((action: AddDebtorAction) => {
      return this.debtorsService.setDebtor(action.debtor);
    }),
    switchMap((debtor: DebtorsResponse) => {
      return [new SetNewDebtorAction(debtor)];
    })
  );

  @Effect({dispatch: false})
  public setDebtor$: Observable<SetNewDebtorAction> = this.actions$.pipe(
    ofType(DebtorsActionTypes.SET_DEBTOR),
    tap((action: SetNewDebtorAction) => {
      console.log('set_debtor', action);
    })
  );

  @Effect()
  public updateDebtor$: Observable<DebtorsResponse> = this.actions$.pipe(
    ofType(DebtorsActionTypes.UPDATE_DEBTOR),
    switchMap((action: UpdateDebtorsAction) => {
      return this.debtorsService.UpdateDebtor(action.debtor);
    }),
    switchMap((debtor: DebtorsResponse) => {
      return [new SuccessUpdateDebtorsAction(debtor)];
    }),
    catchError(() => [])
  );

  @Effect({dispatch: false})
  public successUpdateDebtor$: Observable<SuccessUpdateDebtorsAction> = this.actions$.pipe(
    ofType(DebtorsActionTypes.SUCCESS_UPDATE_DEBTOR),
    tap((action: SuccessUpdateDebtorsAction) => {
      console.log('Set', action);
    })
  );

  @Effect({})
  public updateStatusDebtor$: Observable<SuccessUpdateStatusDebtorsAction> = this.actions$.pipe(
    ofType(DebtorsActionTypes.UPDATE_DEBTOR_STATUS),
    switchMap((action: UpdateStatusDebtorsAction) => {
      return this.debtorsService.updateStatus(action.statusBody);
    }),
    switchMap((status: UpdateStatusDebtor) => {
      return [new SuccessUpdateStatusDebtorsAction(status)];
    })
  );

  @Effect({dispatch: false})
  public successUpdateStatusDebtor$: Observable<SuccessUpdateStatusDebtorsAction> = this.actions$.pipe(
    ofType(DebtorsActionTypes.SUCCESS_UPDATE_DEBTOR_STATUS),
    tap((status: SuccessUpdateStatusDebtorsAction) => {

    })
  );
}
