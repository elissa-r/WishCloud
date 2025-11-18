import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private apiUrl = 'http://localhost:3000/api/wishlists';

  constructor(private http: HttpClient) {}

  getWishlistsForUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  createWishlist(wishlist: any): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.apiUrl, wishlist);
  }

  getWishlistById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
