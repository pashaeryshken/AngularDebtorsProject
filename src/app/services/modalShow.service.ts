import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ModalShowService {
  constructor() {
  }

  public showAsComponent(): void {
    const popupEl: HTMLElement =
      document.createElement('app-modal-component');
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
    document.body.appendChild(popupEl);
  }
}
