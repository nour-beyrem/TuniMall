import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from './modules/admin/admin.module';
import { ClientService } from './services/client/client.service';
import { ProduitService } from './services/produit/produit.service';
import { LivreurService } from './services/livreur/livreur.service';
import { LivraisonService } from './services/livraison/livraison.service';
import { ComplainService } from './services/complain/complain.service';


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
  providers: [AppService, ClientService, ProduitService, LivreurService, LivraisonService, ComplainService],
})
export class AppModule {}
