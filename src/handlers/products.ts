import express, { Request, Response } from 'express';
const router = express.Router();
import { ProductsCRUD } from '../models/Products';
import { verifyToken } from '../middleware/verifyToken';
const newUser = new ProductsCRUD();
router.put('/update/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const id = req.params.id as unknown as number;
    const products = await newUser.update(id, name, price);
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json('Could not update the product');
  }
});
router.delete(
  '/delete/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id) as number;
      const product = await newUser.delete(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(404).json('Could not delete the product');
    }
  }
);
router.get('/get/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id) as number;
    const products = await newUser.read(id);
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json('Could not get the prpduct');
  }
});
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await newUser.index();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json('Could not get the products');
  }
});
router.post('/create', verifyToken, async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    if (name.length === 0 || price.length === 0) {
      res.status(404).json('Please provide name,price');
    } else {
      const product = await newUser.create(name, price);
      res.status(201).json(product);
    }
  } catch (err) {
    res.status(404).json('Could not create the product');
  }
});
export default router;
