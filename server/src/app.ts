import express from 'express';
import cors from 'cors';
import authRoutes from '@/routers/auth.route.js';
// import userRoutes from './src/routers/user.route.js';
import webSocketRoutes from '@/routers/webSocket.route.js';
import { errorHandler } from '@/middlewares/error.mid.js';
import env from '@/config/validateEnv.config.js';

const app = express();

app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
app.use('/api/socket', webSocketRoutes);

app.use(errorHandler);

export default app;
