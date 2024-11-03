import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateServiceProvidedDto {
    @IsNotEmpty()
    @IsString()
    detailService: string

    @IsNotEmpty()
    @IsString()
    price: string

    @IsArray()
    categories: string[]
}

export class UpdateServiceProvidedDto {

    @IsNotEmpty()
    @IsString()
    detailService?: string;

    @IsNotEmpty()
    @IsString()
    price?: string
    @IsArray()
    categories?: string[]


}