import {Component, OnInit} from '@angular/core';
import {DebtorsService} from '../../services/debtors.service';
import {ActivatedRoute, Params} from '@angular/router';
import {DebtorsResponse} from '../../shared/interfaces';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-debtor-page',
  templateUrl: './debtor-page.component.html',
  styleUrls: ['./debtor-page.component.scss'],
  animations: [
    trigger('dropDown' , [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200),
      ]),
      transition(':leave', animate(200, style({opacity: 0}))),
    ])
  ]
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
