import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';
import { product } from 'src/app/Interfaces/product.interface';
import { purchase, purchaseItems } from 'src/app/Interfaces/puchase.interface';
import { map, Observable, startWith } from 'rxjs';
import { ErrorDialogComponent } from '../Shared/error-dialog/error-dialog.component';
import { MessageService } from 'primeng/api';

interface Vendor {
  id: number;
  name: string;
}

interface Product {
  id?: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  serialNumbers: string[];
}

@Component({
  selector: 'app-new-purchase-page',
  templateUrl: './new-purchase-page.component.html',
  styleUrls: ['./new-purchase-page.component.css']
})
export class NewPurchasePageComponent {purchaseForm!: FormGroup;

  vendors: Vendor[] = [
    { id: 1, name: 'ABC Electronics' },
    { id: 2, name: 'Global Traders' },
    { id: 3, name: 'Tech Solutions' }
  ];

  productList: any[] = [
    { name: 'Laptop' },
    { name: 'Monitor' },
    { name: 'Keyboard' },
    { name: 'Mouse' }
  ];

  purchaseItems: Product[] = [];

  // dialogs
  productDialog: boolean = false;
  serialDialog: boolean = false;
  editMode: boolean = false;

  // temp variables
  tempProduct: Product = { productName: '', quantity: 1, unitPrice: 0, serialNumbers: [] };
  tempSerials: string[] = [];
  selectedProductIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      vendorId: [null, Validators.required],
      invoiceNo: ['', Validators.required],
      purchaseDate: [new Date(), Validators.required],
      remarks: ['']
    });
  }

  // -----------------------
  // Product Dialog Methods
  // -----------------------
  openProductDialog() {
    this.tempProduct = { productName: '', quantity: 1, unitPrice: 0, serialNumbers: [] };
    this.editMode = false;
    this.productDialog = true;
  }

  editProduct(item: Product, index: number) {
    this.tempProduct = { ...item };
    this.selectedProductIndex = index;
    this.editMode = true;
    this.productDialog = true;
  }

  saveProduct() {
    if (!this.tempProduct.productName || !this.tempProduct.quantity || !this.tempProduct.unitPrice) {
      return;
    }

    if (this.editMode && this.selectedProductIndex !== null) {
      this.purchaseItems[this.selectedProductIndex] = { ...this.tempProduct };
    } else {
      this.purchaseItems.push({ ...this.tempProduct });
    }

    this.productDialog = false;
  }

  removeProduct(index: number) {
    this.purchaseItems.splice(index, 1);
  }

  // -----------------------
  // Serial Dialog Methods
  // -----------------------
  openSerialDialog(product: Product) {
    this.tempProduct = product;
    this.tempSerials = [...product.serialNumbers];
    this.serialDialog = true;
  }

  addSerial() {
    this.tempSerials.push('');
  }

  removeSerial(index: number) {
    this.tempSerials.splice(index, 1);
  }

  saveSerials() {
    if (this.tempSerials.length !== this.tempProduct.quantity) {

      return;
    }
    this.tempProduct.serialNumbers = [...this.tempSerials];
    this.serialDialog = false;
    //this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Serial numbers updated' });
  }

  // -----------------------
  // Totals & Save Purchase
  // -----------------------
  getPurchaseTotal(): number {
    return this.purchaseItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  savePurchase() {
    if (this.purchaseForm.invalid || this.purchaseItems.length === 0) {
      
      return;
    }

    const purchaseData = {
      ...this.purchaseForm.value,
      items: this.purchaseItems,
      totalAmount: this.getPurchaseTotal()
    };

    console.log('✅ Purchase saved:', purchaseData);

 

    // Reset form
    this.purchaseForm.reset({ purchaseDate: new Date() });
    this.purchaseItems = [];
  }
}