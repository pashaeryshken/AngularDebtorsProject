import {Injectable} from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
=======
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
>>>>>>> 96afeac285079c809edf307dc86a1d169306c273

@Injectable({providedIn: 'root'})
export class ModalShowService {
  constructor() {
  }

  public showAsComponent(): void {
<<<<<<< HEAD
=======
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
>>>>>>> Revert "finaly commit"
=======
>>>>>>> master
>>>>>>> 96afeac285079c809edf307dc86a1d169306c273
    const popupEl: HTMLElement =
      document.createElement('app-modal-component');
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
    document.body.appendChild(popupEl);
  }
}
