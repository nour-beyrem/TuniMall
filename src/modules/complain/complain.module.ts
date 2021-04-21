import { Module } from '@nestjs/common';
import { ComplainController } from './complain.controller';

@Module({
  controllers: [ComplainController]
})
export class ComplainModule {}
