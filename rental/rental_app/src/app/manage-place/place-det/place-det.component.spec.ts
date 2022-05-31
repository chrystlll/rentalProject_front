import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetComponent } from './place-det.component';

describe('PlaceDetComponent', () => {
  let component: PlaceDetComponent;
  let fixture: ComponentFixture<PlaceDetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceDetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
