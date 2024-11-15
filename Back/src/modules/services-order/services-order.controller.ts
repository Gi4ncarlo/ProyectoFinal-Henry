import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  UseGuards, 
  Query, 
  ParseUUIDPipe, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { ServicesOrderService } from './services-order.service';
import { CreateServiceOrderDto } from './dto/create-services-order.dto';
import { UpdateServicesOrderDto } from './dto/update-services-order.dto';
import { Role } from '../user/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles/role.guard';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('serviceOrder')
@ApiBearerAuth()
@Controller('services-order')
export class ServicesOrderController {
  constructor(private readonly servicesOrderService: ServicesOrderService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles( Role.User, Role.Admin)
  @Post()
  create(@Body() createServicesOrderDto: CreateServiceOrderDto) {
    return this.servicesOrderService.create(createServicesOrderDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.servicesOrderService.findAll(page, limit);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const serviceOrder = await this.servicesOrderService.findOne(id);

    if (!serviceOrder) {
      throw new HttpException("Orden de servicio no encontrada", HttpStatus.NOT_FOUND);
    }

    return serviceOrder;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateServicesOrderDto: UpdateServicesOrderDto,
  ) {
    return this.servicesOrderService.update(id, updateServicesOrderDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesOrderService.remove(id);
  }
}
