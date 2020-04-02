import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DebtorsService} from '../../services/debtors.service';
import {DebtorsResponse} from '../../shared/interfaces';
import {Subject} from 'rxjs';
import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-debtors-list-page',
  templateUrl: './debtors-list-page.component.html',
  styleUrls: ['./debtors-list-page.component.scss']
})
export class DebtorsListPageComponent implements OnInit, OnDestroy {

  public debtors: DebtorsResponse[] = [];
  public destroySubject$: Subject<void> = new Subject();
  @Input() public searchStr: string;

  constructor(
    private auth: AuthService,
    private debtorsService: DebtorsService,
    public searchService: SearchService,
    public router: Router) {
  }

  public ngOnInit(): void {
    this.debtorsService.getDebtors().subscribe(res => {
      this.debtors = res.slice();
    });
  }

  public debtorRemove(id: string): void {
    this.debtorsService.removeDebtor(id).subscribe(() => {
      this.debtors = this.debtors.filter(debtor => id !== debtor._id);
    });
  }

  public editStatus(id: string, status: number): void {
    this.debtorsService.setStatus(id, status).subscribe(() => {
      this.debtors.find(debtor => id === debtor._id).status = status;
    });
  }

  public openDebtor(id: string): void {
    this.router.navigate(['/debtors', id]);
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next();
  }
}
