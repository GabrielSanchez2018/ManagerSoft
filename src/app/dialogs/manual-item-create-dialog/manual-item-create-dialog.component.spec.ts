import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualItemCreateDialogComponent } from './manual-item-create-dialog.component';

describe('ManualItemCreateDialogComponent', () => {
  let component: ManualItemCreateDialogComponent;
  let fixture: ComponentFixture<ManualItemCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualItemCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualItemCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
