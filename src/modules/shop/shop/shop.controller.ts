import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AddShopDto } from 'src/DTO/shop/addShop';
import { UpdateShopDto } from 'src/DTO/shop/updateShop';
import { shopEntity } from 'src/entities/shop.entity';
import { JwtAuthGuard } from 'src/services/admin/guards/jwt-auth.guard';
import { ShopService } from 'src/services/shop/shop.service';

@Controller('shop')
export class ShopController {


    constructor(private shopService: ShopService) {
    }


    @Get()
    
    getAll( 
      
    ): Promise<shopEntity[]> {
       return this.shopService.getShop();
    }


    @Get(':nom')
    
    async getShoById(
      @Param('nom') nom: string
    ): Promise<shopEntity>{
      const shop = await this.shopService.getById(nom);
      if (shop)
    
      return shop;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    addShop(
      @Body() shopData:AddShopDto , @User() user
    ){
      return this.shopService.addShop(shopData, user);
    }

    @Delete(':nom')
    @UseGuards(JwtAuthGuard)
    deleteShop(
      @Param('nom') nom: string , @User() user
    ): Promise<unknown> {
      return this.shopService.deleteShop(nom,user);
    }



    @Put(':nom')
    @UseGuards(JwtAuthGuard)
  updateShop(
    @Param('nom') nom : string,
    @Body() newShop: UpdateShopDto , @User() user
  ): Promise<shopEntity> {
    return this.shopService.putShop(nom, newShop,user);
  }
}
