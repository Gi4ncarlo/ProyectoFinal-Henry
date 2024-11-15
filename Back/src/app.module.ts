import { Module } from '@nestjs/common';
import { dataSource } from './config/data-sorce';
import { ServiceDetailsModule } from './modules/service-details/service-details.module';
import { GardenerModule } from './modules/gardener/gardener.module';
import { ServicesOrderModule } from './modules/services-order/services-order.module';
import { ServiceProvidedModule } from './modules/serviceProvided/serviceProvided.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SeedsModule } from './seeds/seeds.module';
import { AdminModule } from './modules/admin/admin.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    dataSource,
    ServiceDetailsModule,
    GardenerModule,
    UserModule,
    ServicesOrderModule,
    ServiceProvidedModule,
    AuthModule,
    SeedsModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
