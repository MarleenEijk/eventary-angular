import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Item } from '../models/item';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = `${environment.apiUrl}/items`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getItems(): Observable<Item[]> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token =>
        this.http.get<Item[]>(this.apiUrl, {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
    );
  }

  getItemById(id: number): Observable<Item> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token =>
        this.http.get<Item>(`${this.apiUrl}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
    );
  }

  addItem(item: Item): Observable<Item> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token =>
        this.http.post<Item>(this.apiUrl, item, {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
    );
  }

  updateItem(item: Item): Observable<Item> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token =>
        this.http.put<Item>(`${this.apiUrl}/${item.id}`, item, {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
    );
  }

  deleteItem(id: number): Observable<void> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token =>
        this.http.delete<void>(`${this.apiUrl}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
    );
  }
}
