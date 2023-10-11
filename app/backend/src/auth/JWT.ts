import { JwtPayload, Secret, SignOptions, sign, verify } from 'jsonwebtoken';

class JWT {
  constructor(private readonly secret: Secret = process.env.JWT_SECRET || 'jwt_secret') {}

  private jwtConfig: SignOptions = {
    expiresIn: '7h',
  };

  encrypt(payload: JwtPayload): string {
    return sign(payload, this.secret, this.jwtConfig);
  }

  decrypt(token: string): string | JwtPayload {
    return verify(token, this.secret, this.jwtConfig);
  }
}

export default JWT;
