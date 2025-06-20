import { Routes } from '@angular/router';
import { StorageComponent } from './storage/storage.component';
import { OrderComponent } from './order/order.component';
import { PlanningComponent } from './planning/planning.component';
import { InvoiceComponent } from './invoice/invoice.component';

export const routes: Routes = [
  { path: 'storage', component: StorageComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: '', redirectTo: '/storage', pathMatch: 'full' }
];
