import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractVehicleComponent } from './contract-vehicle.component';

describe('ContractVehicleComponent', () => {
  let component: ContractVehicleComponent;
  let fixture: ComponentFixture<ContractVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
