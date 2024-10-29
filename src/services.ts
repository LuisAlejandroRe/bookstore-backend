import { Book } from './types/book.types';
import { db } from './firebase';
import Stripe from 'stripe';
import { Order } from './types/order.types';

const Services = () => {
  const getBooks = async (): Promise<{ books: Book[] }> => {
    const snapshot = await db.collection('books').get();
    if (snapshot.empty) {
      return { books: [] };
    } else {
      return { books: snapshot.docs.map(doc => doc.data() as Book) };
    }
  };

  const getOrders = async (uid: string): Promise<{ orders: Order[] }> => {
    const snapshot = await db.collection('orders').where('uid', '==', uid).get();
    if (snapshot.empty) {
      return { orders: [] };
    } else {
      return { orders: snapshot.docs.map(doc => doc.data() as Order) };
    }
  };

  const createPayment = async (total: number): Promise<{ clientSecret: string }> => {
    const token = process.env.STRIPE_TOKEN;
    const stripe = new Stripe(token, {
      apiVersion: '2020-08-27',
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
    });

    return { clientSecret: paymentIntent.client_secret };
  };

  const createOrder = async (order: Order, uid: string): Promise<void> => {
    await db.collection('orders').add({
      ...order,
      uid,
    });
  };

  return {
    getBooks,
    getOrders,
    createPayment,
    createOrder,
  };
};

export default Services;
