import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GardenerService } from './gardener.service';
import { CreateGardenerDto } from './dto/create-gardener.dto';
import { UpdateGardenerDto } from './dto/update-gardener.dto';

@Controller('gardener')
export class GardenerController {
  constructor(private readonly gardenerService: GardenerService) {}

  @Post()
  create(@Body() createGardenerDto: CreateGardenerDto) {
    return this.gardenerService.create(createGardenerDto);
  }

  @Get()
  findAll() {
    return this.gardenerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gardenerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGardenerDto: UpdateGardenerDto) {
    return this.gardenerService.update(id, updateGardenerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gardenerService.remove(id);
  }
}
