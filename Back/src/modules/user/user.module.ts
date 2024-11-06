import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GardenerModule } from '../gardener/gardener.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GardenerModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
