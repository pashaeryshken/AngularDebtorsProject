import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserData} from '../../shared/interfaces';
import {Router} from '@angular/router';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {

  public userData: UserData;

  constructor(private authService: AuthService,
              private router: Router,
              private searchService: SearchService) {
  }

  public ngOnInit(): void {
    this.authService.userData().subscribe((userData: UserData) => {
      this.userData = {...userData};
    });
  }

  public navigate(isI: boolean): void {
    this.router.navigate(['/debtors'], {
      queryParams: {
        isI: isI
      }
    });
    this.searchService.searchFilter = isI.toString();
    this.searchService.isSearch = true;
  }
}
