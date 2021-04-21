import { AddAdminDto } from './../../DTO/admin/addAdmin';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { adminEntity } from 'src/entities/admin.entity';
import { AdminService } from 'src/services/admin/admin-service.service';
import { updateAdminDto } from 'src/DTO/admin/updateAdmin';


@Controller('admin')
export class AdminController {


    constructor(private adminService: AdminService) {
    }
  
    @Get('')
    getAll(){
       return this.adminService.getAdmin();
    }

    @Get(':id')
    async getAdminById(
      @Param('id') id: string
    ): Promise<adminEntity>{
      const admin = await this.adminService.getById(id);

      if (admin)
    
      return admin;
    }

    @Post()
    addAdmin(
      @Body() adminData:AddAdminDto 
    ): Promise<adminEntity>{
      return this.adminService.addAdmin(adminData);
    }

    @Delete(':id')
    deleteAdmin(
      @Param('id') id: string
    ): Promise<unknown> {
      return this.adminService.deleteAdmin(id);
    }


    @Put(':id')
  updateAdmin(
    @Param('id')id : string,
    @Body() newAdmin: updateAdminDto
  ): Promise<adminEntity> {
    return this.adminService.putAdmin(id, newAdmin);
  }
}
