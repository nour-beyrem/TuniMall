import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminEntity } from 'src/entities/admin.entity';
import { AdminService } from 'src/services/admin/admin-service.service';
import * as dotenv from 'dotenv';
import { AdminController } from './admin.controller';
import { JwtStrategy } from 'src/services/admin/strategy/passport-jwt.strategy';


dotenv.config();
@Module({
  controllers: [AdminController],
  providers:[AdminService, JwtStrategy],
  exports: [AdminService],
  imports: [TypeOrmModule.forFeature([adminEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
  })]
})
export class AdminModule {}
