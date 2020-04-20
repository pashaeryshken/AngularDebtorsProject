import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {People} from '../../interfaces';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {RemoveDebtorsAction} from '../../../core/store/actions/debtors.action';
import {AppState} from '../../../core/store/state/app.state';
import {Store} from '@ngrx/store';
import {RemovePeopleAction} from '../../../core/store/actions/people.action';
import {SearchDebtorService} from '../../../services/search/search-debtor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-people-card',
  templateUrl: './card-people.component.html',
  styleUrls: ['./card-people.component.scss'],
  animations: [
    trigger('card', [
      state('remove', style({height: '0', padding: '0', margin: '0', opacity: '0'})),
      transition('* => remove', animate(250))
    ]),
  ]
})
export class CardPeopleComponent implements OnInit {

  @Input() public people: People;
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();
  @Input() public isList: boolean = false;
  @Output() public editPerson: EventEmitter<People> = new EventEmitter<People>();
  public cardTrigger: string = '';

  constructor(private store: Store<AppState>, private searchDebtorService: SearchDebtorService, private router: Router) {
  }

  public ngOnInit(): void {
    console.log(this.people);
  }

  public removeCard(id: string): void {
    this.cardTrigger = 'remove';
    setTimeout(() => {
      this.store.dispatch(new RemovePeopleAction(id));
    }, 250);
  }

  public searchDebt(): void {
    this.searchDebtorService.searchStr = this.people.name;
    this.router.navigate(['/', 'debtors']);
  }
}
