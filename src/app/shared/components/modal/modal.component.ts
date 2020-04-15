import {
  Component, EventEmitter, OnChanges,
  OnInit, Output,
  Renderer2, SimpleChanges, ViewChild
} from '@angular/core';
import {DebtorsService} from '../../../services/debtors.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/store/state/app.state';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { People} from '../../interfaces';
import {AddDebtorAction} from '../../../core/store/actions/debtors.action';
import { Observable} from 'rxjs';
import {CreatePeopleFormComponent} from './create-people-form/create-people-form.component';
import {CustomValidators} from '../../custom.validators';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})

export class ModalComponent implements OnInit {

  @Output() public closed: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(CreatePeopleFormComponent) public peopleForm: CreatePeopleFormComponent;
  public createDebtorsForm: FormGroup;
  public people: People;
  public peopleEdit: boolean = false;
  public dateNow: string = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  public file: File;
  public formValid: boolean = false;
  public currencyState: object = [
    'BYN',
    'USD',
    'RUB',
    'PLZ',
  ];

  constructor(private renderer: Renderer2,
              private debtorsService: DebtorsService,
              private router: Router,
              private datePipe: DatePipe,
              private store: Store<AppState>
  ) {
    this.createDebtorsForm = new FormGroup({
      date: new FormGroup({
        dateStart: new FormControl(this.dateNow),
        dateEnd: new FormControl(this.dateNow),
      }, CustomValidators.dateValidate),
      amount: new FormControl(1, [Validators.required]),
      currency: new FormControl(this.currencyState[0]),
      isI: new FormControl('false')
    });
  }

  private getPeopleId(): Observable<string> {
    if (this.people && !this.peopleEdit) {
      return new Observable<string>(subscriber => {
        subscriber.next(this.people._id);
      });
    }
    return this.peopleForm.submit();
  }

  public ngOnInit(): void {
  }

  public close(): void {
    this.clear();
    setTimeout(() => {
      this.closed.emit();
    }, 150);

  }

  public submit(): void {
    this.getPeopleId().subscribe((peopleId: string) => {
      this.store.dispatch(new AddDebtorAction({...this.createDebtorsForm.value, peopleId}));
      this.close();
    });
  }

  public clear(): void {
    if (this.peopleForm) {
      this.peopleForm.clearForm();
    }
    this.createDebtorsForm.reset({
      date: {
        dateStart: this.dateNow,
        dateEnd: this.dateNow,
      },
      amount: 1,
      currency: this.currencyState[0],
      isI: 'false'
    });
  }

  public setPeople(people: People): void {
    this.people = people;
    this.peopleEdit = false;
  }
  public removePeople(): void {
    this.people = null;
  }

  public validPeopleForm(event: boolean): void  {
    this.formValid = event;
  }

  public editPerson(): void {
    this.peopleEdit = true;
    this.formValid = true;
  }
}
