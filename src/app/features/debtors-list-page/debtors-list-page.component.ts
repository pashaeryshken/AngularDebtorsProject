import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DebtorsResponse} from '../../shared/interfaces';
import {Observable, Subject} from 'rxjs';
import {SearchDebtorService} from '../../services/search/search-debtor.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/store/state/app.state';
import {GetDebtorsAction} from '../../core/store/actions/debtors.action';
import {map, takeUntil} from 'rxjs/operators';
import {DebtorsState} from '../../core/store/state/debtors.state';
import {PopupShowService} from '../../services/popupShow.service';

@Component({
  selector: 'app-debtors-list-page',
  templateUrl: './debtors-list-page.component.html',
  styleUrls: ['./debtors-list-page.component.scss']
})
export class DebtorsListPageComponent implements OnInit, OnDestroy {

  public debtors: DebtorsResponse[] = [];
  public destroy$: Subject<void> = new Subject();
  public debtorsLoading$: Observable<boolean>;
  @Input() public searchStr: string;

  constructor(
    public searchService: SearchDebtorService,
    public router: Router,
    public store: Store<AppState>,
    public modalShowService: PopupShowService
  ) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new GetDebtorsAction());
    this.store.select((state: AppState) => {
      return state.debtorsState.debtors;
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe((debtors: DebtorsResponse[]) => {
      this.debtors = debtors;
    });

    this.debtorsLoading$ = this.store.select('debtorsState').pipe(
      map((state: DebtorsState) => {
        return state.debtorsLoading;
      })
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.searchService.clear();
  }

  public showModal(event: Event): void {
    event.preventDefault();
    this.modalShowService.showAsComponent();
  }
}
