import {
  Component, DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {People} from '../../../interfaces';
import {PeopleService} from '../../../../services/people.service';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {PhoneCodesEnum} from '../../../../enums/phone-codes.enum';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-create-people-form',
  templateUrl: './create-people-form.component.html',
  styleUrls: ['./create-people-form.component.scss'],
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({height: 0, opacity: 0}),
        animate('250ms ease-out')
      ]),
      transition(':leave', [
        style({transform: 'translateX(-100%)'}),
        animate('250ms ease-out')
      ]),
    ])
  ]
})
export class CreatePeopleFormComponent implements OnInit, OnDestroy, DoCheck {

  private subscription: Subscription;

  @ViewChild('avatar') public avatar: ElementRef;
  @Input() public editablePerson: People;
  public oldPersonId: string;
  @Output() public validForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public cancelEditablePeople: EventEmitter<void> = new EventEmitter<void>();

  public isPhotoAdd: boolean = true;
  public filesName: string = '';
  public peopleForm: FormGroup;
  public file: File = null;
  public validFile: boolean = true;
  public peopleRequest: FormData = new FormData();
  public codePhone: string[] = Object.keys(PhoneCodesEnum);

  constructor(private renderer: Renderer2, private peopleService: PeopleService) {
    this.peopleForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl(''),
      phone: new FormGroup({
        codePhone: new FormControl(this.codePhone[0]),
        tNumber: new FormControl(''),
      })
    });
  }

  public ngOnInit(): void {
    this.subscription = this.peopleForm.statusChanges.subscribe(() => {
      this.validForm.emit(this.peopleForm.valid);
    });
  }

  public ngDoCheck(): void {
    if (this.editablePerson) {
      if (this.editablePerson._id !== this.oldPersonId) {
        this.clearForm();
        const people: People = this.editablePerson;
        this.oldPersonId = people._id;
        const phone: string[] = people.tNumber.split(' ');
        const tNumber: string = phone.splice(1).join(' ');
        this.peopleForm.setValue({
          name: people.name,
          email: people.email,
          address: people.address,
          phone: {
            codePhone: phone.join(''),
            tNumber
          }
        });
        this.filesName = people.avatar;
        this.isPhotoAdd = false;
      }
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addPhoto(event: FileList): void {
    const element: File = event[0];
    this.file = element;
    const typeImage: string = this.file.type.split('/')[0];
    if (typeImage === 'image') {
      this.validFile = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (typeof e.target.result === 'string') {
          this.renderer.setAttribute(this.avatar.nativeElement, 'src', e.target.result);
        }
      };
      reader.readAsDataURL(element);
      this.isPhotoAdd = false;
    } else {
      this.validFile = false;
    }
  }

  public submit(): Observable<string> {
    if (this.peopleForm.valid) {

      if (this.file) {
        const file: File = this.file;
        this.peopleRequest.append('avatar', file);
      }
      this.peopleRequest.append('data', JSON.stringify(this.peopleForm.value));

      if (this.editablePerson) {
        this.peopleRequest.append('_id', this.editablePerson._id);
        return this.peopleService.updatePeople(this.peopleRequest).pipe(
          map((people) => {
            return people._id;
          })
        );
      }

      return this.peopleService.createPeople(this.peopleRequest).pipe(
        map((people) => {
          return people._id;
        }));

    }
  }

  public cancelEdit(): void {
    this.oldPersonId = null;
    this.clearForm();
  }

  public clearForm(): void {
    this.peopleForm.reset({
      phone: {
        codePhone: this.codePhone[0],
        tNumber: ''
      }
    });
    this.file = null;
    this.isPhotoAdd = true;
  }
}
