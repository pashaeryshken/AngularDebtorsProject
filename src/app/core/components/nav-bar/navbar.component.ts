import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../../services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-layout',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('input') public input: ElementRef;
  public isShow: boolean = false;
  constructor(public searchService: SearchService, private router: Router) {
  }

  public ngOnInit(): void {
  }

  public openSearch(event: Event): void {
    event.preventDefault();
    if (this.router.url !== '/debtors') {
      this.router.navigate(['/debtors']);
    }
    this.searchService.isSearch = !this.searchService.isSearch;
    if (this.searchService.isSearch) {
      setTimeout(() => {
        this.input.nativeElement.focus();
      }, 500);
    } else {
      this.input.nativeElement.blur();
    }
  }

  public closeSearch(): void {
    setTimeout(() => {
      if (this.searchService.isSearch) {
        this.searchService.isSearch = false;
        this.searchService.searchStr = '';
        this.searchService.searchFilter = 'all';
        this.input.nativeElement.blur();
      }
    });
  }

  public showModal(): void {
    this.isShow = !this.isShow;
  }

}
