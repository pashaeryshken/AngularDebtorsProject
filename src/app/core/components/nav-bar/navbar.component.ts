import {Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../../services/search.service';
import { createCustomElement } from '@angular/elements';
import {Router} from '@angular/router';
import {ModalShowService} from '../../../services/modalShow.service';
import {ModalComponent} from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-navbar-layout',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('input') public input: ElementRef;

  constructor(public searchService: SearchService,
              private router: Router,
              public modalShowService: ModalShowService,
              public injector: Injector,
              ) {
    const PopupElement = createCustomElement(ModalComponent, {injector});
    customElements.define('app-modal-component', PopupElement);
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
    /*this.modalShowService.isShow = !this.modalShowService.isShow;*/
  }

}
