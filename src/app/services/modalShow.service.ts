import {Injectable} from '@angular/core';
import {DebtorsResponse} from '../shared/interfaces';

@Injectable({providedIn: 'root'})
export class ModalShowService {

  public editableDebtor: DebtorsResponse = null;

  constructor() {
  }

  public showAsComponent(editableDebtor?: DebtorsResponse): void {
    if (editableDebtor) {
      this.editableDebtor = editableDebtor;
    }
    const popupEl: HTMLElement =
      document.createElement('app-modal-component');
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
    document.body.appendChild(popupEl);
  }
}
