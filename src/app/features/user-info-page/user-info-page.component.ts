import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserData} from '../../shared/interfaces';
import {Router} from '@angular/router';
import {SearchService} from '../../services/search.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/store/state/app.state';
import {GetUsersAction} from '../../core/store/actions/user.action';
import {map, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {UserState} from '../../core/store/state/user.state';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {

  public userData: UserData;
  public userLoading$: Observable<boolean>;
  public destroy$: Subject<void> = new Subject();

  constructor(private authService: AuthService,
              private router: Router,
              private searchService: SearchService,
              private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetUsersAction());

    this.store.select((state: AppState) => {
      return state.userData.user;
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe((user: UserData) => {
      this.userData = user;
    });

    this.userLoading$ = this.store.select('userData').pipe(
      map((state: UserState) => {
        return state.userLoading;
      })
    );

    console.log('asdfsd', this.userLoading$);
  }

  public navigate(isI: boolean): void {
    this.router.navigate(['/debtors']);
    this.searchService.searchFilter = isI.toString();
    this.searchService.isSearch = true;
  }
}
