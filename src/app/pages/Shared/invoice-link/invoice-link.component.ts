import { Component } from '@angular/core';
import { SaleListComponent } from '../../sale-list/sale-list.component';

@Component({
  selector: 'app-invoice-link',
  templateUrl: './invoice-link.component.html',
  styleUrls: ['./invoice-link.component.css']
})
export class InvoiceLinkComponent {
data: any;

  openDetailView(data: any): void {
    // Call the openDetailView method from the parent component
    this.parent.openDetailView(data);
  }

  constructor(private parent: SaleListComponent) {}
}
