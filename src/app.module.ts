import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from './modules/admin/admin.module';

import { ProduitService } from './services/produit/produit.service';
import { LivraisonService } from './services/livraison/livraison.service';
import { ComplainService } from './services/complain/complain.service';

import { ProduitModule } from './modules/produit/produit.module';
import { LivraisonModule } from './modules/livraison/livraison.module';
import { ComplainModule } from './modules/complain/complain.module';
import { ConfigModule } from '@nestjs/config';



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
  }), ConfigModule.forRoot({
    isGlobal: true
    
  }), AdminModule, ProduitModule, LivraisonModule, ComplainModule,],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
