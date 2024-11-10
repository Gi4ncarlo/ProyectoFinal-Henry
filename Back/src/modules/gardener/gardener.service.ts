import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGardenerDto } from './dto/create-gardener.dto';
import { UpdateGardenerDto } from './dto/update-gardener.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gardener } from './entities/gardener.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GardenerService {
  constructor(
    @InjectRepository(Gardener)
    private readonly gardenerRepository: Repository<Gardener>,
  ) {}

  async create(createGardenerDto: CreateGardenerDto): Promise<Gardener> {
    const gardner = this.gardenerRepository.create(createGardenerDto);
    return await this.gardenerRepository.save(gardner);
  }

  async findAll(page : number, limit : number): Promise<{ data: Gardener[]; count: number }> {
    const skip = (page - 1) * limit;

    const [data, count] = await this.gardenerRepository.findAndCount({
      take: limit,
      skip: skip,
    });

    if (count === 0) {
      throw new NotFoundException('Gardner not foundend');
    }

    return {count, data};
  }
  
  async findOne(id: string): Promise<Gardener> {
    const gardner = await this.gardenerRepository.findOneBy({ id });
    if (!gardner) {
      throw new NotFoundException(`Gardener with the ID ${id} not Found`);
    }
    return gardner;
  }

  async update(
    id: string,
    updateGardenerDto: UpdateGardenerDto,
  ): Promise<Gardener> {
    const gardener = await this.gardenerRepository.findOneBy({ id });
    if (!gardener) {
      throw new NotFoundException(`Gardener with the ID ${id} not Found`);
    }
    await this.gardenerRepository.update(id, updateGardenerDto);
    return this.gardenerRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<string | void> {
    const result = await this.gardenerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Gardener with the ID ${id} not Found`);
    }

    return `Gardner with the ID ${id} DELETED exitosly`;
  }


  async updateProfileImage(id: string, imageUrl: string): Promise<void> {
    await this.gardenerRepository.update(id, { profileImageUrl: imageUrl });
  }
}
