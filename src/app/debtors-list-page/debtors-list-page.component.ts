import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {DebtorsService} from '../shared/services/debtors.service';
import {DebtorsResponse} from '../shared/interfaces';

@Component({
  selector: 'app-debtors-list-page',
  templateUrl: './debtors-list-page.component.html',
  styleUrls: ['./debtors-list-page.component.scss']
})
export class DebtorsListPageComponent implements OnInit {

  debtorsArr: DebtorsResponse[] = [];

  constructor(private auth: AuthService, private debtors: DebtorsService) {
  }

  ngOnInit(): void {
    this.auth.userData().subscribe(res => {
      console.log(res);
    });
    this.debtors.getDebtors().subscribe(res => {
      this.debtorsArr = res.slice();
      console.log(this.debtorsArr);
    });
  }

  debtorRemove(id: string) {
    this.debtors.removeDebtor(id).subscribe(() => {
      this.debtorsArr = this.debtorsArr.filter(debtor => id !== debtor._id);
    });
  }

  editStatus(id: string) {
    this.debtors.setStatus(id).subscribe(() => {
      this.debtorsArr.find(debtor => id === debtor._id).status = 2;
    });
  }
}
