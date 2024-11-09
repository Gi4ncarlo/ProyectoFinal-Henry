import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceOrderDto } from './dto/create-services-order.dto';
import { UpdateServicesOrderDto } from './dto/update-services-order.dto';
import { ServicesOrderEntity } from './entities/services-order.entity';
import { Gardener } from '../gardener/entities/gardener.entity';
import { User } from '../user/entities/user.entity';
import { ServiceProvided } from '../serviceProvided/entities/serviceProvided.entity';
import { format } from 'date-fns';
import { UserResponseDto } from '../user/dto/response-user.dto';
@Injectable()
export class ServicesOrderService {
  constructor(
    @InjectRepository(ServicesOrderEntity)
    private servicesOrderRepository: Repository<ServicesOrderEntity>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Gardener)
    private gardenerRepository: Repository<Gardener>,

    @InjectRepository(ServiceProvided)
    private serviceProvidedRepository: Repository<ServiceProvided>,

  ) {}

  async create(createServicesOrderDto: CreateServiceOrderDto): Promise<any> {
    const { date, isApproved, gardenerId, userId, serviceId } = createServicesOrderDto;
  
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const gardener = await this.gardenerRepository.findOne({ where: { id: gardenerId } });
    const serviceProvided = await this.serviceProvidedRepository.findOne({ where: { id: serviceId } });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    if (!gardener) {
      throw new Error('Gardener not found');
    }
  
    if (!serviceProvided) {
      throw new Error('Service Provided not found');
    }
  
    const newOrder = this.servicesOrderRepository.create({
      date,
      isApproved,
      user,
      gardener,
      serviceProvided,
    });
  
    await this.servicesOrderRepository.save(newOrder);
  
    const savedOrder = await this.servicesOrderRepository.findOne({
      where: { id: newOrder.id },
      relations: ['user', 'gardener', 'serviceProvided'],
    });
  
    if (savedOrder) {
      const userResponse = new UserResponseDto(savedOrder.user);
  
      const response = {
        ...savedOrder,
        user: userResponse,
      };
  
      return response;
    }
  
    throw new Error('Order not found after saving');
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

