import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DebtorsService} from '../../services/debtors.service';
import {DebtorsResponse} from '../../shared/interfaces';
import {Observable, Subject} from 'rxjs';
import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/store/state/app.state';
import {GetDebtorsAction, RemoveDebtorsAction, UpdateDebtorsAction} from '../../core/store/actions/debtors.action';
import {map, takeUntil} from 'rxjs/operators';
import {DebtorsState} from '../../core/store/state/debtors.state';
import {ModalShowService} from '../../services/modalShow.service';

@Component({
  selector: 'app-debtors-list-page',
  templateUrl: './debtors-list-page.component.html',
  styleUrls: ['./debtors-list-page.component.scss']
})
export class DebtorsListPageComponent implements OnInit, OnDestroy {

  public debtors: DebtorsResponse[] = [];
  public destroy$: Subject<void> = new Subject();
  public debtorsLoading$: Observable<boolean>;
  public modalOpen: boolean = false;
  @Input() public searchStr: string;

  constructor(
    private auth: AuthService,
    private debtorsService: DebtorsService,
    public searchService: SearchService,
    public router: Router,
    public store: Store<AppState>,
    public modalShowService: ModalShowService
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
  }

  public showModal(event: Event): void {
    event.preventDefault();
    this.modalShowService.showAsComponent();
  }
}
