import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDialogngPrimeComponent } from './purchase-dialogng-prime.component';

describe('PurchaseDialogngPrimeComponent', () => {
  let component: PurchaseDialogngPrimeComponent;
  let fixture: ComponentFixture<PurchaseDialogngPrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDialogngPrimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDialogngPrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
