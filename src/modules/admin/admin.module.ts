import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminEntity } from 'src/entities/admin.entity';
import { AdminService } from 'src/services/admin/admin-service.service';

import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController],
  providers:[AdminService],
  exports: [AdminService],
  imports: [TypeOrmModule.forFeature([adminEntity])]
})
export class AdminModule {}
