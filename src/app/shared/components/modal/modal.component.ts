import {
  Component, ElementRef, EventEmitter,
  OnInit, Output,
  Renderer2, ViewChild
} from '@angular/core';
import {DebtorsService} from '../../../services/debtors.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/store/state/app.state';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DebtorsResponse} from '../../interfaces';
import {AddDebtorAction} from '../../../core/store/actions/debtors.action';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  host: {
    '[@state]': 'state',
  },
  animations: [
    trigger('state', [
      state('opened', style({})),
      state('void, closed', style({opacity: 0})),
      transition('* => *', animate('150ms ease-in')),
    ])
  ],
})

export class ModalComponent implements OnInit {

  @ViewChild('avatar') public avatar: ElementRef;
  @Output() public closed: EventEmitter<string> = new EventEmitter<string>();

  public createForm: FormGroup;
  public dateNow: string = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  public filesName: string = '';
  public file: File;
  public isPhotoAdd: boolean = true;
  public state: 'opened' | 'closed' = 'closed';
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
    this.state = 'opened';
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

  public close(): void {
    this.clear();
    this.state = 'closed';
    setTimeout(() => {
      this.closed.emit();
    }, 150);

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
    this.close();

  }

  public clear(): void {
    this.createForm.reset();
    this.createForm.get('date').setValue(this.dateNow);
    this.createForm.get('dateOfPayment').setValue(this.dateNow);
    this.createForm.get('amount').setValue(1);
    this.createForm.get('currency').setValue(this.currencyState[0]);
    this.createForm.get('isI').setValue(false);
    this.file = null;
    this.isPhotoAdd = true;
  }

  public addPhoto(event: FileList): void {
    const element: File = event[0];
    this.file = element;
    this.filesName = element.name;

    const reader: FileReader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (typeof e.target.result === 'string') {
        this.renderer.setAttribute(this.avatar.nativeElement, 'src', e.target.result);
      }
    };
    reader.readAsDataURL(this.file);
    this.isPhotoAdd = false;
  }
}
