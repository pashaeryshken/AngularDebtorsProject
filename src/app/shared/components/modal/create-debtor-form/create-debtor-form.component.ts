import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../custom.validators';
import {DatePipe} from '@angular/common';
import {DebtorsResponse, UpdateDebtor} from '../../../interfaces';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/state/app.state';
import {AddDebtorAction, UpdateDebtorsAction} from '../../../../core/store/actions/debtors.action';
import {Subject, Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-create-debtor-form',
  templateUrl: './create-debtor-form.component.html',
  styleUrls: ['./create-debtor-form.component.scss']
})

export class CreateDebtorFormComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  @Output() public validForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public editableDebtor: DebtorsResponse;
  public debtorsForm: FormGroup;
  public dateNow: string = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  public currencyState: object = [
    'BYN',
    'USD',
    'RUB',
    'PLZ',
  ];

  constructor(private datePipe: DatePipe, private store: Store<AppState>) {
    this.debtorsForm = new FormGroup({
      date: new FormGroup({
        dateStart: new FormControl(this.dateNow),
        dateEnd: new FormControl(this.dateNow),
      }, CustomValidators.dateValidate),
      amount: new FormControl(1, [Validators.required, Validators.min(1)]),
      currency: new FormControl(this.currencyState[0]),
      isI: new FormControl('false')
    });
  }

  public ngOnInit(): void {
    if (this.editableDebtor) {
      const debtor: DebtorsResponse = {...this.editableDebtor};
      this.debtorsForm.setValue({
        date: {
          dateStart: this.datePipe.transform(debtor.dateStart, 'yyyy-MM-dd'),
          dateEnd: this.datePipe.transform(debtor.dateEnd, 'yyyy-MM-dd'),
        },
        amount: debtor.amount,
        currency: debtor.currency,
        isI: debtor.isI.toString()
      });
    }
    this.subscription = this.debtorsForm.statusChanges.subscribe(() => {
      this.validForm.emit(this.debtorsForm.valid);
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public submit(peopleId: string): void {
    if (this.editableDebtor) {
      const debtor: DebtorsResponse = {...this.debtorsForm.value, id: this.editableDebtor._id, peopleId};
      this.store.dispatch(new UpdateDebtorsAction({...debtor}));
    } else {
      this.store.dispatch(new AddDebtorAction({...this.debtorsForm.value, peopleId}));
    }
  }

  public clearForm(): void {
    this.debtorsForm.reset({
      date: {
        dateStart: this.dateNow,
        dateEnd: this.dateNow,
      },
      amount: 1,
      currency: this.currencyState[0],
      isI: 'false'
    });
  }
}
