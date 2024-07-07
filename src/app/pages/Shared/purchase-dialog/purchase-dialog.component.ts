import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css']
})
export class PurchaseDialogComponent {

  purchaseForm = new FormGroup({
    invoiceNo: new FormControl(''),
    supplierName: new FormControl(''),
    purchaseDate: new FormControl(''),
    productId: new FormControl(''),
    quantity: new FormControl(''),
    invoiceAmount: new FormControl('')
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onSaveClick(){
    console.warn(this.purchaseForm);
  }

}
