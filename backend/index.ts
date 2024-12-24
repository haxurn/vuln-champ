// backend/index.ts

import express from 'express';
import type { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config';
import helmet from 'helmet';
import setupSwagger from './config/swagger.config';
import userRoutes from './routes/user.routes';
import refershRoutes from './routes/auth.routes';
import vulnerabilitiesRoutes from './routes/vulnerabilities.routes';
import leaderboardRoutes from './routes/leaderboard.routes';
import generalLeaderboardRoutes from './routes/generalLeaderboard.routes';
import userPerformanceRoutes from './routes/userPerformance.routes';
import notificationRoutes from './routes/notification.routes';
import { errorHandler } from './middleware/error.middleware';
import { initializeSocket } from './utils/notification.socket';
import teamContributionRoutes from './routes/teamContribution.routes';
import themeRoutes from './routes/theme.routes';


dotenv.config();

connectDB();

const app: Application = express();
const port: number = Number(process.env.PORT);


const server = app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

app.use(express.json());
app.use(helmet());

setupSwagger(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to VulnChamp! Backend');
});

app.use('/api/user', userRoutes);
app.use('/api/token', refershRoutes);
app.use('/api/vulnerabilities', vulnerabilitiesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/general', generalLeaderboardRoutes);
app.use('/api/performance', userPerformanceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/team', teamContributionRoutes);
app.use('/api/theme', themeRoutes);

initializeSocket(server);


app.use(errorHandler);  


process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server...');
  server.close(() => {
    console.log('Server closed gracefully');
    process.exit(0);
  });
});
