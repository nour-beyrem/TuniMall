import { Module } from '@nestjs/common';
import { LivraisonController } from './livraison.controller';

@Module({
  controllers: [LivraisonController]
})
export class LivraisonModule {}
