import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { InventoryService } from 'src/app/services/inventory.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { sell, sellItem } from 'src/app/Interfaces/sell.interface';
import { stock } from 'src/app/Interfaces/stock.interface';

@Component({
  selector: 'app-sell-dialog',
  templateUrl: './sell-dialog.component.html',
  styleUrls: ['./sell-dialog.component.css'],
})
export class SellDialogComponent {
  sellForm = new FormGroup({
    customerName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    customerAddress: new FormControl(''),
    sellDate: new FormControl(''),
    quantity: new FormControl<number>(0),
    sellAmount: new FormControl(''),
    productId: new FormControl<number>(0),
    productName: new FormControl(''),
    Comment: new FormControl(''),
  });

  supplierSearch = new FormControl('');
  filteredOptions: Observable<sell[]> | undefined;
  productFilteredOptions: Observable<any[]> | undefined;
  showspinner: boolean = false;
  productList: stock[] = [];
  supplierNames!: any[];
  dataSource!: sellItem[];
  displayedColumns: string[] = [
    'demo-position',
    'demo-Product',
    'demo-Quantity',
    'demo-Amount',
    'actions',
  ];
  ELEMENT_DATA: sellItem[] = [];
  totalAmount: number = 0;
  viewOnly: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: InventoryService,
    private dialogRef: MatDialogRef<SellDialogComponent>,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.productList = this.data.ProductList;
    this.productFilteredOptions =
      this.sellForm.controls.productName.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterProduct(value || ''))
      );

    if (this.data.ViewDetails != undefined && this.data.ViewDetails === true) {
      this.sellForm.controls.customerName.setValue(
        this.data.SellDetails.customerName
      );
      this.sellForm.controls.customerAddress.setValue(
        this.data.SellDetails.customerAddress
      );
      this.sellForm.controls.phoneNumber.setValue(
        this.data.SellDetails.phoneNumber
      );
      this.sellForm.controls.productName.setValue(
        this.data.SellDetails.productName
      );
      this.sellForm.controls.quantity.setValue(this.data.SellDetails.quantity);
      this.sellForm.controls.sellAmount.setValue(
        this.data.SellDetails.sellAmount
      );
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
      sellDate: this.sellForm.value.sellDate
        ? this.sellForm.value.sellDate
        : '',
      comment: this.sellForm.value.Comment ? this.sellForm.value.Comment : '',
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
      id: '',
      sellItems: this.dataSource,
      totalAmount: this.totalAmount,
    };

    this.service.saveNewSell(newSell).subscribe({
      next: (v) => {
        this.showspinner = this.showspinner ? false : false;
        this.dialogRef.close();
      },
      error: (e) => {
        this.showspinner = this.showspinner ? false : false;
        this.dialog.open(ErrorDialogComponent, { data: e.error });
      },
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

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.ELEMENT_DATA.forEach((item) => {
      this.totalAmount += item.amount;
    });
  }

  addNewRow() {
    const newSellRow: sellItem = {
      sl: this.ELEMENT_DATA.length + 1,
      productName: this.sellForm.value.productName
        ? this.sellForm.value.productName
        : '',
      productId: this.sellForm.value.productId
        ? this.sellForm.value.productId
        : 0,
      quantity: this.sellForm.value.quantity ? this.sellForm.value.quantity : 0,
      amount: this.sellForm.value.sellAmount
        ? parseInt(this.sellForm.value.sellAmount)
        : 0,
    };
    this.ELEMENT_DATA.push(newSellRow);
    this.dataSource = [...this.ELEMENT_DATA];
    this.sellForm.controls.productName.reset();
    this.sellForm.controls.productId.reset();
    this.sellForm.controls.quantity.reset();
    this.sellForm.controls.sellAmount.reset();
    this.calculateTotalAmount();
  }

  deleteRow(row: sellItem) {
    console.log('Delete Row' + row);
    this.ELEMENT_DATA.splice(row.sl - 1, 1);

    this.ELEMENT_DATA = this.ELEMENT_DATA.map((item, index) => ({
      ...item,
      sl: index + 1,
    }));
    this.dataSource = [...this.ELEMENT_DATA];
    this.calculateTotalAmount();
  }
}
