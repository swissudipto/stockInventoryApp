import { Component, NgZone, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ColDef, GridApi } from 'ag-grid-community';
import { sell } from 'src/app/Interfaces/sell.interface';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../Shared/error-dialog/error-dialog.component';
import { SellDialogComponent } from '../Shared/sell-dialog/sell-dialog.component';
import { stock } from 'src/app/Interfaces/stock.interface';
import { SellDetailsComponent } from '../Shared/sell-details/sell-details.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css'],
})
export class SaleListComponent implements OnInit {
  datePipe = new DatePipe('en-GB');
  coldefs: ColDef[] = [
    {
      field: 'invoiceNo',
      filter: true,
      cellRenderer: (params: any) => {
        return `<span class="clickable-link">${params.value}</span>`;
      },
      onCellClicked: (params: any) => {
        if (params.event.target.classList.contains('clickable-link')) {
          this.onLinkClick(params.data);
        }
      },
    },
    { field: 'customerName', filter: true },
    { field: 'customerAddress', filter: true },
    { field: 'phoneNumber', filter: true },
    { field: 'totalAmount', filter: true },
    { field: 'comment', filter: true },
    {
      field: 'sellDate',
      filter: true,
      valueFormatter: (params: any): string => {
        const value = params.value;
        if (!value) return '—';
        return this.datePipe.transform(value, 'dd-MM-yyyy HH:mm') || '—';
      }
    },
  ];

  sellList: sell[] = [];
  inStockProductList: stock[] = [];
  gridApi: GridApi = new GridApi();
  pageSize: number = 100;
  totalRows: number = 0;
  dataSource: any;

  constructor(
    private dialog: MatDialog,
    private inventoryService: InventoryService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.getInStockProducts();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();

    this.dataSource = {
      getRows: (params: any) => {
        const page = Math.floor(params.startRow / this.pageSize) + 1;
        this.inventoryService.getallsells(page, this.pageSize).subscribe({
          next: (res) => {
            // Defer the callback to avoid render conflict
            setTimeout(() => {
              params.successCallback(res.items, res.totalCount);
              this.gridApi.hideOverlay();
            }, 0);
          },
          error: (err) => {
            var errorMessege = '';
            console.error('Error loading data', err);
            if (err['status'] == 401) {
              errorMessege = 'User Unauthorised';
            } else {
              errorMessege = err['message'];
            }
            params.failCallback();
            this.gridApi.hideOverlay();
            this.dialog.open(ErrorDialogComponent, {
              data: errorMessege,
            });
          },
        });
      },
    };

    this.gridApi.setGridOption('datasource', this.dataSource);
  }

  openDialog() {
    const dialogRef = this.dialog.open(SellDialogComponent, {
      data: { ProductList: this.inStockProductList },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog Result ' + result);
      this.gridApi.setGridOption('datasource', this.dataSource);
      this.gridApi.paginationGoToFirstPage();
    });
  }

  getInStockProducts() {
    this.inventoryService.getallStock().subscribe({
      next: (v) => {
        this.inStockProductList = v;
        this.inStockProductList = this.inStockProductList.filter(
          (x) => x.quantity > 0
        );
      },
      error: (e) => {
        var errorMessege = '';
        console.error('Error loading data', e);
        if (e['status'] == 401) {
          errorMessege = 'User Unauthorised';
        } else {
          errorMessege = e['message'];
        }
        this.dialog.open(ErrorDialogComponent, { data: errorMessege });
      },
    });
  }

  onLinkClick(rowData: any) {
    this.ngZone.run(() => {
      const dialogRef = this.dialog.open(SellDialogComponent, {
        data: { sellDetails: rowData, readOnly: true },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('Dialog Result ' + result);
      });
    });
  }
}
