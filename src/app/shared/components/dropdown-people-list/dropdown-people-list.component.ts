import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/store/state/app.state';
import {GetPeopleAction} from '../../../core/store/actions/people.action';
import {People} from '../../interfaces';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';
import {SearchPeopleService} from '../../../services/search/search-people.service';

@Component({
  selector: 'app-dropdown-people-list',
  templateUrl: './dropdown-people-list.component.html',
  styleUrls: ['./dropdown-people-list.component.scss'],
  animations: [
    trigger('control-btn', [
      transition(':enter', [style({opacity: 0}), animate(600, style({opacity: 1}))])
    ]),
    trigger('dropdown', [
      transition(':enter', [style({height: 0}), animate(250)]),
      transition(':leave', (animate(250, style( {height: 0}))))
    ]),
  ]
})
export class DropdownPeopleListComponent implements OnInit {

  @Output() public editPerson: EventEmitter<People> = new EventEmitter<People>();
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();
  @Input() public prevPeople: People;
  @ViewChild('searchPeople') public input: ElementRef;
  public isShowDropdown: boolean = false;

  public peoples: People[] = null;
  public destroy$: Subject<void> = new Subject();

  constructor(private store: Store<AppState>, public searchPeopleService: SearchPeopleService) {
    console.log(this.prevPeople);
  }

  public ngOnInit(): void {
  }

  public showDropdown(): void {
    this.isShowDropdown = !this.isShowDropdown;
    if (this.isShowDropdown) {
      this.input.nativeElement.focus();
    } else {
      this.input.nativeElement.blur();
    }
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

  public emitEditPerson(people: People): void {
    this.editPerson.emit(people);
    this.isShowDropdown = false;
  }

}
