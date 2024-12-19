// backend/index.ts

import express from 'express';
import type { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();


const app: Application = express();
const port: number = Number(process.env.PORT);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to VulnChamp! Backend');
});

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});

