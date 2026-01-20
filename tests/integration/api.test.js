import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/api/app.js';

const app = createApp();

describe('GET /health', () => {
  it('should return status ok with timestamp', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.timestamp).toBeDefined();
    expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
  });
});

describe('POST /api/transform', () => {
  it('should transform text with slugify operation', async () => {
    const response = await request(app)
      .post('/api/transform')
      .send({ text: 'Hello World', operation: 'slugify' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe('hello-world');
    expect(response.body.timestamp).toBeDefined();
  });

  it('should transform text with reverse operation', async () => {
    const response = await request(app)
      .post('/api/transform')
      .send({ text: 'hello', operation: 'reverse' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe('olleh');
  });

  it('should transform text with uppercase operation', async () => {
    const response = await request(app)
      .post('/api/transform')
      .send({ text: 'hello', operation: 'uppercase' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe('HELLO');
  });

  it('should transform text with wordCount operation', async () => {
    const response = await request(app)
      .post('/api/transform')
      .send({ text: 'hello world', operation: 'wordCount' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe('2 words');
  });

  it('should return 400 when text is missing', async () => {
    const response = await request(app)
      .post('/api/transform')
      .send({ operation: 'slugify' });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('text');
  });

  it('should return 400 when operation is missing', async () => {
    const response = await request(app)
      .post('/api/transform')
      .send({ text: 'hello' });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('operation');
  });

  it('should return 400 for unknown operation', async () => {
    const response = await request(app)
      .post('/api/transform')
      .send({ text: 'hello', operation: 'unknown' });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Unknown operation');
  });

  it('should handle empty text input', async () => {
    const response = await request(app)
      .post('/api/transform')
      .send({ text: '', operation: 'slugify' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe('');
  });
});
