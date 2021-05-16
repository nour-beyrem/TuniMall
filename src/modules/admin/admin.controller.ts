import { AddAdminDto } from './../../DTO/admin/addAdmin';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { adminEntity } from 'src/entities/admin.entity';
import { AdminService } from 'src/services/admin/admin-service.service';
import { updateAdminDto } from 'src/DTO/admin/updateAdmin';
import { LoginCredentialsDto } from 'src/DTO/admin/loginUser';
import { JwtAuthGuard } from 'src/services/admin/guards/jwt-auth.guard';


@Controller('user')
export class AdminController {


    constructor(private adminService: AdminService) {
    }
  
    @Get('')
    @Get()
  @UseGuards(JwtAuthGuard)
    getAll(){
       return this.adminService.getUsers();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getAdminById(
      @Param('id') id: string
    ): Promise<adminEntity>{
      const admin = await this.adminService.getById(id);

      if (admin)
    
      return admin;
    }

    @Get('role/:role')
    @UseGuards(JwtAuthGuard)
    getUsersByRole(
         @Param('role') role: string
        ): Promise<adminEntity[]> {
         return this.adminService.getByRole(role);
       }

    @Post()
    @UseGuards(JwtAuthGuard)
    addAdmin(
      @Body() adminData:AddAdminDto 
    ){
      return this.adminService.addAdmin(adminData);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteAdmin(
      @Param('id') id: string
    ): Promise<unknown> {
      return this.adminService.deleteAdmin(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
  updateAdmin(
    @Param('id')id : string,
    @Body() newAdmin: updateAdminDto
  ): Promise<adminEntity> {
    return this.adminService.putAdmin(id, newAdmin);
  }




  
  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto
  ) {
    return this.adminService.login(credentials);
  }
}
