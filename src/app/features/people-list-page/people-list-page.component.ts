import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {People} from '../../shared/interfaces';
import {Observable, Subject} from 'rxjs';
import {GetPeopleAction} from '../../core/store/actions/people.action';
import {AppState} from '../../core/store/state/app.state';
import {map, takeUntil} from 'rxjs/operators';
import {PopupShowService} from '../../services/popupShow.service';
import {DebtorsState} from '../../core/store/state/debtors.state';
import {PeopleState} from '../../core/store/state/people.state';
import {SearchPeopleService} from '../../services/search/search-people.service';

@Component({
  selector: 'app-people-list-page',
  templateUrl: './people-list-page.component.html',
  styleUrls: ['./people-list-page.component.scss']
})

export class PeopleListPageComponent implements OnDestroy{
  public peoples: People[];
  public destroy$: Subject<void> = new Subject();
  public peopleLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private popupShowService: PopupShowService, public searchPeopleService: SearchPeopleService) {
    this.store.dispatch(new GetPeopleAction());
    this.store.select((state: AppState) => {
      return state.peopleState.peoples;
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe((peoples) => {
      this.peoples = peoples;
    });

    this.peopleLoading$ = this.store.select('peopleState').pipe(
      map((state: PeopleState) => {
        return state.peopleLoading;
      })
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public showPopupCreatePeople(event: MouseEvent): void {
    event.preventDefault();
    this.popupShowService.showPopupEditPeople();
  }
}
