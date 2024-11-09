import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Query } from '@nestjs/common';
import { ServiceDetailsService } from './service-details.service';
import { CreateServiceDetailDto } from './dto/create-service-detail.dto';
import { UpdateServiceDetailDto } from './dto/update-service-detail.dto';
import { Role } from '../user/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles/role.guard';

@Controller('service-details')
export class ServiceDetailsController {
  constructor(private readonly serviceDetailsService: ServiceDetailsService) {}

  @Post()
  create(@Body() createServiceDetailDto: CreateServiceDetailDto) {
    return this.serviceDetailsService.create(createServiceDetailDto);
  }

  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Roles(Role.Admin)
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
     ) {
    return this.serviceDetailsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceDetailsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDetailDto: UpdateServiceDetailDto) {
    return this.serviceDetailsService.update(id, updateServiceDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceDetailsService.remove(id);
  }
}
