import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import userRouter from './routes/users.js';
import adminRouter from './routes/admin.js';
import Admin from './models/Admin.js';

const app = express();
import cors from 'cors';
app.use(
    cors({
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        origin: ['http://localhost:3000']
    })
);
dotenv.config();

const conn = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log('Connected to DB...');
        })
        .catch((err) => {
            console.log('Error', err);
        });
};
    
conn();
const admin = new Admin({name:"Yogendra",email:"yogendra@admin.com",password:bcrypt.hashSync("Yogendra",10)});
admin.save().then(d=>console.log("Done"));

app.use(cookieParser());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    res.status(status).json({
        success: false,
        status,
        message
    });
    return
});

app.listen(8000, () => {
    conn();
    console.log('Running ...');
});
