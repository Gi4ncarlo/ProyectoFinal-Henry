import { Module } from '@nestjs/common';
import { GardenerService } from './gardener.service';
import { GardenerController } from './gardener.controller';
import { Gardener } from './entities/gardener.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Gardener])],
  controllers: [GardenerController],
  providers: [GardenerService],
  exports: [GardenerService],
})
export class GardenerModule {}
