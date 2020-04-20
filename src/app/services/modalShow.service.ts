import {Injectable} from '@angular/core';
<<<<<<< HEAD
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
=======

@Injectable({providedIn: 'root'})
export class ModalShowService {
  constructor() {
  }

  public showAsComponent(): void {
>>>>>>> master
    const popupEl: HTMLElement =
      document.createElement('app-modal-component');
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
    document.body.appendChild(popupEl);
  }
}
