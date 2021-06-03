import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddAdminDto } from 'src/DTO/admin/addAdmin';
import { updateAdminDto } from 'src/DTO/admin/updateAdmin';
import { adminEntity } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { async } from 'rxjs';
import { LoginCredentialsDto } from 'src/DTO/admin/loginUser';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Injectable()
export class AdminService {

   
    constructor(
      @InjectRepository(adminEntity)
      private readonly adminRepository: Repository<adminEntity>,
      private jwtService: JwtService
    )
     {}
    
    
    async getUsers(user): Promise<adminEntity[]>
    {
      if (user.role === UserRoleEnum.ADMINACHAT ||user.role === UserRoleEnum.ADMINAJOUT )
         return await this.adminRepository.find();
      throw new UnauthorizedException();
    }


    async getById(id:string, user): Promise<adminEntity>
    {
      const admin =  await this.adminRepository.findOne(id);
      

      if (!admin)
        { 
          throw new NotFoundException(`admin d'id ${id} n'existe pas`);
        }
        
      if (user.role === UserRoleEnum.ADMINACHAT ||user.role === UserRoleEnum.ADMINAJOUT || admin.id === user.id)
         return admin;

      else 
      throw new UnauthorizedException();
      
    }

 
     
    async getByRole(role:string,user): Promise<adminEntity[]>
    {
         
     if (user.role === UserRoleEnum.ADMINACHAT ||user.role === UserRoleEnum.ADMINAJOUT || user.role === role)
        return await this.adminRepository.find({role});

     else 
        throw new UnauthorizedException();
    }

    async addAdmin(userData: AddAdminDto, user1) : Promise<Partial<adminEntity>>{

      if (user1.role === UserRoleEnum.ADMINAJOUT ) {
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

      else 
      throw new UnauthorizedException();
      
      
      

      
      
      
      
      
      
      
      
      
      
      
      
      
    }

  async deleteAdmin(id: string, user): Promise<unknown> {

    if (user.role === UserRoleEnum.ADMINAJOUT ){
      const deletedAdmin = await this.adminRepository.delete(id);
      if(! deletedAdmin) {
        throw new NotFoundException(`admin d'id ${id} n'existe pas`);
      } else {
        return deletedAdmin;
      }
    }
    else 
      throw new UnauthorizedException();
       
    
  }
    
    
  async putAdmin(id: string, newAdmin: updateAdminDto, user): Promise<adminEntity> {
    const updatedAdmin = await this.adminRepository.preload({
      id,
      ...newAdmin
  });
    console.log('Valeur de retour de preload : ', updatedAdmin);
  if (! updatedAdmin) {
    throw new NotFoundException(`admin d'id ${id} n'existe pas`);
  } 
  if (user.role === UserRoleEnum.ADMINAJOUT || updatedAdmin.id === user.id){
    return await this.adminRepository.save(updatedAdmin);
  }
  else 
    throw new UnauthorizedException();
     
  
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
        "access_token" : jwt,
        "user": user
      };
    } else {
      
      throw new NotFoundException('username ou password erronée');
    }
  }


    
    
    
  
    
    
    
  
  
  



    
    
    
  
    
    
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


}
