import {
  Component, EventEmitter, OnDestroy, Output, ViewChild
} from '@angular/core';
import {DebtorsResponse, People} from '../../../interfaces';
import {Observable, Subject} from 'rxjs';
import {CreatePeopleFormComponent} from '../../form-components/create-people-form/create-people-form.component';
import {CreateDebtorFormComponent} from '../../form-components/create-debtor-form/create-debtor-form.component';
import {PopupShowService} from '../../../../services/popupShow.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-modal-component',
  templateUrl: './popup-create-debtor.component.html',
  styleUrls: ['./popup-create-debtor.component.scss'],
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('250ms ease-out')
      ]),
      state('leave', style({opacity: 0})),
      transition('* => leave', animate(250)
      )
    ])
  ]
})

export class PopupCreateDebtorComponent implements OnDestroy {

  private destroy$: Subject<void> = new Subject();

  @Output() public closed: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(CreatePeopleFormComponent) public peopleForm: CreatePeopleFormComponent;
  @ViewChild(CreateDebtorFormComponent) public debtorForm: CreateDebtorFormComponent;
  public people: People;
  public debtor: DebtorsResponse;
  public peopleEdit: boolean = false;
  public file: File;
  public formPeopleValid: boolean = false;
  public formDebtorValid: boolean = true;
  public stateAnimation: string = '';

  constructor(private popup: PopupShowService) {
    if (this.popup.editableDebtor) {
      this.debtor = this.popup.editableDebtor;
      this.people = this.popup.editableDebtor.people;
    }
  }

  private getPeopleId(): Observable<string> {
    if (this.people && !this.peopleEdit) {
      return new Observable<string>(subscriber => {
        subscriber.next(this.people._id);
      });
    }
    return this.peopleForm.submit();
  }

  public ngOnDestroy(): void {
      this.destroy$.next();
      this.popup.editableDebtor = null;
      this.debtor = null;
      this.people = null;
  }


  public submit(): void {
    this.getPeopleId().subscribe((peopleId: string) => {
      this.debtorForm.submit(peopleId);
      this.close();
    });
  }

  public clear(): void {
    this.peopleForm.clearForm();
    this.debtorForm.clearForm();
  }

  public close(): void {
    this.stateAnimation = 'leave';
    setTimeout(() => {
      this.clear();
      this.closed.emit();
    }, 250);
  }

  public editPerson(people: People): void {
    this.people = people;
    this.peopleEdit = true;
  }

  public cancelEditablePeople(): void {
    this.peopleForm.cancelEdit();
    this.people = null;
    this.peopleEdit = false;
  }

  public validPeopleForm(event: boolean): void {
    this.formPeopleValid = event;
  }
  public validDebtorForm(event: boolean): void {
    this.formDebtorValid = event;
  }
}
