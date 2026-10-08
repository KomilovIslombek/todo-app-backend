import express from 'express';
import masterRouter from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());

// 3. Health Check Endpoint (Essential for modern Cloud/Docker/K8s environments)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.use('/api/v1', masterRouter);

export default app;
