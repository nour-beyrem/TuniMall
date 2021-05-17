import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProduitDto } from 'src/DTO/produit/addProduit';
import { updateProduitDto } from 'src/DTO/produit/updateProduit';
import { produitEntity } from 'src/entities/produit.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ProduitService {

    constructor(
        @InjectRepository(produitEntity)
        private readonly produitRepository: Repository<produitEntity>
      )
       {}
       async getProduits(): Promise<produitEntity[]>
        {
          
             return await this.produitRepository.find();
          
       }
       async getById(id:string): Promise<produitEntity>
       {
         const produit =  await this.produitRepository.findOne(id);
         console.log(produit);
         if (!produit)
           throw new NotFoundException(`produit d'id ${id} n'existe pas`);
          
        
           return produit;
        
           throw new UnauthorizedException();
         
       }
       
       
       async addProduit(produitData: AddProduitDto,user) {
        if (user.role === UserRoleEnum.ADMINAJOUT )
           return await this.produitRepository.save(produitData);
        else
           throw new UnauthorizedException();
          }
       
       
         async deleteProduit(codeBar: string, user): Promise<unknown> {
           
          if (user.role === UserRoleEnum.ADMINAJOUT ){
            const deletedProduit = await this.produitRepository.delete(codeBar);
            if(! deletedProduit) {
              throw new NotFoundException(`produit d'id ${codeBar} n'existe pas`);
            } else {
              return deletedProduit;
            }

          }
          else 
            throw new UnauthorizedException();
         
         }
           
           
         async putProduit(codeBar: string, newProduit: updateProduitDto,user): Promise<produitEntity> {
           const updatedProduit = await this.produitRepository.preload({
             codeBar,
             ...newProduit
         });
           console.log('Valeur de retour de preload : ', updatedProduit);
         if (! updatedProduit) {
           throw new NotFoundException(`Le produit d'id ${codeBar} n'existe pas`);
         } 
         if (user.role === UserRoleEnum.ADMINAJOUT ){
           return await this.produitRepository.save(updatedProduit);
         }
         else 
            throw new UnauthorizedException();
         }
}
