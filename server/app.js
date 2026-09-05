import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { publicApiLimiter } from './middleware/rateLimiters.js';

import servicesRoutes from './routes/services.routes.js';
import enquiriesRoutes from './routes/enquiries.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import businessRoutes from './routes/business.routes.js';

export function createApp() {
  const app = express();

  app.use(helmet());

  app.use(
    cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    })
  );

  app.use(express.json({ limit: '100kb' }));
  app.use(cookieParser());

  if (process.env.NODE_ENV !== 'test') {
    app.use(
      morgan(
        process.env.NODE_ENV === 'production'
          ? 'combined'
          : 'dev'
      )
    );
  }

  app.get('/health', (req, res) =>
    res.json({
      status: 'ok',
      time: new Date().toISOString(),
    })
  );

  app.use('/api/v1', publicApiLimiter);
  app.use('/api/v1', servicesRoutes);
  app.use('/api/v1', enquiriesRoutes);
  app.use('/api/v1', authRoutes);
  app.use('/api/v1', businessRoutes);
  app.use('/api/v1', adminRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}