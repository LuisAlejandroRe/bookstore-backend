import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Application } from 'express';
import { createServer } from 'http';
import helmet from 'helmet';
import routes from './routes';

const port = process.env.PORT || 8000;
const app: Application = express();

app.use(express.json({ limit: '20kb' }));
app.use(helmet());
app.use(cors());
app.disable('x-powered-by');

routes(app);

createServer(app).listen({ port }, () => {
  console.log(`Bookstore Server started at port ${port}`);
});