import express, { Request, Response } from 'express';
const router = express.Router();
import { UsersCRUD } from '../models/Users';
import { verifyToken } from '../middleware/verifyToken';
const newUser = new UsersCRUD();
router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const id = req.params.id as unknown as number;
    const users = await newUser.update(id, username, email, password);
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json('Could not update the user');
  }
});
router.delete(
  '/delete/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id) as number;
      const users = await newUser.delete(id);
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json('Could not delete the user');
    }
  }
);
router.get('/get/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id) as number;
    const users = await newUser.read(id);
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json('Could not get the user');
  }
});
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const users = await newUser.index();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json('Could not get the users');
  }
});
router.post('/register', async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      res
        .status(404)
        .json('Please provide username,email & password to register');
    } else {
      const user = await newUser.create(username, email, password);
      res.status(201).json(user);
    }
  } catch (err) {
    res.status(404).json('Could not sign up');
  }
});
export default router;
