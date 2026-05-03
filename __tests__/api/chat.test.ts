import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define mock function outside so it can be controlled
const mockGenerateContent = jest.fn().mockResolvedValue({
  response: {
    text: () => 'Mocked AI response about elections.',
  },
});

// Mock the GoogleGenerativeAI SDK before importing the handler
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: mockGenerateContent,
      }),
    })),
  };
});

import handler from '@/pages/api/chat';

// Helper to create mock req/res pair
const createReqRes = (method: string, body: object) => {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method, body });
  return { req, res };
};

describe('POST /api/chat', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Provide a fake API key so the key-check passes
    process.env = { ...originalEnv, GEMINI_API_KEY: 'fake-test-key' };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  // ── METHOD VALIDATION ─────────────────────────────────────────────────────
  describe('Method validation', () => {
    it('returns 405 for GET requests', async () => {
      const { req, res } = createReqRes('GET', {});
      await handler(req, res);
      expect(res.statusCode).toBe(405);
      expect(res._getJSONData()).toEqual({ error: 'Method not allowed' });
    });

    it('returns 405 for PUT requests', async () => {
      const { req, res } = createReqRes('PUT', { message: 'hello' });
      await handler(req, res);
      expect(res.statusCode).toBe(405);
    });

    it('returns 405 for DELETE requests', async () => {
      const { req, res } = createReqRes('DELETE', {});
      await handler(req, res);
      expect(res.statusCode).toBe(405);
    });
  });

  // ── INPUT VALIDATION ──────────────────────────────────────────────────────
  describe('Input validation', () => {
    it('returns 400 when message is empty string', async () => {
      const { req, res } = createReqRes('POST', { message: '' });
      await handler(req, res);
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ error: 'Message is required' });
    });

    it('returns 400 when message is only whitespace', async () => {
      const { req, res } = createReqRes('POST', { message: '   ' });
      await handler(req, res);
      expect(res.statusCode).toBe(400);
    });

    it('returns 400 when message is missing from body', async () => {
      const { req, res } = createReqRes('POST', {});
      await handler(req, res);
      expect(res.statusCode).toBe(400);
    });
  });

  // ── MISSING API KEY ───────────────────────────────────────────────────────
  describe('Missing API key', () => {
    it('returns 500 when GEMINI_API_KEY is not set', async () => {
      delete process.env.GEMINI_API_KEY;
      const { req, res } = createReqRes('POST', { message: 'Who can vote in India?' });
      await handler(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData().error).toMatch(/API key not configured/i);
    });
  });

  // ── SUCCESSFUL RESPONSE ───────────────────────────────────────────────────
  describe('Successful AI response', () => {
    it('returns 200 with text for a valid message', async () => {
      const { req, res } = createReqRes('POST', { message: 'What is NOTA?' });
      await handler(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toHaveProperty('text');
      expect(res._getJSONData().text).toBe('Mocked AI response about elections.');
    });

    it('works with optional context field provided', async () => {
      const { req, res } = createReqRes('POST', {
        message: 'How do I vote?',
        context: 'First-time voter guide',
      });
      await handler(req, res);
      expect(res.statusCode).toBe(200);
    });

    it('works without context field (uses default)', async () => {
      const { req, res } = createReqRes('POST', { message: 'What is EVM?' });
      await handler(req, res);
      expect(res.statusCode).toBe(200);
    });
  });

  // ── ERROR HANDLING ────────────────────────────────────────────────────────
  describe('AI SDK error handling', () => {
    it('returns 500 when Gemini SDK throws an error', async () => {
      // Use the shared mock function
      mockGenerateContent.mockRejectedValueOnce(new Error('Network error'));

      const { req, res } = createReqRes('POST', { message: 'What is the election date?' });
      await handler(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData().error).toMatch(/Failed to fetch response/i);
      expect(res._getJSONData().detail).toBe('Network error');
    });
  });
});
