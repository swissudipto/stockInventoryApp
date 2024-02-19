import { Component } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent  {
  salelist: any[]=[];
  

  constructor(private service:InventoryService)
  {

  }

  ngOnInit(): void {
    this.getsales();
  }
  

  getsales(){
    this.service.getallsell().subscribe((data)=>{
      this.salelist = data.result;
      console.warn(this.salelist);
    })
  }

}
