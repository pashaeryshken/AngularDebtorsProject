import {Injectable} from '@angular/core';
import {ModalComponent} from '../shared/components/modal/modal.component';
import {NgElement, WithProperties} from '@angular/elements';

@Injectable({providedIn: 'root'})
export class ModalShowService {
  constructor() {
  }

  public showAsComponent(): void {
    const popupEl: NgElement & WithProperties<ModalComponent> =
      document.createElement('app-modal-component') as NgElement & WithProperties<ModalComponent>;
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
    document.body.appendChild(popupEl);
  }
}
