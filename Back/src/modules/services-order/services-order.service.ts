import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceOrderDto } from './dto/create-services-order.dto';
import { UpdateServicesOrderDto } from './dto/update-services-order.dto';
import { ServicesOrderEntity } from './entities/services-order.entity';
import { Gardener } from '../gardener/entities/gardener.entity';
import { User } from '../user/entities/user.entity';
import { ServiceProvided } from '../serviceProvided/entities/serviceProvided.entity';
import { UserResponseDto } from '../user/dto/response-user.dto';
import { AdminEntity } from '../admin/entities/admin.entity';
import { ServiceDetailsService } from '../service-details/service-details.service';
import { Status } from '../service-details/enum/status.enum';
import { ServiceDetail } from '../service-details/entities/service-detail.entity';
import { TokenService } from '../tokenServices/token.service';

@Injectable()
export class ServicesOrderService {

  constructor(
    @InjectRepository(ServicesOrderEntity)
    private servicesOrderRepository: Repository<ServicesOrderEntity>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Gardener)
    private gardenerRepository: Repository<Gardener>,

    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,

    @InjectRepository(ServiceProvided)
    private serviceProvidedRepository: Repository<ServiceProvided>,

    @InjectRepository(ServiceDetail)
    private readonly serviceDetailsRepository: Repository<ServiceDetail>,
    private readonly tokenService: TokenService

  ) { }

  async create(createServicesOrderDto: CreateServiceOrderDto): Promise<any> {
    const { date, isApproved, gardenerId, userId, serviceId } = createServicesOrderDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const gardener = await this.gardenerRepository.findOne({ where: { id: gardenerId } });
    const Admin = await this.adminRepository.findOne({ where: { id: userId } });

    const serviceProvided = [];

    for (let i = 0; i < serviceId.length; i++) {
      const service = await this.serviceProvidedRepository.findOne({ where: { id: serviceId[i] } });
      if (!service) {
        throw new Error('Service not found');
      }
      serviceProvided.push(service);
    }
    if (!gardener) {
      throw new Error('Gardener not found');
    }

    if (!serviceProvided) {
      throw new Error('Service Provided not found');
    }
    const newOrder = this.servicesOrderRepository.create({
      date: date || new Date().toLocaleString(),
      isApproved,
      user: user || Admin,
      gardener,
      serviceProvided,
    });
    await this.servicesOrderRepository.save(newOrder);

    const savedOrder = await this.servicesOrderRepository.findOne({
      where: { id: newOrder.id },
      relations: ['user', 'gardener', 'serviceProvided'],
      select: {
        user: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImageUrl: true
        },
        gardener: {
          id: true,
          name: true,
          username: true,
          email: true,
          age: true,
          phone: true,
          profileImageUrl: true,
          experience: true,
          calification: true,
          ubication: true,
        },
        serviceProvided: {
          id: true,
          detailService: true,
          categories: true,
          price: true
        }
      }
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
    return { count, data };
  }

  async findOne(id: string): Promise<ServicesOrderEntity> {
    const order = await this.servicesOrderRepository.findOne({
      where: { id },
      relations: ['user', 'gardener', 'serviceProvided', 'orderDetail'],
    })
    if (!order) {
      throw new NotFoundException(`Orden de servicio con id ${id} no encontrada`);
    }
    return order;
  }
  async orderPay(id: string) {
    try {      
      const order = await this.findOne(id);
      if (!order) throw new NotFoundException(`Orden de servicio con id ${id} no encontrada`);
      if(order.orderDetail) throw new BadRequestException('La orden de servicio ya fue pagada');
      order.isApproved = true;
      let price = 0;
      order.serviceProvided.map((service) => price += service.price)
      const newOrderDetail = await this.serviceDetailsRepository.create({
        serviceType: order.serviceProvided.map((service) => service.detailService),
        totalPrice: price,
        startTime: new Date().toLocaleString(),
        status: Status.Pending,
        servicesOrder: order,
        assignedGardener: order.gardener
      })
      newOrderDetail.userToken = await this.tokenService.generateToken(6)
      await this.serviceDetailsRepository.save(newOrderDetail);
      order.orderDetail = newOrderDetail;
      await this.servicesOrderRepository.save(order);
      const { assignedGardener, servicesOrder, ...rest } = newOrderDetail
      const { orderDetail, user, gardener, serviceProvided, ...ord } = order
      const { password, ...userWithoutPassword } = user

      return {
        message: 'detalle de servicio generado exitosamente',
        data: {
          order: ord,
          datail: rest,
          user: userWithoutPassword,
          gardener,
        }
      }


    } catch (error) {
      throw new HttpException(error, 400);
    }
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

