import {
  AfterContentChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {DebtorsService} from '../../../services/debtors.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/store/state/app.state';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DebtorsResponse} from '../../interfaces';
import {AddDebtorAction} from '../../../core/store/actions/debtors.action';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements AfterContentChecked, OnInit {

  @Input('isShow') public isShow: boolean;
  @Output('close') public closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('modal') public modal: ElementRef;

  public createForm: FormGroup;
  public dateNow: string = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  public filesName: string = '';
  public file: File;
  public toBackUrl: string = '';
  public isPhotoAdd: boolean = true;

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
  }

  public ngAfterContentChecked(): void {
    if (this.isShow) {
      this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
      setTimeout(() => {
        this.renderer.addClass(this.modal.nativeElement, 'show');
      });
    } else if (this.modal) {
      this.renderer.removeClass(this.modal.nativeElement, 'show');
      setTimeout(() => {
        this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
      }, 500);
    }
  }

  public close(): void {
    this.clear();
    this.closeModal.emit(null);
  }

  public ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      tNumber: new FormControl('', [Validators.required]),
      date: new FormControl(this.dateNow),
      dateOfPayment: new FormControl(this.dateNow),
      amount: new FormControl(1, [Validators.required]),
      currency: new FormControl(this.currencyState[0]),
      isI: new FormControl('false')
    });
  }

  public submit(): void {
    let dataDebtors: DebtorsResponse | FormData;
    if (this.file) {
      const file: File = this.file;
      const formData: FormData = new FormData();
      formData.append('avatar', file);
      formData.append('data', JSON.stringify(this.createForm.value));
      dataDebtors = formData;
    } else {
      dataDebtors = this.createForm.value;
    }
    this.store.dispatch(new AddDebtorAction(dataDebtors));
    this.clear();
    this.close();

  }

  public clear(): void {
    this.createForm.reset();
  }

  public addPhoto(event: FileList): void {
    console.log(event);
    const element: File = event[0];
    this.file = element;
    this.filesName = element.name;

    const reader: FileReader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (typeof e.target.result === 'string') {
        (document.getElementById('avatar') as HTMLImageElement).src = e.target.result;
      }
    };
    reader.readAsDataURL(this.file);
    this.isPhotoAdd = false;
  }
}
