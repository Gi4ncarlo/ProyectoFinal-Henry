import { Module } from '@nestjs/common';
import { dataSource } from './config/data-sorce';
import { ServiceDetailsModule } from './modules/service-details/service-details.module';
import { ServiceProvidedModule } from './modules/serviceProvided/serviceProvided.module';


@Module({
  imports: [
    dataSource,
    ServiceDetailsModule,
    ServiceProvidedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
