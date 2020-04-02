import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {SearchService} from '../../../services/search.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, public searchService: SearchService) { }

  public ngOnInit(): void {}

  public logout(event: Event): void {
    this.auth.logout();
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
