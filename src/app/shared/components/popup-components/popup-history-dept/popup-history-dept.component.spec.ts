import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupHistoryDeptComponent } from './popup-history-dept.component';

describe('PopupHistoryDeptComponent', () => {
  let component: PopupHistoryDeptComponent;
  let fixture: ComponentFixture<PopupHistoryDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupHistoryDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupHistoryDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
