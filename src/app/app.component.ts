import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "./navbar/navbar.component";
import { StorageComponent } from "./storage/storage.component";
import { OrderComponent } from "./order/order.component";
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HttpClientModule, NavbarComponent, StorageComponent, OrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eventary-angular';

  constructor() {
    console.log('🌐 API URL from environment:', environment.apiUrl);
  }
}