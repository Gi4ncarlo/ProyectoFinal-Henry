import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GardenerService } from '../gardener/gardener.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from 'src/file-upload/dtos/uploadFile.dto';
import { ImageUploadPipe } from 'src/pipes/image-upload/image-upload.pipe';
import { RolesGuard } from 'src/guards/roles/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './enums/role.enum';



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileUploadService: FileUploadService,
    private readonly gardenerService: GardenerService,
  ) {}

  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Roles(Role.Admin)
  @Get()
  findAll( 
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
     ) {
    return this.userService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('/gardener/:id')
  async findByNameGardener(@Param('id') id: string) {
    return await this.gardenerService.findOne(id)
  }

  //IMAGEN 

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

    const imageUrl = await this.fileUploadService.uploadFile(uploadFileDto, 'users');
    await this.userService.updateProfileImage(id, imageUrl); 

    return { imageUrl };
  }


  @Get(':id/image')
  @HttpCode(200)
  async getProfileImage(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return { imageUrl: user.profileImageUrl };
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }


  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
