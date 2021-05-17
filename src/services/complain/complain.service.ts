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


       async getComplainClient(client): Promise<complainEntity[]>
        {
   
           if (client.role === UserRoleEnum.CLIENT)
               return await this.complainRepository.find({client});
  
  
           throw new UnauthorizedException();
        }

       async getById(id:string, user): Promise<complainEntity>
       {
         const complain =  await this.complainRepository.findOne(id);
         if (!complain)
            throw new NotFoundException(`complain d'id ${id} n'existe pas`);
         
         if (user.role === UserRoleEnum.ADMINACHAT || complain.client.id === user.id)
            return complain;

        else {
          throw new UnauthorizedException();
        }
        
        
        
       }
       
       
       async addComplain(complainData: AddComplainDto, user): Promise<complainEntity>{
        if (user.role === UserRoleEnum.CLIENT )
        {
          const newComplain = this.complainRepository.create(complainData);
          newComplain.client=user;
          return await this.complainRepository.save(newComplain);
        }
        else {
          throw new UnauthorizedException();
        }
        
        
        
         }
       
       
         async deleteComplain(id: string,user): Promise<unknown> {
          
          if (user.role === UserRoleEnum.CLIENT ){

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
           
           
         async putComplain(id: string, newComplain: updateComplainDto,user): Promise<complainEntity> {
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
         }

         
}

