import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlaceComponent } from './manage-place.component';

describe('ManagePlaceComponent', () => {
  let component: ManagePlaceComponent;
  let fixture: ComponentFixture<ManagePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
