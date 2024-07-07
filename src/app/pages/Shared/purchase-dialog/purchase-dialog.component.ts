import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';
import { product } from 'src/app/Interfaces/product.interface';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css']
})
export class PurchaseDialogComponent implements OnInit {


  purchaseForm = new FormGroup({
    invoiceNo: new FormControl(''),
    supplierName: new FormControl(''),
    purchaseDate: new FormControl(''),
    productId: new FormControl<number>(-1),
    quantity: new FormControl<number>(0),
    invoiceAmount: new FormControl<number>(0),
    newProductName: new FormControl('')
  })

  productList: product[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: InventoryService) {
  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  onSaveClick() {
    debugger;
    console.warn(this.purchaseForm);
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
    })
  }

}
