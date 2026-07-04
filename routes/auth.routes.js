import { Router } from 'express';
import { signUp, signIn, signOut} from '../controller/auth.controller.js'
const authRouter=Router();

authRouter.post('/signup',signUp);
authRouter.post('/signIn',signIn);
authRouter.post('SignOut',signOut);
export default authRouter;