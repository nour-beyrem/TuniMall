import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AddComplainDto } from 'src/DTO/complains/addComplain';
import { updateComplainDto } from 'src/DTO/complains/updateComplain';
import { complainEntity } from 'src/entities/complain.entity';
import { JwtAuthGuard } from 'src/services/admin/guards/jwt-auth.guard';
import { ComplainService } from 'src/services/complain/complain.service';

@Controller('complain')
export class ComplainController {



    constructor(private complainService: ComplainService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<complainEntity[]> {
       return this.complainService.getComplain(user);
    }


    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getComplainById(
      @Param('id') id: string, @User() user
    ): Promise<complainEntity>{
      const complain = await this.complainService.getById(id,user);

      if (complain)
         return complain;
    }


    @Post()
    addComplain(
      @Body() adminData:AddComplainDto 
    ){
      return this.complainService.addComplain(adminData);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteComplain(
      @Param('id') id: string , @User() user
    ): Promise<unknown> {
      return this.complainService.deleteComplain(id,user);
    }

   /* @Put(':id')
     @UseGuards(JwtAuthGuard)
    updateComplain(
    @Param('id')id : string,
    @Body() newComplain: updateComplainDto , @User() user
      ): Promise<complainEntity> {
      return this.complainService.putComplain(id, newComplain,user);
    }*/



}
