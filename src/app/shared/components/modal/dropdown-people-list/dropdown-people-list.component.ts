import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/state/app.state';
import {GetPeopleAction} from '../../../../core/store/actions/people.action';
import {People} from '../../../interfaces';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-dropdown-people-list',
  templateUrl: './dropdown-people-list.component.html',
  styleUrls: ['./dropdown-people-list.component.scss']
})
export class DropdownPeopleListComponent implements OnInit {

  @Output() public setPeopleId: EventEmitter<string> = new EventEmitter<string>();

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

  public emitPeopleId(id: string): void {
    this.setPeopleId.emit(id);
    this.isShowDropdown = false;
  }

}
