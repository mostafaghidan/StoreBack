import express, { Request, Response } from 'express';
const router = express.Router();
import { OrdersCRUD } from '../models/Orders';
import { verifyToken } from '../middleware/verifyToken';
const newUser = new OrdersCRUD();
router.post('/:user_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id as unknown as number;
    const status = req.body.status;
    if (user_id === undefined) {
      res.status(404).json('invalid inputs');
    } else {
      const order = await newUser.createOrder(user_id, status);
      res.status(201).json(order);
    }
  } catch (err) {
    res.status(404).json('Could not create the order');
  }
});
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const status = req.body.status;
    if (id === undefined) {
      res.status(404).json('invalid inputs');
    } else {
      const order = await newUser.updateStatus(id, status);
      res.status(201).json(order);
    }
  } catch (err) {
    res.status(404).json('Could not update the order');
  }
});
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (id === undefined) {
      res.status(404).json('invalid inputs');
    } else {
      const order = await newUser.deleteOrder(id);
      res.status(201).json(order);
    }
  } catch (err) {
    res.status(404).json('Could not delete the order');
  }
});
router.get('/:user_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id as unknown as number;
    if (user_id === undefined) {
      res.status(404).json('invalid inputs');
    } else {
      const order = await newUser.showUserOrders(user_id);
      res.status(201).json(order);
    }
  } catch (err) {
    res.status(404).json('Could not get the user products');
  }
});
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const order = await newUser.showAllOrders();
    res.status(201).json(order);
  } catch (err) {
    res.status(404).json('Could not get the orders');
  }
});
router.post('/:id/fill', verifyToken, async (req: Request, res: Response) => {
  try {
    const order_id = req.params.id as unknown as number;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    const orderProducts = await newUser.fillingOrder(
      order_id,
      product_id,
      quantity
    );
    res.status(201).json(orderProducts);
  } catch (err) {
    res.status(404).json('Could not add products to order');
  }
});
router.get(
  '/:id/Products',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const order_id = req.params.id as unknown as number;
      const order = await newUser.getOrderProducts(order_id);
      res.status(201).json(order);
    } catch (err) {
      res.status(404).json('Could not get the order products');
    }
  }
);
export default router;
