import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPurchasePageComponent } from './new-purchase-page.component';

describe('NewPurchasePageComponent', () => {
  let component: NewPurchasePageComponent;
  let fixture: ComponentFixture<NewPurchasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPurchasePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPurchasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
