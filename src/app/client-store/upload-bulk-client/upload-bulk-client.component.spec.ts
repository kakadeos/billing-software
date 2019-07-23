import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBulkClientComponent } from './upload-bulk-client.component';

describe('UploadBulkClientComponent', () => {
  let component: UploadBulkClientComponent;
  let fixture: ComponentFixture<UploadBulkClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBulkClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBulkClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
