import { Module } from '@nestjs/common';
import { ProduitController } from './produit.controller';

@Module({
  controllers: [ProduitController]
})
export class ProduitModule {}
