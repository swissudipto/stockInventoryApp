import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';
import { product } from 'src/app/Interfaces/product.interface';
import { purchase, purchaseItems } from 'src/app/Interfaces/puchase.interface';
import { map, Observable, startWith } from 'rxjs';
import { ErrorDialogComponent } from '../Shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-new-purchase-page',
  templateUrl: './new-purchase-page.component.html',
  styleUrls: ['./new-purchase-page.component.css']
})
export class NewPurchasePageComponent {
  purchaseForm = new FormGroup({
      supplierContactNo: new FormControl(''),
      supplierAddress: new FormControl(''),
      supplierName: new FormControl('', [Validators.required]),
      purchaseDate: new FormControl(''),
      quantity: new FormControl<number>(0),
      itemAmount: new FormControl(''),
      productname: new FormControl(''),
      productSearch: new FormControl(''),
      newProductName: new FormControl(''),
      selectedProductid: new FormControl<number>(0),
      Comment: new FormControl(''),
      isNewProduct: new FormControl<boolean>(false),
    });
  
    productSearch = new FormControl('');
    supplierSearch = new FormControl('');
    filteredOptions: Observable<product[]> | undefined;
    supplierFilteredOptions: Observable<any[]> | undefined;
  
    showspinner: boolean = false;
    productList: product[] = [];
    supplierNames!: any[];
    dataSource!: purchaseItems[];
    displayedColumns: string[] = [
      'demo-position',
      'demo-Product',
      'demo-Quantity',
      'demo-Amount',
      'actions',
    ];
    ELEMENT_DATA: purchaseItems[] = [];
    totalAmount: number = 0;
    viewOnly: boolean = false;
    editMode:boolean = false;
  
