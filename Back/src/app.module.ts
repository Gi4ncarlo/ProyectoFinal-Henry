import { Module } from '@nestjs/common';
import { dataSource } from './config/data-sorce';
import { ServiceDetailsModule } from './modules/service-details/service-details.module';
import { GardenerModule } from './modules/gardener/gardener.module';
import { ServicesOrderModule } from './modules/services-order/services-order.module';
import { ServiceProvidedModule } from './modules/serviceProvided/serviceProvided.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    dataSource,
    ServiceDetailsModule,
    GardenerModule,
    UserModule,
    ServicesOrderModule,
    ServiceProvidedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
