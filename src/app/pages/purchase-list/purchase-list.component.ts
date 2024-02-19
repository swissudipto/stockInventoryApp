import { Component ,OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

purchase:any;
  constructor(private service : InventoryService){
  }


  ngOnInit(): void {
    this.getAllPurchase();
  }
  

  getAllPurchase(){
    this.service.getallpurchase().subscribe((data)=>{
      this.purchase = data.result;
      console.warn(this.purchase);
    })
  }

}
