export interface Item {
  _id: string;
  name: string;
  itemId?: number;
  photoLink?: string;
  price?: number;
  description?: string;
  itemLink?: string;
  isReserved?: boolean;
}