import { IsOptional, MaxLength, MinLength } from "class-validator";
import { ErrorMessgaes } from "../error-message.common";

export class updateAdminDto {
    @IsOptional()
    @MinLength(3, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(10, {
      message: ErrorMessgaes.tooLong
    })
      prenom: string;

      @IsOptional()
@MinLength(3, {
  message: ErrorMessgaes.tooShort
})
@MaxLength(10, {
  message: ErrorMessgaes.tooLong
})
  nom: string;
    @IsOptional()
    @MinLength(8, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(8, {
        message: ErrorMessgaes.tooLong
      })
    cin: number;
    
    
    
    
    
    
    
  }
  