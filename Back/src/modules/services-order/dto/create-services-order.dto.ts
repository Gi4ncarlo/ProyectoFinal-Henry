import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PaymentMethod } from '../enums/paymentMethod';
export class CreateServiceOrderDto {

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    paymentMethod: PaymentMethod;

    @IsOptional()
    isApproved?: boolean;
}
