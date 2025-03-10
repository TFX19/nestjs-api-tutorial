import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor
    (
      config: ConfigService,
      private prisma: PrismaService,
    ) {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET is not defined in the environment variables');
        }
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
      });
    }

    async validate(payload: { sub: number; email: string }) {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
    
      if (!user) return null;
    
      const { hash, ...userWithoutHash } = user;
      return userWithoutHash;
    }
}