import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';
import { product } from 'src/app/Interfaces/product.interface';
import { purchase } from 'src/app/Interfaces/puchase.interface';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css'],
})
export class PurchaseDialogComponent implements OnInit {
  purchaseForm = new FormGroup({
    invoiceNo: new FormControl(''),
    supplierName: new FormControl('', [Validators.required]),
    purchaseDate: new FormControl(''),
    quantity: new FormControl<number>(0),
    invoiceAmount: new FormControl<number>(0),
    newProductName: new FormControl(''),
    selectedProductid: new FormControl<number>(0, [Validators.required]),
    Comment: new FormControl(''),
  });

  productSearch = new FormControl('');
  supplierSearch = new FormControl('');
  filteredOptions: Observable<product[]> | undefined;
  supplierFilteredOptions: Observable<any[]> | undefined;

  showspinner: boolean = false;
  productList: product[] = [];
  supplierNames!: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: InventoryService,
    private dialogRef: MatDialogRef<PurchaseDialogComponent>,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllProduct();
    this.filteredOptions = this.productSearch.valueChanges.pipe(
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
    debugger;
    this.purchaseForm.get('supplierName')?.setValue(this.supplierSearch.value);
    if (this.purchaseForm.invalid) {
      this.dialog.open(ErrorDialogComponent, {
        data: 'Kindly fill all the required fileds',
      });
      return;
    }
    this.showspinner = true;
    const newPurchase: purchase = {
      invoiceNo: this.purchaseForm.value.invoiceNo
        ? this.purchaseForm.value.invoiceNo
        : '',
      invoiceAmount: this.purchaseForm.value.invoiceAmount
        ? this.purchaseForm.value.invoiceAmount
        : 0,
      productId: this.purchaseForm.value.selectedProductid
        ? this.purchaseForm.value.selectedProductid
        : 0,
      productName: '',
      supplierName: this.purchaseForm.value.supplierName
        ? this.purchaseForm.value.supplierName
        : '',
      purchaseDate: this.purchaseForm.value.purchaseDate
        ? this.purchaseForm.value.purchaseDate
        : '',
      quantity: this.purchaseForm.value.quantity
        ? this.purchaseForm.value.quantity
        : 0,
      comment: this.purchaseForm.value.Comment
        ? this.purchaseForm.value.Comment
        : '',
      id: '',
      purchaseId: '',
    };

    if (this.purchaseForm.controls.selectedProductid.value == -1) {
      const newProduct: product = {
        id: '',
        productId: 0,
        productName: this.purchaseForm.controls.newProductName.value
          ? this.purchaseForm.controls.newProductName.value
          : '',
      };
      this.service.saveNewProduct(newProduct).subscribe({
        next: (v) => {
          newPurchase.productId = v.productId;
          this.service.savenewpurchase(newPurchase).subscribe({
            next: (v) => {
              this.getAllProduct();
              this.showspinner = this.showspinner ? false : false;
              this.dialogRef.close();
            },
            error: (e) => {
              console.log(e);
              this.showspinner = this.showspinner ? false : false;
              this.dialog.open(ErrorDialogComponent, { data: e.message });
            },
          });
        },
        error: (e) => {
          console.log(e);
          this.showspinner = this.showspinner ? false : false;
          this.dialog.open(ErrorDialogComponent, { data: e.message });
        },
      });
    } else {
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
  }

  getAllProduct() {
    this.service.getallproducts().subscribe((data) => {
      this.productList = data;
      const addNewProductValue: product = {
        id: '',
        productId: -1,
        productName: 'Add new Product',
      };
      this.productList.push(addNewProductValue);
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
}
