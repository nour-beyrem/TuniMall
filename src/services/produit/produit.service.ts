import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProduitDto } from 'src/DTO/produit/addProduit';
import { updateProduitDto } from 'src/DTO/produit/updateProduit';
import { produitEntity } from 'src/entities/produit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProduitService {

    constructor(
        @InjectRepository(produitEntity)
        private readonly produitRepository: Repository<produitEntity>
      )
       {}
       getProduit()
        {
          return this.produitRepository.find();
       }
       async getById(id:string): Promise<produitEntity>
       {
         const produit =  await this.produitRepository.findOne(id);
         if (produit)
           return produit;
         else
         throw new NotFoundException(`produit d'id ${id} n'existe pas`);
       }
       
       
       async addProduit(produitData: AddProduitDto) {
          
           return await this.produitRepository.save(produitData);
         }
       
       
         async deleteProduit(id: string): Promise<unknown> {
           const deletedProduit = await this.produitRepository.delete(id);
           if(! deletedProduit) {
             throw new NotFoundException(`produit d'id ${id} n'existe pas`);
           } else {
             return deletedProduit;
           }
         }
           
           
         async putProduit(codeBar: string, newProduit: updateProduitDto): Promise<produitEntity> {
           const updatedProduit = await this.produitRepository.preload({
             codeBar,
             ...newProduit
         });
           console.log('Valeur de retour de preload : ', updatedProduit);
         if (! updatedProduit) {
           throw new NotFoundException(`Le produit d'id ${codeBar} n'existe pas`);
         } else {
           return await this.produitRepository.save(updatedProduit);
         }
         }
}
