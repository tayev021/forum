import jwt from 'jsonwebtoken';

export function signToken(payload: object) {
  const secret = process.env.JWT_SECRET as string;

  return jwt.sign(payload, secret, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
}
