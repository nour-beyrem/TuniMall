import { IsEmail, isEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ErrorMessgaes } from "../error-message.common";

export class AddLivraisonDto {
    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
   
    cout: number;

    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
   
    nom: string;

    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
   
    prenom: string;

    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
    @IsEmail()
    email: string;


    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
    cin: number;

    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
    @MinLength(10, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(20, {
      message: ErrorMessgaes.tooLong
    })
    adresse: string;

}






