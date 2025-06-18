import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employeeselect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employeeselect.component.html',
  styleUrl: './employeeselect.component.css'
})
export class EmployeeselectComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  selectEmployee(employee: Employee): void {
    localStorage.setItem('selectedEmployee', JSON.stringify(employee));
    this.router.navigate(['/storage']);
  }
}
