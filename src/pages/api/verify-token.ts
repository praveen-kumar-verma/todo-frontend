import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (token === 'todoapp') {
    res.status(200).json({ message: 'Token is valid', user: { email: 'user@example.com' } });
  } else {
    res.status(401).json({ message: 'Token is invalid or expired' });
  }
}
