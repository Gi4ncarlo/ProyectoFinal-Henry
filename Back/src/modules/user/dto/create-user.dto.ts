import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Min } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0, { message: 'Age must be a positive number' })
  age: number;

  @IsNotEmpty()
  @IsPhoneNumber(null, { message: 'Phone number is not valid' })
  phone: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Role must be either User, Admin or Gardener' })
  role?: Role = Role.User;
}
