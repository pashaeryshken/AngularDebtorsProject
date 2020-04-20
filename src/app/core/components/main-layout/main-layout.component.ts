import {Component, Injector, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {createCustomElement, NgElementConstructor} from '@angular/elements';
import {PopupCreateDebtorComponent} from '../../../shared/components/popup-components/popup-create-debtor/popup-create-debtor.component';
import {PopupHistoryDeptComponent} from '../../../shared/components/popup-components/popup-history-dept/popup-history-dept.component';
import {PopupCreatePeopleComponent} from '../../../shared/components/popup-components/popup-create-people/popup-create-people.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, public injector: Injector) {
    const POPUP_DEBT: NgElementConstructor<PopupCreateDebtorComponent> = createCustomElement(PopupCreateDebtorComponent, {injector});
    if (!customElements.get('app-modal-component')) {
      customElements.define('app-modal-component', POPUP_DEBT);
    }
    const POPUP_HISTORY: NgElementConstructor<PopupHistoryDeptComponent> = createCustomElement(PopupHistoryDeptComponent, {injector});
    if (!customElements.get('app-popup-history')) {
      customElements.define('app-popup-history', POPUP_HISTORY);
    }
    const POPUP_PEOPLE: NgElementConstructor<PopupHistoryDeptComponent> = createCustomElement(PopupCreatePeopleComponent, {injector});
    if (!customElements.get('app-popup-create-people')) {
      customElements.define('app-popup-create-people', POPUP_PEOPLE);
    }
  }

  public ngOnInit(): void {}

  public logout(event: Event): void {
    this.auth.logout();
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
