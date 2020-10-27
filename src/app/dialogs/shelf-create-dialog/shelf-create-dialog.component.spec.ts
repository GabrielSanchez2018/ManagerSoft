import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfCreateDialogComponent } from './shelf-create-dialog.component';

describe('ShelfCreateDialogComponent', () => {
  let component: ShelfCreateDialogComponent;
  let fixture: ComponentFixture<ShelfCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
