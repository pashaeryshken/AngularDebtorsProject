import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/state/app.state';
import {GetPeopleAction} from '../../../../core/store/actions/people.action';
import {People} from '../../../interfaces';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import {animate, style, transition, trigger} from '@angular/animations';
>>>>>>> Revert "finaly commit"
=======
import {animate, style, transition, trigger} from '@angular/animations';
=======
>>>>>>> master
>>>>>>> 96afeac285079c809edf307dc86a1d169306c273

@Component({
  selector: 'app-dropdown-people-list',
  templateUrl: './dropdown-people-list.component.html',
<<<<<<< HEAD
<<<<<<< HEAD
=======
  styleUrls: ['./dropdown-people-list.component.scss'],
  animations: [
    trigger('opacity', [
      transition(':enter', [style({opacity: '0'}), animate(150)])
    ])
  ]
})
export class DropdownPeopleListComponent implements OnInit {

  @Output() public setPeopleId: EventEmitter<People> = new EventEmitter<People>();
=======
>>>>>>> 96afeac285079c809edf307dc86a1d169306c273
  styleUrls: ['./dropdown-people-list.component.scss']
})
export class DropdownPeopleListComponent implements OnInit {

  @Output() public setPeopleId: EventEmitter<string> = new EventEmitter<string>();
<<<<<<< HEAD
=======
  styleUrls: ['./dropdown-people-list.component.scss'],
  animations: [
    trigger('opacity', [
      transition(':enter', [style({opacity: '0'}), animate(150)])
    ])
  ]
})
export class DropdownPeopleListComponent implements OnInit {

  @Output() public setPeopleId: EventEmitter<People> = new EventEmitter<People>();
>>>>>>> Revert "finaly commit"
=======
>>>>>>> master
>>>>>>> 96afeac285079c809edf307dc86a1d169306c273

  public isShowDropdown: boolean = false;
  public peoples: People[] = null;
  public destroy$: Subject<void> = new Subject();

  constructor(private store: Store<AppState>) {
  }

  public ngOnInit(): void {
  }

  public showDropdown(): void {
    this.isShowDropdown = !this.isShowDropdown;
    if (this.isShowDropdown && !this.peoples) {
      this.store.dispatch(new GetPeopleAction());
      this.store.select((state) => {
        return state.peopleState.peoples;
      }).pipe(
        takeUntil(this.destroy$)
      ).subscribe((peoples) => {
        this.peoples = peoples;
      });
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
  public emitPeopleId(id: string): void {
    this.setPeopleId.emit(id);
=======
  public emitPeopleId(people: People): void {
    this.setPeopleId.emit(people);
>>>>>>> Revert "finaly commit"
=======
  public emitPeopleId(people: People): void {
    this.setPeopleId.emit(people);
=======
  public emitPeopleId(id: string): void {
    this.setPeopleId.emit(id);
>>>>>>> master
>>>>>>> 96afeac285079c809edf307dc86a1d169306c273
    this.isShowDropdown = false;
  }

}
