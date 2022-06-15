import express, { Request, Response } from 'express';
const router = express.Router();
import { Login } from '../models/login';
const Client = new Login();
router.post('/login', async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await Client.auth(username, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json('Could not log in');
  }
});
export default router;
