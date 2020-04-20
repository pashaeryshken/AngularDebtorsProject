import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {People} from '../../shared/interfaces';
import {Subject} from 'rxjs';
import {GetPeopleAction} from '../../core/store/actions/people.action';
import {AppState} from '../../core/store/state/app.state';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-people-list-page',
  templateUrl: './people-list-page.component.html',
  styleUrls: ['./people-list-page.component.scss']
})

export class PeopleListPageComponent implements OnDestroy{
  public people: People[];
  public destroy$: Subject<void> = new Subject();

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new GetPeopleAction());
    this.store.select((state: AppState) => {
      return state.peopleState.peoples;
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe((peoples) => {
      this.people = peoples;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
