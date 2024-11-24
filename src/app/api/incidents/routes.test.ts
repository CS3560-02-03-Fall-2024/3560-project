import { NextRequest } from 'next/server';
import { createEntity, updateEntity, getEntities } from './db';
import { POST, PUT, GET } from './route';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: './.env.local' });

// Mock the database functions
jest.mock('./db', () => ({
  createEntity: jest.fn(),
  updateEntity: jest.fn(),
  getEntities: jest.fn(),
}));

const SUPABASE_URL = process.env.SUPABASE_URL;

describe('API Routes', () => {
  describe('POST /api/:entity', () => {
    it('should create a new entity and return 201', async () => {
      const request = new NextRequest(`${SUPABASE_URL}/api/report`, {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Report',
          description: 'This is a test report',
          severity: 'low',
        }),
      });

      (createEntity as jest.Mock).mockResolvedValue({
        id: 1,
        title: 'Test Report',
        description: 'This is a test report',
        severity: 'low',
      });

      const response = await POST(request, { params: { entity: 'report' } });
      const jsonResponse = await response.json();

      expect(response.status).toBe(201);
      expect(jsonResponse).toEqual({
        id: 1,
        title: 'Test Report',
        description: 'This is a test report',
        severity: 'low',
      });
    });
  });

  describe('PUT /api/:entity', () => {
    it('should update an existing entity and return 200', async () => {
      const request = new NextRequest(`${SUPABASE_URL}/api/report`, {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: 'Updated Report',
          description: 'This is an updated test report',
          severity: 'medium',
        }),
      });

      (updateEntity as jest.Mock).mockResolvedValue({
        id: 1,
        title: 'Updated Report',
        description: 'This is an updated test report',
        severity: 'medium',
      });

      const response = await PUT(request, { params: { entity: 'report' } });
      const jsonResponse = await response.json();

      expect(response.status).toBe(200);
      expect(jsonResponse).toEqual({
        id: 1,
        title: 'Updated Report',
        description: 'This is an updated test report',
        severity: 'medium',
      });
    });
  });

  describe('GET /api/:entity', () => {
    it('should fetch entities and return 200', async () => {
      const request = new NextRequest(`${SUPABASE_URL}/api/report?limit=1`, {
        method: 'GET',
      });

      (getEntities as jest.Mock).mockResolvedValue({
        data: [{
          id: 1,
          title: 'Test Report',
          description: 'This is a test report',
          severity: 'low',
        }],
        pagination: {
          total: 1,
          page: 1,
          limit: 1,
          pages: 1,
        },
      });

      const response = await GET(request, { params: { entity: 'report' } });
      const jsonResponse = await response.json();

      expect(response.status).toBe(200);
      expect(jsonResponse.data).toEqual([{
        id: 1,
        title: 'Test Report',
        description: 'This is a test report',
        severity: 'low',
      }]);
    });
  });
});
