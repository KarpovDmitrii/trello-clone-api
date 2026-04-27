import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthService } from './jwt-auth.service';
import { CustomJwtGuard } from './guards/custom-jwt.guard';

@Module({
  imports: [ConfigModule],
  providers: [JwtAuthService, CustomJwtGuard],
  exports: [JwtAuthService, CustomJwtGuard],
})
export class JwtAuthModule {}
