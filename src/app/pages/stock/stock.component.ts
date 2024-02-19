import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
stocklist: any[]=[];

constructor(private service:InventoryService){
}

ngOnInit(): void {
  this.loadallstock();
}

loadallstock(){
  this.service.getallStock().subscribe((data)=>{
    this.stocklist = data.result;
    console.warn(this.stocklist);
  });
}

}
