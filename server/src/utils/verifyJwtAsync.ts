import jwt, { VerifyErrors } from 'jsonwebtoken';

interface DecodedPayload {
  id: string;
}

export async function verifyJwtAsync(token: string): Promise<DecodedPayload> {
  const secret = process.env.JWT_SECRET as string;

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error: VerifyErrors | null, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded as DecodedPayload);
      }
    });
  });
}
