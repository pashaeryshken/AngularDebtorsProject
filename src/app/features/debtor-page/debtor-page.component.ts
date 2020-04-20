import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DebtorsService} from '../../services/debtors.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DebtHistory, DebtorsResponse} from '../../shared/interfaces';
import {animate, style, transition, trigger} from '@angular/animations';
import {RemoveDebtorsAction, UpdateStatusDebtorsAction} from '../../core/store/actions/debtors.action';
import {AppState} from '../../core/store/state/app.state';
import {Store} from '@ngrx/store';
import {HistoryDebtService} from '../../services/historyDebt.service';
import {PopupShowService} from '../../services/popupShow.service';
import {GetDebtAction} from '../../core/store/actions/debt.action';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-debtor-page',
  templateUrl: './debtor-page.component.html',
  styleUrls: ['./debtor-page.component.scss'],
  animations: [
    trigger('dropDown', [
      transition(':enter', [
        style({opacity: 0}),
        animate(200),
      ]),
      transition(':leave', animate(200, style({opacity: 0}))),
    ])
  ]
})
export class DebtorPageComponent implements OnInit {

  public debtor: DebtorsResponse;
  public isShowDropDown: boolean = false;
  public destroy$: Subject<void> = new Subject();
  @ViewChild('inputAmount') public input: ElementRef;

  constructor(private debtorsService: DebtorsService,
              private historyDebtService: HistoryDebtService,
              private showPopup: PopupShowService,
              private activeRouter: ActivatedRoute,
              public router: Router,
              private store: Store<AppState>) {

  }

  public ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.store.dispatch(new GetDebtAction(params.id));
      this.store.select((state: AppState) => {
        return state.debtorState.debtor;
      }).pipe(
        takeUntil(this.destroy$)
      ).subscribe((debtor: DebtorsResponse) => {
        this.debtor = debtor;
      });
    });
  }

  public showDropDown(): void {
    this.isShowDropDown = !this.isShowDropDown;
  }

  public editStatus(id: string, status: number): void {
    this.store.dispatch(new UpdateStatusDebtorsAction({id, status}));
    this.getNewDebt();
  }

  public debtorRemove(id: string): void {
    setTimeout(() => {
      this.store.dispatch(new RemoveDebtorsAction(id));
    }, 250);

    this.router.navigate(['/debtors']);
  }

  public openInput(event: Event): void {
    event.preventDefault();
    this.showPopup.showPopupHistory();
  }

  public getNewDebt(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.debtorsService.getDebtor(params.id).subscribe((debtor: DebtorsResponse) => {
        this.debtor = debtor;
      });
    });
  }
}
