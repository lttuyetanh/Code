import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Order } from '../Interface/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // saveReview(reviewData: ReviewData) {
  //   throw new Error('Method not implemented.');
  // }

  private _url: string = "http://localhost:3000";

  constructor(private _http: HttpClient) { }

  getOrder(userId: number): Observable<Order[]> {
    return this._http.get<Order[]>(`${this._url}/orders/user/${userId}`).pipe(
      retry(3),
      catchError(this.handleErr)
    );
  }

  handleErr(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }

  getAllOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(`${this._url}/orders`).pipe(
      retry(3),
      catchError(this.handleErr)
    );
  }

  updateOrderStatus(userId: number, orderNumber: string, status: string, paymentStatus: boolean): Observable<Order> {
    const updateData = {
      order_status: status,
      paymentstatus: paymentStatus
    };
  
    return this._http.patch<Order>(`${this._url}/orders/user/${userId}/${orderNumber}`, updateData).pipe(
      catchError(this.handleErr)
    );
  }

  updateOrderReason(userId: number, orderNumber: string, rejectReason: string): Observable<any> {
    const updateData = { rejectreason: rejectReason };

    return this._http.patch<any>(`${this._url}/orders/user/${userId}/${orderNumber}`, updateData);
  }

  
  
}
