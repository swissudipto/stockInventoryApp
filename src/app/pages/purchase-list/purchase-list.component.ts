import { Component, OnInit } from '@angular/core';
import { purchase } from 'src/app/Interfaces/puchase.interface';
import { InventoryService } from 'src/app/services/inventory.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {
  coldefs: ColDef[] = [
    { field: 'id' },
    { field: 'purchaseId' },
    { field: 'purchaseDate' },
    { field: 'productId' },
    { field: 'quantity' },
    { field: 'supplierName' },
    { field: 'invoiceAmount' },
    { field: 'invoiceNo' }
  ];

  purchase: purchase[] = [];
  constructor(private service: InventoryService) {}

  ngOnInit(): void {
    this.getAllPurchase();
  }

  getAllPurchase() {
    this.service.getallpurchase().subscribe((data) => {
      this.purchase = data;
      console.warn(this.purchase);
    });
  }
}
