// Use require syntax for express and cors
import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import config from './config/config';
import connectDatabase from './config/database';

// Import routes
import dashboardRoutes from './routes/dashboard.routes';
import subcontractorRoutes from './routes/subcontractor.routes';
import authRoutes from './routes/auth.routes';
import uploadRoutes from './routes/upload.routes';

// Connect to MongoDB
connectDatabase();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: config.clientOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/subcontractors', subcontractorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to CRM API' });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
});

export default app; 