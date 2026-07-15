 import { Router } from 'express';
 import { addOrUpdateItem, getUserList, removeItem } from '../controller/watchlist.controller';
import { authorize } from '../middleware/auth.middleware.js'
import { get } from 'mongoose';

 const watchlistRouter=Router();

 watchlistRouter.post('/',addOrUpdateItem);
 watchlistRouter.post('/', getUserList);
 watchlistRouter.post('/',)