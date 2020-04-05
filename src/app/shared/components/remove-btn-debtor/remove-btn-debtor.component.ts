import {Component, Input, OnInit} from '@angular/core';
import {DebtorsService} from '../../../services/debtors.service';
import {RemoveDebtorsAction} from '../../../core/store/actions/debtors.action';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

@Component({
  selector: 'app-remove-btn-debtor',
  templateUrl: './remove-btn-debtor.component.html',
  styleUrls: ['./remove-btn-debtor.component.scss']
})
export class RemoveBtnDebtorComponent implements OnInit {

  @Input('id') public debtorId: string;
  @Input('className') public className: string;

  constructor(private debtorsService: DebtorsService, private store: Store, private router: Router) {
  }

  public ngOnInit(): void {
  }

  public debtorRemove(id: string): void {
      this.store.dispatch(new RemoveDebtorsAction(id));
      if (this.router.url !== '/debtors') {
      this.router.navigate(['/debtors']);
    }
  }

}
