import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPurchaseComponent } from './pages/new-purchase/new-purchase.component';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { SaleListComponent } from './pages/sale-list/sale-list.component';
import { StockComponent } from './pages/stock/stock.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewSaleComponent } from './pages/new-sale/new-sale.component';

const routes: Routes = [
  {
    path : '',
    component: DashboardComponent
  },
  {
    path : 'newpurchase',
    component :NewPurchaseComponent
  },
  {
    path : 'purchase-list',
    component :PurchaseListComponent
  },
  {
    path : 'sale-list',
    component :SaleListComponent
  },
  {
    path : 'stock',
    component :StockComponent
  },
  {
    path : 'dashboard',
    component :DashboardComponent
  },
  {
    path : 'new-sale',
    component : NewSaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
