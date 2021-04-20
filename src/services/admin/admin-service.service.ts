import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddAdminDto } from 'src/DTO/admin/addAdmin';
import { adminEntity } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

   
    constructor(
      @InjectRepository(adminEntity)
      private readonly adminRepository: Repository<adminEntity>
    )
     {}
    
    
    getAdmin()
    {
        return this.adminRepository.find();
    }


    async getById(id:string): Promise<adminEntity>
    {
      const admin =  await this.adminRepository.findOne(id);

      if (admin)
        return admin;
      else
      throw new NotFoundException(`admin d'id ${id} n'existe pas`);
    }


    async addAdmin(adminData: AddAdminDto) {
      
      return await this.adminRepository.save(adminData);
  }

  async deleteAdmin(id: string): Promise<unknown> {
    const deletedAdmin = await this.adminRepository.delete(id);
    if(! deletedAdmin) {
      throw new NotFoundException(`admin d'id ${id} n'existe pas`);
    } else {
      return deletedAdmin;
    }
  }
    
    
    
    
    
    
  
    
    
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


}
