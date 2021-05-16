
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { adminEntity } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import { PayloadInterface } from '../interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService,
    @InjectRepository(adminEntity)
    private adminRepository: Repository<adminEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'nourSecretKey',
    });
  }

  async validate(payload: PayloadInterface) {         
    console.log(payload);
    const user = await this.adminRepository.findOne({username: payload.username});
    if (user) {
      delete user.salt;
      delete user.password;
      return user;
    } else {
      
      throw new UnauthorizedException();
    }
     
 
   
  }
}