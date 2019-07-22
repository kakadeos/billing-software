import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingListComponent } from './view-pending-list.component';

describe('ViewPendingListComponent', () => {
  let component: ViewPendingListComponent;
  let fixture: ComponentFixture<ViewPendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
