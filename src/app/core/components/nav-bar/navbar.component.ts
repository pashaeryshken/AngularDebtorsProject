import {Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../../services/search.service';
import {createCustomElement, NgElement, NgElementConstructor} from '@angular/elements';
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
              public router: Router,
              public modalShowService: ModalShowService,
              public injector: Injector,
              ) {

    const POPUP_ELEMENT: NgElementConstructor<ModalComponent> = createCustomElement(ModalComponent, {injector});
    customElements.define('app-modal-component', POPUP_ELEMENT);
  }

  public ngOnInit(): void {
  }

  public openSearch(event: Event): void {
    event.preventDefault();
    this.searchService.isSearch = !this.searchService.isSearch;
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

}
