import { AddShopDto } from './../../DTO/shop/addShop';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { shopEntity } from 'src/entities/shop.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';
import { UpdateShopDto } from 'src/DTO/shop/updateShop';

@Injectable()
export class ShopService {



       
    constructor(
        @InjectRepository(shopEntity)
        private readonly shopRepository: Repository<shopEntity>
       
      )
       {}
      
      
      async getShop(user): Promise<shopEntity[]>
      {
        if (user.role === UserRoleEnum.ADMINACHAT ||user.role === UserRoleEnum.ADMINAJOUT )
           return await this.shopRepository.find();
        throw new UnauthorizedException();
      }
  
  
      async getById(nom:string, user): Promise<shopEntity>
      {
        const shop =  await this.shopRepository.findOne(nom);
  
        if (!shop)
          { 
            throw new NotFoundException(`shop avec le nom ${nom} n'existe pas`);
          }
          
        if (user.role === UserRoleEnum.ADMINACHAT ||user.role === UserRoleEnum.ADMINAJOUT)
           return shop;
  
        else 
        throw new UnauthorizedException();
        
      }
  
   
       
    
    
    
    
    
  
    
    
    
  
      async addShop(shopData: AddShopDto, user) : Promise<shopEntity>{
  
        if (user.role === UserRoleEnum.ADMINAJOUT ) {
          const user = this.shopRepository.create({
            ...shopData
          });
        
        return this.shopRepository.save(shopData);
        }
  
        else 
        throw new UnauthorizedException();
        
        
        
  
        
        
        
        
        
        
        
        
        
        
        
        
        
      }
  
    async deleteShop(nom: string, user): Promise<unknown> {
  
      if (user.role === UserRoleEnum.ADMINAJOUT ){
        const deletedShop = await this.shopRepository.delete(nom);
        if(! deletedShop) {
          throw new NotFoundException(`shop avec nom ${nom} n'existe pas`);
        } else {
          return deletedShop;
        }
      }
      else 
        throw new UnauthorizedException();
         
      
    }
      
      
    async putShop(nom: string, newShop: UpdateShopDto, user): Promise<shopEntity> {
      const updatedShop = await this.shopRepository.preload({
        nom,
        ...newShop
    });
      console.log('Valeur de retour de preload : ', updatedShop);
    if (! updatedShop) {
      throw new NotFoundException(`shop  avec le nom ${nom} n'existe pas`);
    } 
    if (user.role === UserRoleEnum.ADMINAJOUT){
      return await this.shopRepository.save(updatedShop);
    }
    else 
      throw new UnauthorizedException();
       
    
    }
  
  
  
  
  
  
  
  
    
    
    
    
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
