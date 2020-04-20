import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreatePeopleComponent } from './popup-create-people.component';

describe('PopupCreatePeopleComponent', () => {
  let component: PopupCreatePeopleComponent;
  let fixture: ComponentFixture<PopupCreatePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCreatePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCreatePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
