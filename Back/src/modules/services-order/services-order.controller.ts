import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesOrderService } from './services-order.service';
import { CreateServiceOrderDto } from './dto/create-services-order.dto';
import { UpdateServicesOrderDto } from './dto/update-services-order.dto';

@Controller('services-order')
export class ServicesOrderController {
  constructor(private readonly servicesOrderService: ServicesOrderService) {}

  @Post()
  create(@Body() createServicesOrderDto: CreateServiceOrderDto) {
    return this.servicesOrderService.create(createServicesOrderDto);
  }

  @Get()
  findAll() {
    return this.servicesOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicesOrderDto: UpdateServicesOrderDto) {
    return this.servicesOrderService.update(id, updateServicesOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesOrderService.remove(id);
  }
}
