import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../Shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
stocklist: any[]=[];
coldefs: ColDef[] = [
  { field: 'productId', filter :true },
  { field: 'productName', filter :true},
  { field: 'quantity',filter :true },
  { field: 'avarageBuyingPrice',filter :true },
];

constructor(private service:InventoryService,private dialog :MatDialog){
}

ngOnInit(): void {
  this.loadallstock();
}

loadallstock(){
  this.service.getallStock().subscribe({
    next : (v) => {
      this.stocklist = v;
    },
    error : (e) => {
      console.warn(e);
      this.dialog.open(ErrorDialogComponent,{data:e.message});
    }
  });
}
}
