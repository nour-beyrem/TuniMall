import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { livraisonEntity } from 'src/entities/livraison.entity';
import { LivraisonService } from 'src/services/livraison/livraison.service';
import { AdminModule } from '../admin/admin.module';
import { LivraisonController } from './livraison.controller';

@Module({
  controllers: [LivraisonController],
  providers:[LivraisonService],
  exports: [LivraisonService],
  imports: [AdminModule,TypeOrmModule.forFeature([livraisonEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
  secret: 'nourSecretKey',
  signOptions: {
    expiresIn: 3600
  }
   })]
})
export class LivraisonModule {}
