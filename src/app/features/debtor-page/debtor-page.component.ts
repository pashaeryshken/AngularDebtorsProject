import {Component, OnInit} from '@angular/core';
import {DebtorsService} from '../../services/debtors.service';
<<<<<<< HEAD
import {ActivatedRoute, Params} from '@angular/router';
import {DebtorsResponse} from '../../shared/interfaces';
import {animate, style, transition, trigger} from '@angular/animations';
=======
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DebtorsResponse} from '../../shared/interfaces';
import {animate, style, transition, trigger} from '@angular/animations';
import {RemoveDebtorsAction} from '../../core/store/actions/debtors.action';
import {AppState} from '../../core/store/state/app.state';
import {Store} from '@ngrx/store';
>>>>>>> Revert "finaly commit"

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

<<<<<<< HEAD
  constructor(private debtorsService: DebtorsService, private router: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
=======
  constructor(private debtorsService: DebtorsService,
              private activeRouter: ActivatedRoute,
              public router: Router,
              private store: Store<AppState>) {
  }

  public ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
>>>>>>> Revert "finaly commit"
      this.debtorsService.getDebtor(params.id).subscribe((debtor: DebtorsResponse) => {
        this.debtor = debtor;
      });
    });

  }

  public showDropDown(): void {
    this.isShowDropDown = !this.isShowDropDown;
  }
<<<<<<< HEAD
=======

  public debtorRemove(id: string): void {
    setTimeout(() => {
      this.store.dispatch(new RemoveDebtorsAction(id));
    }, 250);

    this.router.navigate(['/debtors']);
  }
>>>>>>> Revert "finaly commit"
}
