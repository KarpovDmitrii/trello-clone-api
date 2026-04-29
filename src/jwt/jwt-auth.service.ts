import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthService {
  constructor(private readonly configService: ConfigService) {}

  private get secret(): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in env');
    }
    return secret;
  }

  private get expiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN', '24h');
  }

  signPayload(payload: object, userId: string, role: string): string {
    const options: jwt.SignOptions = {
      expiresIn: this.expiresIn as jwt.SignOptions['expiresIn'],
      subject: userId,
      audience: role,
    };
    return jwt.sign(payload, this.secret, options);
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }
}
