import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Order } from '../models/order';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = `${environment.apiUrl}/order`;
  constructor(private http: HttpClient, private auth: AuthService) {}

  getOrders(): Observable<Order[]> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => this.http.get<Order[]>(this.apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      }))
    );
  }

  getOrderById(id: number): Observable<Order> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => this.http.get<Order>(`${this.apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }))
    );
  }

  addOrder(order: Order): Observable<Order> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => this.http.post<Order>(this.apiUrl, order, {
        headers: { Authorization: `Bearer ${token}` }
      }))
    );
  }

  updateOrder(order: Order): Observable<Order> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => this.http.put<Order>(`${this.apiUrl}/${order.id}`, order, {
        headers: { Authorization: `Bearer ${token}` }
      }))
    );
  }

  deleteOrder(id: number): Observable<void> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => this.http.delete<void>(`${this.apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }))
    );
  }
}
