import { AddAdminDto } from './../../DTO/admin/addAdmin';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { adminEntity } from 'src/entities/admin.entity';
import { AdminService } from 'src/services/admin/admin-service.service';
import { updateAdminDto } from 'src/DTO/admin/updateAdmin';
import { LoginCredentialsDto } from 'src/DTO/admin/loginUser';
import { JwtAuthGuard } from 'src/services/admin/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';


@Controller('user')
export class AdminController {


    constructor(private adminService: AdminService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<adminEntity[]> {
       return this.adminService.getUsers(user);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getAdminById(
      @Param('id') id: string, @User() user
    ): Promise<adminEntity>{
      const admin = await this.adminService.getById(id,user);

      if (admin)
    
      return admin;
    }

    @Get('role/:role')
    @UseGuards(JwtAuthGuard)
    getUsersByRole(
         @Param('role') role: string , @User() user
        ): Promise<adminEntity[]> {
         return this.adminService.getByRole(role,user);
       }

    @Post()
    @UseGuards(JwtAuthGuard)
    addAdmin(
      @Body() adminData:AddAdminDto , @User() user1
    ){
      return this.adminService.addAdmin(adminData, user1);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteAdmin(
      @Param('id') id: string , @User() user
    ): Promise<unknown> {
      return this.adminService.deleteAdmin(id,user);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
  updateAdmin(
    @Param('id')id : string,
    @Body() newAdmin: updateAdminDto , @User() user
  ): Promise<adminEntity> {
    return this.adminService.putAdmin(id, newAdmin,user);
  }




  
  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto
  ) {
    return this.adminService.login(credentials);
  }
}
