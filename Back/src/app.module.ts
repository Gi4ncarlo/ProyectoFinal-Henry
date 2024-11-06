import { Module } from '@nestjs/common';
import { dataSource } from './config/data-sorce';
import { ServiceDetailsModule } from './modules/service-details/service-details.module';
import { GardenerModule } from './modules/gardener/gardener.module';
import { ServicesOrderModule } from './modules/services-order/services-order.module';
import { ServiceProvidedModule } from './modules/serviceProvided/serviceProvided.module';
import { UserModule } from './modules/user/user.module';
import { SeedsModule } from './seeds/seeds.module';


@Module({
  imports: [
    dataSource,
    ServiceDetailsModule,
    GardenerModule,
    UserModule,
    ServicesOrderModule,
    ServiceProvidedModule,
    SeedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
