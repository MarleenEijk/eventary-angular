import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(this.apiUrl);
    }

    getEmployeeById(id: number): Observable<Employee> {
      return this.http.get<Employee>(`${this.apiUrl}/${id}`);
    }
  }

