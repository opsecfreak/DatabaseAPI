
import type { UserRecord } from './types';

export const MOCK_USER_DATA: UserRecord[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
  { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
  { id: 4, name: 'Diana Miller', email: 'diana.m@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString() },
  { id: 5, name: 'Ethan Davis', email: 'ethan.d@example.com', created_at: new Date().toISOString() },
];
