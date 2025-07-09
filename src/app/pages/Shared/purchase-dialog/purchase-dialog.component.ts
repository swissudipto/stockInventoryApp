import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';
import { product } from 'src/app/Interfaces/product.interface';
import { purchase, purchaseItems } from 'src/app/Interfaces/puchase.interface';
import { map, Observable, startWith } from 'rxjs';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css'],
})
export class PurchaseDialogComponent implements OnInit {
  purchaseForm = new FormGroup({
    supplierContactNo: new FormControl(''),
    supplierAddress: new FormControl(''),
    supplierName: new FormControl('', [Validators.required]),
    purchaseDate: new FormControl(''),
    quantity: new FormControl<number>(0),
    invoiceAmount: new FormControl(''),
    productname: new FormControl(''),
    productSearch: new FormControl(''),
    newProductName: new FormControl(''),
    selectedProductid: new FormControl<number>(0),
    Comment: new FormControl(''),
    isNewProduct: new FormControl<boolean>(false)
  });

  productSearch = new FormControl('');
  supplierSearch = new FormControl('');
  filteredOptions: Observable<product[]> | undefined;
  supplierFilteredOptions: Observable<any[]> | undefined;

  showspinner: boolean = false;
  productList: product[] = [];
  supplierNames!: any[];
  dataSource!: purchaseItems[];
  displayedColumns: string[] = ['demo-position', 'demo-Product', 'demo-Quantity', 'demo-Amount'];
  ELEMENT_DATA: purchaseItems[] = [];
  totalAmount: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: InventoryService,
    private dialogRef: MatDialogRef<PurchaseDialogComponent>,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.getAllProduct();
    this.filteredOptions = this.purchaseForm.controls.productSearch.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.supplierFilteredOptions = this.supplierSearch.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSupplier(value || ''))
    );
    this.supplierNames = Array.from(this.data.supplierNames, (supplier) => ({
      supplier,
    }));
  }

  onSaveClick() {
    this.purchaseForm.get('supplierName')?.setValue(this.supplierSearch.value);
    if (this.purchaseForm.invalid) {
      this.dialog.open(ErrorDialogComponent, {
        data: 'Kindly fill all the required fileds',
      });
      return;
    }
    this.showspinner = true;

    const newPurchase: purchase = {
      supplierAddress: this.purchaseForm.value.supplierAddress
        ? this.purchaseForm.value.supplierAddress
        : '',
      supplierContactNumber: this.purchaseForm.value.supplierContactNo
        ? this.purchaseForm.value.supplierContactNo
        : '',
      supplierName: this.purchaseForm.value.supplierName
        ? this.purchaseForm.value.supplierName
        : '',
      purchaseDate: this.purchaseForm.value.purchaseDate
        ? this.purchaseForm.value.purchaseDate
        : '',
      comment: this.purchaseForm.value.Comment
        ? this.purchaseForm.value.Comment
        : '',
      id: '',
      purchaseItems: this.dataSource,
      totalAmount: this.totalAmount,
      PurchaseId: 0
    };

    this.service.savenewpurchase(newPurchase).subscribe({
      next: (v) => {
        console.log(v);
        this.showspinner = this.showspinner ? false : false;
        this.dialogRef.close();
      },
      error: (e) => {
        console.log(e);
        this.showspinner = this.showspinner ? false : false;
        this.dialog.open(ErrorDialogComponent, { data: e.message });
      },
    });
  }

  getAllProduct() {
    this.service.getallproducts().subscribe({
      next: (v) => {
        this.productList = v;
      },
      error: (e) => {
        console.log(e);
        this.dialog.open(ErrorDialogComponent, { data: e.message });
      },
    });
  }

  private _filter(value: string): product[] {
    return this.productList.filter((option) =>
      option.productName.toLowerCase().includes(value.toLowerCase())
    );
  }

  private _filterSupplier(value: string): any[] {
    return this.supplierNames.filter((option) =>
      option.supplier.toLowerCase().includes(value.toLowerCase())
    );
  }

  productSelectionChange(product: product) {
    this.purchaseForm.get('selectedProductid')?.setValue(product.productId);
  }

  async addNewRow() {

    for (const element of this.ELEMENT_DATA) {
      if (this.purchaseForm.controls.isNewProduct.value) {
        if (
          element.productName.toUpperCase().trim() ===
          (this.purchaseForm.controls.newProductName?.value ?? '').toUpperCase().trim()
        ) {
          this.dialog.open(ErrorDialogComponent, { data: 'The Product is already added!' });
          return;
        }
      } else {
        if (
          element.productName.toUpperCase().trim() ===
          (this.purchaseForm.controls.productSearch?.value ?? '').toUpperCase().trim()
        ) {
          this.dialog.open(ErrorDialogComponent, { data: 'The Product is already added!' });
          return;
        }
      }
    }


    if (this.purchaseForm.controls.isNewProduct.value === true) {
      if (this.purchaseForm.controls.newProductName.value === '' ||
        this.purchaseForm.controls.newProductName.value === null ||
        this.purchaseForm.controls.quantity.value! <= 0 ||
        parseInt(this.purchaseForm.controls.invoiceAmount.value!) < 0 ||
        this.purchaseForm.controls.invoiceAmount.value == null
      ) {
        this.dialog.open(ErrorDialogComponent, { data: 'Kindly fill the Item details properly!' });
        return;
      }

      const newProduct: product = {
        id: '',
        productId: 0,
        productName: this.purchaseForm.controls.newProductName.value
          ? this.purchaseForm.controls.newProductName.value
          : '',
      };

      this.service.saveNewProduct(newProduct).subscribe({
        next: (v) => {
          const newRow: purchaseItems = {
            sl: this.ELEMENT_DATA.length + 1,
            productName: v.productName,
            productId: v.productId,
            quantity: this.purchaseForm.value.quantity
              ? this.purchaseForm.value.quantity
              : 0,
            amount: this.purchaseForm.value.invoiceAmount
              ? parseInt(this.purchaseForm.value.invoiceAmount)
              : 0,
          }
          this.ELEMENT_DATA.push(newRow);
          this.dataSource = [...this.ELEMENT_DATA];
          this.purchaseForm.controls.productname.reset();
          this.purchaseForm.controls.quantity.reset();
          this.purchaseForm.controls.invoiceAmount.reset();
          this.purchaseForm.controls.newProductName.reset();
          this.purchaseForm.controls.isNewProduct.reset();
          this.calculateTotalAmount();

        },
        error: (e) => {
          console.log(e);
          this.showspinner = this.showspinner ? false : false;
          this.dialog.open(ErrorDialogComponent, { data: e.message });
        },
      });
    } else {
      if ((this.purchaseForm.controls.selectedProductid?.value ?? 0) == 0 ||
        this.purchaseForm.value.quantity! <= 0 ||
        parseInt(this.purchaseForm.controls.invoiceAmount.value!) < 0
      ) {
        this.dialog.open(ErrorDialogComponent, { data: 'Kindly fill the Item details properly!' });
        return;
      }

      const newRow: purchaseItems = {
        sl: this.ELEMENT_DATA.length + 1,
        productName: this.purchaseForm.value.productSearch
          ? this.purchaseForm.value.productSearch
          : '',
        productId: this.purchaseForm.value.selectedProductid
          ? this.purchaseForm.value.selectedProductid
          : 0,
        quantity: this.purchaseForm.value.quantity
          ? this.purchaseForm.value.quantity
          : 0,
        amount: this.purchaseForm.value.invoiceAmount
          ? parseInt(this.purchaseForm.value.invoiceAmount)
          : 0,
      }

      this.ELEMENT_DATA.push(newRow);
      this.dataSource = [...this.ELEMENT_DATA];
      this.purchaseForm.controls.productSearch.reset();
      this.purchaseForm.controls.quantity.reset();
      this.purchaseForm.controls.invoiceAmount.reset();
      this.purchaseForm.controls.newProductName.reset();
      this.purchaseForm.controls.isNewProduct.reset();
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.ELEMENT_DATA.forEach(item => {
      this.totalAmount += item.amount;
    });
  }
}
