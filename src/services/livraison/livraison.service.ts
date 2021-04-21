
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddLivraisonDto } from 'src/DTO/livraison/addLivraison';
import { updateLivraisonDto } from 'src/DTO/livraison/updateLivraison';
import { livraisonEntity } from 'src/entities/livraison.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LivraisonService {

    constructor(
        @InjectRepository(livraisonEntity)
        private readonly livraisonRepository: Repository<livraisonEntity>
      )
       {}
       getLivraison()
        {
          return this.livraisonRepository.find();
       }
       async getById(id:string): Promise<livraisonEntity>
       {
         const livraison =  await this.livraisonRepository.findOne(id);
         if (livraison)
           return livraison;
         else
         throw new NotFoundException(`livraison d'id ${id} n'existe pas`);
       }
       
       
       async addLivraison(livraisonData: AddLivraisonDto) {
          
           return await this.livraisonRepository.save(livraisonData);
         }
       
       
         async deleteLivraison(id: string): Promise<unknown> {
           const deletedLivraison = await this.livraisonRepository.delete(id);
           if(! deletedLivraison) {
             throw new NotFoundException(`livraison d'id ${id} n'existe pas`);
           } else {
             return deletedLivraison;
           }
         }
           
           
         async putLivraison(id: string, newLivraison: updateLivraisonDto): Promise<livraisonEntity> {
           const updatedLivraison = await this.livraisonRepository.preload({
             id,
             ...newLivraison
         });
           console.log('Valeur de retour de preload : ', updatedLivraison);
         if (! updatedLivraison) {
           throw new NotFoundException(`Le livraison d'id ${id} n'existe pas`);
         } else {
           return await this.livraisonRepository.save(updatedLivraison);
         }
         }
}
