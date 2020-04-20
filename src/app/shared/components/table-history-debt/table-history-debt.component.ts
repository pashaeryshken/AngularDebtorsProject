import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DebtHistory} from '../../interfaces';
import {HistoryDebtService} from '../../../services/historyDebt.service';

@Component({
  selector: 'app-table-history-debt',
  templateUrl: './table-history-debt.component.html',
  styleUrls: ['./table-history-debt.component.scss']
})
export class TableHistoryDebtComponent {

  @Input() public history: DebtHistory[];
  @Input() public debtId: string;
  @Output() public updateDebt: EventEmitter<void> = new EventEmitter<void>();
  constructor(private historyDebtService: HistoryDebtService) {
  }

  public removeHistoryField(historyId: string): void {
    this.historyDebtService.removeHistoryField(historyId, this.debtId).subscribe( () => {
      this.updateDebt.emit();
    });
  }
}
