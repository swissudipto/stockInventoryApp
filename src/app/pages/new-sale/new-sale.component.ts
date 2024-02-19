import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.css']
})
export class NewSaleComponent {
  purchaseObj: any = {
    "purchaseId": 0,
    "purchaseDate": "2023-09-23T11:00:36.277Z",
    "productId": 0,
    "quantity": 0,
    "supplierName": "",
    "invoiceAmount": 0,
    "invoiceNo": ""
  };
  productList: any[] = [];

  constructor(private service : InventoryService){

  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.service.getallproducts().subscribe((data)=>{
      this.productList = data.result;
      console.warn(this.productList);
    })  
  }
  onSave() {
    this.service.savenewpurchase(this.purchaseObj).subscribe((data)=>{
      console.warn(data);
    })
  }
}
