import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './config/data-sorce';
import { ServiceDetailsModule } from './modules/service-details/service-details.module';
import { GardenerModule } from './modules/gardener/gardener.module';

@Module({
  imports: [
    dataSource,
    ServiceDetailsModule,
    GardenerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
