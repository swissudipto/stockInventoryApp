import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { InventoryService } from 'src/app/services/inventory.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { sell } from 'src/app/Interfaces/sell.interface';
import { product } from 'src/app/Interfaces/product.interface';
import { stock } from 'src/app/Interfaces/stock.interface';

@Component({
  selector: 'app-sell-dialog',
  templateUrl: './sell-dialog.component.html',
  styleUrls: ['./sell-dialog.component.css']
})
export class SellDialogComponent {

  sellForm = new FormGroup({
    customerName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    customerAddress: new FormControl(''),
    sellDate: new FormControl(''),
    quantity: new FormControl<number>(0, [Validators.min(1)]),
    sellAmount: new FormControl(''),
    productId: new FormControl<number>(0, [Validators.required]),
    productName: new FormControl(''),
    Comment: new FormControl(''),
  });

  productSearch = new FormControl('');
  supplierSearch = new FormControl('');
  filteredOptions: Observable<sell[]> | undefined;
  productFilteredOptions: Observable<any[]> | undefined;

  showspinner: boolean = false;
  productList: stock[] = [];
  supplierNames!: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: InventoryService,
    private dialogRef: MatDialogRef<SellDialogComponent>,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.productList = this.data.ProductList;
    this.productFilteredOptions = this.productSearch.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProduct(value || ''))
    );

    if (this.data.ViewDetails != undefined && this.data.ViewDetails === true) {
      this.sellForm.controls.customerName.setValue(this.data.SellDetails.customerName);
      this.sellForm.controls.customerAddress.setValue(this.data.SellDetails.customerAddress);
      this.sellForm.controls.phoneNumber.setValue(this.data.SellDetails.phoneNumber);
      this.sellForm.controls.productName.setValue(this.data.SellDetails.productName);
      this.sellForm.controls.quantity.setValue(this.data.SellDetails.quantity);
      this.sellForm.controls.sellAmount.setValue(this.data.SellDetails.sellAmount);
      this.sellForm.controls.sellDate.setValue(this.data.SellDetails.sellDate);
      this.sellForm.controls.Comment.setValue(this.data.SellDetails.comment);
      this.sellForm.disable();
    }
  }

  onSaveClick() {
    if (this.sellForm.invalid) {
      this.dialog.open(ErrorDialogComponent, {
        data: 'Kindly fill all the required fileds',
      });
      return;
    }
    this.showspinner = true;
    const newSell: sell = {
      productId: this.sellForm.value.productId
        ? this.sellForm.value.productId
        : 0,
      sellDate: this.sellForm.value.sellDate
        ? this.sellForm.value.sellDate
        : '',
      quantity: this.sellForm.value.quantity
        ? this.sellForm.value.quantity
        : 0,
      comment: this.sellForm.value.Comment
        ? this.sellForm.value.Comment
        : '',
      sellAmount: this.sellForm.value.sellAmount
        ? this.sellForm.value.sellAmount
        : '',
      customerName: this.sellForm.value.customerName
        ? this.sellForm.value.customerName
        : '',
      customerAddress: this.sellForm.value.customerAddress
        ? this.sellForm.value.customerAddress
        : '',
      phoneNumber: this.sellForm.value.phoneNumber
        ? this.sellForm.value.phoneNumber
        : '',
      invoiceNo: '',
      productName: this.sellForm.value.productName
        ? this.sellForm.value.productName
        : '',
      id: ''
    };

    this.service.saveNewSell(newSell).subscribe({
      next: (v) => {
        this.showspinner = this.showspinner ? false : false;
        this.dialogRef.close();
      },
      error: (e) => {
        this.showspinner = this.showspinner ? false : false;
        this.dialog.open(ErrorDialogComponent, { data: e.error });
      }
    });
  }

  private _filterProduct(value: string): any[] {
    return this.productList.filter((option) =>
      option.productName.toLowerCase().includes(value.toLowerCase())
    );
  }

  productSelectionChange(product: stock) {
    this.sellForm.get('productId')?.setValue(product.productId);
    this.sellForm.get('productName')?.setValue(product.productName);
  }
}
