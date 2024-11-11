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

  async findAll(
    page: number,
    limit: number,
    name?: string,
    calification?: number,
    order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<{ data: Gardener[]; count: number }> {
    const skip = (page - 1) * limit;
  
    const query = this.gardenerRepository.createQueryBuilder('gardener')
      .leftJoinAndSelect('gardener.serviceProvided', 'serviceProvided')
      .leftJoinAndSelect('gardener.serviceDetails', 'serviceDetails')
      .take(limit)
      .skip(skip)
      .orderBy('gardener.name', order);
  
    // Filtro por nombre
    if (name) {
      query.andWhere('gardener.name ILIKE :name', { name: `%${name}%` });
    }
  
    // Filtro por calificación
    if (calification !== undefined) {
      query.andWhere('gardener.calification = :calification', { calification });
    }
  
    const [data, count] = await query.getManyAndCount();
  
    if (count === 0) {
      throw new NotFoundException('Gardener not found');
    }
  
    return { count, data };
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
