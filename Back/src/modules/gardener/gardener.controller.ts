import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseInterceptors, 
  UploadedFile, 
  HttpCode, 
  UseGuards, 
  Query, 
  HttpException, 
  HttpStatus, 
  ParseUUIDPipe 
} from '@nestjs/common';
import { GardenerService } from './gardener.service';
import { CreateGardenerDto } from './dto/create-gardener.dto';
import { UpdateGardenerDto } from './dto/update-gardener.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadPipe } from 'src/pipes/image-upload/image-upload.pipe';
import { UploadFileDto } from 'src/file-upload/dtos/uploadFile.dto';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Role } from '../user/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles/role.guard';
import { AuthGuard } from '../auth/auth.guard';
import { IsUUID } from 'class-validator';

@Controller('gardener')
export class GardenerController {
  constructor(
    private readonly gardenerService: GardenerService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createGardenerDto: CreateGardenerDto) {
    return this.gardenerService.create(createGardenerDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('name') name?: string,
    @Query('calification') calification?: number,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ) {
    return this.gardenerService.findAll(page, limit, name, calification, order);
  }

  @UseGuards(AuthGuard)
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @Param('id') id: string,
    @UploadedFile(new ImageUploadPipe()) file: Express.Multer.File,
  ) {
    const uploadFileDto: UploadFileDto = {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer,
    };

    const imageUrl = await this.fileUploadService.uploadFile(uploadFileDto, 'gardener');
    await this.gardenerService.updateProfileImage(id, imageUrl);

    return { imageUrl };
  }

  @Get(':id/image')
  @HttpCode(200)
  async getProfileImage(@Param('id') id: string) {
    const gardener = await this.gardenerService.findOne(id);
    return { imageUrl: gardener.profileImageUrl };
  }


  @UseGuards(AuthGuard)
  @Get(':id/serviceProvided')
  @HttpCode(200)
  getServiceProvided(@Param('id', new ParseUUIDPipe()) id: string) {
    const servicesOfTheGardener = this.gardenerService.findServicesProvidedByGardener(id);
     
    if(!servicesOfTheGardener){
      throw new HttpException("No hay servicios prestados por este Jardinero.", HttpStatus.NOT_FOUND)
    }
    return servicesOfTheGardener;
  }

  @UseGuards(AuthGuard)
  @Get(':id/orders')
  @HttpCode(200)
  getOrdersAsigned(@Param('id', new ParseUUIDPipe()) id: string) {
    const servicesOfTheGardener = this.gardenerService.findOrdersAsignedForGardener(id);
     
    if(!servicesOfTheGardener){
      throw new HttpException("No hay ordenes asignadas a este Jardinero.", HttpStatus.NOT_FOUND)
    }
    return servicesOfTheGardener;
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const gardener = this.gardenerService.findOne(id);

    if (!gardener) {
      throw new HttpException("Jardinero no encontrado.", HttpStatus.NOT_FOUND);
    }
    return gardener;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Gardener)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGardenerDto: UpdateGardenerDto) {
    return this.gardenerService.update(id, updateGardenerDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gardenerService.remove(id);
  }
}
