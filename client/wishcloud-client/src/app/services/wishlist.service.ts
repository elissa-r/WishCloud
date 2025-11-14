import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wishlist } from '../models/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:3000/api/wishlists';

  constructor(private http: HttpClient) {}

  // GET - all wishlists
  getAllWishlists(): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(this.apiUrl);
  }

  // GET - wishlists for a specific user
  getWishlistsForUser(userId: string): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(`${this.apiUrl}/user/${userId}`);
  }

  // GET - wishlist by id
  getWishlistById(id: string): Observable<Wishlist> {
    return this.http.get<Wishlist>(`${this.apiUrl}/${id}`);
  }

  // POST - create a new wishlist
  createWishlist(wishlist: Partial<Wishlist>): Observable<Wishlist> {
    return this.http.post<Wishlist>(this.apiUrl, wishlist);
  }
}