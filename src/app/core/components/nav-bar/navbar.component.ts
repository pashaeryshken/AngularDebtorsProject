import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../../shared/services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-layout',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isSearch = false;
  searchStr = '';


  @ViewChild('input') input;

  constructor(public searchService: SearchService, private router: Router) {
  }

  ngOnInit(): void {
  }

  openSearch(event: Event) {
    event.preventDefault();
    if (this.router.url !== '/debtors') {
      this.router.navigate(['/debtors']);
    }
    this.isSearch = !this.isSearch;
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 500);
  }

  closeSearch() {
    if (!this.searchService.searchStr) {
      this.isSearch = !this.isSearch;
    }
  }

}
