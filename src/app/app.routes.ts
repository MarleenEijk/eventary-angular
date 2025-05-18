import { Routes } from '@angular/router';
import { StorageComponent } from './storage/storage.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
  { path: 'storage', component: StorageComponent },
  { path: 'orders', component: OrderComponent },
  { path: '', redirectTo: '/storage', pathMatch: 'full' }
];