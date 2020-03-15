import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(event: Event) {
    this.auth.logout();
    this.openLoginPage(event);
  }

  openLoginPage(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  openSignPage(event: Event) {
    event.preventDefault();
    this.router.navigate(['/sign']);
  }
}
