import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { ServicesOrderModule } from '../services-order/services-order.module';

@Module({
  imports: [ConfigModule],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}
