import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';


@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

 
}