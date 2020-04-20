import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {People} from '../../../interfaces';
import {CreatePeopleFormComponent} from '../../form-components/create-people-form/create-people-form.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/state/app.state';
import {GetPeopleAction} from '../../../../core/store/actions/people.action';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PopupShowService} from '../../../../services/popupShow.service';

@Component({
  selector: 'app-popup-create-people',
  templateUrl: './popup-create-people.component.html',
  styleUrls: ['./popup-create-people.component.scss'],
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('250ms ease-out')
      ]),
      state('leave', style({opacity: 0})),
      transition('* => leave', animate(250)
      )
    ])
  ]
})
export class PopupCreatePeopleComponent {

  public people: People;
  @Output() public closed: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(CreatePeopleFormComponent) public peopleForm: CreatePeopleFormComponent;
  public stateAnimation: string = '';
  public formPeopleValid: boolean = false;

  constructor(private store: Store<AppState>, private modalShowService: PopupShowService) {
    this.people = this.modalShowService.editablePeople;
  }

  public submit(): void {
    this.peopleForm.submit().subscribe(() => {
      this.store.dispatch(new GetPeopleAction());
      this.close();
    });
  }

  public validPeopleForm(event: boolean): void {
    this.formPeopleValid = event;
  }

  public clear(): void {
    this.peopleForm.clearForm();
  }

  public close(): void {
    this.stateAnimation = 'leave';
    setTimeout(() => {
      this.clear();
      this.closed.emit();
    }, 250);
  }

}
