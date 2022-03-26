import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPlaceComponent } from './contract-place.component';

describe('ContractPlaceComponent', () => {
  let component: ContractPlaceComponent;
  let fixture: ComponentFixture<ContractPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
