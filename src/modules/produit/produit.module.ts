import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { produitEntity } from 'src/entities/produit.entity';
import { ProduitService } from 'src/services/produit/produit.service';
import { ProduitController } from './produit.controller';

@Module({
  controllers: [ProduitController],

  providers:[ProduitService],
  exports: [ProduitService],
  imports: [TypeOrmModule.forFeature([produitEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
  })]
})
export class ProduitModule {}
