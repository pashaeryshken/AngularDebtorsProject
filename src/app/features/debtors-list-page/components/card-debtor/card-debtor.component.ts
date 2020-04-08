import {Component, Input, OnInit} from '@angular/core';
import {DebtorsResponse} from '../../../../shared/interfaces';
import {RemoveDebtorsAction, UpdateDebtorsAction} from '../../../../core/store/actions/debtors.action';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/state/app.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-debtor',
  templateUrl: './card-debtor.component.html',
  styleUrls: ['./card-debtor.component.scss']
})
export class CardDebtorComponent implements OnInit {

  @Input('debtor') public debtor: DebtorsResponse;

  public isRemove: boolean = false;

  constructor(public store: Store<AppState>, private router: Router) {
  }

  public ngOnInit(): void {
    console.log(this.debtor);
  }

  public editStatus(id: string, status: number): void {
    this.store.dispatch(new UpdateDebtorsAction({id, status}));
  }

  public openDebtor(id: string): void {
    this.router.navigate(['/debtors', id]);
  }

  public debtorRemove(id: string): void {
    this.isRemove = true;
    setTimeout(() => {
      this.store.dispatch(new RemoveDebtorsAction(id));
      if (this.router.url !== '/debtors') {
        this.router.navigate(['/debtors']);
      }
    }, 500);

  }
}
