import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode, UseGuards, Query, HttpException, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
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
import { IsUUID } from 'class-validator';

@Controller('gardener')
export class GardenerController {
  constructor(
    private readonly gardenerService: GardenerService,
    private readonly fileUploadService: FileUploadService,
  ){}

  @Post()
  create(@Body() createGardenerDto: CreateGardenerDto) {
    return this.gardenerService.create(createGardenerDto);
  }

  @Get()
  findAll( 
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10) {   
   
    return this.gardenerService.findAll(page, limit);
  }


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

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    if(!IsUUID(4, { each : true})){
      throw new HttpException("UUID Invalida", HttpStatus.BAD_REQUEST)
    }

    const gardener = this.gardenerService.findOne(id);

    if(!gardener){
      throw new HttpException("Jardinero no encontrado.", HttpStatus.NOT_FOUND)
    }

    return gardener;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGardenerDto: UpdateGardenerDto) {
    return this.gardenerService.update(id, updateGardenerDto);
  }

  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gardenerService.remove(id);
  }
}
