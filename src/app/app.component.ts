import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
export class AppComponent implements OnInit {
  title = 'eventary-angular';

  constructor(private router: Router) {
    console.log('API URL from environment:', environment.apiUrl);
  }

  ngOnInit(): void {
    const selectedEmployee = localStorage.getItem('selectedEmployee');
    if (!selectedEmployee && this.router.url !== '/select-user') {
      this.router.navigate(['/select-user']);
    }
  }
}
