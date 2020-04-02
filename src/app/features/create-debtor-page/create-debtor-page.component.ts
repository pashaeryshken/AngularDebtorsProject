import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DebtorsService} from '../../services/debtors.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {DebtorsResponse} from '../../shared/interfaces';

@Component({
  selector: 'app-create-debtor-page',
  templateUrl: './create-debtor-page.component.html',
  styleUrls: ['./create-debtor-page.component.scss']
})
export class CreateDebtorPageComponent implements OnInit {

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

  constructor(private debtorsService: DebtorsService, private router: Router, private datePipe: DatePipe) {
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
    this.debtorsService.setDebtor(dataDebtors).subscribe(() => {
      this.clear();
      this.router.navigate(['/debtors']);
    });
  }

  public close(): void {
    this.clear();
    this.router.navigate([this.toBackUrl]);
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
