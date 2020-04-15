import {
  Component, EventEmitter, OnDestroy,
  OnInit, Output, ViewChild
} from '@angular/core';
import {DebtorsResponse, People} from '../../interfaces';
import {Observable, Subject} from 'rxjs';
import {CreatePeopleFormComponent} from './create-people-form/create-people-form.component';
import {CreateDebtorFormComponent} from './create-debtor-form/create-debtor-form.component';
import {ModalShowService} from '../../../services/modalShow.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})

export class ModalComponent implements OnDestroy {

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

  constructor(private popup: ModalShowService) {
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
    if (this.peopleForm) {
      this.peopleForm.clearForm();
    }
    this.debtorForm.clearForm();
  }

  public close(): void {
    this.clear();
    setTimeout(() => {
      this.closed.emit();
    }, 150);
  }


  public setPeople(people: People): void {
    this.people = people;
    this.peopleEdit = false;
  }

  public editPerson(): void {
    this.peopleEdit = true;
    this.formPeopleValid = true;
  }

  public removePeople(): void {
    this.people = null;
  }

  public validPeopleForm(event: boolean): void {
    this.formPeopleValid = event;
  }


  public validDebtorForm(event: boolean): void {
    this.formDebtorValid = event;
  }


}
