import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { shopEntity } from 'src/entities/shop.entity';
import { ShopService } from 'src/services/shop/shop.service';
import { ShopController } from './shop/shop.controller';

@Module({
  controllers: [ShopController],
  providers:[ShopService],
  exports: [ShopService],
  imports: [TypeOrmModule.forFeature([shopEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
  })]
})
export class ShopModule {}
