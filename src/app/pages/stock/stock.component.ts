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
  { field: 'productName', filter :true},
  { field: 'quantity',filter :true },
  { field: 'avarageBuyingPrice',filter :true },
];
showspinner:boolean = false;

constructor(private service:InventoryService,private dialog :MatDialog){
}

ngOnInit(): void {
  this.loadallstock();
}

loadallstock(){
  this.showspinner = true;
  this.service.getallStock().subscribe({
    next : (v) => {
      this.stocklist = v;
        this.showspinner = false;
    },
    error : (e) => {
      console.warn(e);
      this.showspinner = false;
      this.dialog.open(ErrorDialogComponent,{data:e.message});
    }
  });
}
}
