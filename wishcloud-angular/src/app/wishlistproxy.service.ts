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

  getItemsForList(listId: string) {
    return this.http.get<any[]>(`${this.hostUrl}/wishlists/${listId}/items`);
  }

  addItemToList(listId: string, item: any) {
    return this.http.post(`${this.hostUrl}/wishlists/${listId}/items`, item);
  }

  deleteItem(itemId: string) {
  return this.http.delete(`${this.hostUrl}/items/${itemId}`);
  }


}
