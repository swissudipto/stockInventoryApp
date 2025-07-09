import { formatDate } from '@angular/common';
import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA ,MatDialog } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/Interfaces/PeriodicElement.interface';
import { PdfgenerationService } from 'src/app/services/pdfgeneration.service';


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
  });
  
  dataSource!: PeriodicElement[];
  displayedColumns: string[] = ['demo-position', 'demo-Product', 'demo-Quantity', 'demo-Amount'];
  ELEMENT_DATA: PeriodicElement[] = [];
  totalAmount:number = 0;

constructor(
    public dialogRef: MatDialogRef<SellDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pdfservice : PdfgenerationService
  ) {
  }

  ngOnInit(): void {
    debugger;
      this.sellForm.controls.invoiceNumber.setValue(this.data.SellDetails.invoiceNo);
      this.sellForm.controls.customerName.setValue(this.data.SellDetails.customerName);
      this.sellForm.controls.customerAddress.setValue(this.data.SellDetails.customerAddress);
      this.sellForm.controls.phoneNumber.setValue(this.data.SellDetails.phoneNumber);
      this.sellForm.controls.productName.setValue(this.data.SellDetails.productName);
      this.sellForm.controls.quantity.setValue(this.data.SellDetails.quantity);
      this.sellForm.controls.sellAmount.setValue(this.data.SellDetails.sellAmount);
      this.sellForm.controls.sellDate.setValue(formatDate(this.data.SellDetails.sellDate, 'MMM d, y', 'en-US'));
      this.sellForm.controls.Comment.setValue(this.data.SellDetails.comment);
      this.bindProductTable();
      this.calculateTotalAmount();
      this.dataSource = this.ELEMENT_DATA;
  }

  bindProductTable(){
    const newProductRow: PeriodicElement = {
      position: 1,
      Product: this.data.SellDetails.productName,
      Quantity: this.data.SellDetails.quantity,
      Amount: this.data.SellDetails.sellAmount
    };
   this.ELEMENT_DATA.push(newProductRow);   
  }

  calculateTotalAmount(){
    this.ELEMENT_DATA.forEach(row => {
        this.totalAmount += row.Amount;
    })
  }

  downloadReceipt(){
    debugger;
    this.pdfservice.generateSellInvoicePdf(this.data.SellDetails);
  }

}
