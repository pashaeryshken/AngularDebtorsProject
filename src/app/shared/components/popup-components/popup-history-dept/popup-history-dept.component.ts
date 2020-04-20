import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DebtorsService} from '../../../../services/debtors.service';
import {HistoryDebtService} from '../../../../services/historyDebt.service';
import {DatePipe} from '@angular/common';
import {CustomValidators} from '../../../custom.validators';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/state/app.state';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DebtorsResponse} from '../../../interfaces';
import {GetDebtAction} from '../../../../core/store/actions/debt.action';

@Component({
  selector: 'app-popup-history-dept',
  templateUrl: './popup-history-dept.component.html',
  styleUrls: ['./popup-history-dept.component.scss']
})
export class PopupHistoryDeptComponent implements OnInit {

  @Output() public closed: EventEmitter<string> = new EventEmitter<string>();
  public dateNow: string = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  public historyForm: FormGroup;
  public debtor: DebtorsResponse;
  public destroy$: Subject<void> = new Subject();

  constructor(private debtorsService: DebtorsService,
              private historyDebtService: HistoryDebtService,
              private datePipe: DatePipe,
              private store: Store<AppState>) {
    this.store.select((state: AppState) => {
      return state.debtorState.debtor;
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe((debtor) => {
      this.debtor = debtor;
    });
  }

  public ngOnInit(): void {
    this.historyForm = new FormGroup({
      date: new FormControl(this.dateNow, [
        Validators.required,
        CustomValidators.dateValidateHistory(this.debtor.dateStart)]),
      total: new FormControl(1, [Validators.required, Validators.min(1)]),
      currency: new FormControl('BYN')
    });
  }

  public submit(): void {
    this.historyDebtService.addHistoryField(this.debtor._id, this.historyForm.value).subscribe(() => {
      this.store.dispatch(new GetDebtAction(this.debtor._id));
      this.closePopup();
    });
  }

  public closePopup(): void {
    this.closed.emit();
  }
}
