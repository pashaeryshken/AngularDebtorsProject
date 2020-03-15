import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-debtors-list-page',
  templateUrl: './debtors-list-page.component.html',
  styleUrls: ['./debtors-list-page.component.scss']
})
export class DebtorsListPageComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.userData().subscribe(res => {
      console.log(res);
    });
  }

}
