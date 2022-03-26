import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPriceComponent } from './contract-price.component';

describe('ContractPriceComponent', () => {
  let component: ContractPriceComponent;
  let fixture: ComponentFixture<ContractPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
