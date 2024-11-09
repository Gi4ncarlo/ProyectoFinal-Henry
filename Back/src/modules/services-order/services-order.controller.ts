import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Query } from '@nestjs/common';
import { ServicesOrderService } from './services-order.service';
import { CreateServiceOrderDto } from './dto/create-services-order.dto';
import { UpdateServicesOrderDto } from './dto/update-services-order.dto';
import { Role } from '../user/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles/role.guard';

@Controller('services-order')
export class ServicesOrderController {
  constructor(private readonly servicesOrderService: ServicesOrderService) {}

  @Post()
  create(@Body() createServicesOrderDto: CreateServiceOrderDto) {
    return this.servicesOrderService.create(createServicesOrderDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
     ) {
    return this.servicesOrderService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicesOrderDto: UpdateServicesOrderDto) {
    return this.servicesOrderService.update(id, updateServicesOrderDto);
  }

  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesOrderService.remove(id);
  }
}
