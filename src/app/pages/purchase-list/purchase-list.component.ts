import { Component, OnInit } from '@angular/core';
import { purchase } from 'src/app/Interfaces/puchase.interface';
import { InventoryService } from 'src/app/services/inventory.service';
import { ColDef } from 'ag-grid-community';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseDialogComponent } from '../Shared/purchase-dialog/purchase-dialog.component';
import { ErrorDialogComponent } from '../Shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css'],
})
export class PurchaseListComponent implements OnInit {
  coldefs: ColDef[] = [
    { field: 'invoiceNo', filter: true },
    { field: 'productName', filter: true },
    { field: 'quantity', filter: true },
    { field: 'invoiceAmount', filter: true },
    { field: 'supplierName', filter: true },
    {
      field: 'purchaseDate',
      valueFormatter: function (params) {
        return formatDate(params.value, 'MMM d, y', 'en-US');
      },
      filter: true
    },
    { field: 'comment', filter: true },
  ];

  purchase: purchase[] = [];
  showspinner: boolean = true;
  uniqueSuppliersNames:any;
  constructor(private service: InventoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPurchase();
  }

  getAllPurchase() {
    this.service.getallpurchase().subscribe({
      next: (v) => {
        this.purchase = v;
        this.showspinner = false;
        this.uniqueSuppliersNames = new Set( this.purchase.filter(purchase => purchase.supplierName.trim() !=="").map(supplier => supplier.supplierName));
      },
      error: (e) => {
        console.warn('Purchase API call Failed');
        this.showspinner = false;
        this.dialog.open(ErrorDialogComponent,{data:e.message});
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PurchaseDialogComponent, {
      data: { supplierNames: this.uniqueSuppliersNames }
    });

    dialogRef
      .afterClosed()
      .subscribe((result) => {
        console.log('Dialog Result ' + result);
        this.getAllPurchase()
      });
  }

  onPaginationChanges(param: any){
    debugger;
  }
}
