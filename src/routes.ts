import { Application } from 'express';

import Controller from './controller';
import authorization from './middlewares/authorization';

function routes(app: Application) {
  app.get('/book', Controller.getAllBooks);
  app.post('/payment', authorization, Controller.createPayment);
  app.get('/order', authorization, Controller.getUserOrders);
  app.post('/order', authorization, Controller.createOrder);
}

export default routes;