    constructor(
      private service: InventoryService,
      private dialog: MatDialog
    ) {}
    ngOnInit(): void{
      this.getAllProduct();
            this.filteredOptions =
          this.purchaseForm.controls.productSearch.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
          );
      if (true) {
        this.viewOnly = true;
        this.purchaseForm.disable();
      } else {
        this.viewOnly = false;
        // this.supplierFilteredOptions = this.supplierSearch.valueChanges.pipe(
        //   startWith(''),
        //   map((value) => this._filterSupplier(value || ''))
        // );
        // this.supplierNames = Array.from(this.data.supplierNames, (supplier) => ({
        //   supplier,
        // }));
      }
    }
  
    onSaveClick() {
      // this.purchaseForm.get('supplierName')?.setValue(this.supplierSearch.value);
      if (this.purchaseForm.invalid) {
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
        PurchaseId: 0,
      };
      
      if(this.editMode){
        //newPurchase.id = this.data.PuchaseDetails.id;
        this.service.editPurchase(newPurchase).subscribe({
        next: (v) => {
          console.log(v);
          this.showspinner = this.showspinner ? false : false;
        },
        error: (e) => {
          console.log(e);
          this.showspinner = this.showspinner ? false : false;
          this.dialog.open(ErrorDialogComponent, { data: e.message });
        },
      });
      }else{
        this.service.savenewpurchase(newPurchase).subscribe({
        next: (v) => {
          console.log(v);
          this.showspinner = this.showspinner ? false : false;
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
  
    // private _filterSupplier(value: string): any[] {
    //   return this.supplierNames.filter((option) =>
    //     option.supplier.toLowerCase().includes(value.toLowerCase())
    //   );
    // }
  
    productSelectionChange(product: product) {
      this.purchaseForm.get('selectedProductid')?.setValue(product.productId);
    }
  
    async addNewRow() {
      // Duplicate Item Check
      for (const element of this.ELEMENT_DATA) {
        if (this.purchaseForm.controls.isNewProduct.value) {
          if (
            element.productName.trim().toUpperCase() ===
            (this.purchaseForm.controls.newProductName?.value ?? '')
              .trim()
              .toUpperCase()
          ) {
            this.dialog.open(ErrorDialogComponent, {
              data: 'The Item is already added!',
            });
            return;
          }
        } else {
          if (
            element.productName.trim().toUpperCase() ===
            (this.purchaseForm.controls.productSearch?.value ?? '')
              .trim()
              .toUpperCase()
          ) {
            this.dialog.open(ErrorDialogComponent, {
              data: 'The Item is already added!',
            });
            return;
          }
        }
      }
  
      if (this.purchaseForm.controls.isNewProduct.value === true) {
        if (
          this.purchaseForm.controls.newProductName.value === '' ||
          this.purchaseForm.controls.newProductName.value === null ||
          this.purchaseForm.controls.quantity.value! <= 0 ||
          this.purchaseForm.controls.itemAmount.value == null ||
          Number.isNaN(this.purchaseForm.controls.itemAmount.value) ||
          parseInt(this.purchaseForm.controls.itemAmount.value!) < 0
        ) {
          this.dialog.open(ErrorDialogComponent, {
            data: 'Kindly fill the Item details properly!',
          });
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
              amount: this.purchaseForm.value.itemAmount
                ? parseInt(this.purchaseForm.value.itemAmount)
                : 0,
            };
            this.ELEMENT_DATA.push(newRow);
            this.dataSource = [...this.ELEMENT_DATA];
            this.purchaseForm.controls.productname.reset();
            this.purchaseForm.controls.quantity.reset();
            this.purchaseForm.controls.itemAmount.reset();
            this.purchaseForm.controls.newProductName.reset();
            this.purchaseForm.controls.isNewProduct.reset();
            this.calculateTotalAmount();
          },
          error: (e) => {
            console.log(e);
            this.showspinner = this.showspinner ? false : false;
            this.dialog.open(ErrorDialogComponent, { data: e.message + e.error });
          },
        });
      } else {
        if (
          (this.purchaseForm.controls.selectedProductid?.value ?? 0) == 0 ||
          this.purchaseForm.value.quantity! <= 0 ||
          parseInt(this.purchaseForm.controls.itemAmount.value!) < 0
        ) {
          this.dialog.open(ErrorDialogComponent, {
            data: 'Kindly fill the Item details properly!',
          });
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
          amount: this.purchaseForm.value.itemAmount
            ? parseInt(this.purchaseForm.value.itemAmount)
            : 0,
        };
  
        this.ELEMENT_DATA.push(newRow);
        this.dataSource = [...this.ELEMENT_DATA];
        this.purchaseForm.controls.productSearch.reset();
        this.purchaseForm.controls.quantity.reset();
        this.purchaseForm.controls.itemAmount.reset();
        this.purchaseForm.controls.newProductName.reset();
        this.purchaseForm.controls.isNewProduct.reset();
        this.calculateTotalAmount();
      }
    }
  
    calculateTotalAmount() {
      this.totalAmount = 0;
      this.ELEMENT_DATA.forEach((item) => {
        this.totalAmount += item.amount;
      });
    }
  
    deleteRow(row: purchaseItems) {
      console.log('Delete Row' + row);
      this.ELEMENT_DATA.splice(row.sl - 1, 1);
  
      this.ELEMENT_DATA = this.ELEMENT_DATA.map((item, index) => ({
        ...item,
        sl: index + 1,
      }));
      this.dataSource = [...this.ELEMENT_DATA];
      this.calculateTotalAmount();
    }
  
    newProdctChange() {
      if (this.purchaseForm.controls.isNewProduct.value) {
        this.purchaseForm.controls.productSearch.reset();
        this.purchaseForm.controls.selectedProductid.reset();
      }
    }
  
    bindAllValues(PurchaseDetails: purchase) {
      this.purchaseForm.controls.supplierName.setValue(
        PurchaseDetails.supplierName
      );
      this.purchaseForm.controls.supplierContactNo.setValue(
        PurchaseDetails.supplierContactNumber
      );
      this.purchaseForm.controls.supplierAddress.setValue(
        PurchaseDetails.supplierAddress
      );
      this.purchaseForm.controls.purchaseDate.setValue(
        PurchaseDetails.purchaseDate.toString()
      );
      this.totalAmount = PurchaseDetails.totalAmount;
      this.purchaseForm.controls.Comment.setValue(PurchaseDetails.comment);
      this.ELEMENT_DATA = PurchaseDetails.purchaseItems ?? [];
      this.dataSource = [...this.ELEMENT_DATA];
    }
  
    onEditClick(){
      this.purchaseForm.enable();
      this.viewOnly = false;
      this.editMode = true;
    }
}
