import { Component, OnInit } from '@angular/core';
import { purchase } from 'src/app/Interfaces/puchase.interface';
import { InventoryService } from 'src/app/services/inventory.service';
import { ColDef, GridApi } from 'ag-grid-community';
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
    { field: 'purchaseDate',filter: true },
    { field: 'comment', filter: true },
  ];

  purchase: purchase[] = [];
  showspinner: boolean = false;
  uniqueSuppliersNames:any;
  gridApi: GridApi = new GridApi();
  pageSize: number = 100;
  totalRows: number = 0;
  dataSource: any;

  constructor(private service: InventoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(PurchaseDialogComponent, {
      data: { supplierNames: this.uniqueSuppliersNames }
    });

    dialogRef
      .afterClosed()
      .subscribe((result) => {
        console.log('Dialog Result ' + result);
         this.gridApi.setGridOption('datasource', this.dataSource);
         this.gridApi.paginationGoToFirstPage();    
      });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;

    this.dataSource = {
      getRows: (params: any) => {
        const page = Math.floor(params.startRow / this.pageSize) + 1;
        this.showspinner = true;
        this.service.getallpurchase(page, this.pageSize).subscribe({
          next: (res) => {
            this.showspinner = false;
            // Defer the callback to avoid render conflict
            setTimeout(() => {
              params.successCallback(res.items, res.totalCount);
            }, 0);
          },
          error: (err) => {
            console.error('Error loading data', err);
            params.failCallback();
            this.showspinner = false;
          }
        });
      }
    };

    this.gridApi.setGridOption('datasource', this.dataSource);
  }
}
