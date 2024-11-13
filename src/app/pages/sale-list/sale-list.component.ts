import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ColDef } from 'ag-grid-community';
import { formatDate } from '@angular/common';
import { sell } from 'src/app/Interfaces/sell.interface';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseDialogComponent } from '../Shared/purchase-dialog/purchase-dialog.component';
import { ErrorDialogComponent } from '../Shared/error-dialog/error-dialog.component';
import { SellDialogComponent } from '../Shared/sell-dialog/sell-dialog.component';
import { product } from 'src/app/Interfaces/product.interface';
import { stock } from 'src/app/Interfaces/stock.interface';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {
  coldefs: ColDef[] = [
    { field: 'invoiceNo', filter: true },
    { field: 'customerName', filter: true },
    { field: 'customerAddress', filter: true },
    { field: 'phoneNumber', filter: true },
    { field: 'productName', filter: true },
    { field: 'quantity', filter: true },
    { field: 'sellAmount', filter: true },
    { field: 'comment', filter: true },
    {
      field: 'sellDate',
      valueFormatter: function (params) {
        return formatDate(params.value, 'MMM d, y', 'en-US');
      },
      filter: true
    }
  ];

  sellList: sell[] = [];
  inStockProductList: stock[] = [];
  showspinner: boolean = false;

  constructor(private dialog: MatDialog,
    private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getInStockProducts();
    this.getAllSellData();
  }

  getAllSellData() {
    debugger;
    this.showspinner = false;
    this.inventoryService.getallsell().subscribe({
      next: (v) => {
        this.sellList = v;
        this.showspinner = this.showspinner ? false : false;
      },
      error: (e) => {
        console.warn(e);
        this.showspinner = this.showspinner ? false : false;
        this.dialog.open(ErrorDialogComponent, { data: e.message });
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(SellDialogComponent, {
      data: { ProductList : this.inStockProductList }
    });

    dialogRef
      .afterClosed()
      .subscribe((result) => {
        console.log('Dialog Result ' + result);
        this.getAllSellData();
      });
  }

  getInStockProducts() {
    this.inventoryService.getallStock().subscribe({
      next: (v) => {
        this.inStockProductList = v;
        this.inStockProductList = this.inStockProductList.filter(x => x.quantity > 0);
      },
      error: (e) => {
        this.dialog.open(ErrorDialogComponent, { data: e.message });      
      }
    });
  }
}

