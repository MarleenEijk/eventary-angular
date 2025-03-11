import { Routes } from '@angular/router';
import { StorageComponent } from './storage/storage.component';

export const routes: Routes = [
  { path: 'storage', component: StorageComponent },
  { path: '', redirectTo: '/storage', pathMatch: 'full' }
];