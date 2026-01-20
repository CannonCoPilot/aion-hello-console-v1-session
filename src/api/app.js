/**
 * Express application factory
 * TDD Setup: Basic structure, endpoints will fail until Phase 3
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { transform } from '../utils/transform.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Create and configure Express application
 * @returns {express.Application} Configured Express app
 */
export function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../../public')));

  // Health endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  // Transform endpoint
  app.post('/api/transform', (req, res) => {
    const { text, operation } = req.body;

    if (text === undefined || text === null) {
      return res.status(400).json({ error: 'Missing required field: text' });
    }

    if (!operation) {
      return res.status(400).json({ error: 'Missing required field: operation' });
    }

    try {
      const result = transform(text, operation);
      res.json({
        result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return app;
}
