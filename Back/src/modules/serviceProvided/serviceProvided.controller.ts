import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ServiceProvidedService } from './serviceProvided.service';
import { Response } from 'express';
import { UpdateServiceProvidedDto } from './Dtos/serviceProvided.dto';
import { ServiceProvided } from './entities/serviceProvided.entity';
import { Role } from '../user/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles/role.guard';
import { AuthGuard } from '../auth/auth.guard';
import { IsUUID } from 'class-validator';

@Controller('serviceProvided')
export class ServiceProvidedController {
  constructor(
    private readonly serviceProvidedService: ServiceProvidedService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllServiceProvided(@Res() res: Response) {
    try {
      const data = await this.serviceProvidedService.getAllServiceProvidedService();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getServiceProvidedById(
    @Res() res: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!IsUUID(4, { each: true })) {
      throw new HttpException('UUID Invalida', HttpStatus.BAD_REQUEST);
    }

    try {
      const data = await this.serviceProvidedService.getServiceProvidedByIdService(id);
      if (!data) {
        throw new HttpException(
          'Service Provided no encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @Roles(Role.Admin)
  @Post()
  async createServiceProvided(
    @Res() res: Response,
    @Body() createServiceProvidedDto: Omit<ServiceProvided, 'id'>,
  ) {
    try {
      const data = await this.serviceProvidedService.createServiceProvidedService(createServiceProvidedDto);
      return res.status(200).json({
        service: data,
        message: 'Servicio creado con exito',
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  // @UseGuards(AuthGuard)
  // @Patch('/:id')
  // async updateServiceProvided(
  //   @Res() res: Response, 
  //   @Param('id', ParseUUIDPipe) id: string, 
  //   @Body() updateServiceProvidedDto: UpdateServiceProvidedDto,
  // ) {
  //   try {
  //     const data = await this.serviceProvidedService.updateServiceProvidedService(id, updateServiceProvidedDto);
  //     return res.status(200).json({
  //       service: data,
  //       message: 'Servicio actualizado con exito'
  //     });
  //   } catch (error) {
  //     return res.status(400).json(error);
  //   }
  // }
}