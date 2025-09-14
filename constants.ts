
import type { UserRecord } from './types';

export const MOCK_USER_DATA: UserRecord[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString() },
  { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString() },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString() },
  { id: 4, name: 'Diana Miller', email: 'diana.m@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString() },
  { id: 5, name: 'Ethan Davis', email: 'ethan.d@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString() },
  { id: 6, name: 'Fiona Green', email: 'fiona.g@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() },
  { id: 7, name: 'George Harris', email: 'george.h@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString() },
  { id: 8, name: 'Hannah Clark', email: 'hannah.c@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
  { id: 9, name: 'Ian Lewis', email: 'ian.l@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() },
  { id: 10, name: 'Jane Walker', email: 'jane.w@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
  { id: 11, name: 'Kevin Young', email: 'kevin.y@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
  { id: 12, name: 'Laura King', email: 'laura.k@example.com', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString() },
];
