import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {DebtorsService} from '../../shared/services/debtors.service';
import {DebtorsResponse} from '../../shared/interfaces';
import {Subject} from 'rxjs';
import {SearchService} from '../../shared/services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-debtors-list-page',
  templateUrl: './debtors-list-page.component.html',
  styleUrls: ['./debtors-list-page.component.scss']
})
export class DebtorsListPageComponent implements OnInit, OnDestroy {

  debtors: DebtorsResponse[] = [];
  destroySubject$: Subject<void> = new Subject();
  @Input() searchStr: string;

  constructor(
    private auth: AuthService,
    private debtorsService: DebtorsService,
    public searchService: SearchService,
    public router: Router) {
  }

  ngOnInit(): void {
    /*  this.auth.userData().subscribe(res => {
        console.log(res);
      });*/
    setTimeout(() => {
      this.debtorsService.getDebtors().subscribe(res => {
        this.debtors = res.slice();
        console.log(this.debtors);
      });
    }, 1000);
  }

  debtorRemove(id: string) {
    this.debtorsService.removeDebtor(id).subscribe(() => {
      this.debtors = this.debtors.filter(debtor => id !== debtor._id);
    });
  }

  editStatus(id: string) {
    this.debtorsService.setStatus(id).subscribe(() => {
      this.debtors.find(debtor => id === debtor._id).status = 2;
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }


  openDebtor(id: string) {
    this.router.navigate(['/debtors', id]);
  }
}
