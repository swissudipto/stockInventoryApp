import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { SaleListComponent } from './pages/sale-list/sale-list.component';
import { StockComponent } from './pages/stock/stock.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PurchaseDialogComponent } from './pages/Shared/purchase-dialog/purchase-dialog.component';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
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
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
/* PrimeNG Modules */
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChipsModule } from 'primeng/chips';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { PurchaseDialogngPrimeComponent } from './pages/Shared/purchase-dialogng-prime/purchase-dialogng-prime.component';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    LoginComponent,
    PurchaseDialogngPrimeComponent
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
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    /* PrimeNG */
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    ChipsModule,
    ProgressSpinnerModule,
    DialogModule
    /* PrimeNG */

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
              { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
              { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
