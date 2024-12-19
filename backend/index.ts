// backend/index.ts

import express from 'express';
import type { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config';
import helmet from 'helmet';
import setupSwagger from './config/swagger.config';
import userRoutes from './routes/user.routes';
import refershRoutes from './routes/auth.routes';
dotenv.config();

connectDB();


const app: Application = express();
const port: number = Number(process.env.PORT);

app.use(express.json());
app.use(helmet());

setupSwagger(app);
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to VulnChamp! Backend');
});
app.use('/api/user', userRoutes);
app.use('/api/auth', refershRoutes);

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});

