import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DebtorsResponse} from '../../interfaces';
import {RemoveDebtorsAction, UpdateDebtorsAction, UpdateStatusDebtorsAction} from '../../../core/store/actions/debtors.action';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/store/state/app.state';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-card-debtor',
  templateUrl: './card-debtor.component.html',
  styleUrls: ['./card-debtor.component.scss'],
  animations: [
    trigger('card', [
      state('remove', style({height: '0', padding: '0', margin: '0', opacity: '0'})),
      transition('* => remove', animate(250))
    ]),
  ]
})

export class CardDebtorComponent implements OnInit, OnDestroy {

  @Input('debtor') public debtor: DebtorsResponse;
  public cardTrigger: string = '';

  constructor(public store: Store<AppState>, private router: Router) {
  }

  public ngOnInit(): void {
    console.log(this.debtor);
  }

  public editStatus(id: string, status: number): void {
      this.store.dispatch(new UpdateStatusDebtorsAction({id, status}));
  }

  public openDebtor(id: string): void {
    this.router.navigate(['/debtors', id]);
  }

  public debtorRemove(id: string): void {
    this.cardTrigger = 'remove';
    setTimeout(() => {
      this.store.dispatch(new RemoveDebtorsAction(id));
    }, 250);
  }

  public ngOnDestroy(): void {
  }
}
