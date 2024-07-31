import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (email === 'user@example.com' && password === 'password') {
    const token = 'todoapp';
    res.status(200).json({ token, user: { email } });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
}
