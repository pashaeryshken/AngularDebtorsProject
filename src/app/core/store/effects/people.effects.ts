import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {People} from '../../../shared/interfaces';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {PeopleService} from '../../../services/people.service';
import {
  AddPeopleAction,
  PeopleActionTypes,
  RemovePeopleAction,
  SetPeopleAction,
  SetPeoplesAction
} from '../actions/people.action';

@Injectable({providedIn: 'root'})
export class PeopleEffects {

  constructor(private actions$: Actions, private peopleService: PeopleService) {
  }

  @Effect()
  public getPeoples$: Observable<People[]> = this.actions$.pipe(
    ofType(PeopleActionTypes.GET_PEOPLES),
    switchMap(() => {
      return this.peopleService.getPeople();
    }),
    switchMap((peoples: People[]) => {
      return [new SetPeoplesAction(peoples)];
    }),
    catchError(() => [])
  );

  @Effect({dispatch: false})
  public setPeoples$: Observable<SetPeoplesAction> = this.actions$.pipe(
    ofType(PeopleActionTypes.SET_PEOPLES),
    tap((action: SetPeoplesAction) => {
      console.log('Set', action);
    })
  );

  @Effect({dispatch: false})
  public removePeoples$: Observable<RemovePeopleAction> = this.actions$.pipe(
    ofType(PeopleActionTypes.REMOVE_PEOPLE),
    switchMap((action: RemovePeopleAction) => {
      return this.peopleService.removePeople(action.id);
    })
  );

  @Effect()
  public addPeople$: Observable<SetPeopleAction> = this.actions$.pipe(
    ofType(PeopleActionTypes.ADD_PEOPLE),
    switchMap((action: AddPeopleAction) => {
      return this.peopleService.createPeople(action.people);
    }),
    switchMap((people: People) => {
      return [new SetPeopleAction(people)];
    })
  );

  @Effect({dispatch: false})
  public setPeople$: Observable<SetPeopleAction> = this.actions$.pipe(
    ofType(PeopleActionTypes.SET_PEOPLE),
    tap((action: SetPeopleAction) => {
      console.log('set_debtor', action);
    })
  );
}
