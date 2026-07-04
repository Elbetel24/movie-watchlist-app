import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';
import User from '../models/user.models.js';

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email }).session(session);

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [newUser] = await User.create(
            [{ name, email, password: hashedPassword }],
            { session }
        );

        const token = jwt.sign(
            { userId: newUser._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        await session.commitTransaction();

        const sanitizedUser = newUser.toObject();
        delete sanitizedUser.password;

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: sanitizedUser,
            }
        });

    } catch (error) {
        await session.abortTransaction().catch(() => {});
        next(error);
    } finally {
        session.endSession();
    }
};