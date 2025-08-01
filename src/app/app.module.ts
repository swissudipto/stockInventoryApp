import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { SaleListComponent } from './pages/sale-list/sale-list.component';
import { StockComponent } from './pages/stock/stock.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PurchaseDialogComponent } from './pages/Shared/purchase-dialog/purchase-dialog.component';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ErrorDialogComponent } from './pages/Shared/error-dialog/error-dialog.component';
import { SellDialogComponent } from './pages/Shared/sell-dialog/sell-dialog.component';
import { SellDetailsComponent } from './pages/Shared/sell-details/sell-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './pages/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PurchaseListComponent,
    SaleListComponent,
    StockComponent,
    PurchaseDialogComponent,
    ErrorDialogComponent,
    SellDialogComponent,
    SellDetailsComponent,
    LoginComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTableModule,
    MatBadgeModule,
    MatIconModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
