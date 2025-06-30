import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA ,MatDialog } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-sell-details',
  templateUrl: './sell-details.component.html',
  styleUrls: ['./sell-details.component.css']
})
export class SellDetailsComponent implements OnInit  {

  sellForm = new FormGroup({
    customerName: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl(''),
    customerAddress: new FormControl(''),
    sellDate: new FormControl(''),
    quantity: new FormControl<number>(0,[Validators.min(1)]),
    sellAmount: new FormControl(''),
    productId: new FormControl<number>(0,[Validators.required]),
    productName: new FormControl(''),
    Comment: new FormControl(''),
    invoiceNumber: new FormControl('')
  })


constructor(
    public dialogRef: MatDialogRef<SellDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.sellForm.controls.customerName.setValue(this.data.rowData.customerName);
    this.sellForm.controls.invoiceNumber.setValue(this.data.rowData.invoiceNo);
    debugger;
  }

}
