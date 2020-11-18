import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaydialogComponent } from './paydialog.component';

describe('PaydialogComponent', () => {
  let component: PaydialogComponent;
  let fixture: ComponentFixture<PaydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
