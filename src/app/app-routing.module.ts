import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { SaleListComponent } from './pages/sale-list/sale-list.component';
import { StockComponent } from './pages/stock/stock.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoleBasedAuthGuard } from './guards/roleBasedAuth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path : '',
    component: DashboardComponent
  },
  {
    path : 'PurchaseList',
    component :PurchaseListComponent,
    canActivate: [RoleBasedAuthGuard]
  },
  {
    path : 'SaleList',
    component :SaleListComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'Stock',
    component :StockComponent,
    canActivate: [RoleBasedAuthGuard]
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
