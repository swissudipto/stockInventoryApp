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
import { PdfgenerationService } from 'src/app/services/pdfgeneration.service';

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
  editMode: boolean = false;
  inStockProductList: stock[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: InventoryService,
    private dialogRef: MatDialogRef<SellDialogComponent>,
    private dialog: MatDialog,
    private pdfservice: PdfgenerationService
  ) { }

  ngOnInit(): void {
    this.getInStockProducts();
    this.productFilteredOptions =
      this.sellForm.controls.productName.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterProduct(value || ''))
      );
    if (this.data.readOnly ?? false) {
      this.viewOnly = true;
      this.bindAllValues(this.data.sellDetails);
      this.sellForm.disable();
    } else {
      this.viewOnly = false;
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
      id: 0,
      sellItems: this.dataSource,
      totalAmount: this.totalAmount,
    };

    if (this.editMode) {
      newSell.id = this.data.sellDetails.id;
      this.service.editSell(newSell).subscribe({
        next: (v) => {
          this.showspinner = this.showspinner ? false : false;
          this.dialogRef.close();
        },
        error: (e) => {
          this.showspinner = this.showspinner ? false : false;
          var appendedErrors;
          if (typeof (e.error.errors) != "undefined" && e.error.errors.length > 0) {
            appendedErrors = e.error.errors.map((error: any) => error['errorMessage']).join();
          }
          this.dialog.open(ErrorDialogComponent, { data: appendedErrors == undefined ? e.message : appendedErrors });
        }
      });
    } else {
      this.service.saveNewSell(newSell).subscribe({
        next: (v) => {
          this.showspinner = this.showspinner ? false : false;
          this.dialogRef.close();
        },
        error: (e) => {
          this.showspinner = this.showspinner ? false : false;
          var appendedErrors;
          if (typeof (e.error.errors) != "undefined" && e.error.errors.length > 0) {
            appendedErrors = e.error.errors.map((error: any) => error['errorMessage']).join();
          }
          this.dialog.open(ErrorDialogComponent, { data: appendedErrors == undefined ? e.message : appendedErrors });
        }
      });
    }
  }

  private _filterProduct(value: string): any[] {
    return this.inStockProductList.filter((option) =>
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
    if (
      this.sellForm.value.productName == null ||
      this.sellForm.value.productName == '' ||
      this.sellForm.value.productId == null ||
      this.sellForm.value.productId < 1 ||
      this.sellForm.value.quantity == null ||
      this.sellForm.value.quantity < 1 ||
      this.sellForm.value.sellAmount == null ||
      this.sellForm.value.sellAmount == '' ||
      Number.isNaN(this.sellForm.value.sellAmount)
    ) {
      this.dialog.open(ErrorDialogComponent, {
        data: 'Kindly fill the Item details properly!',
      });
      return;
    }

    // Duplicate Item Check
    for (const element of this.ELEMENT_DATA) {
      if (
        element.productName.trim().toUpperCase() ===
        (this.sellForm.controls.productName?.value ?? '').trim().toUpperCase()
      ) {
        this.dialog.open(ErrorDialogComponent, {
          data: 'The Item is already added!',
        });
        return;
      }
    }

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

  bindAllValues(sellDetails: sell) {
    this.sellForm.controls.customerName.setValue(sellDetails.customerName);
    this.sellForm.controls.phoneNumber.setValue(sellDetails.phoneNumber);
    this.sellForm.controls.customerAddress.setValue(
      sellDetails.customerAddress
    );
    this.sellForm.controls.sellDate.setValue(sellDetails.sellDate.toString());
    this.totalAmount = sellDetails.totalAmount;
    this.sellForm.controls.Comment.setValue(sellDetails.comment);
    this.ELEMENT_DATA = sellDetails.sellItems ?? [];
    this.dataSource = [...this.ELEMENT_DATA];
  }


  downloadReceipt() {
    this.pdfservice.generateSellInvoicePdf(this.data.sellDetails);
  }

    getInStockProducts() {
    this.service.getallStock().subscribe({
      next: (v) => {
        this.inStockProductList = v;
        this.inStockProductList = this.inStockProductList.filter(
          (x) => x.quantity > 0
        );
      },
      error: (e) => {
        this.dialog.open(ErrorDialogComponent, { data: e.message });
      }
    });
  }

  onEditClick() {
    this.sellForm.enable();
    this.viewOnly = false;
    this.editMode = true;
  }
}
