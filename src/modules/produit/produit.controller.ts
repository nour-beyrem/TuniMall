import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AddProduitDto } from 'src/DTO/produit/addProduit';
import { updateProduitDto } from 'src/DTO/produit/updateProduit';
import { produitEntity } from 'src/entities/produit.entity';
import { JwtAuthGuard } from 'src/services/admin/guards/jwt-auth.guard';
import { ProduitService } from 'src/services/produit/produit.service';

@Controller('produit')
export class ProduitController {




    constructor(private produitService: ProduitService) {
    }


    @Get()
    
    getAll( 
      
    ): Promise<produitEntity[]> {
       return this.produitService.getProduits();
    }


    @Get(':codeBar')
    
    async getProduitById(
      @Param('codeBar') codeBar: string
    ): Promise<produitEntity>{
      const produit = await this.produitService.getById(codeBar);
      if (produit)
    
      return produit;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    addProduit(
      @Body() produitData:AddProduitDto , @User() user
    ){
      return this.produitService.addProduit(produitData, user);
    }

    @Delete(':codeBar')
    @UseGuards(JwtAuthGuard)
    deleteProduit(
      @Param('codeBar') codeBar: string , @User() user
    ): Promise<unknown> {
      return this.produitService.deleteProduit(codeBar,user);
    }



    @Put(':codeBar')
    @UseGuards(JwtAuthGuard)
  updateProduit(
    @Param('codeBar') codeBar: string,
    @Body() newProduit: updateProduitDto , @User() user
  ): Promise<produitEntity> {
    return this.produitService.putProduit(codeBar, newProduit,user);
  }


}
