import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddComplainDto } from 'src/DTO/complains/addComplain';
import { updateComplainDto } from 'src/DTO/complains/updateComplain';
import { adminEntity } from 'src/entities/admin.entity';
import { complainEntity } from 'src/entities/complain.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Any, Repository } from 'typeorm';

@Injectable()
export class ComplainService {


    constructor(
        @InjectRepository(complainEntity)
        private readonly complainRepository: Repository<complainEntity>
        
        )
       {}


       async getComplain(user): Promise<complainEntity[]>
        {
          
          if (user.role === UserRoleEnum.ADMINACHAT)
             return await this.complainRepository.find();
         
         
          throw new UnauthorizedException();
       }


   
  
  

       async getById(id:string, user): Promise<complainEntity>
       {
         const complain =  await this.complainRepository.findOne(id);
         console.log(complain);
         if (!complain)
            throw new NotFoundException(`complain d'id ${id} n'existe pas`);
         
         if (user.role === UserRoleEnum.ADMINACHAT )
            return complain;

        else {
          throw new UnauthorizedException();
        }
        
        
        
       }
       
       
       async addComplain(complainData: AddComplainDto): Promise<complainEntity>{
        
        
          const newComplain = this.complainRepository.create(complainData);
          
          return await this.complainRepository.save(newComplain);
        
        
        
        
        
        
        
         }
       
       
         async deleteComplain(id: string,user): Promise<unknown> {
          const complain =  await this.complainRepository.findOne(id);
          if (user.role === UserRoleEnum.ADMINACHAT ){

            const deletedComplain = await this.complainRepository.delete(id);
            if(! deletedComplain) {
              throw new NotFoundException(`complain d'id ${id} n'existe pas`);
            } else {
              return deletedComplain;
            }
          }
          else {
            throw new UnauthorizedException();
          }
         
         
         
         
         
         
         }
           
           
       /*  async putComplain(id: string, newComplain: updateComplainDto,user): Promise<complainEntity> {
           const updatedComplain = await this.complainRepository.preload({
             id,
             ...newComplain
          });
           console.log('Valeur de retour de preload : ', updatedComplain);
         if (! updatedComplain) {
           throw new NotFoundException(`Le complain d'id ${id} n'existe pas`);
         } 
         if (user.role === UserRoleEnum.ADMINACHAT || updatedComplain.client.id === user.id){
            return await this.complainRepository.save(updatedComplain);
         }
         else 
           throw new UnauthorizedException();
         }*/

         
}

