import { Request, Response } from 'express';
import response from './utils/response';
import Services from './services';

const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Services().getBooks();

    return response({
      res,
      status: 200,
      error: false,
      message: '',
      body: books,
    });
  } catch (error) {
    return response({
      res,
      status: 500,
      error: true,
      message: 'Error al obtener libros',
    });
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Services().getOrders(req.body.uid);

    return response({
      res,
      status: 200,
      error: false,
      message: '',
      body: orders,
    });
  } catch (error) {
    return response({
      res,
      status: 500,
      error: true,
      message: 'Error al obtener ordenes',
    });
  }
};

const createPayment = async (req: Request, res: Response) => {
  try {
    const { clientSecret } = await Services().createPayment(req.body.total);

    return response({
      res,
      status: 200,
      error: false,
      message: '',
      body: { clientSecret },
    });
  } catch (error) {
    console.log(error);
    return response({
      res,
      status: 500,
      error: true,
      message: 'Error al realizar pago',
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    await Services().createOrder(req.body.order, req.body.uid);

    return response({
      res,
      status: 200,
      error: false,
      message: '',
    });
  } catch (error) {
    console.log(error);
    return response({
      res,
      status: 500,
      error: true,
      message: 'Error al registrar orden',
    });
  }
};

const Controller = {
  getAllBooks,
  getUserOrders,
  createPayment,
  createOrder,
};

export default Controller;
