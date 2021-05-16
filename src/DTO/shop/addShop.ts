import { IsNotEmpty } from "class-validator";

export class AddShopDto {
    
  


  @IsNotEmpty()
   nom: string;

  @IsNotEmpty()
   path: string;
  }