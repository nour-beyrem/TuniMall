import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AddLivraisonDto } from 'src/DTO/livraison/addLivraison';
import { updateLivraisonDto } from 'src/DTO/livraison/updateLivraison';
import { livraisonEntity } from 'src/entities/livraison.entity';
import { JwtAuthGuard } from 'src/services/admin/guards/jwt-auth.guard';
import { LivraisonService } from 'src/services/livraison/livraison.service';

@Controller('livraison')
export class LivraisonController {


    constructor(private livraisonService: LivraisonService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<livraisonEntity[]> {
       return this.livraisonService.getLivraison(user);
    }

    @Get('client/:email')
    getParEmail( 
      @Param('email') email: string
     ): Promise<livraisonEntity[]> {
   return this.livraisonService.getLivraisonByEmail(email);
    }

    @Get('livreur')
    @UseGuards(JwtAuthGuard)
     getParLivreur( 
       @User() user
      ): Promise<livraisonEntity[]> {
    return this.livraisonService.getLivraisonByLivreur(user);
     }


     @Get('approuver')
     @UseGuards(JwtAuthGuard)
      getParNonAppouve( 
         @User() user
      ): Promise<livraisonEntity[]> {
         return this.livraisonService.getLivraisonNonValidÃ©(user);
        }

     @Get('terminer')
      @UseGuards(JwtAuthGuard)
         getParTermine( 
            @User() user
         ): Promise<livraisonEntity[]> {
            return this.livraisonService.getLivraisonTerminer(user);
           }   


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getLivraisonById(
      @Param('id') id: string, @User() user
    ): Promise<livraisonEntity>{
      const livraison = await this.livraisonService.getById(id,user);

      if (livraison)
         return livraison;
    }


    @Post()
    
    addLivraison(
      @Body() livraisonData:AddLivraisonDto , @User() user
    ){
      return this.livraisonService.addLivraison(livraisonData, user);
    }

   /* @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteLivraison(
      @Param('id') id: string , @User() user
    ): Promise<unknown> {
      return this.livraisonService.deleteLivraison(id,user);
    }*/

    @Put(':id')
     @UseGuards(JwtAuthGuard)
    updateLivraison(
    @Param('id')id : string,
    @Body() newLivraison: updateLivraisonDto , @User() user
      ): Promise<livraisonEntity> {
      return this.livraisonService.putLivraison(id, newLivraison,user);
    }


    @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async SoftdeleteLivraison(
    @Param('id') id: string,
    @User() user
  ) {
    return this.livraisonService.softDeleteCommande(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreLivraison(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.livraisonService.restoreCommnade(id, user);
  }

    
}
