import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DebtorsService} from '../../shared/services/debtors.service';
import {Router, RoutesRecognized} from '@angular/router';
import {DatePipe} from '@angular/common';
import {filter, pairwise} from 'rxjs/operators';

@Component({
    selector: 'app-create-debtor-page',
    templateUrl: './create-debtor-page.component.html',
    styleUrls: ['./create-debtor-page.component.scss']
})
export class CreateDebtorPageComponent implements OnInit {

    createForm: FormGroup;
    dateNow = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    filesName = '';
    file: File;
    toBackUrl = '';
    isPhotoAdd = true;

    currencyState = [
        'BYN',
        'USD',
        'RUB',
        'PLZ',
    ];

    constructor(private debtorsService: DebtorsService, private router: Router, private datePipe: DatePipe) {
    }

    ngOnInit(): void {
        this.router.events
            .pipe(filter((e: any) => e instanceof RoutesRecognized),
                pairwise()
            ).subscribe((e: any) => {
            this.toBackUrl += e[0].urlAfterRedirects; // previous url
        });
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

    submit() {
        let dataDebtors = {};
        if (this.file) {
            const file: File = this.file;
            const formData = new FormData();
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


    close() {
        this.clear();
        this.router.navigate([this.toBackUrl]);
    }

    clear() {
        this.createForm.reset();
    }

    addPhoto(event: FileList) {
        const element = event[0];
        this.file = element;
        this.filesName = element.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (typeof e.target.result === 'string') {
                (document.getElementById('avatar') as HTMLImageElement).src = e.target.result;
            }
        };
        reader.readAsDataURL(this.file);
        this.isPhotoAdd = false;
    }
}
