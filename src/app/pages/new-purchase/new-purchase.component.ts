import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { product } from 'src/app/Interfaces/product.interface';
import { purchase } from 'src/app/Interfaces/puchase.interface';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css']
})
export class NewPurchaseComponent {

  purchaseObj: purchase = {
    "id": "",
    "purchaseDate": new Date(), 
    "purchaseId": "",
    "productId": 0,
    "quantity": 0,
    "supplierName": "",
    "invoiceAmount": 0,
    "invoiceNo": ""
  };
  productList: product[] = [];

  constructor(private service : InventoryService){

  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.service.getallproducts().subscribe((data)=>{
      this.productList = data;
      console.warn(this.productList);
    })  
  }
  onSave() {
    this.service.savenewpurchase(this.purchaseObj).subscribe((data)=>{
      console.warn(data);
    })
  }

}
