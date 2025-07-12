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
    "supplierName": "",
    "comment": '',
    totalAmount: 0,
    supplierContactNumber: '',
    supplierAddress: '',
    PurchaseId: 0
  };
  newProductName : string = '';
  productList: product[] = [];

  constructor(private service : InventoryService){

  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.service.getallproducts().subscribe((data) => {
      this.productList = data;
      const addNewProductValue: product = {
        id: "",
        productId: 0,
        productName: "Add new Product"
      }
      this.productList.push(addNewProductValue);
      console.warn(this.productList);
    })
  }
  onSave() {
    if (this.newProductName != '') {
      const newProduct: product = {
        id: "",
        productId: 0,
        productName: this.newProductName
      }
      this.service.saveNewProduct(newProduct).subscribe((data) => {
       // this.purchaseObj.productId = data.productId;
        this.service.savenewpurchase(this.purchaseObj).subscribe((data) => {
          this.getAllProduct();
        });
      });
    }
    else{
      this.service.savenewpurchase(this.purchaseObj).subscribe((data) => {
        console.warn(data);
      });
    }
  }
}
