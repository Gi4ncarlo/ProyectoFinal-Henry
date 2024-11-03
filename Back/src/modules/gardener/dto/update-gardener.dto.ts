import {
    IsOptional,
    IsString,
    IsInt,
    IsNumber,
    IsUrl,
    Min,
    Max,
    IsEmail,
  } from 'class-validator';
  
  export class UpdateGardenerDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    password?: string;
  
    @IsInt()
    @IsOptional()
    age?: number;
  
    @IsString()
    @IsOptional()
    phone?: string;
  
    @IsString()
    @IsOptional()
    experience?: string;
  
    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    calification?: number;
  
    @IsString()
    @IsOptional()
    ubication?: string;
  
    @IsNumber()
    @Min(0)
    @IsOptional()
    costPerHour?: number;
  
    @IsUrl()
    @IsOptional()
    profileImageUrl?: string;
  }
  
