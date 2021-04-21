import { IsOptional, MaxLength, MinLength } from "class-validator";
import { ErrorMessgaes } from "../error-message.common";

export class updateLivraisonDto {
    @IsOptional()
    
      cout: number;

      @IsOptional()
@MinLength(10, {
  message: ErrorMessgaes.tooShort
})
@MaxLength(20, {
  message: ErrorMessgaes.tooLong
})
  adresse: string;
   
   
   
   
   
   
   
   
    
    
    
  
    
  }
  