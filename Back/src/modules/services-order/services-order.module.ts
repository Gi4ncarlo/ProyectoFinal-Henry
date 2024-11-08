import { Module } from '@nestjs/common';
import { ServicesOrderService } from './services-order.service';
import { ServicesOrderController } from './services-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesOrderEntity } from './entities/services-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesOrderEntity])],
  controllers: [ServicesOrderController],
  providers: [ServicesOrderService],
})
export class ServicesOrderModule {}
