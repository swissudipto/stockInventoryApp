import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { SaleListComponent } from './pages/sale-list/sale-list.component';
import { StockComponent } from './pages/stock/stock.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path : '',
    component: DashboardComponent
  },
  {
    path : 'PurchaseList',
    component :PurchaseListComponent
  },
  {
    path : 'SaleList',
    component :SaleListComponent
  },
  {
    path : 'Stock',
    component :StockComponent
  },
  {
    path : 'Dashboard',
    component :DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
