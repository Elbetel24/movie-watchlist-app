import { Router } from 'express';
import { signUp, signIn , signOut } from '../controller/auth.controller.js'
const authRouter=Router();

authRouter.post('/signUp',signUp);
authRouter.post('/signIn', signIn);
authRouter.post('/signOut', signOut);
export default authRouter;