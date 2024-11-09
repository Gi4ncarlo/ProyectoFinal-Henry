import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceOrderDto } from './dto/create-services-order.dto';
import { UpdateServicesOrderDto } from './dto/update-services-order.dto';
import { ServicesOrderEntity } from './entities/services-order.entity';

@Injectable()
export class ServicesOrderService {
  constructor(
    @InjectRepository(ServicesOrderEntity)
    private readonly servicesOrderRepository: Repository<ServicesOrderEntity>,
  ) {}

  async create(createServiceOrderDto: CreateServiceOrderDto): Promise<ServicesOrderEntity> {
    const newOrder = this.servicesOrderRepository.create(createServiceOrderDto);
    return await this.servicesOrderRepository.save(newOrder);
  }

  async findAll(page: number, limit: number): Promise<{ data: ServicesOrderEntity[]; count: number }> {
    const skip = (page - 1) * limit;

    const [data, count] = await this.servicesOrderRepository.findAndCount({
      take: limit,
      skip: skip,
    });

    if (count === 0) {
      throw new NotFoundException('No hay órdenes de servicio almacenadas');
    }
    return {count, data};
  }

  async findOne(id: string): Promise<ServicesOrderEntity> {
    const order = await this.servicesOrderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Orden de servicio con id ${id} no encontrada`);
    }
    return order;
  }

  async update(id: string, updateServiceOrderDto: UpdateServicesOrderDto): Promise<ServicesOrderEntity> {
    const order = await this.servicesOrderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Orden de servicio con id ${id} no encontrada`);
    }
    await this.servicesOrderRepository.update(id, updateServiceOrderDto);
    return this.servicesOrderRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const result = await this.servicesOrderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Orden de servicio con id ${id} no encontrada`);
    }
  }
}

