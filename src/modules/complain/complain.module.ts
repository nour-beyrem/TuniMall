import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/services/admin/strategy/passport-jwt.strategy';
import { ComplainService } from 'src/services/complain/complain.service';
import { ComplainController } from './complain.controller';
import { complainEntity } from 'src/entities/complain.entity';
import { AdminModule } from '../admin/admin.module';

@Module({
  controllers: [ComplainController],
  providers:[ComplainService],
exports: [ComplainService],
imports: [AdminModule,TypeOrmModule.forFeature([complainEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
  secret: 'nourSecretKey',
  signOptions: {
    expiresIn: 3600
  }
})]
  
})
export class ComplainModule {}
