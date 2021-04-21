import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ErrorMessgaes } from "../error-message.common";

export class AddProduitDto {
   
    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
    @MinLength(10, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(20, {
      message: ErrorMessgaes.tooLong
    })
    codeBar: string;

    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
    @MinLength(10, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(20, {
      message: ErrorMessgaes.tooLong
    })
    nom: string;

}






