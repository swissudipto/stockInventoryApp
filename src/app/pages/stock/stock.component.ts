import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ColDef } from 'ag-grid-community';

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
];

constructor(private service:InventoryService){
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
    }
  });
}
}
