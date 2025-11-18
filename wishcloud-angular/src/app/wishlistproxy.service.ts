import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistproxyService {

  private hostUrl = 'http://localhost:3000/api';  // backend base URL

  constructor(private http: HttpClient) {}

  // GET all wishlists
  getListsIndex() {
    return this.http.get<any[]>(`${this.hostUrl}/wishlists`);
  }

  // GET wishlist by ID (note: /wishlists/:id)
  getItems(id: string) {
    return this.http.get<any>(`${this.hostUrl}/wishlists/${id}`);
  }

  // POST create wishlist
  createWishlist(payload: any) {
    return this.http.post(`${this.hostUrl}/wishlists`, payload);
  }
}
