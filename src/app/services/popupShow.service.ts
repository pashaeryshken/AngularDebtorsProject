import {Injectable} from '@angular/core';
import {DebtorsResponse, People} from '../shared/interfaces';

@Injectable({providedIn: 'root'})
export class PopupShowService {

  public editableDebtor: DebtorsResponse = null;
  public editablePeople: People = null;

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

  public showPopupHistory(): void {
    const popupHistory: HTMLElement = document.createElement('app-popup-history');
    popupHistory.addEventListener('closed', () => document.body.removeChild(popupHistory));
    document.body.appendChild(popupHistory);
  }

  public showPopupEditPeople(editablePeople?: People): void {
    if (editablePeople) {
      this.editablePeople = editablePeople;
    }
    const popupEl: HTMLElement =
      document.createElement('app-popup-create-people');
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
    document.body.appendChild(popupEl);
  }
}
