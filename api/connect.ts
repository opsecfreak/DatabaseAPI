import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { url, apiKey } = req.body;

  if (!url || !apiKey) {
    return res.status(400).json({ error: 'Project URL and API Key are required.' });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    // Attempt to connect to Supabase to validate credentials
    const supabase = createClient(url, apiKey);
    
    // A lightweight query to check if the credentials are valid
    const { error } = await supabase.from('non_existent_table').select('*', { count: 'exact', head: true });

    // We expect a specific error if the table doesn't exist but credentials are okay
    // e.g., "relation 'public.non_existent_table' does not exist"
    if (error && error.code !== '42P01') {
        throw new Error(`Supabase connection error: ${error.message}`);
    }

    // Credentials seem valid, create a JWT
    const token = jwt.sign({ url, apiKey }, jwtSecret, { expiresIn: '1h' });

    return res.status(200).json({ token });

  } catch (error: any) {
    console.error('Connection failed:', error);
    return res.status(401).json({ error: 'Connection failed. Please check your credentials.' });
  }
}
