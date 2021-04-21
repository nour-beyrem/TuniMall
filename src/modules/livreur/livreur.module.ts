import { Module } from '@nestjs/common';
import { LivreurController } from './livreur.controller';

@Module({
  controllers: [LivreurController]
})
export class LivreurModule {}
