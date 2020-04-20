import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DebtorsService} from '../../../../services/debtors.service';
import {RemoveDebtorsAction} from '../../../../core/store/actions/debtors.action';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

@Component({
  selector: 'app-remove-btn-debtor',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.scss']
})
export class RemoveBtnComponent {

  @Input('id') public debtorId: string;
  @Input('className') public className: string;
  @Output() public remove: EventEmitter<null> = new EventEmitter();

  constructor() {}

  public removeDebtor(): void {
    this.remove.emit();
  }

}
