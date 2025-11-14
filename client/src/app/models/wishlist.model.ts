export interface Wishlist {
  _id: string;        // MongoDB document id
  name: string;
  listId?: number;
  userID: string;
  photoLink?: string;
  date?: string;      // ISO string from backend
  budget?: number;
}