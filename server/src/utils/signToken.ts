import jwt from 'jsonwebtoken';

export function signToken(payload: object) {
  const secret = process.env.JWT_SECRET as string;
  const expiresInHours = Number(process.env.JWT_EXPIRES_IN_HOURS);

  return jwt.sign(payload, secret, {
    expiresIn: `${expiresInHours}h`,
    algorithm: 'HS256',
  });
}
