import express, { Application, Request, Response } from 'express';
const app: Application = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;
import userRoute from './handlers/user';
import authRoute from './handlers/auth';
import productRoute from './handlers/products';
import orderRoute from './handlers/orders';
import errorHandler from './middleware/errorHandler';
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api', (req: Request, res: Response) => {
  res.send('test');
});
app.use(errorHandler);
app.use('*', (req: Request, res: Response) => {
  res.status(404).json('Your requested route does not exist');
});

app.listen(port || 5000, () => {
  console.log(`server is running on port...${port}`);
});
export default app;
