import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInactiveComponent } from './contract-inactive.component';

describe('ContractInactiveComponent', () => {
  let component: ContractInactiveComponent;
  let fixture: ComponentFixture<ContractInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractInactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
