import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.acc_tok;
    if (!token) {
        return next(createError(401, 'Not Authenticated'));
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, 'Token not valid'));
        }
        req.user = user;
        next();
    });
};
