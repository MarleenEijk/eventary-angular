import { Routes } from '@angular/router';
import { StorageComponent } from './storage/storage.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
  { path: 'storage', component: StorageComponent, canActivate: ['authGuard'] },
  { path: 'orders', component: OrderComponent, canActivate: ['authGuard'] },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: '', redirectTo: '/storage', pathMatch: 'full' }
];