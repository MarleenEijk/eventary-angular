import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Employee } from '../models/employee';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees/me`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getCurrentEmployee(): Observable<Employee> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token =>
        this.http.get<Employee>(this.apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      )
    );
  }
}
