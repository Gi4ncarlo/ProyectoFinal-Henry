import { Module } from '@nestjs/common';
import { dataSource } from './config/data-sorce';
import { ServiceDetailsModule } from './modules/service-details/service-details.module';
import { GardenerModule } from './modules/gardener/gardener.module';
import { ServicesOrderModule } from './modules/services-order/services-order.module';
import { ServiceProvidedModule } from './modules/serviceProvided/serviceProvided.module';


@Module({
  imports: [
    dataSource,
    ServiceDetailsModule,
    GardenerModule,
    ServicesOrderModule,
    ServiceProvidedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
