import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup, RequiredValidator, Validators} from '@angular/forms';
import {People} from '../../../interfaces';
import {PeopleService} from '../../../../services/people.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PhoneCodesEnum} from '../../../../enums/phone-codes.enum';

@Component({
  selector: 'app-create-people-form',
  templateUrl: './create-people-form.component.html',
  styleUrls: ['./create-people-form.component.scss']
})
export class CreatePeopleFormComponent implements OnInit {

  @ViewChild('avatar') public avatar: ElementRef;
  @Output() public validForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public editablePerson: People;
  public isPhotoAdd: boolean = true;
  public filesName: string = '';
  public peopleForm: FormGroup;
  public file: File = null;
  public validFile: boolean = true;
  public people: People | FormData;
  public codePhone: string[] = Object.keys(PhoneCodesEnum);

  constructor(private renderer: Renderer2, private peopleService: PeopleService) {
    this.peopleForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl(''),
      phone: new FormGroup({
        codePhone: new FormControl(this.codePhone[0]),
        tNumber: new FormControl('', [Validators.required]),
      })
    });
  }

  public ngOnInit(): void {
    if (this.editablePerson) {
      const phone: string[] = this.editablePerson.tNumber.split(' ');
      const tNumber: string = phone.splice(1).join(' ');
      this.peopleForm.setValue({
        name: this.editablePerson.name,
        email: this.editablePerson.email,
        address: this.editablePerson.address,
        phone: {
          codePhone: phone.join(''),
          tNumber
        }
      });
      this.filesName = this.editablePerson.avatar;
      this.isPhotoAdd = false;
    }
    this.peopleForm.statusChanges.subscribe(() => {
      this.validForm.emit(this.peopleForm.valid);
    });
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
        const formData: FormData = new FormData();
        formData.append('avatar', file);
        formData.append('data', JSON.stringify(this.peopleForm.value));
        this.people = formData;
      } else {
        this.people = this.peopleForm.value;
      }
      return this.peopleService.createPeople(this.people).pipe(
        map((people) => {
          return people._id;
        })
      );
    }
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
