import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddClientDto } from 'src/DTO/client/addClient';
import { updateClientDto } from 'src/DTO/client/updateClient';
import { clientEntity } from 'src/entities/client.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ClientService {

    constructor(
        @InjectRepository(clientEntity)
        private readonly clientRepository: Repository<clientEntity>
      )
       {}

       getClient()
        {
          return this.clientRepository.find();
       }

       async getById(id:string): Promise<clientEntity>
       {
         const client =  await this.clientRepository.findOne(id);
         if (client)
           return client;
         else
         throw new NotFoundException(`client d'id ${id} n'existe pas`);
       }
       
       
       async addClient(clientData: AddClientDto) {
          
           return await this.clientRepository.save(clientData);
         }
       
       
         async deleteClient(id: string): Promise<unknown> {
           const deletedClient = await this.clientRepository.delete(id);
           if(! deletedClient) {
             throw new NotFoundException(`client d'id ${id} n'existe pas`);
           } else {
             return deletedClient;
           }
         }
           
           
         async putClient(id: string, newClient: updateClientDto): Promise<clientEntity> {
           const updatedClient = await this.clientRepository.preload({
             id,
             ...newClient
         });
           console.log('Valeur de retour de preload : ', updatedClient);
         if (! updatedClient) {
           throw new NotFoundException(`Le client d'id ${id} n'existe pas`);
         } else {
           return await this.clientRepository.save(updatedClient);
         }
         }
           
}


































