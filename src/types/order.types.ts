import { Book } from './book.types';

export interface CartItem extends Book {
  quantity: number;
}

export interface Order {
  amount: number;
  items: CartItem[];
  created: number;
  paymentId: string;
  uid: string;
}
