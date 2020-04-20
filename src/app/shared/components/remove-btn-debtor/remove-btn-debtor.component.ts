import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() public remove: EventEmitter<null> = new EventEmitter();

  constructor(private debtorsService: DebtorsService, private store: Store, private router: Router) {
  }

  public ngOnInit(): void {
  }

  public removeDebtor(): void {
    this.remove.emit();
  }

}
