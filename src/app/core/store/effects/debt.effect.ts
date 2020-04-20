import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {DebtActionTypes, GetDebtAction, SetDebtAction} from '../actions/debt.action';
import {switchMap, tap} from 'rxjs/operators';
import {DebtorsService} from '../../../services/debtors.service';
import {DebtorsResponse} from '../../../shared/interfaces';
import {SetDebtorsAction} from '../actions/debtors.action';


@Injectable({providedIn: 'root'})
export class DebtEffect {

  constructor(private debtorService: DebtorsService, private actions$: Actions) {
  }


  @Effect()
  public getDebt$: Observable<SetDebtAction> = this.actions$.pipe(
    ofType(DebtActionTypes.GET_DEBTOR),
    switchMap( (action: GetDebtAction) => {
      return this.debtorService.getDebtor(action.debtId);
    }),
    switchMap((debtor: DebtorsResponse) => {
      return [new SetDebtAction(debtor)];
    })
  );

  @Effect({dispatch: false})
  public setDebt$: Observable<SetDebtAction> = this.actions$.pipe(
    ofType(DebtActionTypes.SET_DEBTOR),
    tap((action: SetDebtAction) => {
      console.log('Set', action);
    })
  );
}
