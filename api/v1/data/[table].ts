import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  url: string;
  apiKey: string;
  iat: number;
  exp: number;
}

const getSupabaseClient = (req: VercelRequest): SupabaseClient | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('JWT_SECRET is not set.');
    return null;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
    return createClient(decoded.url, decoded.apiKey);
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabase = getSupabaseClient(req);

  if (!supabase) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing token.' });
  }

  const { table } = req.query;

  if (typeof table !== 'string' || !table) {
    return res.status(400).json({ error: 'Table name is required.' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const selectQuery = typeof req.query.select === 'string' ? req.query.select : '*';
        const limitQuery = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 100;
        
        let query = supabase.from(table).select(selectQuery).limit(limitQuery);

        const { data, error } = await query;
        if (error) throw error;
        return res.status(200).json(data);

      case 'POST':
        const { data: postData, error: postError } = await supabase.from(table).insert(req.body).select();
        if (postError) throw postError;
        return res.status(201).json(postData);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error(`Error on table '${table}':`, error);
    return res.status(500).json({ error: error.message });
  }
}
