import {Component, Input, OnInit} from '@angular/core';
import {DebtorsResponse} from '../../interfaces';
import {ModalShowService} from '../../../services/modalShow.service';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss']
})
export class EditBtnComponent {

  @Input() public debtor: DebtorsResponse;

  constructor(private popup: ModalShowService) {
  }

  public editDebtor(): void {
    this.popup.showAsComponent(this.debtor);
  }

}
