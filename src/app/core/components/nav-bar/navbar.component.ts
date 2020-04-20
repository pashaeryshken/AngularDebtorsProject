import {Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {SearchDebtorService} from '../../../services/search/search-debtor.service';
import {Router} from '@angular/router';
import {PopupShowService} from '../../../services/popupShow.service';
import {SearchPeopleService} from '../../../services/search/search-people.service';
@Component({
  selector: 'app-navbar-layout',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('input') public input: ElementRef;

  constructor(public searchDebtService: SearchDebtorService,
              public router: Router,
              public modalShowService: PopupShowService,
              public searchPeopleService: SearchPeopleService) {}

  public ngOnInit(): void {
  }

  public openSearch(event: Event): void {
    event.preventDefault();
    this.searchDebtService.isSearch = !this.searchDebtService.isSearch;
  }

  public closeSearch(): void {
    setTimeout(() => {
      if (this.searchDebtService.isSearch) {
        this.searchDebtService.isSearch = false;
        this.searchDebtService.searchStr = '';
        this.searchDebtService.searchFilter = 'all';
        this.input.nativeElement.blur();
      }
    });
  }

}
