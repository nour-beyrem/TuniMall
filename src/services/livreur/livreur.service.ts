import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddLivreurDto } from 'src/DTO/livreur/addLivreur';
import { updateLivreurDto } from 'src/DTO/livreur/updateLivreur';
import { livreurEntity } from 'src/entities/livreur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LivreurService {

    constructor(
        @InjectRepository(livreurEntity)
        private readonly livreurRepository: Repository<livreurEntity>
      )
       {}
       getLivreur()
        {
          return this.livreurRepository.find();
       }
       async getById(id:string): Promise<livreurEntity>
       {
         const livreur =  await this.livreurRepository.findOne(id);
         if (livreur)
           return livreur;
         else
         throw new NotFoundException(`livreur d'id ${id} n'existe pas`);
       }
       
       
       async addLivreur(livreurData: AddLivreurDto) {
          
           return await this.livreurRepository.save(livreurData);
         }
       
       
         async deleteLivreur(id: string): Promise<unknown> {
           const deletedLivreur = await this.livreurRepository.delete(id);
           if(! deletedLivreur) {
             throw new NotFoundException(`livreur d'id ${id} n'existe pas`);
           } else {
             return deletedLivreur;
           }
         }
           
           
         async putClient(id: string, newLivreur: updateLivreurDto): Promise<livreurEntity> {
           const updatedLivreur = await this.livreurRepository.preload({
             id,
             ...newLivreur
         });
           console.log('Valeur de retour de preload : ', updatedLivreur);
         if (! updatedLivreur) {
           throw new NotFoundException(`Le livreur d'id ${id} n'existe pas`);
         } else {
           return await this.livreurRepository.save(updatedLivreur);
         }
         }
}
