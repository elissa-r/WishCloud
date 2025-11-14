export interface User {
  _id?: string;      // MongoDB ID (optional when registering)
  name: string;
  email: string;
  password?: string; // optional so you don’t expose it when displaying user info
}