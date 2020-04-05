import {Component, OnInit} from '@angular/core';
import {DebtorsService} from '../../services/debtors.service';
import {ActivatedRoute, Params} from '@angular/router';
import {DebtorsResponse} from '../../shared/interfaces';

@Component({
  selector: 'app-debtor-page',
  templateUrl: './debtor-page.component.html',
  styleUrls: ['./debtor-page.component.scss']
})
export class DebtorPageComponent implements OnInit {

  public debtor: DebtorsResponse;
  public isShowDropDown: boolean = false;

  constructor(private debtorsService: DebtorsService, private router: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.debtorsService.getDebtor(params.id).subscribe((debtor: DebtorsResponse) => {
        this.debtor = debtor;
      });
    });

  }

  public showDropDown(): void {
    this.isShowDropDown = !this.isShowDropDown;
  }
}
