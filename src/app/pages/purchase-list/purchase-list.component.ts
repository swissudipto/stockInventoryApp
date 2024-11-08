import { Component, OnInit } from '@angular/core';
import { purchase } from 'src/app/Interfaces/puchase.interface';
import { InventoryService } from 'src/app/services/inventory.service';
import { ColDef } from 'ag-grid-community';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseDialogComponent } from '../Shared/purchase-dialog/purchase-dialog.component';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css'],
})
export class PurchaseListComponent implements OnInit {
  coldefs: ColDef[] = [
    { field: 'id' },
    { field: 'purchaseId' },
    {
      field: 'purchaseDate',
      valueFormatter: function (params) {
        return formatDate(params.value, 'MMM d, y, h:mm:ss a', 'en-US');
      },
    },
    { field: 'productId' },
    { field: 'quantity' },
    { field: 'supplierName' },
    { field: 'invoiceAmount' },
    { field: 'invoiceNo' }
  ];

  purchase: purchase[] = [];
  showspinner: boolean = true;
  constructor(private service: InventoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllPurchase();
  }

  getAllPurchase() {
    this.service.getallpurchase().subscribe({
      next: (v) => {
        this.purchase = v;
        this.showspinner = false;
      },
      error: (e) => {
        console.warn('Purchase API call Failed');
        this.showspinner = false;
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PurchaseDialogComponent, {
      data: { tittle: 'Hello Jarvis' }
    });

    dialogRef
      .afterClosed()
      .subscribe((result) => {
        console.log('Dialog Result ' + result);
        this.getAllPurchase()
      });
  }
}
