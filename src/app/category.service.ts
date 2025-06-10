import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Category } from '../models/category';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/category`;
  constructor(private http: HttpClient, private auth: AuthService) {}

  getCategories(): Observable<Category[]> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => this.http.get<Category[]>(this.apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      }))
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => this.http.get<Category>(`${this.apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }))
    );
  }
}
