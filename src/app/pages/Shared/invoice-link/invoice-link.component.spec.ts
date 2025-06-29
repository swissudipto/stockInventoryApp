import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLinkComponent } from './invoice-link.component';

describe('InvoiceLinkComponent', () => {
  let component: InvoiceLinkComponent;
  let fixture: ComponentFixture<InvoiceLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
