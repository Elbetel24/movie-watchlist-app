import { Router } from 'express';
import { addOrUpdateItem, getUserList, removeItem } from '../controller/watchlist.controller.js';
import  authorize  from '../middleware/auth.middleware.js';

const watchlistRouter = Router();
watchlistRouter.use(authorize);

// create or update an item
watchlistRouter.post('/', addOrUpdateItem);

// get user's watchlist
watchlistRouter.get('/', getUserList);

// remove an item by id
watchlistRouter.delete('/:id', removeItem);

export default watchlistRouter;