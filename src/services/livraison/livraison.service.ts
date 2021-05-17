
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
         if (user.role === UserRoleEnum.ADMINACHAT || livraison.client.id === user.id || livraison.livreur.id=== user.id)
            return livraison;
         else
           throw new UnauthorizedException();
       }
       
       getLivraisonByClient(client): Promise<livraisonEntity[]>
        {
          if (client.role === UserRoleEnum.CLIENT  )
             return this.livraisonRepository.find({client});
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
       
       async addLivraison(livraisonData: AddLivraisonDto, user): Promise<livraisonEntity> {
          
        if (user.role === UserRoleEnum.CLIENT )
        {
          const newLivraison = this.livraisonRepository.create(livraisonData);
          newLivraison.client=user;
          return await this.livraisonRepository.save(newLivraison);
        }
        else {
          throw new UnauthorizedException();
        }
         }
       
       
         async deleteLivraison(id: string,user): Promise<unknown> {
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
         }
           
           
     async putLivraison(id: string, newLivraison: updateLivraisonDto,user): Promise<livraisonEntity> {
           const updatedLivraison = await this.livraisonRepository.preload({
             id,
             ...newLivraison
         });
           console.log('Valeur de retour de preload : ', updatedLivraison);
        if (! updatedLivraison) {
           throw new NotFoundException(`Le livraison d'id ${id} n'existe pas`);
        }
      
      

        if (user.role === UserRoleEnum.ADMINACHAT ||user.id === updatedLivraison.livreur.id )
           if (updatedLivraison.terminer === false)
              {return await this.livraisonRepository.save(updatedLivraison);}
            else {throw new NotFoundException(`Le livraison d'id ${id} est  terminer donc vous ne pouver pas la modifier`);}
           
        
        
         
        if (user.id === updatedLivraison.client.id )
          if (updatedLivraison.approuver === false)
            {return await this.livraisonRepository.save(updatedLivraison);}
          else {throw new NotFoundException(`livraison d'id ${id} est déja approuver vous ne pouver pas la supprimer`);}

       
       
       
        
        
        throw new UnauthorizedException();
    

          
           
        
         
        
        
        
        
        
        
         }
}
