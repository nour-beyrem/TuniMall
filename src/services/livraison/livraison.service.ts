
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddLivraisonDto } from 'src/DTO/livraison/addLivraison';
import { updateLivraisonDto } from 'src/DTO/livraison/updateLivraison';
import { livraisonEntity } from 'src/entities/livraison.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Any, Repository } from 'typeorm';

@Injectable()
export class LivraisonService {

    constructor(
        @InjectRepository(livraisonEntity)
        private readonly livraisonRepository: Repository<livraisonEntity>
      )
       {}
       getLivraison(user): Promise<livraisonEntity[]>
        {
          if (user.role === UserRoleEnum.ADMINACHAT  )
            return this.livraisonRepository.find();
          throw new UnauthorizedException();
          
       }
       async getById(id:string,user): Promise<livraisonEntity>
       {
         const livraison =  await this.livraisonRepository.findOne(id);
         if (!livraison)
           throw new NotFoundException(`livraison d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ADMINACHAT || livraison.livreur.id=== user.id)
            return livraison;
         else
           throw new UnauthorizedException();
       }
       
   

         getLivraisonNonValidé(user): Promise<livraisonEntity[]>
         {
           const approuver = false;
           if (user.role === UserRoleEnum.ADMINACHAT )
              
             return this.livraisonRepository.find({approuver});
           throw new UnauthorizedException();
          }

          getLivraisonTerminer(user): Promise<livraisonEntity[]>
          { 
            const terminer = true;
            if (user.role === UserRoleEnum.ADMINACHAT )
               
              return this.livraisonRepository.find({terminer});
            throw new UnauthorizedException();
          }


         getLivraisonByLivreur(livreur): Promise<livraisonEntity[]>
         {
           if (livreur.role === UserRoleEnum.LIVREUR  )
              return this.livraisonRepository.find({livreur});
           throw new UnauthorizedException();
          }


          getLivraisonByEmail(email): Promise<livraisonEntity[]>
          {
            
               return this.livraisonRepository.find({email});
            
           }
               
       
       async addLivraison(livraisonData: AddLivraisonDto, user): Promise<livraisonEntity> {
         
          return await this.livraisonRepository.save(livraisonData);
        
      
         }
       
       
     /*    async deleteLivraison(id: string,user): Promise<unknown> {
          const livraison =  await this.livraisonRepository.findOne(id);
          if (user.role === UserRoleEnum.CLIENT || livraison.client.id === user.id){
            if (livraison.approuver === false){
              const deletedLivraison = await this.livraisonRepository.delete(id);
              if(! deletedLivraison) {
                throw new NotFoundException(`livraison d'id ${id} n'existe pas`);
              } else {
                return deletedLivraison;
              }
            } 
            else {
              throw new NotFoundException(`livraison d'id ${id} est déja approuver vous ne pouver pas la supprimer`);

            }
          
          } else {
            throw new UnauthorizedException();
          }
         }*/
           
           
     async putLivraison(id: string, newLivraison: updateLivraisonDto,user): Promise<livraisonEntity> {
       const complain= await this.livraisonRepository.findOne(id);
           const updatedLivraison = await this.livraisonRepository.preload({
             id,
             ...newLivraison
         });
           console.log('Valeur de retour de preload : ', updatedLivraison);
        if (! updatedLivraison) {
           throw new NotFoundException(`Le livraison d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ADMINACHAT ||user.id === updatedLivraison.livreur.id )
           if (complain.terminer === false)
              {return await this.livraisonRepository.save(updatedLivraison);}
           else {
             throw new NotFoundException(`Le livraison d'id ${id} est  terminer donc vous ne pouver pas la modifier`);}
        
        throw new UnauthorizedException();
    
         }



         async softDeleteCommande(id:string, user) {
          const commande = await this.livraisonRepository.findOne({id});
         
          if (!commande) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ADMINACHAT )
            return this.livraisonRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }

        async restoreCommnade(id: string, user) {

          const commande = await this.livraisonRepository.query("select * from livraison where id = ?", [id]);
          if (!commande) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ADMINACHAT)
            return this.livraisonRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
      
}
