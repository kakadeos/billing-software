import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPreviousInvoicesComponent } from './view-previous-invoices.component';

describe('ViewPreviousInvoicesComponent', () => {
  let component: ViewPreviousInvoicesComponent;
  let fixture: ComponentFixture<ViewPreviousInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPreviousInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPreviousInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
