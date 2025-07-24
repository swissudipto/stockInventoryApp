import { Component, NgZone, OnInit } from '@angular/core';
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
    {
      field: 'purchaseId',
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
    { field: 'supplierName', filter: true },
    { field: 'supplierAddress', filter: true },
    { field: 'totalAmount', filter: true },
    {
      field: 'purchaseDate',
      filter: true,
    },
    { field: 'comment', filter: true },
  ];

  purchase: purchase[] = [];
  uniqueSuppliersNames: any;
  gridApi: GridApi = new GridApi();
  pageSize: number = 100;
  totalRows: number = 0;
  dataSource: any;

  constructor(
    private service: InventoryService,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(PurchaseDialogComponent, {
      data: { supplierNames: this.uniqueSuppliersNames },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog Result ' + result);
      this.gridApi.setGridOption('datasource', this.dataSource);
      this.gridApi.paginationGoToFirstPage();
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();

    this.dataSource = {
      getRows: (params: any) => {
        const page = Math.floor(params.startRow / this.pageSize) + 1;

        this.service.getallpurchase(page, this.pageSize).subscribe({
          next: (res) => {
            // Defer the callback to avoid render conflict
            setTimeout(() => {
              params.successCallback(res.items, res.totalCount);
              this.gridApi.hideOverlay();
            }, 0);
          },
          error: (err) => {
            console.error('Error loading data', err);
            params.failCallback();
            this.gridApi.hideOverlay();
            this.dialog.open(ErrorDialogComponent, {
              data: err,
            });
          },
        });
      },
    };

    this.gridApi.setGridOption('datasource', this.dataSource);
  }

  onLinkClick(rowData: any) {
    this.ngZone.run(() => {
      const dialogRef = this.dialog.open(PurchaseDialogComponent, {
        data: { PuchaseDetails: rowData, readOnly: true },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('Dialog Result ' + result);
      });
    });
  }
}
