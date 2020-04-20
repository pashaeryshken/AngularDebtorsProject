import {Component, Input} from '@angular/core';
import {DebtorsResponse, People} from '../../../interfaces';
import {PopupShowService} from '../../../../services/popupShow.service';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss']
})
export class EditBtnComponent {

  @Input() public debtor: DebtorsResponse;
  @Input() public people: People;
  constructor(private popup: PopupShowService) {
  }

  public edit(): void {
    if (this.debtor) {
      this.popup.showAsComponent(this.debtor);
    } else if (this.people) {
      this.popup.showPopupEditPeople(this.people);
    }
  }

}
