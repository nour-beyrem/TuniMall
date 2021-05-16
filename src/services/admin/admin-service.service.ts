import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddAdminDto } from 'src/DTO/admin/addAdmin';
import { updateAdminDto } from 'src/DTO/admin/updateAdmin';
import { adminEntity } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { async } from 'rxjs';
import { LoginCredentialsDto } from 'src/DTO/admin/loginUser';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {

   
    constructor(
      @InjectRepository(adminEntity)
      private readonly adminRepository: Repository<adminEntity>,
      private jwtService: JwtService
    )
     {}
    
    
    getUsers()
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

    async getByRole(role:string): Promise<adminEntity[]>
    {
       return await this.adminRepository.find({role});
    }

    async addAdmin(userData: AddAdminDto) : Promise<Partial<adminEntity>>{
      const user = this.adminRepository.create({
        ...userData
      });

      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, user.salt);
      try {
        await this.adminRepository.save(user);
      } catch (e) {
        throw new ConflictException(`le email ou le username doit être unique`);
      }
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };
    }

  async deleteAdmin(id: string): Promise<unknown> {
    const deletedAdmin = await this.adminRepository.delete(id);
    if(! deletedAdmin) {
      throw new NotFoundException(`admin d'id ${id} n'existe pas`);
    } else {
      return deletedAdmin;
    }
  }
    
    
  async putAdmin(id: string, newAdmin: updateAdminDto): Promise<adminEntity> {
    const updatedAdmin = await this.adminRepository.preload({
      id,
      ...newAdmin
  });
    console.log('Valeur de retour de preload : ', updatedAdmin);
  if (! updatedAdmin) {
    throw new NotFoundException(`admin d'id ${id} n'existe pas`);
  } else {
    return await this.adminRepository.save(updatedAdmin);
  }
  }




  async login(credentials: LoginCredentialsDto)  {

    
    const {username, password} = credentials;
    const user = await this.adminRepository.createQueryBuilder("user")
      .where("user.username = :username or user.email = :username",
        {username}
        )
      .getOne(); 
    if (!user)
      throw new NotFoundException('username ou password erronée');
   
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        "access_token" : jwt
      };
    } else {
      
      throw new NotFoundException('username ou password erronée');
    }
  }

    
    
    
  
    
    
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


}
