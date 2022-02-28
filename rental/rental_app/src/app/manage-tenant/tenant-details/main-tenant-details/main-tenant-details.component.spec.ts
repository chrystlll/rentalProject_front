import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTenantDetailsComponent } from './main-tenant-details.component';

describe('MainTenantDetailsComponent', () => {
  let component: MainTenantDetailsComponent;
  let fixture: ComponentFixture<MainTenantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTenantDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTenantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
