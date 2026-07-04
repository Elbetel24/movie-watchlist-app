import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_EXPIRES_IN,JWT_SECRET} from '../config/env.js';
import User from '../models/user.model.js';

