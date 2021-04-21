import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddComplainDto } from 'src/DTO/complains/addComplain';
import { updateComplainDto } from 'src/DTO/complains/updateComplain';
import { complainEntity } from 'src/entities/complain.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComplainService {


    constructor(
        @InjectRepository(complainEntity)
        private readonly complainRepository: Repository<complainEntity>
      )
       {}
       getComplain()
        {
          return this.complainRepository.find();
       }
       async getById(id:string): Promise<complainEntity>
       {
         const complain =  await this.complainRepository.findOne(id);
         if (complain)
           return complain;
         else
         throw new NotFoundException(`complain d'id ${id} n'existe pas`);
       }
       
       
       async addComplain(complainData: AddComplainDto) {
          
           return await this.complainRepository.save(complainData);
         }
       
       
         async deleteComplain(id: string): Promise<unknown> {
           const deletedComplain = await this.complainRepository.delete(id);
           if(! deletedComplain) {
             throw new NotFoundException(`complain d'id ${id} n'existe pas`);
           } else {
             return deletedComplain;
           }
         }
           
           
         async putClient(id: string, newComplain: updateComplainDto): Promise<complainEntity> {
           const updatedComplain = await this.complainRepository.preload({
             id,
             ...newComplain
         });
           console.log('Valeur de retour de preload : ', updatedComplain);
         if (! updatedComplain) {
           throw new NotFoundException(`Le complain d'id ${id} n'existe pas`);
         } else {
           return await this.complainRepository.save(updatedComplain);
         }
         }
}
