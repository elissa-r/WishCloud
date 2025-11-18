/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistproxyService {

  private hostUrl = 'http://localhost:3000/api';  // backend base URL

  constructor(private http: HttpClient) {}

  // GET wishlists for a specific user
  getListsIndex(userId: string) {
    return this.http.get<any[]>(`${this.hostUrl}/wishlists/user/${userId}`);
  }

  // GET wishlist by ID (note: /wishlists/:id)
  getItems(id: string) {
    return this.http.get<any>(`${this.hostUrl}/wishlists/${id}`);
  }

  // POST create wishlist
  createWishlist(payload: any) {
    return this.http.post(`${this.hostUrl}/wishlists`, payload);
  }

  getItemsForList(listId: string) {
    return this.http.get<any[]>(`${this.hostUrl}/wishlists/${listId}/items`);
  }

  addItemToList(listId: string, item: any) {
    return this.http.post(`${this.hostUrl}/wishlists/${listId}/items`, item);
  }


}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistproxyService {

  private hostUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getListsIndex(userId: string) {
    return this.http.get<any[]>(`${this.hostUrl}/wishlists/user/${userId}`);
  }

  getItems(id: string) {
    return this.http.get<any>(`${this.hostUrl}/wishlists/${id}`);
  }

  createWishlist(payload: any) {
    return this.http.post(`${this.hostUrl}/wishlists`, payload);
  }

  // FIXED — MUST USE hostUrl
  getItemsForList(listId: string) {
    return this.http.get<any[]>(`${this.hostUrl}/wishlists/${listId}/items`);
  }

  // FIXED — MUST USE hostUrl
  addItemToList(listId: string, item: any) {
    return this.http.post(`${this.hostUrl}/wishlists/${listId}/items`, item);
  }
}
