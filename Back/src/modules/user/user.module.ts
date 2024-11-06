import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GardenerModule } from '../gardener/gardener.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GardenerModule, SharedModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
