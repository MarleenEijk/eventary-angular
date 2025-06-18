import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  employee: Employee | null = null;

  constructor(private router: Router) {
    const stored = localStorage.getItem('selectedEmployee');
    if (stored) {
      this.employee = JSON.parse(stored);
    }
  }

  logout(): void {
    localStorage.removeItem('selectedEmployee');
    this.router.navigate(['/select-user']);
  }
}
