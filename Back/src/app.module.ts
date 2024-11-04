import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './config/data-sorce';
import { ServiceDetailsModule } from './modules/service-details/service-details.module';
import { GardenerModule } from './modules/gardener/gardener.module';
import { ServicesOrderModule } from './modules/services-order/services-order.module';

@Module({
  imports: [
    dataSource,
    ServiceDetailsModule,
    GardenerModule,
    ServicesOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
