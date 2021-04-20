import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from './modules/admin/admin.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tuni-mall',
    entities: ["dist/**/*.entity.{js,ts}"],
    synchronize: true,
    logging: true
  }), AdminModule,],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
