import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';
import { product } from 'src/app/Interfaces/product.interface';
import { purchase } from 'src/app/Interfaces/puchase.interface';

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
    quantity: new FormControl<number>(0),
    invoiceAmount: new FormControl<number>(0),
    newProductName: new FormControl(''),
    selectedProductid: new FormControl<number>(0),
    Comment : new FormControl('')
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
    const newPurchase: purchase = {
      invoiceNo: this.purchaseForm.value.invoiceNo ? this.purchaseForm.value.invoiceNo : "",
      invoiceAmount: this.purchaseForm.value.invoiceAmount ? this.purchaseForm.value.invoiceAmount : 0,
      productId: this.purchaseForm.value.selectedProductid ? this.purchaseForm.value.selectedProductid : 0,
      productName: "",
      supplierName: this.purchaseForm.value.supplierName ? this.purchaseForm.value.supplierName : "",
      purchaseDate: this.purchaseForm.value.purchaseDate ? this.purchaseForm.value.purchaseDate : "",
      quantity: this.purchaseForm.value.quantity ? this.purchaseForm.value.quantity : 0,
      comment : this.purchaseForm.value.Comment ? this.purchaseForm.value.Comment : '', 
      id: '',
      purchaseId: ''
    }

    if (this.purchaseForm.controls.selectedProductid.value == -1) {
      const newProduct: product = {
        id: "",
        productId: 0,
        productName: this.purchaseForm.controls.newProductName.value ? this.purchaseForm.controls.newProductName.value : ""
      }
      this.service.saveNewProduct(newProduct).subscribe({
        next: (v) => {
          newPurchase.productId = v.productId;
          this.service.savenewpurchase(newPurchase).subscribe({
            next: (v) => {
              this.getAllProduct();
            },
            error: (e) => {
              console.log(e);
            }
          });
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
    else {
      this.service.savenewpurchase(newPurchase).subscribe({
        next: (v) => {
          console.log(v);
        },
        error: (e) => {
          console.log(e);
        }
      }
      );
    }
  }

  getAllProduct() {
    this.service.getallproducts().subscribe((data) => {
      this.productList = data;
      const addNewProductValue: product = {
        id: "",
        productId: -1,
        productName: "Add new Product"
      }
      this.productList.push(addNewProductValue);
    })
  }

}
